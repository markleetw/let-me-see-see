/**
 * Google Sheets Grid Cell & In-Cell Image Matcher
 * Detects grid lines, active cell bounds, and matches raster cell content against candidate image URLs.
 */

import { canvasToRaster, findDominantNonBgBounds, cropRaster, computeDifferenceScore, findBestImageMatch, rasterToDataUrl } from "../shared/image-matcher.js";
import { fetchAndCacheImage } from "../shared/lru-cache.js";
import { extractFormulaBarImageUrl } from "./formula-parser.js";
import { getNetworkResourceUrls } from "../shared/network-resources.js";

const GRID_LINE_MIN_STRENGTH = 0.55;
const MAX_HAMMING_DISTANCE = 0.28;
const MIN_CONTENT_BOUNDS = 4;
const SEARCH_DISTANCE = 700;
const COLOR_MATCH_THRESHOLD = 0.25;
const COLOR_RUN_LENGTH = 4;
const MAX_COLOR_LUMINANCE = 200;
const THUMB_SIZE = 48;

/**
 * Check if a pixel at (x, y) looks like a grid line (grayish, within bounds).
 */
function isGridLinePixel(raster, x, y) {
  if (x < 0 || y < 0 || x >= raster.width || y >= raster.height) return false;
  const idx = (y * raster.width + x) * 4;
  const r = raster.pixels[idx];
  const g = raster.pixels[idx + 1];
  const b = raster.pixels[idx + 2];
  const a = raster.pixels[idx + 3];
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return a > 200 && spread <= 12 && r >= 185 && r <= 245;
}

/**
 * Vertical grid line density along x at y center
 */
function getVerticalLineDensity(raster, x, centerY) {
  const minY = Math.max(0, centerY - 90);
  const maxY = Math.min(raster.height - 1, centerY + 90);
  let hits = 0;
  let total = 0;
  for (let y = minY; y <= maxY; y += 2) {
    total++;
    if (isGridLinePixel(raster, x, y)) hits++;
  }
  return total ? hits / total : 0;
}

/**
 * Horizontal grid line density along y at x center
 */
function getHorizontalLineDensity(raster, y, centerX) {
  const minX = Math.max(0, centerX - 260);
  const maxX = Math.min(raster.width - 1, centerX + 260);
  let hits = 0;
  let total = 0;
  for (let x = minX; x <= maxX; x += 3) {
    total++;
    if (isGridLinePixel(raster, x, y)) hits++;
  }
  return total ? hits / total : 0;
}

/**
 * Step in direction until line density reaches threshold
 */
function findLineBoundary(raster, start, step, limit, checkDensity) {
  const maxBoundary = Math.max(0, Math.min(limit, start + step * SEARCH_DISTANCE));
  for (let pos = start; step < 0 ? pos >= maxBoundary : pos <= maxBoundary; pos += step) {
    if (checkDensity(pos) >= GRID_LINE_MIN_STRENGTH) return pos;
  }
  return null;
}

/**
 * Find cell boundary coordinates surrounding a target point (x, y)
 */
export function findCellBoundsFromPoint(raster, point) {
  const px = Math.max(0, Math.min(raster.width - 1, Math.round(point.x)));
  const py = Math.max(0, Math.min(raster.height - 1, Math.round(point.y)));

  const left = findLineBoundary(raster, px - 1, -1, 0, (x) => getVerticalLineDensity(raster, x, py));
  const right = findLineBoundary(raster, px + 1, 1, raster.width - 1, (x) => getVerticalLineDensity(raster, x, py));
  const top = findLineBoundary(raster, py - 1, -1, 0, (y) => getHorizontalLineDensity(raster, y, px));
  const bottom = findLineBoundary(raster, py + 1, 1, raster.height - 1, (y) => getHorizontalLineDensity(raster, y, px));

  const l = left != null ? left : 0;
  const r = right != null ? right : raster.width - 1;
  const t = top != null ? top : 0;
  const b = bottom != null ? bottom : raster.height - 1;

  if (r - l < 3 || b - t < 3) return null;
  return { left: l, top: t, right: r, bottom: b };
}

/**
 * Detect active cell selection border or handle in Google Sheets DOM
 */
export function getActiveCellSelectionRect() {
  try {
    const handle = document.querySelector(".cell-selection-handle, [class*='cell-selection-handle'], [class*='autofill-handle']");
    if (handle && handle.parentElement) {
      const r = handle.parentElement.getBoundingClientRect();
      if (r.width >= 10 && r.height >= 10 && r.width < window.innerWidth && r.height < window.innerHeight) {
        return r;
      }
    }
    const border = document.querySelector(".active-cell-border, [class*='active-cell-border'], [class*='selection-border'], .waffle-selection-border");
    if (border) {
      const r = border.getBoundingClientRect();
      if (r.width >= 10 && r.height >= 10 && r.width < window.innerWidth && r.height < window.innerHeight) {
        return r;
      }
    }
  } catch {}
  return null;
}

/**
 * Convert 0-indexed column integer to spreadsheet letters (e.g. 0 -> A, 26 -> AA)
 */
export function columnToLetter(colIndex) {
  let letter = "";
  let curr = colIndex + 1;
  while (curr > 0) {
    curr--;
    letter = String.fromCharCode(65 + (curr % 26)) + letter;
    curr = Math.floor(curr / 26);
  }
  return letter;
}

/**
 * Find canvas element under client (x, y) coordinates
 */
export function findCanvasAtPoint(x, y) {
  return document.elementsFromPoint(x, y).find((el) => el.tagName === "CANVAS") || null;
}

/**
 * Scale image bitmap to 48x48 thumbnail raster
 */
function scaleToRaster(bitmap, width, height) {
  if (!bitmap) return null;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  try {
    ctx.drawImage(bitmap, 0, 0, width, height);
    const imgData = ctx.getImageData(0, 0, width, height);
    return { width, height, pixels: imgData.data };
  } catch {
    return null;
  }
}

/**
 * Collect candidate image URLs from network resources and formula bar
 */
function getRecentCandidateImageUrls() {
  const urls = getNetworkResourceUrls("spreadsheets");
  const formulaUrl = extractFormulaBarImageUrl();
  if (formulaUrl) urls.push(formulaUrl);
  return [...new Set(urls)].slice(-200);
}

/**
 * Match cell raster against candidate URLs
 */
async function matchCellImage(cellRaster) {
  const contentBox = findDominantNonBgBounds(cellRaster);
  if (!contentBox) return null;
  const cropped = cropRaster(cellRaster, contentBox);
  const candidates = getRecentCandidateImageUrls();
  if (!candidates.length) return null;

  const candidateRasters = (
    await Promise.all(
      candidates.map(async (u) => {
        const item = await fetchAndCacheImage(u);
        if (!item?.bitmap) return null;
        const raster = scaleToRaster(item.bitmap, cropped.width, cropped.height);
        return raster ? { url: u, raster } : null;
      })
    )
  ).filter(Boolean);

  const best = findBestImageMatch(cropped, candidateRasters);
  return best && best.score <= MAX_HAMMING_DISTANCE ? best.url : null;
}

/**
 * Handles click on Google Sheets grid canvas to identify clicked cell and image URL.
 */
export async function findImageAtCellClick(clientX, clientY) {
  const canvas =
    findCanvasAtPoint(clientX, clientY) ||
    document.querySelector(".grid-container canvas, #waffle-grid-container canvas, canvas.grid-canvas");
  if (!canvas) return null;

  const canvasRect = canvas.getBoundingClientRect();
  const raster = canvasToRaster(canvas);
  if (!raster || !canvasRect.width || !canvasRect.height) return null;

  const scaleX = raster.width / canvasRect.width;
  const scaleY = raster.height / canvasRect.height;
  const point = {
    x: (clientX - canvasRect.left) * scaleX,
    y: (clientY - canvasRect.top) * scaleY
  };

  let bounds = findCellBoundsFromPoint(raster, point);
  const selRect = getActiveCellSelectionRect();
  let cellRect = null;

  if (bounds) {
    cellRect = new DOMRect(
      canvasRect.left + bounds.left / scaleX,
      canvasRect.top + bounds.top / scaleY,
      (bounds.right - bounds.left) / scaleX,
      (bounds.bottom - bounds.top) / scaleY
    );
  } else if (selRect) {
    cellRect = selRect;
    bounds = {
      left: Math.max(0, (selRect.left - canvasRect.left) * scaleX),
      top: Math.max(0, (selRect.top - canvasRect.top) * scaleY),
      right: Math.min(raster.width, (selRect.right - canvasRect.left) * scaleX),
      bottom: Math.min(raster.height, (selRect.bottom - canvasRect.top) * scaleY)
    };
  }

  if (!bounds || !cellRect) return null;

  const cellRaster = cropRaster(raster, {
    left: bounds.left + 1,
    top: bounds.top + 1,
    right: bounds.right,
    bottom: bounds.bottom
  });

  window.__letMeSeeSeeActiveRaster = cellRaster;
  const cellDataUrl = rasterToDataUrl(cellRaster);
  window.__letMeSeeSeeActiveDataUrl = cellDataUrl;

  let url = await matchCellImage(cellRaster);
  if (!url) {
    const formulaUrl = extractFormulaBarImageUrl();
    if (formulaUrl) url = formulaUrl;
  }
  if (!url) {
    const box = findDominantNonBgBounds(cellRaster);
    if (box && box.right - box.left >= 6 && box.bottom - box.top >= 6) {
      url = cellDataUrl;
    }
  }
  if (!url && (extractFormulaBarImageUrl() || cellDataUrl)) {
    url = extractFormulaBarImageUrl() || cellDataUrl;
  }

  return url ? { url, rect: cellRect } : null;
}

/**
 * Scan all in-cell and over-cell images for batch operations.
 */
export async function scanSheetOverAndInCellImages(imageUrls) {
  const seenUrls = new Set();
  const overCellImgs = Array.from(
    document.querySelectorAll(".waffle-borderless-embedded-object-container img, .grid4-inner-container img, .grid-scrollable-wrapper img")
  ).filter((img) => {
    const src = img.getAttribute("src") || img.getAttribute("href") || img.getAttribute("xlink:href") || "";
    if (!src || seenUrls.has(src)) return false;
    seenUrls.add(src);
    return true;
  });

  const overCellList = (
    await Promise.all(
      overCellImgs.map(async (img) => {
        const src = img.getAttribute("src") || img.getAttribute("href") || img.getAttribute("xlink:href") || "";
        const item = await fetchAndCacheImage(src);
        if (!item?.bitmap) return null;
        const raster = scaleToRaster(item.bitmap, THUMB_SIZE, THUMB_SIZE);
        if (!raster) return null;
        return {
          url: src,
          location: "Over cells",
          raster,
          target: {
            element: img,
            getRect: () => img.getBoundingClientRect(),
            activate: () => {
              const r = img.getBoundingClientRect();
              const evt = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, view: window };
              img.dispatchEvent(new MouseEvent("mousedown", evt));
              img.dispatchEvent(new MouseEvent("mouseup", evt));
              img.dispatchEvent(new MouseEvent("click", evt));
            }
          }
        };
      })
    )
  ).filter(Boolean);

  return overCellList;
}
