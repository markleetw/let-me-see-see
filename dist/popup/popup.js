/**
 * Let Me See See - Popup Extension Actions
 */

async function initPopupBatchExport() {
  let tab = null;
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    tab = tabs && tabs[0];
  } catch (e) {
    console.warn("[Let Me See See Popup] Failed to query tabs:", e);
  }

  let docType = null;
  if (tab?.id) {
    try {
      docType = await chrome.tabs.sendMessage(tab.id, { type: "get-document-type" });
    } catch {}
  }

  const isSupported = ["document", "spreadsheets", "presentation"].includes(docType);

  const getContainer = () => document.querySelector(".popup");
  let container = getContainer();

  if (!container) {
    await new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (getContainer()) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer.disconnect();
        resolve();
      }, 1200);
    });
    container = getContainer();
  }

  if (!container) return;

  if (document.getElementById("lmss-batch-export-section")) return;

  const section = document.createElement("section");
  section.id = "lmss-batch-export-section";
  section.className = "block";
  section.setAttribute("aria-labelledby", "batch-export-title");
  section.style.marginTop = "14px";
  section.style.paddingTop = "14px";
  section.style.borderTop = "1px solid var(--border, #dce1dd)";

  const headerDiv = document.createElement("div");
  headerDiv.style.display = "flex";
  headerDiv.style.alignItems = "center";
  headerDiv.style.justifyContent = "space-between";
  headerDiv.style.marginBottom = "4px";

  const title = document.createElement("h2");
  title.id = "batch-export-title";
  title.className = "heading";
  title.style.margin = "0";
  title.style.fontSize = "13px";
  title.style.fontWeight = "600";
  title.textContent = "全文件圖片打包下載";

  headerDiv.appendChild(title);

  const desc = document.createElement("p");
  desc.className = "hint";
  desc.style.margin = "0 0 10px 0";
  desc.style.fontSize = "12px";
  desc.style.color = "var(--muted, #5e665f)";
  desc.textContent = isSupported
    ? "手動觸發掃描當前文件所有圖片，並自動壓縮打包為 ZIP 檔案下載。"
    : "請在 Google Docs、Sheets 或 Slides 文件分頁開啟以啟用打包功能。";

  const btn = document.createElement("button");
  btn.id = "lmss-batch-export-btn";
  btn.type = "button";
  btn.className = "btn";
  btn.style.width = "100%";
  btn.style.height = "34px";
  btn.style.display = "flex";
  btn.style.alignItems = "center";
  btn.style.justifyContent = "center";
  btn.style.gap = "6px";
  btn.style.fontWeight = "600";
  btn.style.fontSize = "12px";
  btn.style.borderRadius = "8px";
  btn.style.background = isSupported ? "var(--primary, #157e3c)" : "var(--surface, #f3f7f4)";
  btn.style.color = isSupported ? "#ffffff" : "var(--muted, #5e665f)";
  btn.style.border = isSupported ? "none" : "1px solid var(--border, #dce1dd)";
  btn.style.cursor = isSupported ? "pointer" : "not-allowed";
  btn.disabled = !isSupported;
  btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V8"/><path d="M22 5C22 4.44772 21.5523 4 21 4H3C2.44772 4 2 4.44772 2 5V8H22V5Z"/><path d="M12 11V17M12 17L9.5 14.5M12 17L14.5 14.5"/></svg> <span>打包下載全文件圖片 (.zip)</span>`;

  const statusMsg = document.createElement("div");
  statusMsg.id = "lmss-batch-export-status";
  statusMsg.className = "hint";
  statusMsg.style.marginTop = "6px";
  statusMsg.style.textAlign = "center";
  statusMsg.style.display = "none";

  btn.addEventListener("click", async () => {
    if (!tab?.id) return;
    btn.disabled = true;
    btn.style.opacity = "0.7";
    btn.style.cursor = "wait";
    statusMsg.style.display = "block";
    statusMsg.style.color = "var(--primary-ink, #006529)";
    statusMsg.textContent = "正在掃描全文件並打包中，請稍候...";

    try {
      const response = await chrome.tabs.sendMessage(tab.id, { type: "batch-download-images" });
      if (response && response.downloaded > 0) {
        statusMsg.style.color = "var(--primary-ink, #006529)";
        statusMsg.textContent = `下載成功！共打包 ${response.downloaded} 張圖片` + (response.failed > 0 ? `（${response.failed} 張失敗）` : "");
      } else if (response && response.downloaded === 0) {
        statusMsg.style.color = "var(--muted, #5e665f)";
        statusMsg.textContent = "未在文件中找到任何圖片。";
      } else {
        statusMsg.style.color = "#dc2626";
        statusMsg.textContent = "打包失敗，請重試。";
      }
    } catch (err) {
      statusMsg.style.color = "#dc2626";
      statusMsg.textContent = "傳送請求失敗，請重新整理頁面後再試。";
    } finally {
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    }
  });

  section.appendChild(headerDiv);
  section.appendChild(desc);
  section.appendChild(btn);
  section.appendChild(statusMsg);

  const posSection = container.querySelector('section[aria-labelledby="position-title"]');
  if (posSection && posSection.nextSibling) {
    container.insertBefore(section, posSection.nextSibling);
  } else {
    container.appendChild(section);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPopupBatchExport);
} else {
  initPopupBatchExport();
}
