/**
 * Let Me See See - Background Service Worker Entry Point
 */

import { ensureOffscreenDocument } from "./offscreen-manager.js";
import { getWidgetLocation, setWidgetLocation } from "./storage.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message) return;

  // 1. Position preferences
  if (message.type === "update-location" && message.widgetLocation) {
    setWidgetLocation(message.widgetLocation).then(() => sendResponse({ success: true }));
    return true;
  }

  if (message.type === "get-location") {
    getWidgetLocation().then((loc) => sendResponse(loc));
    return true;
  }

  // 2. OCR Worker Prewarm
  if (message.type === "prewarm-ocr") {
    (async () => {
      try {
        await ensureOffscreenDocument();
        chrome.runtime.sendMessage({ target: "offscreen", type: "prewarm-ocr" }).catch(() => {});
        sendResponse({ success: true });
      } catch (err) {
        sendResponse({ success: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }

  // 3. Offscreen Clipboard Fallback Copy
  if (message.type === "copy-to-clipboard") {
    (async () => {
      try {
        await ensureOffscreenDocument();
        const res = await chrome.runtime.sendMessage({
          target: "offscreen",
          type: "copy-to-clipboard",
          text: message.text
        });
        sendResponse(res || { success: false });
      } catch (err) {
        sendResponse({ success: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }

  // 4. OCR Execution Dispatch
  if (message.type === "do-ocr") {
    (async () => {
      try {
        await ensureOffscreenDocument();
        const res = await chrome.runtime.sendMessage({
          target: "offscreen",
          type: "do-ocr",
          image: message.image
        });
        sendResponse(res || { success: false, error: "No response from offscreen document" });
      } catch (err) {
        console.error("[Background OCR Error]", err);
        sendResponse({ success: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }
});
