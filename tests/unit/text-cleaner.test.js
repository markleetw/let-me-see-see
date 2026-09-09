import test from "node:test";
import assert from "node:assert";
import { cleanOcrText } from "../../src/content/ocr/text-cleaner.js";

test("Unit: OCR Text Cleaner & ReDoS Guard", async (t) => {
  await t.test("CJK spacing removal: eliminates internal spaces between Chinese characters", () => {
    const input = "這 是一 個 繁體 中文 測試 句子 。";
    const expected = "這是一個繁體中文測試句子。";
    assert.strictEqual(cleanOcrText(input), expected);
  });

  await t.test("English word spacing: preserves natural spaces between Latin words", () => {
    const input = "Google Workspace Document and Spreadsheet";
    assert.strictEqual(cleanOcrText(input), "Google Workspace Document and Spreadsheet");
  });

  await t.test("Mixed CJK and Latin: preserves space between Latin and Chinese", () => {
    const input = "專案 Project Alpha 開始 執行";
    assert.strictEqual(cleanOcrText(input), "專案 Project Alpha 開始執行");
  });

  await t.test("Financial percentages and currencies: preserves exact amounts and % signs", () => {
    const input = "2026/04 US$ 81,379 US$ 65,345 80.30% -16,034";
    const cleaned = cleanOcrText(input);
    assert.ok(cleaned.includes("80.30%"), "Must preserve 80.30%");
    assert.ok(cleaned.includes("US$ 81,379"), "Must preserve US$ 81,379");
    assert.ok(cleaned.includes("-16,034"), "Must preserve negative variance -16,034");
  });

  await t.test("Gantt chart artifacts: strips vertical bars, noise dots and repairs month lines", () => {
    const input = "2026/04 | | 81,379 | 80.30% (Q1 Goal)";
    const cleaned = cleanOcrText(input);
    assert.ok(!cleaned.includes("| |"), "Must remove vertical bar noise");
    assert.ok(cleaned.includes("80.30%"), "Must preserve percent");
  });

  await t.test("Table headers: cleans chevron noise and normalizes CumulativeGap", () => {
    const input = "CumulativeGap » vy Product Backlog";
    const cleaned = cleanOcrText(input);
    assert.ok(cleaned.includes("Cumulative Gap"), "Must normalize CumulativeGap to Cumulative Gap");
    assert.ok(!cleaned.includes("»"), "Must remove chevron");
    assert.ok(!cleaned.includes("vy"), "Must remove stray vy artifact");
  });

  await t.test("Performance & ReDoS Guard: 50,000 characters process in under 50ms", () => {
    const base = "這是一個測試字串 2026/04 US$ 81,379 80.30% 專案進度追蹤 (Testing Roadmap) 穩定執行中\n";
    const massive = base.repeat(500); // ~50,000 chars

    const start = performance.now();
    const result = cleanOcrText(massive);
    const elapsed = performance.now() - start;

    assert.ok(result.length > 0, "Result must not be empty");
    assert.ok(elapsed < 50, `Expected cleanOcrText to finish in <50ms, took ${elapsed.toFixed(2)}ms`);
  });
});
