/**
 * Automated Build & Packaging Pipeline
 * Compiles modular ES6 source code from src/ into dist/ using esbuild.
 */

import { build } from "esbuild";
import { mkdirSync } from "node:fs";

console.log("[build] Starting automated build pipeline...");

mkdirSync("dist/contentScripts", { recursive: true });
mkdirSync("dist/background", { recursive: true });
mkdirSync("dist/offscreen", { recursive: true });

// 1. Content Script (IIFE for browser content script isolation)
await build({
  entryPoints: ["src/content/index.js"],
  outfile: "dist/contentScripts/index.global.js",
  bundle: true,
  format: "iife",
  target: ["chrome100", "es2020"],
  sourcemap: false,
  minify: false,
  legalComments: "inline"
});
console.log("[build] Content script bundled -> dist/contentScripts/index.global.js");

// 2. Background Service Worker (ESM for MV3 type: "module")
await build({
  entryPoints: ["src/background/index.js"],
  outfile: "dist/background/index.mjs",
  bundle: true,
  format: "esm",
  target: ["chrome100", "es2020"],
  sourcemap: false,
  minify: false
});
console.log("[build] Background service worker bundled -> dist/background/index.mjs");

// 3. Offscreen Document Script (IIFE for offscreen.html script tag)
await build({
  entryPoints: ["src/offscreen/offscreen.js"],
  outfile: "dist/offscreen/offscreen.js",
  bundle: true,
  format: "iife",
  target: ["chrome100", "es2020"],
  sourcemap: false,
  minify: false,
  footer: {
    js: "var extractLinesFromResult = typeof window !== 'undefined' && window.__letMeSeeSeeOffscreen ? window.__letMeSeeSeeOffscreen.extractLinesFromResult : (typeof globalThis !== 'undefined' ? globalThis.extractLinesFromResult : undefined);"
  }
});
console.log("[build] Offscreen document script bundled -> dist/offscreen/offscreen.js");

console.log("[build] All bundles built successfully!");
