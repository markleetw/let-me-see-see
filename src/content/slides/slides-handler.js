/**
 * Google Slides Image Interaction Handler
 * Intercepts clicks on SVG image elements within the Google Slides workspace and filmstrip,
 * positions the floating toolbar, and extracts high-resolution slide image URLs.
 */

import { createFloatingToolbar, triggerOcrPrewarm } from "../ui/toolbar.js";
import { positionToolbarOverRect } from "../docs/docs-handler.js";

const SLIDES_OVERLAY_CONTAINER_ID = "letMeSeeSeeSlideImage";

let isInitialized = false;
let activeSlideImageElement = null;
let rafId = 0;

/**
 * Find SVG image element from elements under click point
 */
function findSlideImageAtElements(elements) {
  return elements.find((el) => el.tagName.toLowerCase() === "image" && !!el.closest("#workspace-container")) || null;
}

/**
 * Hide slide toolbar overlay
 */
export function hideSlidesToolbarOverlay() {
  window.SlideImageUrl = "";
  const el = document.getElementById(SLIDES_OVERLAY_CONTAINER_ID);
  if (el) el.remove();
}

/**
 * Update toolbar position over slide image on resize/scroll
 */
export function updateSlidesToolbarPosition() {
  if (!activeSlideImageElement || !activeSlideImageElement.isConnected) return;

  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = 0;
    if (!activeSlideImageElement || !activeSlideImageElement.isConnected) return;
    const rect = activeSlideImageElement.getBoundingClientRect();
    if (rect.width > 1 && rect.height > 1) {
      positionToolbarOverRect(rect, SLIDES_OVERLAY_CONTAINER_ID);
    }
  });
}

/**
 * Handle clicks in Google Slides
 */
export function handleSlidesClick(event) {
  const target = event.target;
  if (!(target instanceof Element) || target.closest("#letMeSeeSeeToolbar, .viewer-container")) return;

  const imgEl = findSlideImageAtElements(document.elementsFromPoint(event.clientX, event.clientY));
  if (!imgEl) {
    activeSlideImageElement = null;
    hideSlidesToolbarOverlay();
    return;
  }

  activeSlideImageElement = imgEl;
  window.SlideImageUrl = imgEl.getAttribute("href") || imgEl.getAttribute("xlink:href") || "";
  updateSlidesToolbarPosition();

  // Retry after 100ms in case DOM selection shifted
  window.setTimeout(() => {
    const fresh = findSlideImageAtElements(document.elementsFromPoint(event.clientX, event.clientY));
    if (fresh) activeSlideImageElement = fresh;
    updateSlidesToolbarPosition();
  }, 100);
}

/**
 * Initialize Google Slides module
 */
export function initSlidesHandler() {
  triggerOcrPrewarm();
  createFloatingToolbar();
  hideSlidesToolbarOverlay();

  if (!isInitialized) {
    document.addEventListener("click", handleSlidesClick, true);
    window.addEventListener("resize", updateSlidesToolbarPosition);
    document.addEventListener("scroll", updateSlidesToolbarPosition, true);
    isInitialized = true;
  }
}
