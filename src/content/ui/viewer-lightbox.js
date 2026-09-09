/**
 * Viewer.js Lightbox Integration
 * Enhances Viewer.js with modern glassmorphism floating island toolbar,
 * SVG icons, and interactive drag-to-select snippet OCR.
 */

import { toggleToolbarPreviewHidden } from "./toolbar.js";
import { startLightboxCrop } from "./lightbox-crop.js";
import { ocrImageToText } from "../ocr/ocr-service.js";

const VIEWER_SOURCE_CONTAINER_ID = "let-me-see-see-viewer-source";
let viewerInstance = null;

const TOOLBAR_SVG_ICONS = {
  "zoom-in": {
    title: "放大 (Zoom In)",
    svg: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`
  },
  "zoom-out": {
    title: "縮小 (Zoom Out)",
    svg: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`
  },
  "one-to-one": {
    title: "1:1 原圖大小 (Actual Size)",
    svg: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M9 8v8M15 8v8"></path></svg>`
  },
  "reset": {
    title: "重設 (Reset)",
    svg: `<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path><rect x="9" y="9" width="6" height="6" rx="1"></rect></svg>`
  },
  "prev": {
    title: "上一張 (Previous)",
    svg: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>`
  },
  "next": {
    title: "下一張 (Next)",
    svg: `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>`
  },
  "rotate-left": {
    title: "向左旋轉 (Rotate Left)",
    svg: `<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`
  },
  "rotate-right": {
    title: "向右旋轉 (Rotate Right)",
    svg: `<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 0-2.64 6.36"></path><polyline points="21 22 21 12 11 12"></polyline></svg>`
  },
  "crop-ocr": {
    title: "局部框選辨識 (Snippet OCR)",
    svg: `<svg viewBox="0 0 24 24"><path d="M5 3H3v2M19 3h2v2M5 21H3v-2M19 21h2v-2"></path><rect x="7" y="7" width="10" height="10" rx="1.5" stroke-dasharray="2 2"></rect><circle cx="12" cy="12" r="1.5" fill="currentColor"></circle></svg>`
  }
};

export function renderModernViewerToolbar(vInstance) {
  if (!vInstance) return;
  const container = vInstance.viewer || document.querySelector(".viewer-container");
  if (!container) return;

  const items = container.querySelectorAll(".viewer-toolbar > ul > li");
  items.forEach((li) => {
    if (li.querySelector("svg")) return;

    let action = li.getAttribute("data-viewer-action") || "";
    if (!action) {
      for (const cls of li.classList) {
        if (cls.startsWith("viewer-") && cls !== "viewer-large" && cls !== "viewer-small") {
          action = cls.replace("viewer-", "");
          break;
        }
      }
    }
    if (!action) return;

    const normalizedAction = action.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()).replace(/^viewer-/, "");
    const config = TOOLBAR_SVG_ICONS[normalizedAction] || TOOLBAR_SVG_ICONS[action];
    if (config) {
      li.classList.add("lmss-has-svg");
      if (normalizedAction === "crop-ocr" || action === "cropOcr") {
        li.classList.add("viewer-crop-ocr-btn");
      }
      li.setAttribute("title", config.title);
      li.setAttribute("aria-label", config.title);
      li.innerHTML = config.svg;
    }
  });
}

export function getOrCreateViewerSourceContainer() {
  let container = document.getElementById(VIEWER_SOURCE_CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = VIEWER_SOURCE_CONTAINER_ID;
    container.hidden = true;
    document.body.appendChild(container);
  }
  return container;
}

export function openViewerLightbox(urls, initialIndex = 0, ViewerClass) {
  const validUrls = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
  if (!validUrls.length) return false;

  const container = getOrCreateViewerSourceContainer();
  const images = validUrls.map((url, idx) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = `Image ${idx + 1} of ${validUrls.length}`;
    img.dataset.viewerLabel = img.alt;
    return img;
  });

  container.replaceChildren(...images);

  if (viewerInstance) {
    viewerInstance.destroy();
    viewerInstance = null;
  }

  const VClass = ViewerClass || window.Viewer;
  if (!VClass) return false;

  viewerInstance = new VClass(container, {
    initialViewIndex: Math.max(0, Math.min(initialIndex, validUrls.length - 1)),
    keyboard: true,
    loop: false,
    title: validUrls.length > 1 ? [1, (img) => img.dataset.viewerLabel || ""] : false,
    navbar: false,
    toolbar: {
      zoomIn: 1,
      zoomOut: 1,
      oneToOne: 0,
      reset: 1,
      prev: 0,
      next: 0,
      rotateLeft: 1,
      rotateRight: 0,
      cropOcr: {
        show: 1,
        size: "large",
        click: () => {
          startLightboxCrop(viewerInstance, (cropDataUrl) => {
            if (typeof window !== "undefined") {
              window.__letMeSeeSeeActiveRaster = null;
            }
            ocrImageToText(cropDataUrl, { isCrop: true });
          });
        }
      }
    },
    zoomRatio: 0.3,
    viewed: () => {
      renderModernViewerToolbar(viewerInstance);
    },
    shown: () => {
      renderModernViewerToolbar(viewerInstance);
    },
    hidden: () => toggleToolbarPreviewHidden(false)
  });

  toggleToolbarPreviewHidden(true);
  try {
    viewerInstance.show();
    setTimeout(() => renderModernViewerToolbar(viewerInstance), 50);
    return true;
  } catch (err) {
    toggleToolbarPreviewHidden(false);
    throw err;
  }
}
