/**
 * Network Resource Interceptor and High-Resolution URL Discoverer
 */

import { extractFormulaBarImageUrl } from "../sheets/formula-parser.js";
import { fetchAndCacheImage } from "./lru-cache.js";
import { create48x48Thumbnail } from "./image-matcher.js";

const DOC_PATH_PATTERNS = {
  document: "/docs-images-rt/",
  spreadsheets: "/sheets-images-rt/",
  presentation: "/slides-images-rt/"
};

const DOCSUBIPK_REGEX = /^https:\/\/[^/]+\.googleusercontent\.com\/docsubipk\//;
const HIGH_RES_SIZE_SUFFIX = "=s2048";

export function isUserAvatarUrl(url) {
  if (!url || typeof url !== "string") return false;
  return (
    /\/(?:a|a-|ogw|account|user|profile)\/[A-Za-z0-9_-]+/i.test(url) ||
    url.includes("googleusercontent.com/a/") ||
    url.includes("googleusercontent.com/a-/") ||
    url.includes("googleusercontent.com/ogw/")
  );
}

export function getBaseImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  try {
    const parsed = new URL(url);
    const cleanPath = parsed.pathname.replace(/=[^/=]*$/, "");
    // Canonicalize Google CDN subdomains (lh3, lh4, lh5, lh6, lh3-rt) to a unified origin
    if (parsed.hostname.endsWith(".googleusercontent.com")) {
      return `https://googleusercontent.com${cleanPath}`;
    }
    return `${parsed.origin}${cleanPath}`;
  } catch {
    return url.replace(/=[^/=]*$/, "");
  }
}

export function upgradeToHighResUrl(url) {
  if (!url || typeof url !== "string") return url;
  if (/=[^/=]*$/.test(url)) {
    return `${url.replace(/=[^/=]*$/, "")}${HIGH_RES_SIZE_SUFFIX}`;
  }
  if (url.includes("googleusercontent.com")) {
    return `${url}${HIGH_RES_SIZE_SUFFIX}`;
  }
  return url;
}

export function deduplicate(arr) {
  return [...new Set(arr)];
}

const cumulativeDiscoveredImages = new Map();

export function registerImageUrl(url) {
  if (!url || typeof url !== "string") return;
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed.startsWith("data:") ||
    trimmed.includes("gstatic.com") ||
    isUserAvatarUrl(trimmed)
  ) {
    return;
  }

  const baseKey = getBaseImageUrl(trimmed);
  const isHighRes = /=s(?:1024|1600|2048|4096)(?:$|[&#?])/.test(trimmed);

  if (!cumulativeDiscoveredImages.has(baseKey)) {
    cumulativeDiscoveredImages.set(baseKey, {
      url: isHighRes ? trimmed : upgradeToHighResUrl(trimmed),
      rawUrl: trimmed,
      isHighRes
    });
  } else {
    const existing = cumulativeDiscoveredImages.get(baseKey);
    if (!existing.isHighRes && isHighRes) {
      cumulativeDiscoveredImages.set(baseKey, {
        url: trimmed,
        rawUrl: trimmed,
        isHighRes: true
      });
    }
  }
}

let observerInitialized = false;
export function initResourceObserver() {
  if (observerInitialized) return;
  observerInitialized = true;

  if (typeof performance !== "undefined") {
    if (typeof performance.setResourceTimingBufferSize === "function") {
      try {
        performance.setResourceTimingBufferSize(10000);
      } catch {}
    }

    if (typeof PerformanceObserver !== "undefined") {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name) registerImageUrl(entry.name);
          }
        });
        observer.observe({ entryTypes: ["resource"] });
      } catch {}
    }
  }
}

export function getNetworkResourceUrls(
  docType,
  entries = typeof performance !== "undefined" && typeof performance.getEntriesByType === "function"
    ? performance.getEntriesByType("resource")
    : []
) {
  initResourceObserver();

  const pattern = DOC_PATH_PATTERNS[docType];
  const allUrls = deduplicate(entries.map((e) => (typeof e === "string" ? e : e.name)));

  // 1. Ingest all current entries into cumulative registry
  for (const u of allUrls) {
    if (pattern && u.includes(pattern)) {
      registerImageUrl(u);
    } else if (docType === "spreadsheets" && (DOCSUBIPK_REGEX.test(u) || u.includes("googleusercontent.com"))) {
      registerImageUrl(u);
    }
  }

  // 2. Scan DOM for image elements strictly in document workspace (avoiding headers and user avatars)
  if (typeof document !== "undefined") {
    try {
      const selector = docType === "presentation"
        ? "#workspace-container image, .punch-viewer-content image, .punch-filmstrip-thumbnail image"
        : "svg.kix-embeddedobject-image image, .kix-page image, .waffle-borderless-embedded-object-container img";

      document.querySelectorAll(selector).forEach((el) => {
        const src = el.getAttribute("href") || el.getAttribute("xlink:href") || el.getAttribute("src");
        if (src && !src.startsWith("data:") && !src.includes("gstatic.com") && !isUserAvatarUrl(src)) {
          registerImageUrl(src);
        }
      });
    } catch {}
  }

  // 3. Collect matching canonical images for current docType
  const candidates = new Map();

  for (const [baseKey, item] of cumulativeDiscoveredImages.entries()) {
    if (pattern && baseKey.includes(pattern)) {
      candidates.set(baseKey, item.url);
    } else if (docType === "spreadsheets") {
      if (DOCSUBIPK_REGEX.test(baseKey) || (baseKey.includes("googleusercontent.com") && !isUserAvatarUrl(baseKey))) {
        candidates.set(baseKey, item.url);
      }
    } else if (docType === "presentation") {
      if (baseKey.includes("slides-images-rt") || (baseKey.includes("googleusercontent.com") && !isUserAvatarUrl(baseKey))) {
        candidates.set(baseKey, item.url);
      }
    }
  }

  // Fallback for mock test environments where cumulative registry might not have matching keys
  if (candidates.size === 0) {
    for (const u of allUrls) {
      if (pattern && u.includes(pattern)) {
        candidates.set(getBaseImageUrl(u), u);
      }
    }
  }

  // 4. Spreadsheets: Include formula bar and direct image extension URLs
  const extraUrls = [];
  if (docType === "spreadsheets") {
    const docsubipk = allUrls.filter((u) => DOCSUBIPK_REGEX.test(u)).map(upgradeToHighResUrl);
    extraUrls.push(...docsubipk);

    for (const u of allUrls) {
      try {
        const parsed = new URL(u);
        if (
          (/\.(png|jpe?g|webp|gif|svg|avif)($|[?#])/i.test(parsed.pathname) || u.includes("googleusercontent.com")) &&
          !/(^|\.)(gstatic\.com)$/.test(parsed.hostname)
        ) {
          extraUrls.push(u);
        }
      } catch {}
    }

    const formulaUrl = extractFormulaBarImageUrl();
    if (formulaUrl) extraUrls.push(formulaUrl);
  }

  return deduplicate([...Array.from(candidates.values()), ...extraUrls]);
}

export function getFormatFromMime(mimeType, url) {
  const map = {
    "image/avif": "AVIF",
    "image/gif": "GIF",
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "image/svg+xml": "SVG",
    "image/webp": "WEBP"
  };
  if (map[mimeType]) return map[mimeType];
  const ext = url.match(/\.([a-z0-9]{2,5})(?:[?#]|$)/i)?.[1];
  return ext ? ext.toUpperCase() : "IMAGE";
}

export async function fetchCandidateThumbnails(urls) {
  if (!urls || !urls.length) return [];
  const results = new Array(urls.length);
  let currentIndex = 0;

  const worker = async () => {
    while (currentIndex < urls.length) {
      const idx = currentIndex++;
      try {
        const item = await fetchAndCacheImage(urls[idx]);
        if (item?.bitmap) {
          const raster = create48x48Thumbnail(item.bitmap, 48, 48);
          if (raster) {
            results[idx] = {
              url: urls[idx],
              raster,
              width: item.bitmap.width,
              height: item.bitmap.height,
              format: getFormatFromMime(item.mimeType, urls[idx])
            };
          }
        }
      } catch {}
    }
  };

  const poolSize = Math.min(4, urls.length);
  await Promise.all(Array.from({ length: poolSize }, worker));
  return results.filter(Boolean);
}
