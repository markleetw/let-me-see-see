import test from "node:test";
import assert from "node:assert";
import {
  calculateImageCropBounds,
  cropImageToDataUrl
} from "../../src/content/ui/lightbox-crop.js";

test("Unit: Lightbox Image Crop Bounds & Coordinate Mapping", async (t) => {
  await t.test("calculateImageCropBounds: 1:1 scale with safety buffer", () => {
    const screenBox = { left: 100, top: 100, width: 200, height: 150 };
    const imgRect = { left: 50, top: 50, width: 800, height: 600 };
    const naturalWidth = 800;
    const naturalHeight = 600;

    const bounds = calculateImageCropBounds(screenBox, imgRect, naturalWidth, naturalHeight, 8);

    assert.strictEqual(bounds.cropX, 42, "cropX must be (100 - 50) * 1 - 8 = 42");
    assert.strictEqual(bounds.cropY, 42, "cropY must be (100 - 50) * 1 - 8 = 42");
    assert.strictEqual(bounds.cropW, 216, "cropW must be 200 + 16 = 216");
    assert.strictEqual(bounds.cropH, 166, "cropH must be 150 + 16 = 166");
  });

  await t.test("calculateImageCropBounds: scaled/zoomed in image (scale = 0.5)", () => {
    // Rendered on screen at 2x zoom (1600x1200), original is 800x600
    const screenBox = { left: 200, top: 200, width: 400, height: 300 };
    const imgRect = { left: 0, top: 0, width: 1600, height: 1200 };
    const naturalWidth = 800;
    const naturalHeight = 600;

    const bounds = calculateImageCropBounds(screenBox, imgRect, naturalWidth, naturalHeight, 8);

    // relX = 200 * 0.5 = 100 - 8 = 92
    assert.strictEqual(bounds.cropX, 92);
    // relY = 200 * 0.5 = 100 - 8 = 92
    assert.strictEqual(bounds.cropY, 92);
    // cropW = 400 * 0.5 + 16 = 216
    assert.strictEqual(bounds.cropW, 216);
    // cropH = 300 * 0.5 + 16 = 166
    assert.strictEqual(bounds.cropH, 166);
  });

  await t.test("calculateImageCropBounds: clamps to zero at top/left boundary", () => {
    // Selection starts right at the image edge
    const screenBox = { left: 10, top: 10, width: 100, height: 100 };
    const imgRect = { left: 10, top: 10, width: 800, height: 600 };

    const bounds = calculateImageCropBounds(screenBox, imgRect, 800, 600, 8);

    assert.strictEqual(bounds.cropX, 0, "cropX must clamp at 0 and not be negative");
    assert.strictEqual(bounds.cropY, 0, "cropY must clamp at 0 and not be negative");
    assert.ok(bounds.cropW > 0);
    assert.ok(bounds.cropH > 0);
  });

  await t.test("calculateImageCropBounds: clamps to image boundary at bottom/right", () => {
    const screenBox = { left: 750, top: 550, width: 100, height: 100 };
    const imgRect = { left: 0, top: 0, width: 800, height: 600 };

    const bounds = calculateImageCropBounds(screenBox, imgRect, 800, 600, 8);

    assert.ok(bounds.cropX + bounds.cropW <= 800, "cropX + cropW must never exceed naturalWidth");
    assert.ok(bounds.cropY + bounds.cropH <= 600, "cropY + cropH must never exceed naturalHeight");
  });

  await t.test("calculateImageCropBounds: handles null or empty inputs gracefully", () => {
    const bounds = calculateImageCropBounds(null, null, 0, 0);
    assert.strictEqual(bounds.cropW, 0);
    assert.strictEqual(bounds.cropH, 0);
  });

  await t.test("cropImageToDataUrl: returns null on invalid or zero-size bounds", () => {
    assert.strictEqual(cropImageToDataUrl(null, { cropW: 0, cropH: 0 }), null);
  });
});
