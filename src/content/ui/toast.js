/**
 * User Interface Toast Notification
 * - Supports duration = 0 (persistent until manually updated/dismissed)
 * - Supports smooth opacity/transform fadeout transition
 */

let toastTimeoutId = null;

export function uiToast(message, duration = 3000) {
  if (typeof document === "undefined") return;
  let toastEl = document.getElementById("let-me-see-see-toast");

  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
    toastTimeoutId = null;
  }

  const isViewerActive = typeof document !== "undefined" && !!document.querySelector(".viewer-container.viewer-in, .viewer-container:not(.viewer-hide)");
  const bottomOffset = isViewerActive ? "92px" : "28px";

  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "let-me-see-see-toast";
    Object.assign(toastEl.style, {
      position: "fixed",
      bottom: bottomOffset,
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(33,33,33,0.92)",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: "8px",
      fontSize: "13px",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
      zIndex: "2147483647",
      boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
      pointerEvents: "none",
      transition: "opacity 0.25s ease,transform 0.25s ease,bottom 0.25s ease",
      opacity: "1"
    });
    document.body.appendChild(toastEl);
  } else {
    toastEl.style.bottom = bottomOffset;
    toastEl.style.opacity = "1";
    toastEl.style.transform = "translateX(-50%)";
  }

  toastEl.textContent = message;

  if (duration && duration > 0) {
    toastTimeoutId = window.setTimeout(() => {
      toastEl.style.opacity = "0";
      toastEl.style.transform = "translateX(-50%) translateY(6px)";
      window.setTimeout(() => {
        if (toastEl.parentElement) toastEl.remove();
      }, 250);
      toastTimeoutId = null;
    }, duration);
  }

  return toastEl;
}
