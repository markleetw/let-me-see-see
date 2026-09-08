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
      try {
        await w.setParameters({
          tessjs_create_hocr: "0",
          tessjs_create_tsv: "0",
          tessjs_create_box: "0",
          tessjs_create_unlv: "0",
          tessjs_create_osd: "0"
        });
      } catch {}
      ocrWorker = w;
      return w;
    } catch (err) {
      initPromise = null;
      throw err;
    }
  })();

  return initPromise;
}

async function copyToOffscreenClipboard(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function extractLinesFromResult(result) {
  const keptLines = [];
  const lines = (result && result.data && result.data.lines) || [];
  for (const line of lines) {
    const rawLineText = (line.text || "").trim();
    const hasValidTokens = /[a-zA-Z]{2,}|[\u4e00-\u9fa5]|\d+[.,%]?\d*/.test(rawLineText);
    const minLineConf = hasValidTokens ? 35 : 48;
    if (typeof line.confidence === "number" && line.confidence < minLineConf) {
      continue;
    }
    if (Array.isArray(line.words) && line.words.length > 0) {
      const validWords = line.words.filter((w) => {
        if (typeof w.confidence !== "number") return true;
        const txt = (w.text || "").trim();
        return txt.length <= 1 ? w.confidence >= 50 : w.confidence >= (hasValidTokens ? 35 : 45);
      });
      if (validWords.length === 0) continue;

      let lineStr = "";
      const isCjk = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/;
      for (const w of validWords) {
        const wordText = (w.text || "").trim();
        if (!wordText) continue;
        if (!lineStr) {
          lineStr = wordText;
        } else {
          const lastChar = lineStr.slice(-1);
          const nextChar = wordText.charAt(0);
          if (isCjk.test(lastChar) && isCjk.test(nextChar)) {
            lineStr += wordText;
          } else {
            lineStr += " " + wordText;
          }
        }
      }
      if (lineStr.trim()) keptLines.push(lineStr.trim());
    } else if (rawLineText) {
      keptLines.push(rawLineText);
    }
  }
  return keptLines;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.target !== "offscreen") {
    return;
  }

  if (message.type === "prewarm-ocr") {
    getWorker().catch((err) => console.warn("[Offscreen OCR Prewarm Error]", err));
    sendResponse({ success: true, prewarming: true });
    return true;
  }

  if (message.type === "copy-to-clipboard") {
    copyToOffscreenClipboard(message.text).then((copied) => {
      sendResponse({ success: true, copied });
    });
    return true;
  }

  if (message.type !== "do-ocr") {
    return;
  }

  (async () => {
    try {
      const worker = await getWorker();
      const res = await worker.recognize(message.image);
      const lines = extractLinesFromResult(res);
      let text = lines.join("\n");
      if (!text && res && res.data && res.data.text) {
        text = res.data.text;
      }
      sendResponse({ success: true, text });
    } catch (err) {
      console.error("[Offscreen OCR Error]", err);
      sendResponse({ success: false, error: (err && err.message) || String(err) });
    }
  })();

  return true;
});
