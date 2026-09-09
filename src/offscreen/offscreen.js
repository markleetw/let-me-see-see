/**
 * Let Me See See - Offscreen Document Main Controller
 */

import { getTesseractWorker } from "./tesseract-client.js";
import { extractLinesFromResult } from "./line-extractor.js";
import { copyToOffscreenClipboard } from "./clipboard-fallback.js";
import { enhanceImageForOcr, getWideStripSegments } from "./image-enhancer.js";

// Export for tests and global execution
if (typeof globalThis !== "undefined") {
  globalThis.extractLinesFromResult = extractLinesFromResult;
  globalThis.copyToOffscreenClipboard = copyToOffscreenClipboard;
  globalThis.getTesseractWorker = getTesseractWorker;
  globalThis.enhanceImageForOcr = enhanceImageForOcr;
  globalThis.getWideStripSegments = getWideStripSegments;
}
if (typeof window !== "undefined") {
  window.__letMeSeeSeeOffscreen = {
    extractLinesFromResult,
    copyToOffscreenClipboard,
    getTesseractWorker,
    enhanceImageForOcr,
    getWideStripSegments
  };
}

if (typeof chrome !== "undefined" && chrome.runtime?.onMessage) {
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
        const segments = await getWideStripSegments(message.image, 20);

        let res = null;
        let lines = [];
        let text = "";

        if (segments && segments.length > 1) {
          const segLines = [];
          for (const segUrl of segments) {
            const segRes = await worker.recognize(segUrl);
            const l = extractLinesFromResult(segRes);
            const t = l.join(" ") || (segRes?.data?.text || "").trim();
            if (t) segLines.push(t);
          }
          text = segLines.join(" ");
          lines = [text];
        } else {
          const enhancedImg = await enhanceImageForOcr(message.image);
          res = await worker.recognize(enhancedImg);
          lines = extractLinesFromResult(res);
          text = lines.join("\n");
          if (!text && res?.data?.text) {
            text = res.data.text.trim();
          }

        // Snippet / Single-line fallback: if automatic layout (PSM 3) found no text,
        // retry assuming single uniform text block (PSM 6)
        if (!text && worker && typeof worker.setParameters === "function") {
          try {
            await worker.setParameters({ tessedit_pageseg_mode: "6" });
            const retryRes = await worker.recognize(enhancedImg);
            const retryLines = extractLinesFromResult(retryRes);
            const retryText = retryLines.join("\n") || (retryRes?.data?.text || "").trim();
            if (retryText) {
              res = retryRes;
              lines = retryLines;
              text = retryText;
            }
          } catch (retryErr) {
            console.warn("[Offscreen OCR] PSM 6 retry error:", retryErr);
          } finally {
            try {
              await worker.setParameters({ tessedit_pageseg_mode: "3" });
            } catch {}
          }
        }
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
}
