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

export function upgradeToHighResUrl(url) {
  return `${url.replace(/=[^/=]*$/, "")}${HIGH_RES_SIZE_SUFFIX}`;
}

export function deduplicate(arr) {
  return [...new Set(arr)];
}

export function getNetworkResourceUrls(docType, entries = (typeof performance !== "undefined" && typeof performance.getEntriesByType === "function" ? performance.getEntriesByType("resource") : [])) {
  const pattern = DOC_PATH_PATTERNS[docType];
  const allUrls = deduplicate(entries.map((e) => (typeof e === "string" ? e : e.name)));
  const matching = allUrls.filter((u) => pattern && u.includes(pattern));
  const highResCandidates = matching.filter((u) => /=s(?:1024|1600|2048|4096)(?:$|[&#?])/.test(u));
  const base = highResCandidates.length ? highResCandidates : matching;

  const domUrls = [];
  if (typeof document !== "undefined") {
    try {
      document.querySelectorAll("image, img").forEach((el) => {
        const src = el.getAttribute("href") || el.getAttribute("xlink:href") || el.getAttribute("src");
        if (src && !src.startsWith("data:") && !src.includes("gstatic.com")) {
          domUrls.push(src);
        }
      });
    } catch {}
  }

  if (docType !== "spreadsheets") {
    return deduplicate([...base, ...domUrls]);
  }

  const docsubipk = deduplicate(allUrls.filter((u) => DOCSUBIPK_REGEX.test(u)).map(upgradeToHighResUrl));
  const imageExts = deduplicate(
    allUrls.filter((u) => {
      try {
        const parsed = new URL(u);
        return (
          (/\.(png|jpe?g|webp|gif|svg|avif)($|[?#])/i.test(parsed.pathname) || u.includes("googleusercontent.com")) &&
          !/(^|\.)(gstatic\.com)$/.test(parsed.hostname)
        );
      } catch {
        return false;
      }
    })
  );

  const formulaUrl = extractFormulaBarImageUrl();
  const formulaList = formulaUrl ? [formulaUrl] : [];
  return deduplicate([...base, ...docsubipk, ...imageExts, ...formulaList, ...domUrls]);
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
