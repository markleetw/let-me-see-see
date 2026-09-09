/**
 * Floating Toolbar Controller
 * Creates, positions, and manages action buttons for View, Copy, OCR, and Download.
 */

export const TOOLBAR_ID = "letMeSeeSeeToolbar";
export const BTN_VIEW_ID = "ZoomInIconBtn";
export const BTN_DOWNLOAD_ID = "DownloadIconBtn";
export const BTN_COPY_ID = "CopyImageIconBtn";
export const BTN_OCR_ID = "OcrTextIconBtn";
export const PREVIEW_HIDDEN_CLASS = "lmss-actions--preview-hidden";

const svg = (path) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">${path}</svg>`;

export const ICONS = {
  view: svg('<path d="M8.00001 3.09779C8.00001 3.09779 4.03375 2.74194 3.38784 3.38785C2.74192 4.03375 3.09784 8 3.09784 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M8.00001 20.9022C8.00001 20.9022 4.03375 21.2581 3.38784 20.6122C2.74192 19.9662 3.09784 16 3.09784 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M16 3.09779C16 3.09779 19.9663 2.74194 20.6122 3.38785C21.2581 4.03375 20.9022 8 20.9022 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M16 20.9022C16 20.9022 19.9663 21.2581 20.6122 20.6122C21.2581 19.9662 20.9022 16 20.9022 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.0107 9.99847L20.0625 3.94678" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.99696 14.0024L3.63966 20.3807" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.99732 10.0024L3.84571 3.85889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M13.9795 14.0024L20.5279 20.4983" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>'),
  copy: svg('<path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>'),
  ocr: svg('<path d="M3 7V5C3 3.89543 3.89543 3 5 3H7M17 3H19C20.1046 3 21 3.89543 21 5V7M21 17V19C21 20.1046 20.1046 21 19 21H17M7 21H5C3.89543 21 3 20.1046 3 19V17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M8 10H16M12 10V16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>'),
  download: svg('<path d="M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M5.00006 21H19.0001" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>'),
  copied: svg('<path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5"/><path d="M8 12.5L10.5 15L16 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>')
};

export const CORNER_POSITIONS = ["top-left", "top-right", "bottom-left", "bottom-right"];
export let currentCornerPosition = "top-right";

let prewarmed = false;
export function triggerOcrPrewarm() {
  if (prewarmed) return;
  prewarmed = true;
  try {
    if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: "prewarm-ocr" }).catch(() => {});
    }
  } catch {}
}

export function createToolbarButton(id, title, iconHtml) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.type = "button";
  btn.className = "zoom-btn";
  btn.title = title;
  btn.setAttribute("aria-label", title);
  btn.innerHTML = iconHtml;
  return btn;
}

export function showButtonSuccess(btn) {
  btn.classList.add("lmss-action--success");
  const oldHtml = btn.innerHTML;
  const oldTitle = btn.title;
  btn.innerHTML = ICONS.copied;
  btn.title = "已完成！";
  btn.setAttribute("aria-label", "已完成！");
  window.setTimeout(() => {
    btn.classList.remove("lmss-action--success");
    btn.innerHTML = oldHtml;
    btn.title = oldTitle;
    btn.setAttribute("aria-label", oldTitle);
  }, 1500);
}

export function showButtonFailure(btn) {
  btn.style.color = "#dc2626";
  window.setTimeout(() => {
    btn.style.color = "";
  }, 1500);
}

export function applyToolbarCornerPosition(el, position) {
  Object.assign(el.style, {
    top: "",
    right: "",
    bottom: "",
    left: "",
    borderTopLeftRadius: "",
    borderTopRightRadius: "",
    borderBottomLeftRadius: "",
    borderBottomRightRadius: ""
  });

  switch (position) {
    case "top-left":
      el.style.top = "0px";
      el.style.left = "0px";
      el.style.borderBottomRightRadius = "12px";
      break;
    case "top-right":
      el.style.top = "0px";
      el.style.right = "0px";
      el.style.borderBottomLeftRadius = "12px";
      break;
    case "bottom-left":
      el.style.bottom = "0px";
      el.style.left = "0px";
      el.style.borderTopRightRadius = "12px";
      break;
    case "bottom-right":
      el.style.bottom = "0px";
      el.style.right = "0px";
      el.style.borderTopLeftRadius = "12px";
      break;
  }
}

export function createFloatingToolbar(onAction) {
  triggerOcrPrewarm();
  const actionHandler = onAction || (typeof window !== "undefined" && window.__letMeSeeSeeToolbarAction) || (() => {});
  const existingView = document.getElementById(BTN_VIEW_ID);
  const existingDownload = document.getElementById(BTN_DOWNLOAD_ID);
  const existingCopy = document.getElementById(BTN_COPY_ID);
  const existingOcr = document.getElementById(BTN_OCR_ID);

  if (existingView && existingDownload && existingCopy && existingOcr) return;

  const oldToolbar = document.getElementById(TOOLBAR_ID);
  if (oldToolbar) oldToolbar.remove();

  const toolbar = document.createElement("div");
  toolbar.id = TOOLBAR_ID;
  toolbar.className = "zoom-container";
  applyToolbarCornerPosition(toolbar, currentCornerPosition);

  // 1. View Button
  const viewBtn = createToolbarButton(BTN_VIEW_ID, "View image", ICONS.view);
  viewBtn.onclick = () => actionHandler("zoom");

  // 2. Copy Button
  const copyBtn = createToolbarButton(BTN_COPY_ID, "Copy image", ICONS.copy);
  copyBtn.onclick = async () => {
    copyBtn.disabled = true;
    const ok = await actionHandler("copy");
    copyBtn.disabled = false;
    ok ? showButtonSuccess(copyBtn) : showButtonFailure(copyBtn);
  };

  // 3. OCR Button
  const ocrBtn = createToolbarButton(BTN_OCR_ID, "圖片文字辨識複製 (OCR)", ICONS.ocr);
  ocrBtn.onclick = async () => {
    ocrBtn.disabled = true;
    const ok = await actionHandler("ocr");
    ocrBtn.disabled = false;
    ok ? showButtonSuccess(ocrBtn) : showButtonFailure(ocrBtn);
  };

  // 4. Download Button
  const downloadBtn = createToolbarButton(BTN_DOWNLOAD_ID, "Download image", ICONS.download);
  downloadBtn.onclick = async () => {
    downloadBtn.disabled = true;
    const ok = await actionHandler("download");
    downloadBtn.disabled = false;
    ok ? showButtonSuccess(downloadBtn) : showButtonFailure(downloadBtn);
  };

  toolbar.style.display = "none";
  toolbar.append(viewBtn, copyBtn, ocrBtn, downloadBtn);
  document.body.appendChild(toolbar);
  return toolbar;
}

export function attachToolbarToContainer(container) {
  triggerOcrPrewarm();
  const toolbar = document.getElementById(TOOLBAR_ID);
  const containers = document.getElementsByClassName("zoom-container");
  for (let i = 0; i < containers.length; i++) {
    containers[i].remove();
  }
  if (toolbar && container) {
    toolbar.style.display = "flex";
    container.appendChild(toolbar);
  }
}

export function toggleToolbarPreviewHidden(hidden) {
  const toolbar = document.getElementById(TOOLBAR_ID);
  if (toolbar) {
    toolbar.classList.toggle(PREVIEW_HIDDEN_CLASS, hidden);
    hidden ? toolbar.setAttribute("aria-hidden", "true") : toolbar.removeAttribute("aria-hidden");
  }
}
