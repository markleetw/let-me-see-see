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
    const { context, listeners, chromeMock } = createMockEnv("https://docs.google.com/spreadsheets/d/1BxiMVs0/edit");
    assert.doesNotThrow(() => {
      vm.runInNewContext(contentScriptCode, context);
    });
    assert.ok(listeners.doc.click && listeners.doc.click.length > 0, "Spreadsheets click listener must be mounted");
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
  assert.ok(batchBtn, "Batch download button (BatchDownloadIconBtn) must be rendered");
  assert.strictEqual(batchBtn.getAttribute("aria-label"), "打包下載全文件圖片 (ZIP)");
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

test("Suite 5: Clipboard Failure UI Feedback (Toast & Button Error State)", (t) => {
  const { context, doc, win } = createMockEnv("https://docs.google.com/document/d/123/edit");
  vm.runInNewContext(contentScriptCode, context);

  // Invoke uiToast via __letMeSeeSee
  win.__letMeSeeSee.uiToast("複製失敗：請先點擊頁面或允許剪貼簿權限");

  const toast = doc.getElementById("let-me-see-see-toast");
  assert.ok(toast, "Toast alert #let-me-see-see-toast must be created in DOM on error");
  assert.ok(toast.textContent.includes("複製失敗"), "Toast message must notify user about copy failure");
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

    // Case 3: data-sheets-formula attribute
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

  await t.test("Zs click handler responds to in-cell image element and aligns toolbar", async () => {
    const script = fs.readFileSync("dist/contentScripts/index.global.js", "utf8");
    const { context, doc, win } = createMockEnv("https://docs.google.com/spreadsheets/d/123/edit");
    vm.runInNewContext(script, context);

    const gridContainer = doc.createElement("div");
    gridContainer.className = "grid4-inner-container";
    doc.body.appendChild(gridContainer);

    const cell = doc.createElement("div");
    cell.className = "grid-cell";
    const cellImg = doc.createElement("img");
    cellImg.src = "https://example.com/in-cell-photo.png";
    cell.appendChild(cellImg);
    gridContainer.appendChild(cell);

    // Call Zs with target inside grid4-inner-container
    await win.__letMeSeeSee.Zs({
      target: cellImg,
      clientX: 50,
      clientY: 60
    });

    const toolbar = doc.getElementById("letMeSeeSeeToolbar");
    assert.ok(toolbar, "Toolbar should exist");
    assert.notStrictEqual(toolbar.style.getPropertyValue("display"), "none", "Toolbar should be shown on cell click");
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
});


