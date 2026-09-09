import test from "node:test";
import assert from "node:assert";
import {
  getBaseImageUrl,
  upgradeToHighResUrl,
  getNetworkResourceUrls
} from "../../src/content/shared/network-resources.js";

test("Unit: Network Resource Interceptor & Image Stability", async (t) => {
  await t.test("getBaseImageUrl: cleanly strips size and dimension parameters", () => {
    const raw = "https://lh3.googleusercontent.com/docs-images-rt/AO484y_ABC123=s600";
    assert.strictEqual(
      getBaseImageUrl(raw),
      "https://lh3.googleusercontent.com/docs-images-rt/AO484y_ABC123"
    );

    const complex = "https://lh3.googleusercontent.com/docs-images-rt/AO484y_DEF456=w1024-h768-p-k-no-nu";
    assert.strictEqual(
      getBaseImageUrl(complex),
      "https://lh3.googleusercontent.com/docs-images-rt/AO484y_DEF456"
    );
  });

  await t.test("upgradeToHighResUrl: upgrades preview sizes to =s2048", () => {
    const preview = "https://lh3.googleusercontent.com/docs-images-rt/AO484y_ABC123=s400";
    assert.strictEqual(
      upgradeToHighResUrl(preview),
      "https://lh3.googleusercontent.com/docs-images-rt/AO484y_ABC123=s2048"
    );
  });

  await t.test("Deterministic Invariant: 100 images with partial high-res never drops to 94 or duplicates", () => {
    // Simulate 100 images: 100 preview entries + 6 entries that user zoomed to =s2048
    const mockEntries = [];
    for (let i = 1; i <= 100; i++) {
      mockEntries.push({ name: `https://lh3.googleusercontent.com/docs-images-rt/IMG_${i}=s600` });
    }
    // 6 images already upgraded
    for (let i = 1; i <= 6; i++) {
      mockEntries.push({ name: `https://lh3.googleusercontent.com/docs-images-rt/IMG_${i}=s2048` });
    }

    const firstRunUrls = getNetworkResourceUrls("document", mockEntries);
    assert.strictEqual(
      firstRunUrls.length,
      100,
      "First run must detect exactly 100 unique images (not 106 and not 6)"
    );

    // Second run with more zoomed images (simulating repeated batch download)
    for (let i = 7; i <= 94; i++) {
      mockEntries.push({ name: `https://lh3.googleusercontent.com/docs-images-rt/IMG_${i}=s2048` });
    }

    const secondRunUrls = getNetworkResourceUrls("document", mockEntries);
    assert.strictEqual(
      secondRunUrls.length,
      100,
      "Second run must STILL return exactly 100 images (never drop to 94)"
    );
  });
});
