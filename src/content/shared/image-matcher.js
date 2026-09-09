/**
 * Perceptual Thumbnail Generation, Pixel Raster Utilities & Hamming Distance Matcher
 */

export function getPixelIndex(raster, x, y) {
  return (y * raster.width + x) * 4;
}

export function canvasToRaster(canvas) {
  if (!canvas) return null;
  const offscreen = document.createElement("canvas");
  offscreen.width = canvas.width;
  offscreen.height = canvas.height;
  const ctx = offscreen.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  try {
    ctx.drawImage(canvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
    return { width: imgData.width, height: imgData.height, pixels: imgData.data };
  } catch {
    return null;
  }
}

export function rasterToDataUrl(raster) {
  if (!raster || !raster.width || !raster.height) return null;
  const canvas = document.createElement("canvas");
  canvas.width = raster.width;
  canvas.height = raster.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const imgData = ctx.createImageData(raster.width, raster.height);
  imgData.data.set(raster.pixels);
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL("image/png");
}

export function cropRaster(raster, rect) {
  const left = Math.max(0, Math.floor(rect.left));
  const top = Math.max(0, Math.floor(rect.top));
  const right = Math.min(raster.width, Math.ceil(rect.right));
  const bottom = Math.min(raster.height, Math.ceil(rect.bottom));
  const width = Math.max(1, right - left);
  const height = Math.max(1, bottom - top);
  const pixels = new Uint8ClampedArray(width * height * 4);

  for (let y = 0; y < height; y++) {
    const srcOffset = getPixelIndex(raster, left, top + y);
    const destOffset = y * width * 4;
    pixels.set(raster.pixels.subarray(srcOffset, srcOffset + width * 4), destOffset);
  }

  return { width, height, pixels };
}

export function resizeRaster(raster, targetWidth, targetHeight) {
  if (raster.width === targetWidth && raster.height === targetHeight) return raster;
  const pixels = new Uint8ClampedArray(targetWidth * targetHeight * 4);

  for (let y = 0; y < targetHeight; y++) {
    const srcY = Math.min(raster.height - 1, Math.floor((y * raster.height) / targetHeight));
    for (let x = 0; x < targetWidth; x++) {
      const srcX = Math.min(raster.width - 1, Math.floor((x * raster.width) / targetWidth));
      const srcIdx = getPixelIndex(raster, srcX, srcY);
      const destIdx = (y * targetWidth + x) * 4;
      pixels[destIdx] = raster.pixels[srcIdx];
      pixels[destIdx + 1] = raster.pixels[srcIdx + 1];
      pixels[destIdx + 2] = raster.pixels[srcIdx + 2];
      pixels[destIdx + 3] = raster.pixels[srcIdx + 3];
    }
  }

  return { width: targetWidth, height: targetHeight, pixels };
}

export function create48x48Thumbnail(bitmap, width = 48, height = 48) {
  if (!bitmap) return null;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  try {
    ctx.drawImage(bitmap, 0, 0, width, height);
    const imgData = ctx.getImageData(0, 0, width, height);
    return { width, height, pixels: imgData.data };
  } catch {
    return null;
  }
}

export function computeDifferenceScore(r1, r2) {
  const scaled = resizeRaster(r2, r1.width, r1.height);
  let totalDiff = 0;
  for (let i = 0; i < r1.pixels.length; i += 4) {
    totalDiff += Math.abs(r1.pixels[i] - scaled.pixels[i]);
    totalDiff += Math.abs(r1.pixels[i + 1] - scaled.pixels[i + 1]);
    totalDiff += Math.abs(r1.pixels[i + 2] - scaled.pixels[i + 2]);
  }
  return totalDiff / (r1.width * r1.height * 3 * 255);
}

export function findBestImageMatch(targetRaster, candidateList) {
  let best = null;
  for (const candidate of candidateList) {
    const score = computeDifferenceScore(targetRaster, candidate.raster);
    if (!best || score < best.score) {
      best = { url: candidate.url, score };
    }
  }
  return best;
}

export function findDominantNonBgBounds(raster) {
  const colorCounts = new Map();
  for (let i = 0; i < raster.pixels.length; i += 4) {
    const r = raster.pixels[i];
    const g = raster.pixels[i + 1];
    const b = raster.pixels[i + 2];
    const key = `${Math.round(r / 8)},${Math.round(g / 8)},${Math.round(b / 8)}`;
    const cur = colorCounts.get(key);
    if (cur) {
      cur.count++;
    } else {
      colorCounts.set(key, { count: 1, red: r, green: g, blue: b });
    }
  }

  const dom = [...colorCounts.values()].sort((a, b) => b.count - a.count)[0];
  if (!dom) return null;

  let minX = raster.width;
  let minY = raster.height;
  let maxX = -1;
  let maxY = -1;
  let nonBgCount = 0;

  for (let y = 0; y < raster.height; y++) {
    for (let x = 0; x < raster.width; x++) {
      const idx = getPixelIndex(raster, x, y);
      const diff = Math.abs(raster.pixels[idx] - dom.red) +
                   Math.abs(raster.pixels[idx + 1] - dom.green) +
                   Math.abs(raster.pixels[idx + 2] - dom.blue);
      if (diff > 48) {
        nonBgCount++;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (nonBgCount < 6 || maxX < minX || maxY < minY) return null;
  return { left: minX, top: minY, right: maxX + 1, bottom: maxY + 1 };
}
