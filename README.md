# Let Me See See 👁️🔍

[![CI](https://github.com/markleetw/let-me-see-see/actions/workflows/ci.yml/badge.svg)](https://github.com/markleetw/let-me-see-see/actions/workflows/ci.yml)
[![GitHub Release](https://img.shields.io/github/v/release/markleetw/let-me-see-see?color=green)](https://github.com/markleetw/let-me-see-see/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **Let Me See See** (`let-me-see-see`) 是一個專為 **Google Docs、Google Sheets、Google Slides** 打造的高效能 Chrome 擴充功能（Manifest V3），專門解決在 Google 辦公套件中無法直接查看、放大預覽、複製或下載高解析度原圖的痛點。

---

## ✨ 核心功能 (Features)

* 🔍 **View（放大預覽）**：點擊圖片即在選取框角落吸附專屬浮動工具列，開啟高解析燈箱（Viewer.js），支援 1:1 縮放、自由旋轉與平移。
* 📋 **Copy（原圖複製）**：一鍵呼叫 Clipboard API 將高解析原圖二進位 PNG 寫入剪貼簿，直接在其他修圖或通訊軟體中貼上。
* 💾 **Download（原圖下載）**：直接自 Google CDN 擷取原圖二進位 Blob（自動升級獲取高解析度如 `=s2048`），**完整保留中文與 Unicode 文檔標題**作為檔名。
* 🧩 **Canvas 瓦片反解與自動縫合**：針對 Google Docs 採用多塊 HTML5 Canvas（`kix-canvas-tile-content`）虛擬化渲染且無常規 `<img>` 標籤的架構，透過離屏像素掃描、跨瓦片邊界檢測與垂直拼合演算法，精準反解圖片。
* ⚡ **極致效能優化**：
  * **LRU 圖片快取（上限 30 張）**：動態維護最近使用的圖片快取，淘汰時顯式調用 `bitmap.close()` 立即釋放 GPU VRAM，杜絕記憶體洩漏。
  * **RAF 影格節流（VSync 同步）**：全域 `scroll` 與 `resize` 監聽經由 `requestAnimationFrame` 節流，無圖片選取時 0ms 短路返回，徹底根絕 Layout Thrashing。
  * **空白點擊防抖**：具備邊界預先過濾與 8 秒冷卻防抖，杜絕點擊空白處引發整份文件重掃與卡死。
  * **並行並發池（Worker Pool = 4）**：原圖批次拉取時限制最大並發數為 4，避免暴擊 CPU 與網路頻寬。
* 💬 **友善 UI 回饋**：若因網頁未聚焦或權限阻擋導致剪貼簿寫入失敗，即時於畫面中央浮現 Toast 提示與按鈕視覺警告反饋。

---

## 🚀 安裝方式 (Installation)

### 方法 A：直接下載 Release 壓縮檔（推薦一般使用者）
1. 前往 **[GitHub Releases 頁面](https://github.com/markleetw/let-me-see-see/releases/latest)** 下載最新版的 `let-me-see-see-v0.1.zip`。
2. 解壓縮下載的 `let-me-see-see-v0.1.zip` 檔案至任意資料夾。
3. 開啟 Google Chrome 瀏覽器，在網址列輸入：
   ```text
   chrome://extensions/
   ```
4. 開啟右上角 **「開發人員模式 (Developer mode)」** 開關。
5. 點擊左上角 **「載入未封裝項目 (Load unpacked)」**，選擇解壓縮後的資料夾。
6. 前往任一份 [Google Docs](https://docs.google.com/document/)、[Google Sheets](https://docs.google.com/spreadsheets/) 或 [Google Slides](https://docs.google.com/presentation/) 頁面重新整理，點擊任意圖片即可體驗！

### 方法 B：自原始碼 Clone（開發者）
```bash
git clone https://github.com/markleetw/let-me-see-see.git
cd let-me-see-see
npm test
```

---

## 🏗️ 架構深度解析與核心反解演算法 (Architecture & Core Mechanism)

> ⚠️ **開發注意 (DO NOT BREAK)**：Google Docs 採用虛擬化渲染，畫面上完全不存在傳統的 `<img>` DOM 元素，而是將內容繪製在多塊 `canvas.kix-canvas-tile-content` 上。

本套件的運作核心如下（主要位於 `dist/contentScripts/index.global.js`）：

```text
[Google Docs Canvas 瓦片] ────────┐
                                  ├──> [離屏像素掃描 / 瓦片縫合] ──> [48x48 感知哈希特徵]
[網路層 PerformanceObserver] ───┘                                           │
         (攔截高解析原圖) ───────────────────────────────────────────────────┼──> [Hamming 比對映射] ──> [浮動工具列 View/Copy/Download]
```

1. **像素掃描與外接矩形提取 (`Mr`, `Nr`, `Dr`, `Lr`, `Fr`, `Pr`)**：
   - 透過離屏 Canvas (`je(e)`) 取得 Canvas 瓦片 ImageData。
   - 根據 Alpha 通道掃描非透明內容邊界（`Nr`），並在跨瓦片時自動垂直縫合（`Fr`）。
2. **網路資源攔截 (`Ir`, `PerformanceObserver`)**：
   - 監聽 `/docs-images-rt/`、`/sheets-images-rt/`、`/slides-images-rt/` 與 `docsubipk` 圖片請求。
   - 自動將 URL 參數升級以獲取高解析原圖（如將尺寸升級至 `=s2048`）。
3. **感知縮圖比對 (`Qt`, `he`, `Rr`)**：
   - 將 Canvas 框選出來的像素與網路抓到的原圖均縮小為 `48 × 48` 特徵矩陣。
   - 進行特徵比對評分（Hamming / 相似度分數），精準將畫布點擊座標映射至原圖 URL。
4. **單圖浮動工具列 (`#letMeSeeSeeToolbar`)**：
   - 點擊圖片時吸附於選取框角落，提供 View（開啟 `Viewer.js`）、Copy（Clipboard API 寫入二進位原圖）、Download（直接下載原圖）。

---

## 🔍 關鍵函式定位索引 (Key Functions Map)

維護與二次開發時，可依據下列函式在 `dist/contentScripts/index.global.js` 中快速導航：

| 函式 | 角色職責 | 重點說明 |
| :--- | :--- | :--- |
| `Fs()` | Google Docs 入口調度 | 監聽 selection box 變化與點擊事件 |
| `Ps(n)` | Google Docs 點擊處理器 | 包含空白點擊快速過濾與 8 秒掃描冷卻防抖 |
| `Li()` | 全文圖像反解與快取更新 | 執行 Canvas 瓦片掃描與網路原圖比對 |
| `Ln(n, e)` | 圖像發現總調度器 | 統一調用 `Ur` (Docs)、`jr` (Sheets)、`Wr` (Slides) |
| `Ur()` / `Mr()` | Canvas 瓦片遍歷與切片比對 | **核心演算法**，負責像素分析與跨瓦片縫合 |
| `Or(n)` | 網路圖片批次抓取 | 封裝並行池（Worker Pool = 4）生成 48x48 縮圖 |
| `sn(n)` | 浮動工具列動作分發 | 處理 `zoom`、`copy`、`download` 點擊指令 |
| `vi(n)` | 圖片複製至剪貼簿 | Clipboard API 寫入，包含失敗 Toast 與按鈕警告反饋 |
| `bi(n, e)` | 單圖下載觸發器 | 建立 Blob 物件觸發瀏覽器下載 |
| `Qe(n)` | 檔名正規化處理 | 支援 Unicode 屬性轉義 `\p{L}\p{N}`，完整保留中文檔名 |

---

## 🛠️ 開發與驗證指引 (Development & Testing)

### 1. 自動化測試 (Automated Integration Tests)
本專案提供基於 Node.js 內建模組之自動化測試套件，模擬 Chrome Extension MV3 執行環境，完整覆蓋各大主要流程（入口路由、DOM 工具列、檔名淨化、LRU 顯存釋放、Toast UI、Service Worker）：
```bash
npm test
# 或直接執行
node --test tests/extension.test.js
```

### 2. 語法檢查
```bash
npm run check-syntax
```

### 3. 開發者除錯 (DevTools)
在 Google Docs 頁面開啟 DevTools (`F12`)，切換至 **Console**：
```javascript
// 檢查目前快取的圖片張數（上限嚴格保持在 30 張以內）
window.__letMeSeeSeeCache.size

// 查看當前快取中的圖片清單
[...window.__letMeSeeSeeCache.keys()]
```

---

## 📁 專案結構 (Directory Structure)

```text
let-me-see-see/
├── manifest.json                  # Chrome Extension Manifest V3 設定
├── README.md                      # 本說明文件（包含使用者說明與開發者架構）
├── assets/                        # 擴充功能圖示 (經典放大鏡大眼圖示)
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   ├── icon.png (512x512)
│   ├── icons8-google-docs-96.png
│   ├── icons8-google-sheets-96.png
│   └── icons8-google-slides-96.png
└── dist/
    ├── background/
    │   └── index.mjs              # Background Service Worker
    ├── contentScripts/
    │   ├── index.global.js        # 核心 Content Script (演算法、快取、工具列)
    │   └── style.css              # 浮動工具列與 Viewer.js 樣式
    └── popup/
        └── index.html             # 擴充功能彈出設定面板
```

---

## 📄 授權說明 (License)

本專案受到 Google Docs Image Zoom 啟發，採用 MIT License 開源發布。
