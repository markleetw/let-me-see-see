/**
 * Google Docs Image Interaction Handler
 * Listens for click events on Google Docs canvas tiles and embedded object selection boxes,
 * locates the clicked image, and positions the floating action toolbar over the image.
 */

import insertionQuery from "../vendor/insertion-query.js";
import { scanAllCanvasTiles } from "./canvas-scanner.js";
import { buildStitchedDocsImages } from "./tile-stitcher.js";
import { getNetworkResourceUrls, fetchCandidateThumbnails } from "../shared/network-resources.js";
import { findBestImageMatch } from "../shared/image-matcher.js";
import { createFloatingToolbar, attachToolbarToContainer, triggerOcrPrewarm } from "../ui/toolbar.js";

const DOCS_SELECTION_BORDER = ".docs-squarehandleselectionbox-border";
const DOCS_OVERLAY_CONTAINER_ID = "letMeSeeSeeDocumentImage";
const MAX_MATCH_SCORE = 0.34;
const RESCAN_COOLDOWN_MS = 8000;

let isInitialized = false;
let activeMatchedItem = null;
let cachedScannedImages = [];
let ongoingScanPromise = null;
let scanSequenceId = 0;
let lastScanTimestamp = 0;
let currentDocsImageUrl = "";
let rafId = 0;

/**
 * Get the currently active Docs image URL
 */
export function getActiveDocsImageUrl() {
  return currentDocsImageUrl || activeMatchedItem?.image?.url || "";
}

/**
 * Position toolbar container over bounding rect
 */
export function positionToolbarOverRect(rect, containerId) {
  createFloatingToolbar();
  const toolbar = document.getElementById("letMeSeeSeeToolbar");
  if (!toolbar) return;

  const existingOverlay = document.getElementById(containerId);
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement("div");
  overlay.id = containerId;
  Object.assign(overlay.style, {
    position: "fixed",
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    pointerEvents: "none",
    zIndex: "2147481000"
  });

  Object.assign(toolbar.style, {
    display: "flex",
    position: "absolute",
    pointerEvents: "auto",
    zIndex: "1"
  });

  overlay.appendChild(toolbar);
  document.body.appendChild(overlay);
}

/**
 * Hide / detach toolbar overlay
 */
export function hideDocsToolbarOverlay() {
  currentDocsImageUrl = "";
  const el = document.getElementById(DOCS_OVERLAY_CONTAINER_ID);
  if (el) el.remove();
}

/**
 * Update toolbar position on scroll / resize
 */
export function updateDocsToolbarPosition() {
  const item = activeMatchedItem;
  const target = item?.image?.target;
  if (!item || !target?.element?.isConnected) return;

  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = 0;
    const current = activeMatchedItem;
    const currentTarget = current?.image?.target;
    if (!current || !currentTarget?.element?.isConnected) return;
    const rect = current.getRect();
    if (rect.width > 1 && rect.height > 1) {
      positionToolbarOverRect(rect, DOCS_OVERLAY_CONTAINER_ID);
    }
  });
}

/**
 * Scan document canvas tiles and correlate with network image resources
 */
export async function scanDocsImages() {
  lastScanTimestamp = Date.now();
  if (ongoingScanPromise) return ongoingScanPromise;

  ongoingScanPromise = (async () => {
    try {
      const candidateUrls = getNetworkResourceUrls("document");
      const thumbnails = await fetchCandidateThumbnails(candidateUrls);
      const rawTiles = scanAllCanvasTiles();
      const stitchedGroups = buildStitchedDocsImages(rawTiles);

      const matchedImages = [];
      for (const group of stitchedGroups) {
        const best = findBestImageMatch(group.raster, thumbnails);
        if (best && best.score <= MAX_MATCH_SCORE) {
          const thumb = thumbnails.find((t) => t.url === best.url);
          matchedImages.push({
            url: best.url,
            location: "Document",
            target: group.target,
            width: thumb?.width,
            height: thumb?.height,
            format: thumb?.format
          });
        }
      }

      cachedScannedImages = matchedImages;
      return matchedImages;
    } finally {
      ongoingScanPromise = null;
    }
  })();

  return ongoingScanPromise;
}

/**
 * Find image matching client click coordinates
 */
function findImageAtPoint(images, clientX, clientY) {
  for (const img of images) {
    const target = img.target;
    if (!target) continue;
    const rects = target.getRects ? target.getRects() : [target.getRect()];
    const hitIdx = rects.findIndex(
      (r) => clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom
    );
    if (hitIdx >= 0) {
      return {
        image: img,
        getRect: () => (target.getRects ? target.getRects()[hitIdx] : target.getRect())
      };
    }
  }
  return null;
}

/**
 * Click event listener for Google Docs pages
 */
export async function handleDocsClick(event) {
  const target = event.target;
  if (!(target instanceof Element) || target.closest("#letMeSeeSeeToolbar, .viewer-container")) return;
  if (!target.closest(DOCS_SELECTION_BORDER) && !target.closest("canvas") && !target.closest(".kix-page-content-wrapper")) return;

  const currentSeq = ++scanSequenceId;
  let match = findImageAtPoint(cachedScannedImages, event.clientX, event.clientY);

  if (!match && (!cachedScannedImages.length || (Date.now() - lastScanTimestamp > RESCAN_COOLDOWN_MS && (target.closest(DOCS_SELECTION_BORDER) || target.closest("canvas"))))) {
    try {
      const scanned = await scanDocsImages();
      match = findImageAtPoint(scanned, event.clientX, event.clientY);
    } catch {
      match = null;
    }
  }

  if (currentSeq !== scanSequenceId) return;

  if (!match) {
    activeMatchedItem = null;
    hideDocsToolbarOverlay();
    return;
  }

  activeMatchedItem = match;
  if (match.image?.raster) {
    window.__letMeSeeSeeActiveRaster = match.image.raster;
  }
  currentDocsImageUrl = match.image.url;
  updateDocsToolbarPosition();
}

/**
 * Initialize Google Docs module
 */
export function initDocsHandler() {
  triggerOcrPrewarm();
  insertionQuery(DOCS_SELECTION_BORDER).every((borderEl) => {
    activeMatchedItem = null;
    currentDocsImageUrl = "";
    createFloatingToolbar();
    attachToolbarToContainer(borderEl);
    return true;
  });

  if (!isInitialized) {
    document.addEventListener("click", handleDocsClick, true);
    window.addEventListener("resize", updateDocsToolbarPosition);
    document.addEventListener("scroll", updateDocsToolbarPosition, true);
    isInitialized = true;
    scanDocsImages().catch(() => {});
  }
}
