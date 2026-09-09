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

    // 1. Adaptive 2x Upscaling for small snippets / cropped single-line images
    // Tesseract LSTM requires character height of ~30-35px.
    // If image height < 140px or small low-res box (<220px high and <350px wide),
    // fine strokes benefit from 2x scaling.
    // Larger document/table screenshots (e.g. 1024x319) MUST maintain 1:1 native resolution
    // to prevent font anti-aliasing blur and yellow/colored cell wash-out.
    let scale = 1;
    if (origH < 140 || (origH < 220 && origW < 350)) {
      scale = 2;
    }
    // Prevent exceeding maximum safe WASM dimension (2400px) or excessive memory (> 3,000,000 pixels)
    if (origW * scale > 2400 || origH * scale > 2400 || (origW * scale * origH * scale > 3000000)) {
      const maxDim = Math.max(origW, origH);
      if (maxDim > 0 && maxDim * scale > 2400) {
        scale = Math.max(1, 2400 / maxDim);
      }
    }

    // 2. Padding margin for small snippets / single lines
    // Leptonica baseline fitting and Otsu binarization require whitespace margins
    // around text lines; tight crops often get rejected without margin.
    const needPadding = origH < 140 || (origH < 220 && origW < 350);
    const pad = needPadding ? 36 : 0;

    const targetW = Math.round(origW * scale);
    const targetH = Math.round(origH * scale);
    const canvasW = targetW + pad * 2;
    const canvasH = targetH + pad * 2;

    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return imageSource;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, pad, pad, targetW, targetH);

    const imgData = ctx.getImageData(0, 0, canvasW, canvasH);
    const data = imgData.data;
    const totalPixels = targetW * targetH;

    // 3. Polarity Detection (Dark/colored background with light/white text)
    // Sample perimeter border pixels from actual image rect (excluding pad)
    let borderLumaSum = 0;
    let borderCount = 0;
    const borderThickness = Math.max(1, Math.min(8, Math.floor(Math.min(targetW, targetH) * 0.05)));

    for (let y = pad; y < pad + targetH; y++) {
      for (let x = pad; x < pad + targetW; x++) {
        if (
          y < pad + borderThickness ||
          y >= pad + targetH - borderThickness ||
          x < pad + borderThickness ||
          x >= pad + targetW - borderThickness
        ) {
          const idx = (y * canvasW + x) * 4;
          const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          borderLumaSum += luma;
          borderCount++;
        }
      }
    }

    const avgBorderLuma = borderCount > 0 ? borderLumaSum / borderCount : 128;

    // Sample overall luminance & bright pixels within image area
    let overallLumaSum = 0;
    let brightPixelCount = 0;
    let sampledCount = 0;
    const stepY = Math.max(1, Math.floor(targetH / 50));
    const stepX = Math.max(1, Math.floor(targetW / 100));

    for (let y = pad; y < pad + targetH; y += stepY) {
      for (let x = pad; x < pad + targetW; x += stepX) {
        const idx = (y * canvasW + x) * 4;
        const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
        overallLumaSum += luma;
        if (luma > 180) brightPixelCount++;
        sampledCount++;
      }
    }

    const avgOverallLuma = sampledCount > 0 ? overallLumaSum / sampledCount : 128;
    const brightRatio = sampledCount > 0 ? brightPixelCount / sampledCount : 0;

    // Detect dark background with light text:
    // Case A: Border is dark (< 130)
    // Case B: Overall image is dark (< 115) with bright text elements (> 5% bright pixels)
    const isDarkBackground = avgBorderLuma < 130 || (avgOverallLuma < 115 && brightRatio > 0.05);

    if (isDarkBackground) {
      for (let y = pad; y < pad + targetH; y++) {
        for (let x = pad; x < pad + targetW; x++) {
          const idx = (y * canvasW + x) * 4;
          data[idx] = 255 - data[idx];         // R
          data[idx + 1] = 255 - data[idx + 1]; // G
          data[idx + 2] = 255 - data[idx + 2]; // B
        }
      }
    }

    // 4. Contrast adjustment ONLY for inverted/dark background images
    // Never modify contrast of light documents / spreadsheets to avoid washing out colored/yellow cells
    if (isDarkBackground) {
      const contrastFactor = 1.15;
      for (let y = pad; y < pad + targetH; y++) {
        for (let x = pad; x < pad + targetW; x++) {
          const idx = (y * canvasW + x) * 4;
          data[idx] = Math.min(255, Math.max(0, Math.round(((data[idx] - 128) * contrastFactor) + 128)));
          data[idx + 1] = Math.min(255, Math.max(0, Math.round(((data[idx + 1] - 128) * contrastFactor) + 128)));
          data[idx + 2] = Math.min(255, Math.max(0, Math.round(((data[idx + 2] - 128) * contrastFactor) + 128)));
        }
      }
    }

    // 5. Fill padding margin with clean white (#ffffff) to ensure clean background for Leptonica
    if (pad > 0) {
      for (let y = 0; y < canvasH; y++) {
        for (let x = 0; x < canvasW; x++) {
          if (x < pad || x >= canvasW - pad || y < pad || y >= canvasH - pad) {
            const idx = (y * canvasW + x) * 4;
            data[idx] = 255;
            data[idx + 1] = 255;
            data[idx + 2] = 255;
            data[idx + 3] = 255;
          }
        }
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
