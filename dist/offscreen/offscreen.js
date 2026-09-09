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

  // src/offscreen/image-enhancer.js
  async function enhanceImageForOcr(imageSource) {
    if (!imageSource || typeof document === "undefined" || typeof Image === "undefined") {
      return imageSource;
    }
    try {
      const img = await loadImageElement(imageSource);
      if (!img || !img.width || !img.height) return imageSource;
      const origW = img.naturalWidth || img.width;
      const origH = img.naturalHeight || img.height;
      let scale = 1;
      if (origH < 140 || origH < 220 && origW < 350) {
        scale = 2;
      }
      if (origW * scale > 2400 || origH * scale > 2400 || origW * scale * origH * scale > 3e6) {
        const maxDim = Math.max(origW, origH);
        if (maxDim > 0 && maxDim * scale > 2400) {
          scale = Math.max(1, 2400 / maxDim);
        }
      }
      const needPadding = origH < 140 || origH < 220 && origW < 350;
      const pad = needPadding ? 36 : 0;
      const targetW = Math.round(origW * scale);
      const targetH = Math.round(origH * scale);
      const canvasW = targetW + pad * 2;
      const canvasH = targetH + pad * 2;
      const canvas = document.createElement("canvas");
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return imageSource;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, pad, pad, targetW, targetH);
      const imgData = ctx.getImageData(0, 0, canvasW, canvasH);
      const data = imgData.data;
      const totalPixels = targetW * targetH;
      let borderLumaSum = 0;
      let borderCount = 0;
      const borderThickness = Math.max(1, Math.min(8, Math.floor(Math.min(targetW, targetH) * 0.05)));
      for (let y = pad; y < pad + targetH; y++) {
        for (let x = pad; x < pad + targetW; x++) {
          if (y < pad + borderThickness || y >= pad + targetH - borderThickness || x < pad + borderThickness || x >= pad + targetW - borderThickness) {
            const idx = (y * canvasW + x) * 4;
            const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            borderLumaSum += luma;
            borderCount++;
          }
        }
      }
      const avgBorderLuma = borderCount > 0 ? borderLumaSum / borderCount : 128;
      let overallLumaSum = 0;
      let brightPixelCount = 0;
      let sampledCount = 0;
      const stepY = Math.max(1, Math.floor(targetH / 50));
      const stepX = Math.max(1, Math.floor(targetW / 100));
      for (let y = pad; y < pad + targetH; y += stepY) {
        for (let x = pad; x < pad + targetW; x += stepX) {
          const idx = (y * canvasW + x) * 4;
          const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          overallLumaSum += luma;
          if (luma > 180) brightPixelCount++;
          sampledCount++;
        }
      }
      const avgOverallLuma = sampledCount > 0 ? overallLumaSum / sampledCount : 128;
      const brightRatio = sampledCount > 0 ? brightPixelCount / sampledCount : 0;
      const isDarkBackground = avgBorderLuma < 130 || avgOverallLuma < 115 && brightRatio > 0.05;
      if (isDarkBackground) {
        for (let y = pad; y < pad + targetH; y++) {
          for (let x = pad; x < pad + targetW; x++) {
            const idx = (y * canvasW + x) * 4;
            data[idx] = 255 - data[idx];
            data[idx + 1] = 255 - data[idx + 1];
            data[idx + 2] = 255 - data[idx + 2];
          }
        }
      }
      if (isDarkBackground) {
        const contrastFactor = 1.15;
        for (let y = pad; y < pad + targetH; y++) {
          for (let x = pad; x < pad + targetW; x++) {
            const idx = (y * canvasW + x) * 4;
            data[idx] = Math.min(255, Math.max(0, Math.round((data[idx] - 128) * contrastFactor + 128)));
            data[idx + 1] = Math.min(255, Math.max(0, Math.round((data[idx + 1] - 128) * contrastFactor + 128)));
            data[idx + 2] = Math.min(255, Math.max(0, Math.round((data[idx + 2] - 128) * contrastFactor + 128)));
          }
        }
      }
      if (pad > 0) {
        for (let y = 0; y < canvasH; y++) {
          for (let x = 0; x < canvasW; x++) {
            if (x < pad || x >= canvasW - pad || y < pad || y >= canvasH - pad) {
              const idx = (y * canvasW + x) * 4;
              data[idx] = 255;
              data[idx + 1] = 255;
              data[idx + 2] = 255;
              data[idx + 3] = 255;
            }
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
      const enhancedDataUrl = canvas.toDataURL("image/png");
      canvas.width = 0;
      canvas.height = 0;
      return enhancedDataUrl;
    } catch (err) {
      console.warn("[Let Me See See] Image enhancement error:", err);
      return imageSource;
    }
  }
  function loadImageElement(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }

  // src/offscreen/offscreen.js
  if (typeof globalThis !== "undefined") {
    globalThis.extractLinesFromResult = extractLinesFromResult;
    globalThis.copyToOffscreenClipboard = copyToOffscreenClipboard;
    globalThis.getTesseractWorker = getTesseractWorker;
    globalThis.enhanceImageForOcr = enhanceImageForOcr;
  }
  if (typeof window !== "undefined") {
    window.__letMeSeeSeeOffscreen = {
      extractLinesFromResult,
      copyToOffscreenClipboard,
      getTesseractWorker,
      enhanceImageForOcr
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
          const enhancedImg = await enhanceImageForOcr(message.image);
          let res = await worker.recognize(enhancedImg);
          let lines = extractLinesFromResult(res);
          let text = lines.join("\n");
          if (!text && res?.data?.text) {
            text = res.data.text.trim();
          }
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
              } catch {
              }
            }
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
