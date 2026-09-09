/**
 * Viewer.js Lightbox Integration
 */

import { toggleToolbarPreviewHidden } from "./toolbar.js";

const VIEWER_SOURCE_CONTAINER_ID = "let-me-see-see-viewer-source";
let viewerInstance = null;

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
      prev: validUrls.length > 1 ? 1 : 0,
      play: { show: 0, size: "large" },
      next: validUrls.length > 1 ? 1 : 0,
      rotateLeft: 1,
      rotateRight: 1,
      flipHorizontal: 0,
      flipVertical: 0
    },
    zoomRatio: 0.3,
    hidden: () => toggleToolbarPreviewHidden(false)
  });

  toggleToolbarPreviewHidden(true);
  try {
    viewerInstance.show();
    return true;
  } catch (err) {
    toggleToolbarPreviewHidden(false);
    throw err;
  }
}
