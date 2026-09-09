/**
 * OCR Image-to-Text Service
 * Orchestrates offline Tesseract execution, sanitizes results, and copies to clipboard.
 */

import { uiToast } from "../ui/toast.js";
import { cleanOcrText } from "./text-cleaner.js";
import { processOcrTableOutput } from "./table-detector.js";
import { copyTextToClipboard } from "../shared/clipboard.js";
import { rasterToDataUrl } from "../shared/image-matcher.js";
import { getImageBitmap } from "../shared/lru-cache.js";

export async function ocrImageToText(imgUrl) {
  if (!imgUrl) {
    uiToast("未指定圖片，無法進行文字辨識", 3000);
    return false;
  }
  uiToast("正在辨識圖片文字 (OCR)...", 0);

  // 1. Hook for custom/external OCR engine if provided
  if (typeof window.__letMeSeeSeeOcrEngine === "function") {
    try {
      const res = await window.__letMeSeeSeeOcrEngine(imgUrl);
      if (res && typeof res === "string" && res.trim()) {
        const text = cleanOcrText(res.trim());
        await copyTextToClipboard(text);
        uiToast(`已成功掃描並複製文字至剪貼簿！(${text.length} 字)`, 3500);
        return true;
      }
    } catch (err) {
      console.warn("[Let Me See See] Custom OCR engine error:", err);
    }
  }

  // 2. Prepare image payload (prefer canvas base64 data URL, clamped to max 1600px for speed)
  let imagePayload = imgUrl;
  if (window.__letMeSeeSeeActiveRaster?.pixels && window.__letMeSeeSeeActiveRaster?.width && window.__letMeSeeSeeActiveRaster?.height) {
    const rasterDataUrl = rasterToDataUrl(window.__letMeSeeSeeActiveRaster);
    if (rasterDataUrl) imagePayload = rasterDataUrl;
  } else if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://") || imgUrl.startsWith("blob:")) {
    try {
      const bmp = await getImageBitmap(imgUrl);
      if (bmp) {
        const MAX_OCR_DIM = 1600;
        let w = bmp.width;
        let h = bmp.height;
        if (w > MAX_OCR_DIM || h > MAX_OCR_DIM) {
          const scale = Math.min(MAX_OCR_DIM / w, MAX_OCR_DIM / h);
          w = Math.max(1, Math.round(w * scale));
          h = Math.max(1, Math.round(h * scale));
        }
        const cvs = document.createElement("canvas");
        cvs.width = w;
        cvs.height = h;
        const ctx = cvs.getContext("2d");
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(bmp, 0, 0, w, h);
          imagePayload = cvs.toDataURL("image/png");
        }
      }
    } catch {}
  }

  // 3. Request OCR from Background Service Worker / Offscreen Sandbox (Tesseract WASM)
  try {
    if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
      const resp = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: "do-ocr",
            image: imagePayload
          },
          (res) => resolve(res)
        );
      });

      if (resp?.success && resp.text && resp.text.trim()) {
        const cleanText = cleanOcrText(resp.text);
        if (cleanText.length > 0) {
          const tableResult = processOcrTableOutput(cleanText, resp.ocrData);
          const textToCopy = tableResult.isTable ? tableResult.text : cleanText;
          let copied = await copyTextToClipboard(textToCopy);
          if (!copied) {
            try {
              const copyResp = await new Promise((resolve) => {
                chrome.runtime.sendMessage(
                  {
                    type: "copy-to-clipboard",
                    text: textToCopy
                  },
                  (r) => resolve(r)
                );
              });
              if (copyResp?.copied) copied = true;
            } catch {}
          }
          if (tableResult.isTable) {
            uiToast(`📊 已辨識表格結構並複製為試算表格式 (TSV)！(${tableResult.rowCount} 列 × ${tableResult.colCount} 欄)`, 3500);
          } else {
            uiToast(`已成功掃描並複製文字至剪貼簿！(${cleanText.length} 字)`, 3500);
          }
          return true;
        }
      }
    }
  } catch (err) {
    console.warn("[Let Me See See] Background OCR messaging error:", err);
  }

  // 4. Native Shape Detection API (window.TextDetector) fallback
  if (typeof window.TextDetector !== "undefined") {
    try {
      const detector = new window.TextDetector();
      let source = null;
      try {
        source = await getImageBitmap(imgUrl);
      } catch {}
      if (!source) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imgUrl;
        if (typeof img.decode === "function") {
          try {
            await img.decode();
          } catch {}
        }
        source = img;
      }
      if (source) {
        const detected = await detector.detect(source);
        if (detected && detected.length > 0) {
          const text = detected.map((d) => d.rawValue || d.text || "").filter(Boolean).join("\n").trim();
          if (text) {
            const cleanText = cleanOcrText(text);
            await copyTextToClipboard(cleanText);
            uiToast(`已成功掃描並複製文字至剪貼簿！(${cleanText.length} 字)`, 3500);
            return true;
          }
        }
      }
    } catch (err) {
      console.warn("[Let Me See See] TextDetector fallback error:", err);
    }
  }

  // 5. Local in-context OCRAD fallback if available
  const ocrEngine = typeof OCRAD === "function" ? OCRAD : (typeof window !== "undefined" && typeof window.OCRAD === "function" ? window.OCRAD : null);
  if (ocrEngine) {
    try {
      let imgData = null;
      if (window.__letMeSeeSeeActiveRaster && window.__letMeSeeSeeActiveRaster.pixels) {
        imgData = {
          width: window.__letMeSeeSeeActiveRaster.width,
          height: window.__letMeSeeSeeActiveRaster.height,
          data: window.__letMeSeeSeeActiveRaster.pixels
        };
      }
      if (imgData) {
        const result = ocrEngine(imgData);
        if (result && typeof result === "string" && result.trim()) {
          const cleanText = cleanOcrText(result);
          if (cleanText.length > 0) {
            await copyTextToClipboard(cleanText);
            uiToast(`已成功掃描並複製文字至剪貼簿！(${cleanText.length} 字)`, 3500);
            return true;
          }
        }
      }
    } catch {}
  }

  // 6. DOM Metadata Fallback (alt, aria-label, title)
  try {
    const images = Array.from(document.querySelectorAll("img, image"));
    const target = images.find((el) => {
      const s = el.getAttribute("src") || el.getAttribute("href") || el.getAttribute("xlink:href") || "";
      return s === imgUrl || (s && imgUrl && (s.includes(imgUrl) || imgUrl.includes(s)));
    });
    if (target) {
      const metaText = target.getAttribute("alt") || target.getAttribute("aria-label") || target.getAttribute("title") || "";
      if (metaText && metaText.trim()) {
        const cleanText = cleanOcrText(metaText.trim());
        await copyTextToClipboard(cleanText);
        uiToast(`已成功複製文字至剪貼簿！(${cleanText.length} 字)`, 3500);
        return true;
      }
    }
  } catch {}

  uiToast("圖片中未偵測到文字", 3000);
  return false;
}
