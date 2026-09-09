// src/background/offscreen-manager.js
var creatingOffscreenPromise = null;
async function ensureOffscreenDocument() {
  if (typeof chrome === "undefined" || !chrome.offscreen) return;
  const offscreenUrl = "dist/offscreen/offscreen.html";
  if (typeof chrome.offscreen.hasDocument === "function") {
    if (await chrome.offscreen.hasDocument()) return;
  } else if (typeof chrome.runtime.getContexts === "function") {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ["OFFSCREEN_DOCUMENT"]
    }).catch(() => []);
    if (contexts && contexts.length > 0) return;
  }
  if (creatingOffscreenPromise) {
    await creatingOffscreenPromise;
    return;
  }
  creatingOffscreenPromise = chrome.offscreen.createDocument({
    url: offscreenUrl,
    reasons: ["DOM_PARSER", "WORKERS", "CLIPBOARD"],
    justification: "Local Tesseract OCR processing and clipboard handling with WebAssembly"
  });
  try {
    await creatingOffscreenPromise;
  } catch (err) {
    if (!String(err).includes("Only a single offscreen document may be created")) {
      throw err;
    }
  } finally {
    creatingOffscreenPromise = null;
  }
}

// src/background/storage.js
var DEFAULT_LOCATION = "top-right";
async function getWidgetLocation() {
  if (typeof chrome === "undefined" || !chrome.storage?.local) return DEFAULT_LOCATION;
  const { widgetLocation } = await chrome.storage.local.get("widgetLocation");
  return widgetLocation || DEFAULT_LOCATION;
}
async function setWidgetLocation(location) {
  if (typeof chrome === "undefined" || !chrome.storage?.local) return;
  await chrome.storage.local.set({ widgetLocation: location });
}

// src/background/index.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message) return;
  if (message.type === "update-location" && message.widgetLocation) {
    setWidgetLocation(message.widgetLocation).then(() => sendResponse({ success: true }));
    return true;
  }
  if (message.type === "get-location") {
    getWidgetLocation().then((loc) => sendResponse(loc));
    return true;
  }
  if (message.type === "prewarm-ocr") {
    (async () => {
      try {
        await ensureOffscreenDocument();
        chrome.runtime.sendMessage({ target: "offscreen", type: "prewarm-ocr" }).catch(() => {
        });
        sendResponse({ success: true });
      } catch (err) {
        sendResponse({ success: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }
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
