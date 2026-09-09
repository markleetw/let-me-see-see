/**
 * Image Enhancer for Offline OCR
 * - Adaptive 2x upscaling for small snippets / low-res images to bring Chinese stroke height into Tesseract's optimal range (~30-35px).
 * - Polarity detection & inversion for dark/colored backgrounds with white/light text.
 * - Contrast stretch for photo backgrounds.
 * - Immediate canvas disposal to protect GPU VRAM.
 */

export async function enhanceImageForOcr(imageSource) {
  if (!imageSource || typeof document === "undefined" || typeof Image === "undefined") {
    return imageSource;
  }

  try {
    const img = await loadImageElement(imageSource);
    if (!img || !img.width || !img.height) return imageSource;

    const origW = img.naturalWidth || img.width;
    const origH = img.naturalHeight || img.height;

    // 1. Adaptive 2x Upscaling for small images / cropped snippets
    // Tesseract LSTM requires character height of ~30-35px.
    // If image height < 500px or width < 800px, 12-18px Chinese characters
    // have merged strokes; upscaling 2x cleanly separates fine strokes.
    let scale = 1;
    if (origH < 500 || origW < 800) {
      scale = 2;
    }
    // Prevent exceeding maximum safe WASM dimension (1800px)
    if (origW * scale > 1800 || origH * scale > 1800) {
      scale = 1;
    }

    const targetW = Math.round(origW * scale);
    const targetH = Math.round(origH * scale);

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return imageSource;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, targetW, targetH);

    const imgData = ctx.getImageData(0, 0, targetW, targetH);
    const data = imgData.data;
    const totalPixels = targetW * targetH;

    // 2. Polarity Detection (Dark/colored background with light/white text)
    // Sample perimeter border pixels (top/bottom rows and left/right cols)
    let borderLumaSum = 0;
    let borderCount = 0;
    const borderThickness = Math.max(1, Math.min(8, Math.floor(Math.min(targetW, targetH) * 0.05)));

    for (let y = 0; y < targetH; y++) {
      for (let x = 0; x < targetW; x++) {
        if (
          y < borderThickness ||
          y >= targetH - borderThickness ||
          x < borderThickness ||
          x >= targetW - borderThickness
        ) {
          const idx = (y * targetW + x) * 4;
          const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          borderLumaSum += luma;
          borderCount++;
        }
      }
    }

    const avgBorderLuma = borderCount > 0 ? borderLumaSum / borderCount : 128;

    // Sample overall luminance & bright pixels
    let overallLumaSum = 0;
    let brightPixelCount = 0;
    const step = Math.max(1, Math.floor(totalPixels / 5000));
    let sampledCount = 0;

    for (let i = 0; i < totalPixels; i += step) {
      const idx = i * 4;
      const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
      overallLumaSum += luma;
      if (luma > 180) brightPixelCount++;
      sampledCount++;
    }

    const avgOverallLuma = sampledCount > 0 ? overallLumaSum / sampledCount : 128;
    const brightRatio = sampledCount > 0 ? brightPixelCount / sampledCount : 0;

    // Detect dark background with light text:
    // Case A: Border is dark (< 130)
    // Case B: Overall image is dark (< 115) with bright text elements (> 5% bright pixels)
    const isDarkBackground = avgBorderLuma < 130 || (avgOverallLuma < 115 && brightRatio > 0.05);

    if (isDarkBackground) {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];         // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
      }
    }

    // 3. Contrast adjustment for photos / low-contrast backgrounds
    if (isDarkBackground || avgBorderLuma < 200) {
      const contrastFactor = 1.15;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, Math.round(((data[i] - 128) * contrastFactor) + 128)));
        data[i + 1] = Math.min(255, Math.max(0, Math.round(((data[i + 1] - 128) * contrastFactor) + 128)));
        data[i + 2] = Math.min(255, Math.max(0, Math.round(((data[i + 2] - 128) * contrastFactor) + 128)));
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const enhancedDataUrl = canvas.toDataURL("image/png");

    // Immediate cleanup of offscreen canvas to reclaim GPU VRAM
    canvas.width = 0;
    canvas.height = 0;

    return enhancedDataUrl;
  } catch (err) {
    console.warn("[Let Me See See] Image enhancement error:", err);
    return imageSource;
  }
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}
