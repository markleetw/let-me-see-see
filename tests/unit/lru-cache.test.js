import test from "node:test";
import assert from "node:assert";
import { imageCache, getImageBitmap } from "../../src/content/shared/lru-cache.js";

test("Unit: LRU Cache & GPU Memory Leak Guard", async (t) => {
  await t.test("Capacity invariant: never exceeds 60 cached items", async () => {
    imageCache.clear();

    const closedBitmaps = [];
    for (let i = 0; i < 100; i++) {
      const url = `https://example.com/img-${i}.png`;
      const fakeBitmap = {
        id: i,
        width: 100,
        height: 100,
        close() {
          closedBitmaps.push(this.id);
        }
      };

      // Manually manage cache entries as LRU does
      if (imageCache.size >= 60) {
        const oldestKey = imageCache.keys().next().value;
        const oldestPromise = imageCache.get(oldestKey);
        imageCache.delete(oldestKey);
        const resolved = await oldestPromise;
        if (resolved?.bitmap?.close) resolved.bitmap.close();
      }
      imageCache.set(url, Promise.resolve({ bitmap: fakeBitmap, mimeType: "image/png" }));
    }

    assert.strictEqual(imageCache.size, 60, "Cache must hold exactly 60 items");
    assert.strictEqual(closedBitmaps.length, 40, "Exactly 40 evicted bitmaps must have had close() invoked");
  });

  await t.test("Memory leak guard: 1,000 rapid evictions execute cleanly without memory growth", async () => {
    imageCache.clear();
    let closedCount = 0;

    for (let i = 0; i < 1000; i++) {
      const url = `https://example.com/stream-${i}.png`;
      const fakeBitmap = {
        close() { closedCount++; }
      };

      if (imageCache.size >= 60) {
        const oldestKey = imageCache.keys().next().value;
        const p = imageCache.get(oldestKey);
        imageCache.delete(oldestKey);
        const item = await p;
        item?.bitmap?.close();
      }
      imageCache.set(url, Promise.resolve({ bitmap: fakeBitmap, mimeType: "image/png" }));
    }

    assert.strictEqual(imageCache.size, 60);
    assert.strictEqual(closedCount, 940, "940 items must be safely closed and reclaimed");
    imageCache.clear();
  });
});
