/**
 * Let Me See See - Offscreen Document for Offline Tesseract OCR
 */
let ocrWorker = null;
let initPromise = null;

async function getWorker() {
  if (ocrWorker) return ocrWorker;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const workerPath = chrome.runtime.getURL("dist/assets/tesseract/worker.min.js");
      const corePath = chrome.runtime.getURL("dist/assets/tesseract/tesseract-core-lstm.js");
      const langPath = chrome.runtime.getURL("dist/assets/tesseract/lang");

      if (typeof Tesseract === "undefined") {
        throw new Error("Tesseract library failed to load in offscreen document");
      }

      const w = await Tesseract.createWorker("chi_tra+eng", 1, {
        workerPath,
        corePath,
        langPath,
        workerBlobURL: false,
        gzip: true,
        errorHandler: (err) => console.error("[Offscreen OCR Worker Error]", err)
      });
      ocrWorker = w;
      return w;
    } catch (err) {
      initPromise = null;
      throw err;
    }
  })();

  return initPromise;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.target !== "offscreen" || message.type !== "do-ocr") {
    return;
  }

  (async () => {
    try {
      const worker = await getWorker();
      const result = await worker.recognize(message.image);
      const text = (result && result.data && result.data.text) || "";
      sendResponse({ success: true, text });
    } catch (err) {
      console.error("[Offscreen OCR Error]", err);
      sendResponse({ success: false, error: (err && err.message) || String(err) });
    }
  })();

  return true;
});
