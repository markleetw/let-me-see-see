const fs = require("fs");
const vm = require("vm");

function createMockEnv(url = "https://docs.google.com/document/d/123/edit") {
  const elements = new Map();
  const listeners = { doc: {}, win: {} };

  class MockElement {
    constructor(tag) {
      this.tagName = tag.toUpperCase();
      this.children = [];
      this.classList = {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        contains(c) { return this._classes.has(c); }
      };
      this.style = {
        _props: {},
        animationName: "initial",
        setProperty(k, v) { this._props[k] = v; },
        getPropertyValue(k) { return this._props[k] || ""; },
        removeProperty(k) { delete this._props[k]; }
      };
      this.attributes = {};
      this._className = "";
      this.isConnected = true;
    }
    set className(val) {
      this._className = val || "";
      this._className.split(/\s+/).forEach(c => c && this.classList.add(c));
    }
    get className() {
      return this._className;
    }
    setAttribute(k, v) { this.attributes[k] = v; if (k === "id") this.id = v; }
    getAttribute(k) { return this.attributes[k] || null; }
    appendChild(el) { this.children.push(el); return el; }
    append(...els) { this.children.push(...els); }
    remove() { this.isConnected = false; }
    replaceChildren(...els) { this.children = [...els]; }
    getBoundingClientRect() { return { left: 10, top: 20, right: 110, bottom: 120, width: 100, height: 100 }; }
    querySelectorAll(sel) { return []; }
    querySelector(sel) { return null; }
    closest(sel) { return null; }
  }

  const docBody = new MockElement("body");
  const docHead = new MockElement("head");

  const win = {
    innerWidth: 1920,
    innerHeight: 1080,
    addEventListener(type, fn, opts) {
      listeners.win[type] = listeners.win[type] || [];
      listeners.win[type].push(fn);
    },
    removeEventListener(type, fn) {
      if (listeners.win[type]) listeners.win[type] = listeners.win[type].filter(f => f !== fn);
    },
    setTimeout(fn, ms) { return setTimeout(fn, ms); },
    clearTimeout(id) { clearTimeout(id); },
    requestAnimationFrame(cb) { return setTimeout(cb, 16); },
    cancelAnimationFrame(id) { clearTimeout(id); },
    navigator: {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      clipboard: {
        write: async () => {},
        writeText: async () => {}
      }
    }
  };

  const doc = {
    title: "測試文件 - Google 文件",
    location: { href: url },
    head: docHead,
    body: docBody,
    createElement(tag) {
      return new MockElement(tag);
    },
    getElementById(id) {
      const find = (el) => {
        if (el.id === id) return el;
        for (const c of el.children) {
          const res = find(c);
          if (res) return res;
        }
        return null;
      };
      return find(docBody) || find(docHead);
    },
    getElementsByClassName(cls) { return []; },
    querySelectorAll(sel) { return []; },
    querySelector(sel) { return null; },
    addEventListener(type, fn, opts) {
      listeners.doc[type] = listeners.doc[type] || [];
      listeners.doc[type].push(fn);
    },
    removeEventListener(type, fn) {
      if (listeners.doc[type]) listeners.doc[type] = listeners.doc[type].filter(f => f !== fn);
    }
  };

  const chromeMock = {
    runtime: {
      id: "let-me-see-see-extension-id",
      sendMessage: async (msg) => {
        if (msg.type === "get-location") return "top-right";
        return null;
      },
      onMessage: {
        _listeners: [],
        addListener(fn) { this._listeners.push(fn); }
      },
      getURL: (path) => "chrome-extension://dummy-id/" + path
    },
    storage: {
      local: {
        get: async () => ({}),
        set: async () => ({})
      },
      onChanged: {
        _listeners: [],
        addListener(fn) { this._listeners.push(fn); }
      }
    }
  };

  const context = {
    window: win,
    document: doc,
    navigator: win.navigator,
    chrome: chromeMock,
    console: console,
    Date: Date,
    Math: Math,
    Map: Map,
    Set: Set,
    Array: Array,
    Object: Object,
    Promise: Promise,
    String: String,
    Number: Number,
    Boolean: Boolean,
    Error: Error,
    TypeError: TypeError,
    RangeError: RangeError,
    Element: MockElement,
    HTMLElement: MockElement,
    HTMLImageElement: MockElement,
    ImageData: class ImageData { constructor(w, h) { this.width = w; this.height = h; this.data = new Uint8ClampedArray(w * h * 4); } },
    Image: class Image { constructor() { this.onload = null; this.src = ""; } },
    Blob: class Blob { constructor(chunks) { this.chunks = chunks; } },
    PerformanceObserver: class PerformanceObserver { observe() {} disconnect() {} },
    setTimeout: (fn, ms) => setTimeout(fn, ms),
    clearTimeout: (id) => clearTimeout(id),
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id)
  };
  const loc = new URL(url);
  doc.location = loc;
  win.location = loc;
  context.location = loc;
  win.document = doc;
  win.window = win;
  win.globalThis = win;
  win.chrome = chromeMock;
  win.performance = { now: () => Date.now() };
  context.globalThis = win;

  return { context, listeners, doc, win, chromeMock };
}

module.exports = { createMockEnv };
