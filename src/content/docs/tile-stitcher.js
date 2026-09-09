/**
 * Multi-Canvas Tile Vertical Stitcher for Google Docs
 * Reassembles single images rendered across adjacent canvas tiles.
 */

export function calculateHorizontalOverlap(b1, b2) {
  const overlap = Math.max(0, Math.min(b1.right, b2.right) - Math.max(b1.left, b2.left));
  const span = Math.max(1, Math.min(b1.right - b1.left, b2.right - b2.left));
  return overlap / span;
}

export function groupAdjacentTileChains(tileBoxes) {
  const chains = [];
  for (const box of tileBoxes) {
    const lastChain = chains[chains.length - 1];
    const prevBox = lastChain?.[lastChain.length - 1];

    if (
      prevBox &&
      box.canvasIndex === prevBox.canvasIndex + 1 &&
      prevBox.bounds.bottom >= prevBox.canvas.height - 1 &&
      box.bounds.top <= 1 &&
      calculateHorizontalOverlap(prevBox.bounds, box.bounds) >= 0.7
    ) {
      lastChain.push(box);
    } else {
      chains.push([box]);
    }
  }
  return chains;
}

export function stitchTileRasters(tileChain) {
  const minLeft = Math.min(...tileChain.map((t) => t.bounds.left));
  const maxRight = Math.max(...tileChain.map((t) => t.bounds.right));
  const width = maxRight - minLeft;
  const totalHeight = tileChain.reduce((sum, t) => sum + t.raster.height, 0);
  const mergedPixels = new Uint8ClampedArray(width * totalHeight * 4);

  let offsetY = 0;
  for (const t of tileChain) {
    const offsetX = t.bounds.left - minLeft;
    for (let row = 0; row < t.raster.height; row++) {
      const srcOffset = row * t.raster.width * 4;
      const destOffset = ((offsetY + row) * width + offsetX) * 4;
      mergedPixels.set(t.raster.pixels.subarray(srcOffset, srcOffset + t.raster.width * 4), destOffset);
    }
    offsetY += t.raster.height;
  }

  return { width, height: totalHeight, pixels: mergedPixels };
}

export function tileBoxToViewportRect(box) {
  const canvasRect = box.canvas.getBoundingClientRect();
  const scaleX = canvasRect.width / box.canvas.width;
  const scaleY = canvasRect.height / box.canvas.height;
  return new DOMRect(
    canvasRect.left + box.bounds.left * scaleX,
    canvasRect.top + box.bounds.top * scaleY,
    (box.bounds.right - box.bounds.left) * scaleX,
    (box.bounds.bottom - box.bounds.top) * scaleY
  );
}

export function dispatchSyntheticClick(element, rect = element.getBoundingClientRect()) {
  const evt = {
    bubbles: true,
    cancelable: true,
    clientX: rect.left + rect.width / 2,
    clientY: rect.top + rect.height / 2,
    view: window
  };
  element.dispatchEvent(new MouseEvent("mousedown", evt));
  element.dispatchEvent(new MouseEvent("mouseup", evt));
  element.dispatchEvent(new MouseEvent("click", evt));
}

export function buildStitchedDocsImages(tileBoxes) {
  return groupAdjacentTileChains(tileBoxes).map((chain) => {
    const midBox = chain[Math.floor(chain.length / 2)];
    const getRect = () => tileBoxToViewportRect(midBox);
    return {
      url: "",
      location: "Document",
      raster: stitchTileRasters(chain),
      target: {
        element: midBox.canvas,
        getRect,
        getRects: () => chain.map(tileBoxToViewportRect),
        activate: () => dispatchSyntheticClick(midBox.canvas, getRect())
      }
    };
  });
}
