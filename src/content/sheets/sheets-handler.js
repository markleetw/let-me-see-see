/**
 * Google Sheets Image Interaction Handler
 * Handles floating over-cell images and in-cell grid images.
 */

import insertionQuery from "../vendor/insertion-query.js";
import { createFloatingToolbar, attachToolbarToContainer, triggerOcrPrewarm } from "../ui/toolbar.js";
import { findImageAtCellClick } from "./cell-matcher.js";
import { positionToolbarOverRect } from "../docs/docs-handler.js";

const OVER_CELL_IMG_SELECTOR = ".waffle-borderless-embedded-object-container img:not([flow-btn])";
const SHEETS_CELL_CONTAINER_ID = "letMeSeeSeeSheetsCell";

let currentSheetsImageUrl = "";

/**
 * Get active Sheets image URL
 */
export function getActiveSheetsImageUrl() {
  return currentSheetsImageUrl;
}

/**
 * Set active Sheets image URL
 */
export function setActiveSheetsImageUrl(url) {
  currentSheetsImageUrl = url;
}

/**
 * Bind click listener to floating over-cell image element
 */
export function bindFloatingImageClickListener(imgElement) {
  if (!imgElement) return;

  const clickHandler = (evt) => {
    if (evt) {
      setTimeout(() => {
        const focusedContainer = document.querySelectorAll(
          ".focused-overlay-container .waffle-borderless-embedded-object-overlay-focused .waffle-borderless-embedded-object-container"
        )[0];
        if (focusedContainer) {
          triggerOcrPrewarm();
          createFloatingToolbar();
          attachToolbarToContainer(focusedContainer);
        }
      }, 100);
    }
  };

  imgElement.removeEventListener("click", clickHandler);
  imgElement.addEventListener("click", clickHandler);
}

/**
 * Handle grid cell click for in-cell images
 */
export async function handleGridCellClick(event) {
  const target = event.target;
  if (!(target instanceof Element) || target.closest("#letMeSeeSeeToolbar, .viewer-container")) return;
  if (!target.closest(".grid-container, #waffle-grid-container, canvas.grid-canvas")) return;

  try {
    const result = await findImageAtCellClick(event.clientX, event.clientY);
    if (result && result.url && result.rect) {
      currentSheetsImageUrl = result.url;
      positionToolbarOverRect(result.rect, SHEETS_CELL_CONTAINER_ID);
    }
  } catch {}
}

/**
 * Initialize Google Sheets module
 */
export function initSheetsHandler() {
  triggerOcrPrewarm();

  // Watch for floating images over cells
  insertionQuery(OVER_CELL_IMG_SELECTOR).every((img) => {
    createFloatingToolbar();
    bindFloatingImageClickListener(img);
    return true;
  });
}
