import test from "node:test";
import assert from "node:assert";
import { sanitizeFilename, getImageExtension } from "../../src/content/shared/download-manager.js";

test("Unit: Download Manager & Filename Sanitization", async (t) => {
  await t.test("Filename sanitization: preserves Chinese characters while removing invalid filesystem characters", () => {
    const title = "2026 年度 / 財務報表 (草稿) : 最終版 - Google 試算表";
    const sanitized = sanitizeFilename(title);
    assert.strictEqual(sanitized, "2026-年度-財務報表-草稿-最終版");
  });

  await t.test("Filename sanitization: removes Google Docs / Sheets / Slides suffixes", () => {
    assert.strictEqual(sanitizeFilename("Product Roadmap - Google Docs"), "product-roadmap");
    assert.strictEqual(sanitizeFilename("Marketing Pitch - Google Slides"), "marketing-pitch");
    assert.strictEqual(sanitizeFilename("Q1 Goals - Google 表格"), "q1-goals");
  });

  await t.test("Extension detection: accurately maps Blob MIME types", () => {
    assert.strictEqual(getImageExtension({ type: "image/png" }), "png");
    assert.strictEqual(getImageExtension({ type: "image/jpeg" }), "jpg");
    assert.strictEqual(getImageExtension({ type: "image/webp" }), "webp");
    assert.strictEqual(getImageExtension({ type: "image/svg+xml" }), "svg");
    assert.strictEqual(getImageExtension({ type: "image/gif" }), "gif");
  });

  await t.test("Extension detection: extracts extension from URL if blob type is generic", () => {
    const url = "https://example.com/assets/banner.webp?version=2&size=large#top";
    assert.strictEqual(getImageExtension(null, url), "webp");
  });
});
