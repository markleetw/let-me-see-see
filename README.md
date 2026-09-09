# Let Me See See

Let Me See See 是一款專為 Google Docs、Google Sheets 與 Google Slides 設計的 Chrome 擴充功能（Manifest V3），解決在 Google 辦公套件中無法直接放大預覽、複製高解析原圖、批次打包下載及圖片文字提取的限制。

---

## 功能列表

- **放大預覽 (View)**：點選圖片開啟燈箱檢視，支援 1:1 檢視、旋轉與自由平移縮放。
- **原圖複製 (Copy)**：一鍵將高解析原圖二進位 PNG 複製至剪貼簿，可直接於其他軟體貼上。
- **原圖下載 (Download)**：自 Google CDN 直接擷取最高解析度原圖，自動以文件標題命名。
- **批次打包下載 (Batch ZIP)**：一鍵掃描當前文件中的所有圖片，自動打包為 ZIP 檔案下載。
- **離線文字辨識 (OCR)**：內建 100% 本機 Tesseract WASM 引擎，一鍵辨識圖片中之繁體中文與英文並自動寫入剪貼簿，支援甘特圖時程與財務表格數字智慧修復。
- **Google Sheets 圖片支援**：完整支援浮動圖片、儲存格內嵌圖片以及 `=IMAGE()` 函式公式反解。

---

## 安裝方式

1. 至 [Releases](https://github.com/markleetw/let-me-see-see/releases) 下載最新版 `let-me-see-see-v0.2.0.zip` 並解壓縮。
2. 開啟 Chrome 瀏覽器，前往 `chrome://extensions/`。
3. 開啟右上角的「開發人員模式」。
4. 點擊左上角「載入未封裝項目」，選取剛才解壓縮的資料夾。
   *(若先前已載入舊版，請先點擊舊版的「移除」)*
5. 前往任一份 Google Docs、Sheets 或 Slides 頁面重新整理即可開始使用。

---

## 使用方式

1. 在 Google Docs、Sheets 或 Slides 點選任意圖片。
2. 圖片右上角會吸附快捷工具列：
   - **預覽圖示**：開啟高解析燈箱。
   - **複製圖示**：複製原圖二進位資料。
   - **下載圖示**：下載高解析原圖。
   - **OCR 圖示**：辨識圖片內文字並複製至剪貼簿。
3. 點擊瀏覽器工具列上的擴充功能圖示，可自彈出視窗觸發「打包下載全文件圖片 (.zip)」。

---

## 支援環境

| 平台 | 支援功能 |
| :--- | :--- |
| Google Docs | 畫布瓦片反解、燈箱放大、原圖複製/下載、全文打包、離線 OCR |
| Google Sheets | 浮動圖片、儲存格圖片、`=IMAGE()` 公式反解、離線 OCR、全文打包 |
| Google Slides | 投影片圖片、SVG/Blob 反解、離線 OCR、全文打包 |

---

## 授權

本專案採用 MIT License 開源發布。
