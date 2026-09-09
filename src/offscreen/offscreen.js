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

        const structuredLines = (res?.data?.lines || [])
          .filter((l) => {
            if (typeof l.confidence === "number" && l.confidence < 25) return false;
            return true;
          })
          .map((l) => ({
            text: l.text,
            bbox: l.bbox ? { x0: l.bbox.x0, y0: l.bbox.y0, x1: l.bbox.x1, y1: l.bbox.y1 } : null,
            words: (l.words || [])
              .filter((w) => {
                if (typeof w.confidence === "number" && w.confidence < 25) return false;
                const t = (w.text || "").trim();
                return t && !/^[\s._\-|\/\\]+$/.test(t);
              })
              .map((w) => ({
                text: w.text,
                confidence: w.confidence,
                bbox: w.bbox ? { x0: w.bbox.x0, y0: w.bbox.y0, x1: w.bbox.x1, y1: w.bbox.y1 } : null
              }))
          }))
          .filter((l) => l.words.length > 0);

        sendResponse({ success: true, text, ocrData: { lines: structuredLines } });
      } catch (err) {
        console.error("[Offscreen OCR Error]", err);
        sendResponse({ success: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }
});
