(() => {
  // src/offscreen/tesseract-client.js
  var ocrWorker = null;
  var initPromise = null;
  async function getTesseractWorker() {
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
        } catch {
        }
        ocrWorker = w;
        return w;
      } catch (err) {
        initPromise = null;
        throw err;
      }
    })();
    return initPromise;
  }

  // src/offscreen/line-extractor.js
  function extractLinesFromResult(result) {
    const keptLines = [];
    const lines = result && result.data && result.data.lines || [];
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
          const wordHasCjk = /[\u4e00-\u9fa5]/.test(txt);
          if (wordHasCjk) return w.confidence >= 35;
          if (txt.length <= 1) return w.confidence >= 50;
          return w.confidence >= (hasValidTokens ? 35 : 45);
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

  // src/offscreen/clipboard-fallback.js
  async function copyToOffscreenClipboard(text) {
    if (!text) return false;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
    }
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

  // src/offscreen/offscreen.js
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
    if (message.type === "prewarm-ocr") {
      getTesseractWorker().catch((err) => console.warn("[Offscreen OCR Prewarm Error]", err));
      sendResponse({ success: true, prewarming: true });
      return true;
    }
    if (message.type === "copy-to-clipboard") {
      copyToOffscreenClipboard(message.text).then((copied) => {
        sendResponse({ success: true, copied });
      });
      return true;
    }
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
          const structuredLines = (res?.data?.lines || []).filter((l) => {
            if (typeof l.confidence === "number" && l.confidence < 25) return false;
            return true;
          }).map((l) => ({
            text: l.text,
            bbox: l.bbox ? { x0: l.bbox.x0, y0: l.bbox.y0, x1: l.bbox.x1, y1: l.bbox.y1 } : null,
            words: (l.words || []).filter((w) => {
              if (typeof w.confidence === "number" && w.confidence < 25) return false;
              const t = (w.text || "").trim();
              return t && !/^[\s._\-|\/\\]+$/.test(t);
            }).map((w) => ({
              text: w.text,
              confidence: w.confidence,
              bbox: w.bbox ? { x0: w.bbox.x0, y0: w.bbox.y0, x1: w.bbox.x1, y1: w.bbox.y1 } : null
            }))
          })).filter((l) => l.words.length > 0);
          sendResponse({ success: true, text, ocrData: { lines: structuredLines } });
        } catch (err) {
          console.error("[Offscreen OCR Error]", err);
          sendResponse({ success: false, error: err?.message || String(err) });
        }
      })();
      return true;
    }
  });
})();
var extractLinesFromResult = typeof window !== 'undefined' && window.__letMeSeeSeeOffscreen ? window.__letMeSeeSeeOffscreen.extractLinesFromResult : (typeof globalThis !== 'undefined' ? globalThis.extractLinesFromResult : undefined);
