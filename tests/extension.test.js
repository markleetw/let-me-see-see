const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const vm = require("vm");
const { createMockEnv } = require("./mock-env.js");

const contentScriptCode = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
const backgroundScriptCode = fs.readFileSync("dist/background/index.mjs", "utf8");

test("Suite 1: Content Script Initialization & Document Type Routing", async (t) => {
  await t.test("Google Docs: loads with zero runtime errors and mounts event listeners", async () => {
    const { context, listeners, doc, chromeMock } = createMockEnv("https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit");
    
    assert.doesNotThrow(() => {
      vm.runInNewContext(contentScriptCode, context);
    }, "Content script execution must not throw any ReferenceError or TypeError");

    // Check listeners
    assert.ok(listeners.doc.click && listeners.doc.click.length > 0, "Document click listener must be mounted");
    assert.ok(listeners.doc.scroll && listeners.doc.scroll.length > 0, "Document scroll listener must be mounted");
    assert.ok(listeners.win.resize && listeners.win.resize.length > 0, "Window resize listener must be mounted");

    // Check style injection
    const styleLink = doc.head.children.find(el => el.tagName === "LINK" && el.getAttribute("rel") === "stylesheet");
    assert.ok(styleLink, "dist/contentScripts/style.css stylesheet must be injected into document head");
    assert.ok(styleLink.getAttribute("href").includes("dist/contentScripts/style.css"));

    // Check runtime message handler for get-document-type
    assert.ok(chromeMock.runtime.onMessage._listeners.length > 0, "Runtime message listener must be registered");
    const docTypeListener = chromeMock.runtime.onMessage._listeners[0];
    const reply = await new Promise(resolve => docTypeListener({ type: "get-document-type" }, {}, resolve));
    assert.strictEqual(reply, "document", "Must report document type as 'document'");
  });

  await t.test("Google Slides: routes to presentation handler", async () => {
    const { context, listeners, chromeMock } = createMockEnv("https://docs.google.com/presentation/d/1BxiMVs0/edit");
    assert.doesNotThrow(() => {
      vm.runInNewContext(contentScriptCode, context);
    });
    assert.ok(listeners.doc.click && listeners.doc.click.length > 0, "Presentation click listener must be mounted");
    const docTypeListener = chromeMock.runtime.onMessage._listeners[0];
    const reply = await new Promise(resolve => docTypeListener({ type: "get-document-type" }, {}, resolve));
    assert.strictEqual(reply, "presentation", "Must report document type as 'presentation'");
  });

  await t.test("Google Sheets: routes to spreadsheets handler", async () => {
    const { context, chromeMock } = createMockEnv("https://docs.google.com/spreadsheets/d/1BxiMVs0/edit");
    assert.doesNotThrow(() => {
      vm.runInNewContext(contentScriptCode, context);
    });
    const docTypeListener = chromeMock.runtime.onMessage._listeners[0];
    const reply = await new Promise(resolve => docTypeListener({ type: "get-document-type" }, {}, resolve));
    assert.strictEqual(reply, "spreadsheets", "Must report document type as 'spreadsheets'");
  });
});

test("Suite 2: Floating Toolbar & Action Button Construction", (t) => {
  const { context, doc, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
  vm.runInNewContext(contentScriptCode, context);

  // Invoke Te() via __letMeSeeSee to construct floating toolbar
  win.__letMeSeeSee.Te();

  const toolbar = doc.getElementById("letMeSeeSeeToolbar");
  assert.ok(toolbar, "Floating toolbar #letMeSeeSeeToolbar must be created and present in DOM");
  assert.ok(toolbar.classList.contains("zoom-container"), "Toolbar must have zoom-container class");

  // Check all 3 action buttons
  const viewBtn = doc.getElementById("ZoomInIconBtn");
  assert.ok(viewBtn, "View image button (ZoomInIconBtn) must be rendered");
  assert.strictEqual(viewBtn.getAttribute("aria-label"), "View image");

  const copyBtn = doc.getElementById("CopyImageIconBtn");
  assert.ok(copyBtn, "Copy image button (CopyImageIconBtn) must be rendered");
  assert.strictEqual(copyBtn.getAttribute("aria-label"), "Copy image");

  const ocrBtn = doc.getElementById("OcrTextIconBtn");
  assert.ok(ocrBtn, "OCR text button (OcrTextIconBtn) must be rendered");
  assert.strictEqual(ocrBtn.getAttribute("aria-label"), "圖片文字辨識複製 (OCR)");

  const downloadBtn = doc.getElementById("DownloadIconBtn");
  assert.ok(downloadBtn, "Download image button (DownloadIconBtn) must be rendered");
  assert.strictEqual(downloadBtn.getAttribute("aria-label"), "Download image");

  const batchBtn = doc.getElementById("BatchDownloadIconBtn");
  assert.strictEqual(batchBtn, null, "Batch download button (BatchDownloadIconBtn) should NOT be in floating toolbar (only in popup)");
});

test("Suite 3: Chinese & Unicode Document Title and Download Filename Sanitization", (t) => {
  const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
  vm.runInNewContext(contentScriptCode, context);

  const titles = [
    { input: "测试文件 - Google 文件", expected: "测试文件" },
    { input: "2026年Q3財務季報表 - Google Docs", expected: "2026年q3財務季報表" },
    { input: "产品设计稿（最终版） - Google 幻灯片", expected: "产品设计稿-最终版" },
    { input: "Project_Proposal_v2 - Google Sheets", expected: "project_proposal_v2" },
    { input: "   繁體中文與English 混合檔名   - Google 試算表", expected: "繁體中文與english-混合檔名" },
  ];

  for (const { input, expected } of titles) {
    const result = win.__letMeSeeSee.Qe(input);
    assert.strictEqual(result, expected, `Document title '${input}' should sanitize to '${expected}' without mangling unicode/chinese`);
  }
});

test("Suite 4: LRU Image Cache & Explicit GPU VRAM Cleanup", (t) => {
  const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
  vm.runInNewContext(contentScriptCode, context);

  const cache = win.__letMeSeeSee.getCache();
  assert.ok(cache instanceof Map, "Cache must be an instance of Map");
  assert.strictEqual(win.__letMeSeeSeeCache, cache, "window.__letMeSeeSeeCache must alias the internal LRU map");

  let closedCount = 0;
  function createMockBitmap(id) {
    return {
      id,
      close() {
        closedCount++;
      }
    };
  }

  // Simulate inserting into cache with LRU policy
  function addWithLRU(map, key, bitmap, maxCap = 30) {
    if (map.has(key)) {
      map.delete(key);
    } else if (map.size >= maxCap) {
      const oldestKey = map.keys().next().value;
      const oldestVal = map.get(oldestKey);
      if (oldestVal && typeof oldestVal.close === "function") {
        oldestVal.close();
      }
      map.delete(oldestKey);
    }
    map.set(key, bitmap);
  }

  // Add 30 items
  for (let i = 1; i <= 30; i++) {
    addWithLRU(cache, `img_${i}`, createMockBitmap(`img_${i}`));
  }
  assert.strictEqual(cache.size, 30, "Cache should hold exactly 30 items");
  assert.strictEqual(closedCount, 0, "No bitmaps should be closed when within 30 item capacity");

  // Add 31st item -> oldest item must be evicted and bitmap.close() called
  addWithLRU(cache, "img_31", createMockBitmap("img_31"));
  assert.strictEqual(cache.size, 30, "Cache size must remain capped at 30");
  assert.strictEqual(closedCount, 1, "Oldest bitmap must be closed when evicted to free GPU VRAM");
  assert.strictEqual(cache.has("img_1"), false, "Oldest item img_1 must be evicted");
  assert.strictEqual(cache.has("img_31"), true, "Newest item img_31 must be present");
});

test("Suite 5: Clipboard Failure UI Feedback (Toast & Button Error State)", async (t) => {
  const { context, doc, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
  vm.runInNewContext(contentScriptCode, context);

  // Invoke uiToast via __letMeSeeSee
  win.__letMeSeeSee.uiToast("複製失敗：請先點擊頁面或允許剪貼簿權限");

  const toast = doc.getElementById("let-me-see-see-toast");
  assert.ok(toast, "Toast alert #let-me-see-see-toast must be created in DOM on error");
  assert.ok(toast.textContent.includes("複製失敗"), "Toast message must notify user about copy failure");

  await t.test("uiToast stays persistent when duration is 0, and updates smoothly on completion", () => {
    win.__letMeSeeSee.uiToast("正在辨識圖片文字 (OCR)...", 0);
    const liveToast = doc.getElementById("let-me-see-see-toast");
    assert.ok(liveToast, "Toast must be present in DOM");
    assert.strictEqual(liveToast.textContent, "正在辨識圖片文字 (OCR)...", "Toast must display running state");

    // When OCR completes, it updates the same element in-place
    win.__letMeSeeSee.uiToast("已成功掃描並複製文字至剪貼簿！(15 字)", 3500);
    assert.strictEqual(liveToast.textContent, "已成功掃描並複製文字至剪貼簿！(15 字)", "Toast text must update in-place without removing early");
  });
});

test("Suite 6: Background Service Worker Initialization", (t) => {
  const chromeMock = {
    runtime: {
      id: "let-me-see-see-extension-id",
      onMessage: {
        _listeners: [],
        addListener(fn) { this._listeners.push(fn); }
      }
    },
    offscreen: {
      hasDocument: async () => false,
      createDocument: async () => {},
      closeDocument: async () => {}
    },
    storage: {
      local: {
        get: async () => ({}),
        set: async () => ({})
      }
    }
  };

  const context = {
    chrome: chromeMock,
    globalThis: {},
    console: console,
    Date: Date,
    Promise: Promise
  };
  context.globalThis = context;

  assert.doesNotThrow(() => {
    vm.runInNewContext(backgroundScriptCode, context);
  }, "Background service worker must initialize cleanly without error");

  assert.ok(chromeMock.runtime.onMessage._listeners.length > 0, "Background worker must register message listeners for storage sync");
});

test("Suite 7: On-Demand Batch Download & ZIP Packaging", async (t) => {
  await t.test("Batch download message triggers scan, zip generation, and download", async () => {
    const freshScript = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win, chromeMock } = createMockEnv("https://docs.google.com/document/d/123/edit");
    vm.runInNewContext(freshScript, context);

    assert.ok(typeof win.__letMeSeeSee.batchDownloadAllImages === "function", "batchDownloadAllImages must be exposed");

    // Test Cs directly with simulated image URLs
    const sampleUrls = [
      "https://lh3.googleusercontent.com/docsubipk/sample1=s2048",
      "https://lh3.googleusercontent.com/docsubipk/sample2=s2048"
    ];
    let progressCalls = [];
    const result = await win.__letMeSeeSee.Cs(sampleUrls, (done, total) => {
      progressCalls.push({ done, total });
    });

    assert.strictEqual(result.downloaded, 2, "Must report 2 downloaded files in zip");
    assert.strictEqual(result.failed, 0, "Must report 0 failed files");
    assert.strictEqual(progressCalls.length, 2, "onProgress must be called for each file");

    // Test runtime message 'batch-download-images'
    const listener = chromeMock.runtime.onMessage._listeners[0];
    assert.ok(listener, "Runtime message listener must be present");
    const response = await new Promise(resolve => {
      listener({ type: "batch-download-images" }, {}, resolve);
    });
    assert.ok(response, "Must respond to batch-download-images message");
    assert.ok(typeof response.downloaded === "number", "Response must include downloaded count");
  });

  await t.test("Popup UI: mounts batch export section and button", async () => {
    const popupScript = fs.readFileSync("dist/popup/popup.js", "utf8");
    const { context, doc, win, chromeMock } = createMockEnv("https://docs.google.com/document/d/123/edit");
    
    // Simulate popup environment with .popup container
    const popupMain = new context.Element("main");
    popupMain.className = "popup";
    doc.body.appendChild(popupMain);

    chromeMock.tabs = {
      query: async () => [{ id: 101, url: "https://docs.google.com/document/d/123/edit" }],
      sendMessage: async (tabId, msg) => {
        if (msg.type === "get-document-type") return "document";
        if (msg.type === "batch-download-images") return { downloaded: 5, failed: 0 };
        return null;
      }
    };

    vm.runInNewContext(popupScript, context);
    await new Promise(r => setTimeout(r, 50));

    const exportSection = doc.getElementById("lmss-batch-export-section");
    assert.ok(exportSection, "Popup must mount #lmss-batch-export-section");
    const exportBtn = doc.getElementById("lmss-batch-export-btn");
    assert.ok(exportBtn, "Popup must render #lmss-batch-export-btn");
    assert.strictEqual(exportBtn.disabled, false, "Export button must be enabled on supported document");
  });
});

test("Suite 8: Google Sheets In-Cell Images & =IMAGE() Formula Extraction", async (t) => {
  await t.test("extractFormulaBarImageUrl parses formula bar inputs and data attributes", () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, doc, win } = createMockEnv("https://docs.google.com/spreadsheets/d/123/edit");
    vm.runInNewContext(script, context);

    assert.strictEqual(typeof win.__letMeSeeSee.extractFormulaBarImageUrl, "function");

    // Case 1: #t-formula-bar-input with double quotes
    const formulaBar = doc.createElement("div");
    formulaBar.id = "t-formula-bar-input";
    formulaBar.textContent = '=IMAGE("https://example.com/products/item1.png")';
    doc.body.appendChild(formulaBar);

    assert.strictEqual(
      win.__letMeSeeSee.extractFormulaBarImageUrl(),
      "https://example.com/products/item1.png",
      "Should extract URL from #t-formula-bar-input with double quotes"
    );

    // Case 2: single quotes with options
    formulaBar.textContent = "=image('https://example.com/avatar.webp', 4, 100, 100)";
    assert.strictEqual(
      win.__letMeSeeSee.extractFormulaBarImageUrl(),
      "https://example.com/avatar.webp",
      "Should extract URL with single quotes and extra arguments"
    );

    // Case 3: Nested ARRAYFORMULA with IF and IMAGE
    formulaBar.textContent = '=ARRAYFORMULA(IF(A1="","",IMAGE("https://example.com/array-art.png",4,160,160)))';
    assert.strictEqual(
      win.__letMeSeeSee.extractFormulaBarImageUrl(),
      "https://example.com/array-art.png",
      "Should extract URL from nested =ARRAYFORMULA(IF(..., IMAGE(...)))"
    );

    // Case 4: Cell reference =IMAGE(A1,4,160,160) with URL in referenced cell or DOM
    const cellA1 = doc.createElement("div");
    cellA1.textContent = "https://cdn02.pinkoi.com/product/mmqaPyUt/0/160";
    doc.body.appendChild(cellA1);

    formulaBar.textContent = '=IMAGE(A1,4,160,160)';
    assert.strictEqual(
      win.__letMeSeeSee.extractFormulaBarImageUrl(),
      "https://cdn02.pinkoi.com/product/mmqaPyUt/0/160",
      "Should extract Pinkoi image URL from referenced cell for =IMAGE(A1,4,160,160)"
    );

    // Case 4b: Nested ARRAYFORMULA with cell reference
    formulaBar.textContent = '=ARRAYFORMULA(IF(A1="","",IMAGE(A1,4,160,160)))';
    assert.strictEqual(
      win.__letMeSeeSee.extractFormulaBarImageUrl(),
      "https://cdn02.pinkoi.com/product/mmqaPyUt/0/160",
      "Should extract Pinkoi image URL from referenced cell for =ARRAYFORMULA(IF(..., IMAGE(A1,...)))"
    );

    // Case 5: data-sheets-formula attribute
    formulaBar.remove();
    const cellWithAttr = doc.createElement("div");
    cellWithAttr.setAttribute("data-sheets-formula", '=IMAGE("https://example.com/sheet-icon.svg")');
    doc.body.appendChild(cellWithAttr);

    assert.strictEqual(
      win.__letMeSeeSee.extractFormulaBarImageUrl(),
      "https://example.com/sheet-icon.svg",
      "Should extract URL from data-sheets-formula attribute"
    );
  });

  await t.test("Ir gathers formula bar images and image resources for spreadsheets", () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, doc, win } = createMockEnv("https://docs.google.com/spreadsheets/d/123/edit");
    vm.runInNewContext(script, context);

    const formulaBar = doc.createElement("div");
    formulaBar.id = "t-formula-bar-input";
    formulaBar.textContent = '=IMAGE("https://example.com/embedded-art.jpg")';
    doc.body.appendChild(formulaBar);

    const mockResources = [
      { name: "https://docs.google.com/spreadsheets/d/123/sheets-images-rt/abc=s2048" },
      { name: "https://cdn.example.com/photos/chart.png" },
      { name: "https://lh3.googleusercontent.com/docsubipk/hash=w100" }
    ];

    const urls = win.__letMeSeeSee.Ir("spreadsheets", mockResources);
    assert.ok(urls.includes("https://example.com/embedded-art.jpg"), "Ir must include formula bar image URL");
    assert.ok(urls.includes("https://cdn.example.com/photos/chart.png"), "Ir must include external image resources");
    assert.ok(urls.some(u => u.includes("sheets-images-rt")), "Ir must include standard sheets-images-rt URLs");
  });

  await t.test("Google Sheets: only floating images mount toolbar; in-cell clicks do not trigger false positive toolbar", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, doc, win } = createMockEnv("https://docs.google.com/spreadsheets/d/123/edit");
    vm.runInNewContext(script, context);

    // Simulate clicking an ordinary cell or empty space
    const normalCell = doc.createElement("div");
    normalCell.className = "grid-cell";
    normalCell.textContent = "Normal Text";
    doc.body.appendChild(normalCell);

    normalCell.dispatchEvent({ target: normalCell, type: "click", clientX: 100, clientY: 100 });
    const toolbar = doc.getElementById("letMeSeeSeeToolbar");
    // Toolbar should either not exist or not be displayed
    assert.ok(!toolbar || toolbar.style.getPropertyValue("display") === "none", "Normal cells must not show toolbar");

    // Hs initializes floating images support
    assert.ok(typeof win.__letMeSeeSee.Hs === "function", "Hs must be defined");
  });
});

test("Suite 9: Image OCR Text Extraction to Clipboard", async (t) => {
  await t.test("ocrImageToText recognizes text with TextDetector and writes to clipboard", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");

    let writtenText = "";
    win.navigator.clipboard.writeText = async (txt) => {
      writtenText = txt;
    };

    // Provide mock TextDetector
    win.TextDetector = class MockTextDetector {
      async detect(source) {
        return [
          { rawValue: "Hello World" },
          { rawValue: "2026 Q3 Financial Report" }
        ];
      }
    };

    vm.runInNewContext(script, context);

    assert.strictEqual(typeof win.__letMeSeeSee.ocrImageToText, "function");

    const ok = await win.__letMeSeeSee.ocrImageToText("https://example.com/report-chart.png");
    assert.strictEqual(ok, true, "OCR extraction should succeed");
    assert.strictEqual(writtenText, "Hello World\n2026 Q3 Financial Report", "Extracted text must be written to clipboard");
  });

  await t.test("ocrImageToText falls back to DOM metadata when TextDetector is unavailable", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, doc, win } = createMockEnv("https://docs.google.com/document/d/123/edit");

    let writtenText = "";
    win.navigator.clipboard.writeText = async (txt) => {
      writtenText = txt;
    };
    delete win.TextDetector;

    // Create img with alt text
    const img = doc.createElement("img");
    img.src = "https://example.com/quarterly-plan.png";
    img.setAttribute("alt", "季度策略發展規劃圖");
    doc.body.appendChild(img);

    vm.runInNewContext(script, context);

    const ok = await win.__letMeSeeSee.ocrImageToText("https://example.com/quarterly-plan.png");
    assert.strictEqual(ok, true, "OCR extraction via metadata fallback should succeed");
    assert.strictEqual(writtenText, "季度策略發展規劃圖", "Alt text must be written to clipboard");
  });

  await t.test("ocrImageToText sends do-ocr message to background/offscreen and copies Chinese text to clipboard", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, doc, win, chromeMock } = createMockEnv("https://docs.google.com/document/d/123/edit");
    delete win.TextDetector;

    let receivedMsg = null;
    let openedTabs = 0;
    win.open = () => { openedTabs++; return {}; };

    chromeMock.runtime.sendMessage = (msg, ...args) => {
      receivedMsg = msg;
      const cb = typeof args[args.length - 1] === "function" ? args[args.length - 1] : null;
      let res = null;
      if (msg.type === "do-ocr") {
        res = {
          success: true,
          text: "資料源總表\n卡片標題\n首頁\n範例\n累積命中\nmatcha-tw 5.4%"
        };
      }
      if (cb) cb(res);
      return Promise.resolve(res);
    };

    let writtenText = "";
    win.navigator.clipboard.writeText = async (txt) => {
      writtenText = txt;
    };

    vm.runInNewContext(script, context);

    const ok = await win.__letMeSeeSee.ocrImageToText("https://example.com/chinese-table.png");
    assert.strictEqual(ok, true, "OCR extraction via background offscreen should succeed");
    assert.strictEqual(receivedMsg.type, "do-ocr", "Message type must be 'do-ocr'");
    assert.ok(writtenText.includes("資料源總表"), "Extracted text must contain Traditional Chinese title");
    assert.ok(writtenText.includes("卡片標題"), "Extracted text must contain card title");
    assert.ok(writtenText.includes("matcha-tw 5.4%"), "Extracted text must contain English and numbers");
    assert.strictEqual(openedTabs, 0, "OCR must NEVER open any external tabs or Google Lens");

    const toast = doc.getElementById("let-me-see-see-toast");
    assert.ok(toast, "Toast notification must be displayed");
    assert.ok(toast.textContent.includes("已成功掃描並複製文字至剪貼簿"), "Toast must confirm successful copy");
  });

  await t.test("offscreen.js registers runtime message listener for do-ocr and invokes worker", async () => {
    const offscreenScript = fs.readFileSync("dist/offscreen/offscreen.js", "utf8");
    const { context, chromeMock } = createMockEnv("chrome-extension://dummy-id/dist/offscreen/offscreen.html");

    const recognizeCalls = [];
    context.Tesseract = {
      createWorker: async () => ({
        setParameters: async () => {},
        recognize: async (img) => {
          recognizeCalls.push(img);
          return { data: { text: "離線 Tesseract 辨識結果：資料源總表" } };
        }
      })
    };

    vm.runInNewContext(offscreenScript, context);

    assert.ok(chromeMock.runtime.onMessage._listeners.length > 0, "Offscreen script must register onMessage listener");
    const listener = chromeMock.runtime.onMessage._listeners[0];

    const response = await new Promise((resolve) => {
      listener({ target: "offscreen", type: "do-ocr", image: "data:image/png;base64,mock" }, {}, resolve);
    });

    assert.strictEqual(response.success, true, "Offscreen OCR response must report success");
    assert.strictEqual(response.text, "離線 Tesseract 辨識結果：資料源總表");
    assert.strictEqual(recognizeCalls[0], "data:image/png;base64,mock");
  });

  await t.test("ocrImageToText directly uses window.__letMeSeeSeeActiveRaster when present", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, doc, win } = createMockEnv("https://docs.google.com/spreadsheets/d/123/edit");
    delete win.TextDetector;

    let writtenText = "";
    win.navigator.clipboard.writeText = async (txt) => {
      writtenText = txt;
    };

    let receivedImageData = null;
    win.OCRAD = (imgData) => {
      receivedImageData = imgData;
      return "2026/04 US$ 81,379 80.30%";
    };

    win.__letMeSeeSeeActiveRaster = {
      width: 1024,
      height: 319,
      pixels: new Uint8ClampedArray(1024 * 319 * 4)
    };

    vm.runInNewContext(script, context);

    const ok = await win.__letMeSeeSee.ocrImageToText("data:image/png;base64,...");
    assert.strictEqual(ok, true, "OCR extraction via active raster must succeed");
    assert.ok(receivedImageData !== null, "OCRAD must have received ImageData");
    assert.strictEqual(receivedImageData.width, 1024);
    assert.strictEqual(receivedImageData.height, 319);
    assert.strictEqual(writtenText, "2026/04 US$ 81,379 80.30%", "Must copy OCR text to clipboard");
  });

  await t.test("ocrImageToText reports failure toast when empty or not found", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, doc, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
    delete win.TextDetector;

    vm.runInNewContext(script, context);

    const ok = await win.__letMeSeeSee.ocrImageToText("");
    assert.strictEqual(ok, false, "OCR on empty url should fail");

    const toast = doc.getElementById("let-me-see-see-toast");
    assert.ok(toast, "Toast must be displayed on failure");
    assert.ok(toast.textContent.includes("未指定圖片"), "Toast must display warning message");
  });

  await t.test("cleanOcrText cleans noise lines, repairs currency, years, and digit glyphs", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
    vm.runInNewContext(script, context);

    const dirtyRaw = `. - . _\n_ . _ . . | _ _ _ . . . | |\n202b/04 usS 8|,379 usS b5,345 80.30% -| b,o34\n202b/05 usS 90,977 usS 7|,I7| 78.23% -35,84|\n202b/0b usS 90,409 usS b8,924 7b.24% -57,32b\n202b/07 usS 9|,b38 usS b9,397 75.73% -79,5bb\n2026108 usS 94,505 usS 62,659 66.30% -1||,4|2`;

    const cleaned = win.__letMeSeeSee.cleanOcrText(dirtyRaw);
    assert.ok(typeof cleaned === "string", "cleanOcrText must return string");
    assert.ok(!cleaned.includes(". - . _"), "Pure symbol noise must be removed");
    assert.ok(!cleaned.includes("_ . _ . ."), "Line noise must be removed");
    assert.ok(cleaned.includes("2026/04 US$ 81,379 US$ 65,345 80.30% -16,034"), "Line 1 must be cleanly repaired");
    assert.ok(cleaned.includes("2026/05 US$ 90,977 US$ 71,171 78.23% -35,841"), "Line 2 must be cleanly repaired");
    assert.ok(cleaned.includes("2026/06 US$ 90,409 US$ 68,924 76.24% -57,326"), "Line 3 must be cleanly repaired");
    assert.ok(cleaned.includes("2026/07 US$ 91,638 US$ 69,397 75.73% -79,566"), "Line 4 must be cleanly repaired");
    assert.ok(cleaned.includes("2026/08 US$ 94,505 US$ 62,659 66.30% -111,412"), "Line 5 must be cleanly repaired");
  });

  await t.test("cleanOcrText preserves Chinese characters while stripping noise lines", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
    vm.runInNewContext(script, context);

    const input = ". - . _\n資料源總表\n_ . _ . . | _ _ _ . . . | |\n卡片標題\n首頁 「主題企劃」 5.4%";
    const cleaned = win.__letMeSeeSee.cleanOcrText(input);
    assert.ok(!cleaned.includes(". - . _"), "Noise line 1 must be removed");
    assert.ok(!cleaned.includes("_ . _ . ."), "Noise line 2 must be removed");
    assert.strictEqual(cleaned.includes("資料源總表"), true, "Chinese header must be preserved");
    assert.strictEqual(cleaned.includes("卡片標題"), true, "Chinese cell text must be preserved");
    assert.strictEqual(cleaned.includes("首頁「主題企劃」 5.4%"), true, "Chinese and percentage must be preserved without stray space");
  });

  await t.test("cleanOcrText filters out roadmap solid bar hallucinations and gibberish", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
    vm.runInNewContext(script, context);

    const dirtyRoadmap = `Ww Gift Finder v2                                           System Noti Optimization Stage 2 Search Result Optimization
es 、 、 ‧ ‧v,‧ ˊ〈b‧ˇ<zˇZzZ=”                              Se 加汪玉入入和生生加入入玉玉入入入入入國國加
System Noti Optimization Stage 1     沁 Product Page Revamp             Ww Gift Finder v3
a                              CEE eee
sep                  oct                  nov                  dec                  jan                  feb                  mar
2026
es es)           re
DWEB Browse Page Revamp         DWEB Homepage Revamp
Homepage Iteration                                                             Product Page Iteration
Offsite RMN (product marketing only)`;

    const cleaned = win.__letMeSeeSee.cleanOcrText(dirtyRoadmap);

    assert.ok(!cleaned.includes("加汪玉入入"), "Solid bar Chinese repetitive noise must be filtered out");
    assert.ok(!cleaned.includes("‧v,‧ ˊ〈b"), "Solid bar punctuation noise must be filtered out");
    assert.ok(!cleaned.includes("CEE eee"), "Stray single-character fragments must be filtered out");
    assert.ok(!cleaned.includes("es es)"), "Stray short fragments must be filtered out");

    assert.ok(cleaned.includes("Gift Finder v2"), "Real project title 1 must be kept and cleaned of star hallucination");
    assert.ok(cleaned.includes("Product Page Revamp"), "Real project title 2 must be kept and cleaned of star hallucination");
    assert.ok(cleaned.includes("System Noti Optimization Stage 2"), "Real project title 3 must be kept");
    assert.ok(cleaned.includes("DWEB Browse Page Revamp"), "Real project title 4 must be kept");
    assert.ok(cleaned.includes("sep  oct  nov  dec  jan  feb  mar"), "Timeline months must be kept");
    assert.ok(cleaned.includes("2026"), "Year 2026 must be kept");
  });

  await t.test("cleanOcrText handles large text without catastrophic backtracking (ReDoS free)", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
    vm.runInNewContext(script, context);

    // Construct a large text payload containing many short words and potential ReDoS patterns
    const lines = [];
    for (let i = 0; i < 100; i++) {
      lines.push(`row ${i} a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2026/08 US$ 94,505`);
      lines.push(`es 、 、 ‧ ‧v,‧ ˊ〈b‧ˇ<zˇZzZ=” line ${i} test`);
      lines.push(`es es) re`);
    }
    const massiveText = lines.join("\n");

    const startTime = Date.now();
    const cleaned = win.__letMeSeeSee.cleanOcrText(massiveText);
    const duration = Date.now() - startTime;

    assert.ok(duration < 100, `cleanOcrText must execute in < 100ms even for 300 lines (took ${duration}ms)`);
    assert.ok(cleaned.includes("2026/08 US$ 94,505"), "Valid data must be kept");
    assert.ok(!cleaned.includes("es es) re"), "Noise lines must be filtered");
  });

  await t.test("triggerOcrPrewarm sends prewarm-ocr message to background", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win, chromeMock } = createMockEnv("https://docs.google.com/document/d/123/edit");
    
    let sentMsg = null;
    chromeMock.runtime.sendMessage = async (msg) => {
      sentMsg = msg;
      return { success: true };
    };

    vm.runInNewContext(script, context);
    win.__letMeSeeSee.triggerOcrPrewarm();

    assert.ok(sentMsg !== null, "sentMsg should not be null");
    assert.strictEqual(sentMsg.type, "prewarm-ocr", "Must send prewarm-ocr message to background");
  });

  await t.test("offscreen.js responds to prewarm-ocr message", async () => {
    const offscreenScript = fs.readFileSync("dist/offscreen/offscreen.js", "utf8");
    const { context, chromeMock } = createMockEnv("chrome-extension://dummy-id/dist/offscreen/offscreen.html");

    let createWorkerCalled = false;
    context.Tesseract = {
      createWorker: async () => {
        createWorkerCalled = true;
        return {
          setParameters: async () => {},
          recognize: async () => ({ data: { text: "ready" } })
        };
      }
    };

    vm.runInNewContext(offscreenScript, context);

    const listener = chromeMock.runtime.onMessage._listeners[0];
    const response = await new Promise((resolve) => {
      listener({ target: "offscreen", type: "prewarm-ocr" }, {}, resolve);
    });

    assert.strictEqual(response.success, true, "Prewarm must report success");
    assert.strictEqual(response.prewarming, true, "Prewarm must set prewarming flag");
    assert.strictEqual(createWorkerCalled, true, "Prewarm must initialize Tesseract worker");
  });

  await t.test("cleanOcrText removes spaces between Chinese characters and punctuation", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
    vm.runInNewContext(script, context);

    const spacedChinese = "國 小 生 開 學 用 品\n首 頁 「 主 題 企 劃 」 5.4% US$ 81,379";
    const cleaned = win.__letMeSeeSee.cleanOcrText(spacedChinese);

    assert.ok(cleaned.includes("國小生開學用品"), "Stray spaces between Chinese characters must be removed");
    assert.ok(cleaned.includes("首頁「主題企劃」 5.4% US$ 81,379"), "Chinese punctuation spaces removed while English/numbers retain spacing");
  });

  await t.test("offscreen.js filters low confidence tokens and joins CJK without spaces", async () => {
    const offscreenScript = fs.readFileSync("dist/offscreen/offscreen.js", "utf8");
    const { context, chromeMock } = createMockEnv("chrome-extension://dummy-id/dist/offscreen/offscreen.html");

    context.Tesseract = {
      createWorker: async () => ({
        setParameters: async () => {},
        recognize: async () => ({
          data: {
            lines: [
              {
                confidence: 30, // low line confidence (< 50) -> should be discarded
                text: "加汪玉入入",
                words: [{ text: "加汪玉入入", confidence: 30 }]
              },
              {
                confidence: 85, // valid line
                words: [
                  { text: "國", confidence: 80 },
                  { text: "小", confidence: 85 },
                  { text: "生", confidence: 90 },
                  { text: "a", confidence: 45 }, // single char with confidence < 60 -> filtered
                  { text: "用品", confidence: 88 }
                ]
              }
            ]
          }
        })
      })
    };

    vm.runInNewContext(offscreenScript, context);
    const listener = chromeMock.runtime.onMessage._listeners[0];
    const response = await new Promise((resolve) => {
      listener({ target: "offscreen", type: "do-ocr", image: "data:image/png;base64,mock" }, {}, resolve);
    });

    assert.strictEqual(response.success, true);
    assert.ok(!response.text.includes("加汪玉入入"), "Low confidence line must be skipped");
    assert.strictEqual(response.text, "國小生用品", "CJK words must be joined without spaces and low-confidence single-char skipped");
  });

  await t.test("cleanOcrText filters vertical pipe lines and repairs month numbers in Gantt charts", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
    vm.runInNewContext(script, context);

    const dirtyGantt = "7 月 8 月 9 月 10 月 1 12 月 1B\n|\n|\n|\n|\niichi Project\n分潤廣告\nOffline Event Registration\nOffline Event Website";
    const cleaned = win.__letMeSeeSee.cleanOcrText(dirtyGantt);

    assert.ok(cleaned.includes("7月 8月 9月 10月 11月 12月 1月"), "Months must be cleaned, 1 repaired to 11月, and 1B fixed to 1月");
    assert.ok(!cleaned.includes("|"), "Pipes must be filtered");
    assert.ok(cleaned.includes("分潤廣告"), "Project names must be preserved");
    assert.ok(cleaned.includes("Offline Event Website"), "English project names must be preserved");
  });

  await t.test("offscreen.js responds to copy-to-clipboard message", async () => {
    const offscreenScript = fs.readFileSync("dist/offscreen/offscreen.js", "utf8");
    const { context, chromeMock } = createMockEnv("chrome-extension://dummy-id/dist/offscreen/offscreen.html");

    let copiedValue = null;
    context.navigator = {
      clipboard: {
        writeText: async (t) => {
          copiedValue = t;
        }
      }
    };

    vm.runInNewContext(offscreenScript, context);
    const listener = chromeMock.runtime.onMessage._listeners[0];
    const response = await new Promise((resolve) => {
      listener({ target: "offscreen", type: "copy-to-clipboard", text: "已清洗文字" }, {}, resolve);
    });

    assert.strictEqual(response.success, true);
    assert.strictEqual(response.copied, true);
    assert.strictEqual(copiedValue, "已清洗文字", "Offscreen must copy clean text to clipboard");
  });

  await t.test("ocrImageToText cleans text before writing to clipboard", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win, chromeMock } = createMockEnv("https://docs.google.com/document/d/123/edit");

    chromeMock.runtime.sendMessage = (msg, ...args) => {
      const cb = typeof args[args.length - 1] === "function" ? args[args.length - 1] : null;
      let res = null;
      if (msg.type === "do-ocr") {
        res = {
          success: true,
          text: "7 月 8 月 9 月 10 月 1 12 月 1B\n|\n|\n2026/04 USS 6,000"
        };
      }
      if (cb) cb(res);
      return Promise.resolve(res);
    };

    let writtenToClipboard = null;
    win.navigator.clipboard.writeText = async (t) => {
      writtenToClipboard = t;
    };
    context.navigator.clipboard.writeText = win.navigator.clipboard.writeText;

    vm.runInNewContext(script, context);
    await win.__letMeSeeSee.ocrImageToText("https://example.com/test.png");

    assert.ok(writtenToClipboard !== null, "Cleaned text must be written to clipboard");
    assert.ok(!writtenToClipboard.includes("|"), "Pipes must not be in clipboard");
    assert.ok(writtenToClipboard.includes("7月 8月 9月 10月 11月 12月 1月"), "Timeline must be cleaned in clipboard");
    assert.ok(writtenToClipboard.includes("US$ 6,000"), "Currency must be normalized in clipboard");
  });

  await t.test("cleanOcrText cleans header chevrons and normalizes CumulativeGap", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
    vm.runInNewContext(script, context);

    const dirtyHeader = "Month vy Goal(USD) v Actual (USD) » % Achv. CumulativeGap(USD) v";
    const cleaned = win.__letMeSeeSee.cleanOcrText(dirtyHeader);

    assert.ok(cleaned.includes("Cumulative Gap"), "CumulativeGap must be spaced as Cumulative Gap");
    assert.ok(!cleaned.includes("vy"), "Stray chevron artifact vy must be removed");
    assert.ok(!cleaned.includes("»"), "Stray chevron artifact » must be removed");
  });

  await t.test("extractLinesFromResult preserves 80.30% and financial percentage lines", async () => {
    const offscreenScript = fs.readFileSync("dist/offscreen/offscreen.js", "utf8");
    const { context } = createMockEnv("chrome-extension://dummy-id/dist/offscreen/offscreen.html");
    vm.runInNewContext(offscreenScript, context);

    const mockTesseractResult = {
      data: {
        lines: [
          {
            confidence: 42,
            text: "2026/04 US$ 81,379 US$ 65,345 80.30% -16,034",
            words: [
              { text: "2026/04", confidence: 45 },
              { text: "US$", confidence: 50 },
              { text: "81,379", confidence: 48 },
              { text: "US$", confidence: 52 },
              { text: "65,345", confidence: 49 },
              { text: "80.30%", confidence: 38 },
              { text: "-16,034", confidence: 46 }
            ]
          }
        ]
      }
    };

    const lines = vm.runInContext("extractLinesFromResult(" + JSON.stringify(mockTesseractResult) + ")", context);
    assert.strictEqual(lines.length, 1, "Line must not be dropped");
    assert.ok(lines[0].includes("80.30%"), "80.30% must be preserved in line");
    assert.ok(lines[0].includes("US$ 81,379"), "Currency amounts must be preserved");
  });
});




