/**
 * Let Me See See - Content Script Entrypoint
 * Coordinates document routing, toolbar actions, background messaging, and DOM handlers.
 */

import browser from "./vendor/browser-polyfill.js";
import JSZip from "./vendor/jszip.js";
import Viewer from "./vendor/viewer.js";
import { createFloatingToolbar, triggerOcrPrewarm } from "./ui/toolbar.js";
import { openViewerLightbox } from "./ui/viewer-lightbox.js";
import { uiToast } from "./ui/toast.js";
import { ocrImageToText } from "./ocr/ocr-service.js";
import { cleanOcrText } from "./ocr/text-cleaner.js";
import { processOcrTableOutput } from "./ocr/table-detector.js";
import { copyTextToClipboard, copyImageToClipboard, copyImageBlobToClipboard } from "./shared/clipboard.js";
import { sanitizeFilename, downloadSingleImage, packImagesToZip } from "./shared/download-manager.js";
import { getNetworkResourceUrls } from "./shared/network-resources.js";
import { extractFormulaBarImageUrl } from "./sheets/formula-parser.js";
import { scanSheetOverAndInCellImages } from "./sheets/cell-matcher.js";
import { initDocsHandler, getActiveDocsImageUrl } from "./docs/docs-handler.js";
import { initSheetsHandler, getActiveSheetsImageUrl } from "./sheets/sheets-handler.js";
import { initSlidesHandler } from "./slides/slides-handler.js";
import { imageCache } from "./shared/lru-cache.js";

// Make Viewer globally accessible to lightbox wrapper
if (typeof window !== "undefined") {
  window.Viewer = Viewer;
}

/**
 * Identify Google Workspace document type based on URL path
 */
export function getDocumentType() {
  return location.pathname.split("/")[1] || "";
}

/**
 * Get active image URL for current application
 */
export function getActiveImageUrl() {
  const docType = getDocumentType();
  let url = "";

  if (docType === "document") {
    const kixImg = document.querySelector("svg.kix-embeddedobject-image image");
    url = kixImg?.getAttribute("xlink:href") || getActiveDocsImageUrl();
  } else if (docType === "spreadsheets") {
    const focusedContainer = document.querySelectorAll(
      ".focused-overlay-container .waffle-borderless-embedded-object-overlay-focused .waffle-borderless-embedded-object-container"
    )[0];
    const img = focusedContainer?.getElementsByTagName("img")?.[0];
    url = img?.src || getActiveSheetsImageUrl() || extractFormulaBarImageUrl() || "";
  } else if (docType === "presentation") {
    url = window.SlideImageUrl || "";
  }

  if (!url) {
    url =
      getActiveDocsImageUrl() ||
      getActiveSheetsImageUrl() ||
      (typeof window !== "undefined" && (window.SlideImageUrl || window.__letMeSeeSeeActiveDataUrl)) ||
      "";
  }

  return url;
}

/**
 * Handle floating toolbar button clicks
 */
export async function handleToolbarAction(action) {
  const url = getActiveImageUrl();

  switch (action) {
    case "zoom":
      return openViewerLightbox([url], 0, Viewer);
    case "copy":
      return copyImageToClipboard(url);
    case "ocr":
      return ocrImageToText(url);
    case "download":
      return downloadSingleImage(url);
    default:
      return false;
  }
}

/**
 * Batch download all images in document as a ZIP
 */
export async function batchDownloadAllImages(urlsOrProgress, onProgress) {
  let urls = [];
  let cb = onProgress;
  if (Array.isArray(urlsOrProgress)) {
    urls = urlsOrProgress;
  } else {
    urls = getNetworkResourceUrls(getDocumentType());
    cb = urlsOrProgress;
  }
  return packImagesToZip(urls, cb, JSZip);
}

/**
 * Bootstrap and event listener setup
 */
export function bootstrap() {
  const docType = getDocumentType();

  // Make toolbar action handler available globally
  if (typeof window !== "undefined") {
    window.__letMeSeeSeeToolbarAction = handleToolbarAction;
  }

  // Message listener for popup / background commands
  const runtime = (typeof chrome !== "undefined" && chrome.runtime) || browser?.runtime;
  if (runtime?.onMessage) {
    runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg?.type === "get-document-type") {
        sendResponse && sendResponse(docType);
        return Promise.resolve(docType);
      }
      if (msg?.type === "batch-download-images" || msg?.type === "export-all-images") {
        const promise = batchDownloadAllImages();
        if (sendResponse) {
          promise
            .then(sendResponse)
            .catch((err) =>
              sendResponse({ downloaded: 0, failed: 1, error: err?.message || String(err) })
            );
          return true;
        }
        return promise;
      }
    });
  }

  // Route to specific application handler
  switch (docType) {
    case "document":
      initDocsHandler();
      break;
    case "presentation":
      initSlidesHandler();
      break;
    case "spreadsheets":
      initSheetsHandler();
      break;
  }

  // Inject content stylesheet
  try {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", runtime.getURL("dist/contentScripts/style.css"));
    document.head.appendChild(link);
  } catch {}

  // Expose global debug / testing API
  try {
    window.__letMeSeeSeeCache = imageCache;
    window.__letMeSeeSee = {
      Te: () => createFloatingToolbar(handleToolbarAction),
      Qe: sanitizeFilename,
      Fs: initDocsHandler,
      Us: initSlidesHandler,
      Hs: initSheetsHandler,
      uiToast,
      batchDownloadAllImages,
      Cs: batchDownloadAllImages,
      extractFormulaBarImageUrl,
      cleanOcrText,
      processOcrTableOutput,
      Ir: getNetworkResourceUrls,
      Wr: scanSheetOverAndInCellImages,
      sn: handleToolbarAction,
      ocrImageToText,
      copyTextToClipboard,
      copyImageToClipboard,
      vi: copyImageToClipboard,
      triggerOcrPrewarm,
      getCache: () => imageCache
    };
  } catch {}
}

// Auto-run bootstrap if in browser window
if (typeof window !== "undefined") {
  bootstrap();
}
