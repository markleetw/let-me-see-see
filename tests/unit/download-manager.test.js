import test from "node:test";
import assert from "node:assert";
import { sanitizeFilename, getImageExtension, packImagesToZip } from "../../src/content/shared/download-manager.js";

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

  await t.test("packImagesToZip: returns downloaded count and handles empty list gracefully", async () => {
    const result = await packImagesToZip([]);
    assert.strictEqual(result.downloaded, 0);
    assert.strictEqual(result.failed, 0);
  });

  await t.test("packImagesToZip: generates _download_report.txt inside zip when some images fail", async () => {
    const originalFetch = globalThis.fetch;
    // Simulate image1 succeeding, image2 failing (e.g. 404)
    globalThis.fetch = async (url) => {
      if (url.includes("fail")) {
        return { ok: false, status: 404 };
      }
      return {
        ok: true,
        blob: async () => new globalThis.Blob(["good-image"], { type: "image/png" })
      };
    };

    let filesInZip = {};
    class MockZip {
      file(name, content) {
        filesInZip[name] = content;
      }
      async generateAsync() {
        return new globalThis.Blob(["mock-zip"]);
      }
    }

    try {
      const urls = [
        "https://example.com/image1=s2048",
        "https://example.com/fail-image2=s2048"
      ];
      const result = await packImagesToZip(urls, null, MockZip);
      assert.strictEqual(result.downloaded, 1, "Must report 1 downloaded file");
      assert.strictEqual(result.failed, 1, "Must report 1 failed file");
      assert.ok(filesInZip["_download_report.txt"], "Must include _download_report.txt when failures occur");
      assert.ok(filesInZip["_download_report.txt"].includes("fail-image2"), "Report must list the failed URL");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
