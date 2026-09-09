/**
 * Google Docs Canvas Tile Pixel Scanner
 * Analyzes non-transparent alpha pixel boundaries across virtualized canvas tiles.
 */

import { canvasToRaster, cropRaster, getPixelIndex } from "../shared/image-matcher.js";

export function scanTileRowHorizontalBounds(raster, yStart, yEnd) {
  let minX = raster.width;
  let maxX = -1;

  for (let y = yStart; y < yEnd; y++) {
    for (let x = 0; x < raster.width; x++) {
      const alpha = raster.pixels[getPixelIndex(raster, x, y) + 3];
      if (alpha > 80) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }
  }

  return maxX >= minX ? { left: minX, top: yStart, right: maxX + 1, bottom: yEnd } : null;
}

export function extractSubRaster(raster, bounds) {
  const width = Math.max(1, bounds.right - bounds.left);
  const height = Math.max(1, bounds.bottom - bounds.top);
  const pixels = new Uint8ClampedArray(width * height * 4);

  for (let y = 0; y < height; y++) {
    const srcOffset = getPixelIndex(raster, bounds.left, bounds.top + y);
    const destOffset = y * width * 4;
    pixels.set(raster.pixels.subarray(srcOffset, srcOffset + width * 4), destOffset);
  }

  return { width, height, pixels };
}

export function scanTileBoxes(raster) {
  const minWidthThreshold = Math.max(24, Math.floor(raster.width * 0.02));
  const minHeightThreshold = 20;
  const boxes = [];
  let regionStart = -1;

  for (let y = 0; y <= raster.height; y++) {
    let rowNonTransparentCount = 0;
    if (y < raster.height) {
      for (let x = 0; x < raster.width; x += 2) {
        if (raster.pixels[getPixelIndex(raster, x, y) + 3] > 80) {
          rowNonTransparentCount++;
        }
      }
    }

    if (rowNonTransparentCount >= minWidthThreshold) {
      if (regionStart < 0) regionStart = y;
      continue;
    }

    if (regionStart >= 0 && y - regionStart >= minHeightThreshold) {
      const bounds = scanTileRowHorizontalBounds(raster, regionStart, y);
      if (bounds && bounds.right - bounds.left >= 20) {
        boxes.push(bounds);
      }
    }
    regionStart = -1;
  }

  return boxes;
}

export function scanAllCanvasTiles() {
  const canvases = Array.from(document.querySelectorAll("canvas.kix-canvas-tile-content")).sort(
    (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
  );

  return canvases.flatMap((canvas, canvasIndex) => {
    const raster = canvasToRaster(canvas);
    if (!raster) return [];
    return scanTileBoxes(raster).map((bounds) => ({
      canvas,
      canvasIndex,
      bounds,
      raster: extractSubRaster(raster, bounds)
    }));
  });
}
