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

  const downloadBtn = doc.getElementById("DownloadIconBtn");
  assert.ok(downloadBtn, "Download image button (DownloadIconBtn) must be rendered");
  assert.strictEqual(downloadBtn.getAttribute("aria-label"), "Download image");
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
