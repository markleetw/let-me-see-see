/**
 * Lightbox Crop Selection & Snippet OCR
 * Enables interactive drag-to-select on the active Viewer.js image,
 * maps screen coordinates to native image pixels with safety buffer,
 * and extracts the cropped region for OCR recognition.
 */

import { uiToast } from "./toast.js";

/**
 * Pure coordinate mapping function from screen selection rectangle to native image coordinates.
 * @param {{left: number, top: number, width: number, height: number}} screenBox Selection rect in client coords
 * @param {{left: number, top: number, width: number, height: number}} imgRect Rendered image client rect
 * @param {number} naturalWidth Original image width in pixels
 * @param {number} naturalHeight Original image height in pixels
 * @param {number} [buffer=18] Safety padding buffer in native pixels
 * @returns {{cropX: number, cropY: number, cropW: number, cropH: number}}
 */
export function calculateImageCropBounds(
  screenBox,
  imgRect,
  naturalWidth,
  naturalHeight,
  buffer = 18
) {
  if (
    !screenBox ||
    !imgRect ||
    !imgRect.width ||
    !imgRect.height ||
    naturalWidth <= 0 ||
    naturalHeight <= 0
  ) {
    return { cropX: 0, cropY: 0, cropW: 0, cropH: 0 };
  }

  const scaleX = naturalWidth / (imgRect.width || 1);
  const scaleY = naturalHeight / (imgRect.height || 1);

  // Relative distance of selection box from rendered image top-left
  const relX = screenBox.left - imgRect.left;
  const relY = screenBox.top - imgRect.top;

  // Convert to natural image coordinates with safety buffer
  const rawX0 = relX * scaleX - buffer;
  const rawY0 = relY * scaleY - buffer;
  const rawX1 = (relX + screenBox.width) * scaleX + buffer;
  const rawY1 = (relY + screenBox.height) * scaleY + buffer;

  const cropX = Math.max(0, Math.min(naturalWidth - 1, Math.round(rawX0)));
  const cropY = Math.max(0, Math.min(naturalHeight - 1, Math.round(rawY0)));
  const cropW = Math.max(1, Math.min(naturalWidth - cropX, Math.round(rawX1 - rawX0)));
  const cropH = Math.max(1, Math.min(naturalHeight - cropY, Math.round(rawY1 - rawY0)));

  return { cropX, cropY, cropW, cropH };
}

/**
 * Extract cropped image region into a PNG Data URL via Canvas.
 * @param {HTMLImageElement} imgElement
 * @param {{cropX: number, cropY: number, cropW: number, cropH: number}} cropBounds
 * @returns {string|null} Base64 PNG Data URL
 */
export function cropImageToDataUrl(imgElement, cropBounds) {
  if (!imgElement || !cropBounds || cropBounds.cropW <= 0 || cropBounds.cropH <= 0) return null;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = cropBounds.cropW;
    canvas.height = cropBounds.cropH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imgElement,
      cropBounds.cropX,
      cropBounds.cropY,
      cropBounds.cropW,
      cropBounds.cropH,
      0,
      0,
      cropBounds.cropW,
      cropBounds.cropH
    );

    const dataUrl = canvas.toDataURL("image/png");
    canvas.width = 0;
    canvas.height = 0;
    return dataUrl;
  } catch (err) {
    console.warn("[Let Me See See] Canvas crop failed:", err);
    return null;
  }
}

let activeCropCleanup = null;

/**
 * Activate crop selection overlay in the Viewer.js lightbox.
 * @param {object} viewerInstance Active Viewer.js instance
 * @param {(cropDataUrl: string) => void} onCropSelected Callback executed when mouseup triggers valid crop
 */
export function startLightboxCrop(viewerInstance, onCropSelected) {
  if (!viewerInstance || !viewerInstance.image) return;

  // If already active, cancel previous
  if (activeCropCleanup) {
    activeCropCleanup();
    activeCropCleanup = null;
    return;
  }

  const container = viewerInstance.viewer || document.querySelector(".viewer-container");
  const canvasEl = container?.querySelector(".viewer-canvas");
  if (!canvasEl) return;

  container.classList.add("lmss-crop-active");
  const cropBtn = container.querySelector(".viewer-crop-ocr-btn, [data-viewer-action='cropOcr']");
  if (cropBtn) cropBtn.classList.add("is-active");

  // Create crop overlay covering the entire viewport to intercept all pointer events
  const overlay = document.createElement("div");
  overlay.className = "lmss-crop-overlay";
  container.appendChild(overlay);

  // Create crop hint banner
  const hintBanner = document.createElement("div");
  hintBanner.className = "lmss-crop-hint";
  hintBanner.innerHTML = `
    <span class="lmss-crop-hint-icon">⛶</span>
    <span>請拖曳滑鼠圈選要辨識的文字區域（放開即辨識）</span>
    <button type="button" class="lmss-crop-hint-close" title="取消圈選">✕</button>
  `;
  container.appendChild(hintBanner);

  // Create selection box element inside overlay
  const box = document.createElement("div");
  box.className = "lmss-crop-box";
  box.style.display = "none";
  overlay.appendChild(box);

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let rafId = null;

  const onDragStart = (e) => {
    // Ignore clicks on toolbar or hint banner
    if (e.target.closest(".viewer-toolbar, .lmss-crop-hint, .viewer-button")) return;
    e.preventDefault();
    e.stopPropagation();

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    box.style.left = `${startX}px`;
    box.style.top = `${startY}px`;
    box.style.width = "0px";
    box.style.height = "0px";
    box.style.display = "block";
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();

    const curX = e.clientX;
    const curY = e.clientY;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const left = Math.min(startX, curX);
      const top = Math.min(startY, curY);
      const width = Math.abs(curX - startX);
      const height = Math.abs(curY - startY);

      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      box.style.width = `${width}px`;
      box.style.height = `${height}px`;
    });
  };

  const onDragEnd = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    const endX = e.clientX;
    const endY = e.clientY;

    const screenBox = {
      left: Math.min(startX, endX),
      top: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY)
    };

    // Ignore accidental tiny clicks (< 15px)
    if (screenBox.width < 15 || screenBox.height < 15) {
      cleanup();
      return;
    }

    const img = viewerInstance.image;
    const imgRect = img.getBoundingClientRect();
    const naturalWidth = viewerInstance.imageData?.naturalWidth || img.naturalWidth || imgRect.width;
    const naturalHeight = viewerInstance.imageData?.naturalHeight || img.naturalHeight || imgRect.height;

    const cropBounds = calculateImageCropBounds(screenBox, imgRect, naturalWidth, naturalHeight, 18);
    const cropDataUrl = cropImageToDataUrl(img, cropBounds);

    cleanup();

    if (cropDataUrl && typeof onCropSelected === "function") {
      if (typeof window !== "undefined") {
        window.__letMeSeeSeeActiveRaster = null;
      }
      onCropSelected(cropDataUrl);
    } else {
      uiToast("圈選範圍未擷取到有效圖像", 2500);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      cleanup();
    }
  };

  const cleanup = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    container.classList.remove("lmss-crop-active");
    if (cropBtn) {
      cropBtn.classList.remove("is-active");
      if (typeof cropBtn.blur === "function") cropBtn.blur();
    }
    if (typeof document !== "undefined" && typeof document.querySelectorAll === "function") {
      document.querySelectorAll(".viewer-crop-ocr-btn, [data-viewer-action='cropOcr']").forEach((btn) => {
        btn.classList.remove("is-active");
        if (typeof btn.blur === "function") btn.blur();
      });
    }
    hintBanner.remove();
    overlay.remove();
    window.removeEventListener("pointermove", onDragMove, true);
    window.removeEventListener("pointerup", onDragEnd, true);
    window.removeEventListener("mousemove", onDragMove, true);
    window.removeEventListener("mouseup", onDragEnd, true);
    overlay.removeEventListener("pointerdown", onDragStart, true);
    overlay.removeEventListener("mousedown", onDragStart, true);
    window.removeEventListener("keydown", onKeyDown, true);
    activeCropCleanup = null;
  };

  activeCropCleanup = cleanup;
  hintBanner.querySelector(".lmss-crop-hint-close").addEventListener("click", cleanup);
  overlay.addEventListener("pointerdown", onDragStart, true);
  overlay.addEventListener("mousedown", onDragStart, true);
  window.addEventListener("pointermove", onDragMove, true);
  window.addEventListener("pointerup", onDragEnd, true);
  window.addEventListener("mousemove", onDragMove, true);
  window.addEventListener("mouseup", onDragEnd, true);
  window.addEventListener("keydown", onKeyDown, true);
}
