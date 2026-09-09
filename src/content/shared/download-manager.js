/**
 * Image Download Manager & ZIP Packager
 */

import { uiToast } from "../ui/toast.js";
import JSZip from "../vendor/jszip.js";

export function sanitizeFilename(title = (typeof document !== "undefined" ? document.title : "")) {
  return (
    title
      .replace(/(?:^|\s+)-\s+Google (?:Docs|Sheets|Slides|文件|試算表|簡報|文档|表格|幻灯片)$/i, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}_-]+/gu, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "google-document"
  );
}

export function getImageExtension(blob, url) {
  const mimeTypes = {
    "image/gif": "gif",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/svg+xml": "svg",
    "image/webp": "webp"
  };
  if (blob?.type && mimeTypes[blob.type]) return mimeTypes[blob.type];
  const ext = url?.match(/\.([a-z0-9]{2,5})(?:[?#]|$)/i)?.[1];
  return ext ? ext.toLowerCase() : "png";
}

export function triggerBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function fetchImageBlob(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.blob();
}

export async function convertUrlToPngBlob(url) {
  const blob = await fetchImageBlob(url);
  if (blob?.type === "image/png") return blob;
  if (typeof createImageBitmap !== "function" || typeof document === "undefined") {
    return blob;
  }
  const bmp = await createImageBitmap(blob);
  const cvs = document.createElement("canvas");
  cvs.width = bmp.width;
  cvs.height = bmp.height;
  const ctx = cvs.getContext("2d");
  if (!ctx) {
    if (typeof bmp.close === "function") bmp.close();
    throw new Error("Canvas is unavailable");
  }
  ctx.drawImage(bmp, 0, 0);
  if (typeof bmp.close === "function") bmp.close();
  return new Promise((resolve, reject) => {
    cvs.toBlob((pngBlob) => {
      pngBlob ? resolve(pngBlob) : reject(new Error("Image conversion failed"));
    }, "image/png");
  });
}

export async function downloadSingleImage(url, index) {
  if (!url) {
    uiToast("未找到圖片連結", 3000);
    return false;
  }
  try {
    uiToast("正在下載圖片...", 2000);
    const blob = await fetchImageBlob(url);
    const suffix = index ? `-image-${index}` : "";
    const name = `${sanitizeFilename()}${suffix}.${getImageExtension(blob, url)}`;
    triggerBlobDownload(blob, name);
    uiToast("圖片下載成功！", 2500);
    return true;
  } catch {
    try {
      const a = document.createElement("a");
      a.href = url;
      a.download = `${sanitizeFilename()}${index ? `-image-${index}` : ""}.${getImageExtension(null, url)}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      uiToast("已啟動圖片下載", 2500);
      return true;
    } catch {
      uiToast("圖片下載失敗", 3000);
      return false;
    }
  }
}

export async function packImagesToZip(urls, onProgress, JSZipClass = JSZip) {
  if (!urls?.length) {
    uiToast("未在文件中找到任何圖片", 3000);
    return { downloaded: 0, failed: 0 };
  }

  uiToast(`正在打包下載全文件圖片 (0/${urls.length})...`, 0);

  const blobs = Array.from({ length: urls.length }, () => null);
  let currentIndex = 0;
  let doneCount = 0;

  const worker = async () => {
    while (currentIndex < urls.length) {
      const idx = currentIndex++;
      try {
        blobs[idx] = await fetchImageBlob(urls[idx]);
      } catch {
        blobs[idx] = null;
      }
      doneCount++;
      uiToast(`正在打包下載全文件圖片 (${doneCount}/${urls.length})...`, 0);
      if (typeof onProgress === "function") {
        try {
          onProgress(doneCount, urls.length);
        } catch {}
      }
    }
  };

  const poolSize = Math.min(4, urls.length);
  await Promise.all(Array.from({ length: poolSize }, worker));

  const zip = new JSZipClass();
  const padLength = Math.max(2, String(urls.length).length);
  let successCount = 0;

  blobs.forEach((blob, idx) => {
    if (!blob) return;
    successCount++;
    const numStr = String(idx + 1).padStart(padLength, "0");
    zip.file(`image-${numStr}.${getImageExtension(blob, urls[idx])}`, blob);
  });

  const failedCount = urls.length - successCount;

  if (successCount > 0) {
    uiToast("正在產生 ZIP 壓縮檔...", 0);
    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 }
    });
    triggerBlobDownload(zipBlob, `${sanitizeFilename()}-images.zip`);
    uiToast(
      `下載成功！共打包 ${successCount} 張圖片${failedCount > 0 ? `（${failedCount} 張失敗）` : ""}`,
      3500
    );
  } else {
    uiToast("打包失敗：無法下載圖片", 3000);
  }

  return { downloaded: successCount, failed: failedCount };
}
