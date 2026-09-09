/**
 * LRU Image Cache with Explicit GPU VRAM Cleanup
 * Maintains up to 60 ImageBitmaps. Explicitly calls bitmap.close() on eviction.
 */

const MAX_CACHE_SIZE = 60;
export const imageCache = new Map();

if (typeof window !== "undefined") {
  window.__letMeSeeSeeCache = imageCache;
}

export function evictOldestCacheEntry() {
  while (imageCache.size > MAX_CACHE_SIZE) {
    const oldestKey = imageCache.keys().next().value;
    const promise = imageCache.get(oldestKey);
    imageCache.delete(oldestKey);
    if (promise && typeof promise.then === "function") {
      promise.then((entry) => {
        if (entry?.bitmap && typeof entry.bitmap.close === "function") {
          try {
            entry.bitmap.close();
          } catch {}
        }
      }).catch(() => {});
    }
  }
}

export function fetchAndCacheImage(url) {
  const existing = imageCache.get(url);
  if (existing) {
    imageCache.delete(url);
    imageCache.set(url, existing);
    return existing;
  }

  const promise = fetch(url)
    .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
    .then(async (blob) => ({
      bitmap: await createImageBitmap(blob),
      mimeType: blob.type
    }))
    .catch(() => null);

  imageCache.set(url, promise);

  promise.then((res) => {
    if (!res && imageCache.get(url) === promise) {
      imageCache.delete(url);
    }
  });

  evictOldestCacheEntry();
  return promise;
}

export async function getImageBitmap(url) {
  const res = await fetchAndCacheImage(url);
  return res?.bitmap ?? null;
}
