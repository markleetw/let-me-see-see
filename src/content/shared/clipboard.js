/**
 * Clipboard Utilities
 * Supports binary image copying via ClipboardItem (with auto PNG conversion), and clean text copying.
 */

import { uiToast } from "../ui/toast.js";
import { convertUrlToPngBlob } from "./download-manager.js";
import { rasterToDataUrl } from "./image-matcher.js";

export async function copyTextToClipboard(text) {
  if (!text) return false;

  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn("[Let Me See See] clipboard writeText error:", err);
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "-9999px";
    ta.style.width = "1px";
    ta.style.height = "1px";
    ta.style.opacity = "0";
    ta.style.contain = "strict";
    const stopPropagation = (e) => e.stopPropagation();
    ta.addEventListener("copy", stopPropagation, true);
    ta.addEventListener("select", stopPropagation, true);
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Convert any image source (URL string, data URL, Blob, or active raster) to a PNG Blob
 */
export async function imageSourceToPngBlob(source) {
  if (typeof window !== "undefined") {
    // If source is missing but active raster is available
    if ((!source || source === window.__letMeSeeSeeActiveDataUrl) && window.__letMeSeeSeeActiveRaster) {
      const dataUrl = rasterToDataUrl(window.__letMeSeeSeeActiveRaster);
      if (dataUrl) return convertUrlToPngBlob(dataUrl);
    }
  }

  if (!source) {
    throw new Error("No image source provided");
  }

  // Already a PNG Blob
  if (source instanceof Blob && source.type === "image/png") {
    return source;
  }

  // Other Blob (e.g. image/jpeg, image/webp)
  if (source instanceof Blob) {
    if (typeof createImageBitmap !== "function" || typeof document === "undefined") {
      return source;
    }
    const bmp = await createImageBitmap(source);
    const cvs = document.createElement("canvas");
    cvs.width = bmp.width;
    cvs.height = bmp.height;
    const ctx = cvs.getContext("2d");
    if (!ctx) {
      if (typeof bmp.close === "function") bmp.close();
      throw new Error("Canvas context is unavailable");
    }
    ctx.drawImage(bmp, 0, 0);
    if (typeof bmp.close === "function") bmp.close();
    return new Promise((resolve, reject) => {
      cvs.toBlob((pngBlob) => {
        pngBlob ? resolve(pngBlob) : reject(new Error("Image conversion failed"));
      }, "image/png");
    });
  }

  // String URL or data URL
  if (typeof source === "string" && source.trim()) {
    return convertUrlToPngBlob(source.trim());
  }

  throw new Error("Unsupported image source type");
}

/**
 * Copy high-resolution image to clipboard via ClipboardItem
 * In Chromium, passing a Promise<Blob> to ClipboardItem preserves the active user gesture!
 */
export async function copyImageToClipboard(imgUrlOrBlob) {
  if (!imgUrlOrBlob && typeof window !== "undefined") {
    if (window.__letMeSeeSeeActiveDataUrl) {
      imgUrlOrBlob = window.__letMeSeeSeeActiveDataUrl;
    } else if (window.__letMeSeeSeeActiveRaster) {
      imgUrlOrBlob = rasterToDataUrl(window.__letMeSeeSeeActiveRaster);
    }
  }

  if (!imgUrlOrBlob || !navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    uiToast("瀏覽器不支援剪貼簿寫入", 3000);
    return false;
  }

  try {
    const pngBlobPromise = imageSourceToPngBlob(imgUrlOrBlob);
    const item = new ClipboardItem({ "image/png": pngBlobPromise });
    await navigator.clipboard.write([item]);
    return true;
  } catch (err) {
    console.warn("[Let Me See See] Direct ClipboardItem write with Promise failed, retrying with resolved blob:", err);
    try {
      const resolvedBlob = await imageSourceToPngBlob(imgUrlOrBlob);
      const item = new ClipboardItem({ "image/png": resolvedBlob });
      await navigator.clipboard.write([item]);
      return true;
    } catch (fallbackErr) {
      console.error("[Let Me See See] Copy image to clipboard failed:", fallbackErr);
      uiToast("複製失敗：請先點擊頁面或允許剪貼簿權限", 3000);
      return false;
    }
  }
}

export const copyImageBlobToClipboard = copyImageToClipboard;
