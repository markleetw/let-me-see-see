/**
 * Clipboard Utilities
 * Supports binary image copying via ClipboardItem, and clean text copying.
 */

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

export async function copyImageBlobToClipboard(blob) {
  if (!blob || !navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    return false;
  }
  try {
    const item = new ClipboardItem({ [blob.type || "image/png"]: blob });
    await navigator.clipboard.write([item]);
    return true;
  } catch {
    return false;
  }
}
