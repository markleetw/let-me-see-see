# AGENTS.md — Technical Architecture & Invariants Specification

This document provides system design, architectural invariants, communication protocols, and operational guidelines for AI coding agents collaborating on the `let-me-see-see` Chrome Extension.

---

## 1. System Overview & Core Purpose

`let-me-see-see` is a Manifest V3 Chrome extension designed for Google Docs, Google Sheets, and Google Slides. It enables viewing, zooming (Viewer.js), copying (Clipboard API), downloading high-resolution images, batch ZIP exporting, and performing 100% offline local OCR (Image-to-Text).

### Runtime Architecture Diagram

```
[Google Docs / Sheets / Slides Tab]
  │
  ├─ Content Script (src/content/)
  │   ├── DOM & Canvas Tile Reverse-Engineering (Docs / Sheets / Slides)
  │   ├── Floating Toolbar & Viewer.js Lightbox
  │   ├── Image LRU Cache (max 60 bitmaps with explicit close())
  │   └── OCR Post-processing & Sanitization (cleanOcrText)
  │
  │   ▲ (chrome.runtime.sendMessage)
  │   ▼
[Background Service Worker] (src/background/)
  │   ├── Route Messages (prewarm-ocr, do-ocr, copy-to-clipboard, get/set location)
  │   └── Ensure / Maintain Offscreen Document Lifecycle
  │
  │   ▲ (chrome.runtime.sendMessage target: "offscreen")
  │   ▼
[Offscreen Document Container] (src/offscreen/)
      ├── Tesseract WASM Worker (chi_tra + eng, 100% local offline)
      ├── Line Extractor (Confidence >= 35% for tokens, CJK spacing)
      └── Clipboard Textarea Fallback
```

---

## 2. Hard Invariants (DO NOT BREAK)

### A. Google Docs Virtualization
- Google Docs renders documents on virtualized `<canvas class="kix-canvas-tile-content">` tiles. **There are NO traditional `<img>` tags in the document body.**
- Never attempt `document.querySelectorAll("img")` to find images in Google Docs.
- Images must be reverse-engineered using:
  1. Alpha-channel boundary scanning on tile pixel data.
  2. Multi-tile vertical stitching (`Fr`, `Pr`, `Br`) when an image spans adjacent canvas tiles.
  3. `PerformanceObserver` interception of `/docs-images-rt/` high-resolution network URLs (upgraded to `=s2048`).
  4. 48×48 perceptual thumbnail similarity matching (Hamming distance threshold `<= 0.28`).

### B. Google Sheets Formula & In-Cell Handling
- Images may be floating or embedded in cells (`=IMAGE("...")` or in-cell images).
- In-cell clicks must **never** mount a false-positive floating toolbar unless an explicit image is selected.
- In-cell formula extraction inspects `#t-formula-bar-input`, `.cell-input`, and `[data-sheets-formula]`.

### C. Chrome Web Store MV3 Compliance & Security
- **Strictly No Remotely Hosted Code**: All WebAssembly binaries (`.wasm`), scripts, and language models (`chi_tra.traineddata.gz`, `eng.traineddata.gz`) MUST be bundled locally within the extension. Never fetch scripts or models from CDNs (e.g. unpkg, cdnjs).
- **Strict CSP**: `manifest.json` uses `"extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"`. Do NOT introduce `'unsafe-eval'`.
- **Minimum Permissions**: Only declare `"storage"`, `"offscreen"`, and `"clipboardWrite"`.

### D. Memory & GPU VRAM Management
- Bitmaps stored in `window.__letMeSeeSeeCache` must not exceed 60 items.
- When evicting an entry or closing a lightbox preview, explicitly call `bitmap.close()` if available to immediately reclaim GPU VRAM.

### E. OCR Image Preprocessing & Resolution Constraints
- Clamped dimension: Scale down images exceeding 1600px before feeding to OCR to prevent WASM Out-of-Memory.
- **Maintain 1:1 Native Resolution**: Never apply fractional bilinear upscaling (e.g. 1.5625x) to screenshots; it blurs fine 1px strokes of Traditional Chinese characters.
- **Never Invert the Whole Image**: Inverting a white-background document makes 90% of the canvas pitch-black (`#000000`), completely breaking Leptonica's Otsu binarization and PSM layout analysis.
- **Wide Strip Segmentation**: Single-line strips with $w \ge 320\text{px}$ and $w/h \ge 3.5$ are segmented at whitespace gaps (`getWideStripSegments`, minGap = 12) with vertical margin exclusion (10%) to prevent LSTM attention drift, falling back to PSM 6 on empty segments.
- **Contrast Dynamic Range Normalization**: Low/medium contrast snippet regions ($35 \le \text{range} \le 165$) are normalized to provide crisp separation for Otsu binarization (linear mapping for light borders, power curve for dark/photo backgrounds).

### F. Lightbox Snippet OCR & Canvas Memory
- **Coordinate Projection & Buffer**: Viewport selection box converts to native image coordinates using:
  `cropX = clamp(0, naturalWidth - 1, round((screenBox.left - imgRect.left) * scaleX - buffer))` with an 18px safety buffer.
- **rAF Drag Throttling**: Lightbox drag-to-select updates are strictly throttled via `requestAnimationFrame` with cancelable `rafId` on `mouseup` and `cleanup` to maintain 60fps on high-polling rate mice.
- **Immediate Canvas Disposal**: Offscreen canvas dimensions are immediately set to `0` after `toDataURL()` to reclaim GPU VRAM.

---

## 3. De-obfuscation & Functions Reference Map

| Original Obfuscated Name | Modular Path / Function | Responsibility |
| :--- | :--- | :--- |
| `Mr()` / `Nr()` / `Dr()` / `Lr()` | `src/content/docs/canvas-scanner.js` | Tile alpha scanning & non-transparent bounding box detection |
| `Fr()` / `Pr()` / `Br()` | `src/content/docs/tile-stitcher.js` | Multi-canvas tile vertical boundary matching & stitching |
| `Ps()` / `Li()` / `Ur()` | `src/content/docs/docs-handler.js` | Selection listener, 8s debounce, and image resolution |
| `extractFormulaBarImageUrl()` | `src/content/sheets/formula-parser.js` | Extracts `=IMAGE()` URLs from formula bar inputs & attributes |
| `_r()` / `br()` / `hr()` | `src/content/sheets/cell-matcher.js` | Grid canvas scanning, cell bounding rect, and formula matching |
| `jr()` / `Rn()` | `src/content/slides/slides-handler.js` | Presentation SVG `<image>` and `blob:` locator |
| `Qt()` | `src/content/shared/image-matcher.js` | Generates 48×48 downsampled perceptual thumbnail raster |
| `he()` / `lr()` | `src/content/shared/image-matcher.js` | Computes pixel difference score (Hamming distance) |
| `Ir()` | `src/content/shared/network-resources.js`| Intercepts resource URLs and converts size parameters to `=s2048` |
| `xn` / `Cn()` / `me()` | `src/content/shared/lru-cache.js` | 60-slot LRU cache storing fetched `ImageBitmap` with eviction |
| `Te()` / `sn()` | `src/content/ui/toolbar.js` | Floating toolbar creation (`#letMeSeeSeeToolbar`) & click dispatcher |
| `vi()` | `src/content/shared/clipboard.js` | Writes high-resolution binary PNG to clipboard via ClipboardItem |
| `bi()` | `src/content/shared/download-manager.js` | Downloads single image with sanitized Unicode filename |
| `Cs()` / `batchDownloadAllImages` | `src/content/shared/download-manager.js` | Concurrency-limited (pool=4) batch download with JSZip |
| `uiToast()` | `src/content/ui/toast.js` | Persistent status notification (`duration: 0` during OCR, 3.5s fadeout) |
| `cleanOcrText()` / `disambiguateCjkCharacters()` | `src/content/ocr/text-cleaner.js` | Strips pipes (`\|`), cleans chevrons, protects numbers/percentages, disambiguates CJK |
| `calculateImageCropBounds()` / `startLightboxCrop()` | `src/content/ui/lightbox-crop.js` | Lightbox coordinate projection with 18px buffer and rAF drag selection |
| `renderModernViewerToolbar()` | `src/content/ui/viewer-lightbox.js` | Modern 44px glassmorphism capsule with SVG icons & crop action |
| `enhanceImageForOcr()` / `getWideStripSegments()` | `src/offscreen/image-enhancer.js` | 2x upscaling, polarity inversion, contrast stretch, whitespace gap segmenter |
| `ocrImageToText()` | `src/content/ocr/ocr-service.js` | Dispatches image to background/offscreen, fallbacks to TextDetector |

---

## 4. Message Passing Protocols

### Background $\leftrightarrow$ Content Script
- `get-document-type` $\rightarrow$ returns `"document" | "spreadsheets" | "presentation" | null`
- `batch-download-images` $\rightarrow$ triggers `batchDownloadAllImages()`, returns `{ downloaded, failed }`
- `get-location` / `update-location` $\rightarrow$ reads/writes `widgetLocation` in `chrome.storage.local`
- `prewarm-ocr` $\rightarrow$ background wakes up Offscreen document and starts Tesseract initialization
- `do-ocr` `{ image: dataUrl }` $\rightarrow$ returns `{ success: true, text }`
- `copy-to-clipboard` `{ text }` $\rightarrow$ returns `{ success: true, copied: true }`

### Background $\leftrightarrow$ Offscreen Document
- `{ target: "offscreen", type: "prewarm-ocr" }`
- `{ target: "offscreen", type: "do-ocr", image }`
- `{ target: "offscreen", type: "copy-to-clipboard", text }`

---

## 5. Testing Invariants & Mocking Rules

- **Callback Execution**: `webextension-polyfill` wraps `chrome.runtime.sendMessage(msg, callback)`. Test mocks for `chrome.runtime.sendMessage` **must** execute `callback(response)` if provided, otherwise the returning Promise hangs indefinitely.
- **ReDoS Protection**: Any regex added to `cleanOcrText` must be verified against catastrophic backtracking using `cleanOcrText handles large text without catastrophic backtracking (ReDoS free)`.
- **Token Confidence**: Financial rows containing numbers/percentages (e.g. `80.30%`, `US$ 6,000`) have OCR confidence around 35-49%. Line filter threshold is set to `35%` when tokens match `/[a-zA-Z]{2,}|[\u4e00-\u9fa5]|\d+[.,%]?\d*/`.
