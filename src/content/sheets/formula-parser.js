/**
 * Google Sheets =IMAGE() Formula & In-Cell URL Extractor
 */

export function extractFormulaBarImageUrl() {
  const selectors = [
    "#t-formula-bar-input",
    ".cell-input",
    "#formula-bar",
    "[role='combobox'][aria-autocomplete='list']",
    ".waffle-formula-bar-input"
  ];

  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const txt = el.textContent || el.innerText || el.value || "";
    if (!txt) continue;

    // Check =IMAGE("url")
    const matchFormula = txt.match(/IMAGE\(\s*["']([^"']+)["']/i);
    if (matchFormula && matchFormula[1]) return matchFormula[1].trim();

    // Check direct image URL ending with common extension
    const matchExt = txt.match(/https?:\/\/[^\s"'\)]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:[^\s"'\)]*)?/i);
    if (matchExt && matchExt[0]) return matchExt[0].trim();

    // Check general https URL
    const matchHttp = txt.match(/https?:\/\/[^\s"'\)]+/i);
    if (matchHttp && matchHttp[0] && !matchHttp[0].includes("google.com")) {
      return matchHttp[0].trim();
    }

    if (/IMAGE\(/i.test(txt)) {
      const candidates = getCandidateUrlsFromDom();
      if (candidates.length) return candidates[candidates.length - 1];
    }
  }

  // Check data attributes
  const formulaEl = document.querySelector("[data-sheets-formula*='IMAGE'], [data-sheets-formula*='image'], [data-sheets-formula]");
  if (formulaEl) {
    const formulaStr = formulaEl.getAttribute("data-sheets-formula") || "";
    const matchFormula = formulaStr.match(/IMAGE\(\s*["']([^"']+)["']/i);
    if (matchFormula && matchFormula[1]) return matchFormula[1].trim();

    const matchExt = formulaStr.match(/https?:\/\/[^\s"'\)]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:[^\s"'\)]*)?/i);
    if (matchExt && matchExt[0]) return matchExt[0].trim();

    const matchHttp = formulaStr.match(/https?:\/\/[^\s"'\)]+/i);
    if (matchHttp && matchHttp[0] && !matchHttp[0].includes("google.com")) {
      return matchHttp[0].trim();
    }

    if (/IMAGE\(/i.test(formulaStr)) {
      const candidates = getCandidateUrlsFromDom();
      if (candidates.length) return candidates[candidates.length - 1];
    }
  }

  return null;
}

function getCandidateUrlsFromDom() {
  const list = [];
  try {
    const els = document.querySelectorAll("a[href^='http'], [data-sheets-value], [role='gridcell'], td, div, span");
    for (const el of els) {
      const href = el.getAttribute("href") || "";
      if (href.startsWith("http") && !href.includes("docs.google.com") && !href.includes("google.com/url")) {
        list.push(href);
      }
      const txt = el.textContent || "";
      if (txt.includes("http://") || txt.includes("https://")) {
        const m = txt.match(/https?:\/\/[^\s"'\)]+/g);
        if (m) {
          for (const u of m) {
            if (!u.includes("docs.google.com") && !u.includes("google.com/url")) {
              list.push(u);
            }
          }
        }
      }
    }
  } catch {}
  return list;
}
