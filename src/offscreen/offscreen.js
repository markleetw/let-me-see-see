/**
 * Let Me See See - Offscreen Document Main Controller
 */

import { getTesseractWorker } from "./tesseract-client.js";
import { extractLinesFromResult } from "./line-extractor.js";
import { copyToOffscreenClipboard } from "./clipboard-fallback.js";

// Export for tests and global execution
if (typeof globalThis !== "undefined") {
  globalThis.extractLinesFromResult = extractLinesFromResult;
  globalThis.copyToOffscreenClipboard = copyToOffscreenClipboard;
  globalThis.getTesseractWorker = getTesseractWorker;
}
if (typeof window !== "undefined") {
  window.__letMeSeeSeeOffscreen = {
    extractLinesFromResult,
    copyToOffscreenClipboard,
    getTesseractWorker
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.target !== "offscreen") {
    return;
  }

  // Prewarm Tesseract Worker
  if (message.type === "prewarm-ocr") {
    getTesseractWorker().catch((err) => console.warn("[Offscreen OCR Prewarm Error]", err));
    sendResponse({ success: true, prewarming: true });
    return true;
  }

  // Fallback Copy to Clipboard
  if (message.type === "copy-to-clipboard") {
    copyToOffscreenClipboard(message.text).then((copied) => {
      sendResponse({ success: true, copied });
    });
    return true;
  }

  // Execute OCR Recognition
  if (message.type === "do-ocr") {
    (async () => {
      try {
        const worker = await getTesseractWorker();
        const res = await worker.recognize(message.image);
        const lines = extractLinesFromResult(res);
        let text = lines.join("\n");
        if (!text && res?.data?.text) {
          text = res.data.text;
        }
        sendResponse({ success: true, text });
      } catch (err) {
        console.error("[Offscreen OCR Error]", err);
        sendResponse({ success: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }
});
