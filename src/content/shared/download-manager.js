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
  if (typeof document === "undefined") return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export async function fetchImageBlobWithRetry(url, retries = 2) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.blob();
      }
      if (res.status === 404) {
        lastError = new Error(`HTTP 404 for ${url}`);
        break;
      }
      lastError = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
    }

    if (attempt < retries) {
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }

  // Fallback: If URL was upgraded to =s2048 and failed, try the un-upgraded original URL
  const fallbackUrl = url.replace(/=s2048(?:$|[&#?])/, "");
  if (fallbackUrl && fallbackUrl !== url) {
    try {
      const res = await fetch(fallbackUrl);
      if (res.ok) {
        return await res.blob();
      }
    } catch {}
  }

  throw lastError || new Error(`Failed to fetch ${url}`);
}

export async function fetchImageBlob(url) {
  return fetchImageBlobWithRetry(url, 1);
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

  const zip = new JSZipClass();
  const padLength = Math.max(2, String(urls.length).length);
  const failedItems = [];
  let currentIndex = 0;
  let doneCount = 0;
  let successCount = 0;

  const worker = async () => {
    while (currentIndex < urls.length) {
      const idx = currentIndex++;
      const currentUrl = urls[idx];
      try {
        const blob = await fetchImageBlobWithRetry(currentUrl);
        successCount++;
        const numStr = String(idx + 1).padStart(padLength, "0");
        zip.file(`image-${numStr}.${getImageExtension(blob, currentUrl)}`, blob);
      } catch (err) {
        failedItems.push({ index: idx + 1, url: currentUrl, error: err?.message || String(err) });
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

  const failedCount = urls.length - successCount;

  // If any images failed, include a clear diagnostic report inside the ZIP
  if (failedItems.length > 0) {
    const reportText = [
      `Let Me See See - 打包下載報告`,
      `==============================`,
      `文件名稱: ${sanitizeFilename()}`,
      `掃描總計: ${urls.length} 張`,
      `成功下載: ${successCount} 張`,
      `下載失敗: ${failedItems.length} 張`,
      ``,
      `失敗清單:`,
      ...failedItems.map((f) => `#${f.index}: ${f.url} (${f.error})`)
    ].join("\n");
    zip.file("_download_report.txt", reportText);
  }

  if (successCount > 0) {
    uiToast("正在產生 ZIP 壓縮檔...", 0);
    // Use STORE compression: images are already compressed; STORE is instant and saves CPU
    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "STORE"
    });
    triggerBlobDownload(zipBlob, `${sanitizeFilename()}-images.zip`);
    if (failedCount > 0) {
      uiToast(`下載完成！共打包 ${successCount} 張圖片（${failedCount} 張失敗，已記於 ZIP 報告）`, 4500);
    } else {
      uiToast(`下載成功！共打包 ${successCount} 張圖片`, 3500);
    }
  } else {
    uiToast("打包失敗：無法下載圖片", 3000);
  }

  return { downloaded: successCount, failed: failedCount };
}
