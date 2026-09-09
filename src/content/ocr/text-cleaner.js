/**
 * OCR Output Text Sanitizer and Normalizer
 * Cleans noise lines, aligns CJK characters, and normalizes Gantt chart timelines and financial data.
 */

export function cleanOcrText(text) {
  if (!text) return "";
  const lines = text.split("\n");
  const cleaned = [];

  for (const rawLine of lines) {
    let line = rawLine.trim();
    if (!line) continue;

    // 1. Filter out pure noise lines (e.g. ". - . _", "_ . _ . . | _ _ _ . . . | |", "|", "||")
    if (/^[\s|!Il·•:;._\-\/\\]+$/.test(line)) continue;
    const validChars = line.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, "");
    if (validChars.length === 0) continue;
    if (validChars.length < 3 && /^[\s._\-|/\\~:;+=*^]+$/.test(line.replace(/[a-zA-Z0-9\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, ""))) {
      if (line.replace(/[\s._\-|/\\~:;+=*^]/g, "").length <= 1) continue;
    }

    // 2. Filter out 3+ identical consecutive characters (e.g. 入入入入入, zzz, eee...)
    if (/([^\s0-9])\1{2,}/i.test(line)) continue;

    // 3. Filter out repeated 2-char token clusters (e.g. 入入, 玉玉, 生生, 國國)
    const cjkChars = line.replace(/[^\u4e00-\u9fa5]/g, "");
    if (cjkChars.length >= 6) {
      // Don't filter if it is a timeline/calendar row with numbers and date units (e.g. "7月 8月 9月 10月 11月 12月")
      const isTimeline = /[0-9]\s*[年月日號週周季]/.test(line);
      if (!isTimeline) {
        const unique = new Set(cjkChars).size;
        if (unique / cjkChars.length < 0.45) continue;
      }
    }

    // 4. Filter out high density punctuation/symbol noise lines (e.g. es 、 、 ‧ ‧v,‧ ˊ〈b‧ˇ<zˇZzZ=”)
    const cleanChars = line.replace(/\s+/g, "");
    const puncCount = (cleanChars.match(/[\.,‧、ˊ〈〉ˇ<>=”"~_|\-+:;!@#$%^&*`]/g) || []).length;
    if (cleanChars.length >= 6 && puncCount / cleanChars.length >= 0.35) continue;

    // 5. Filter out stray fragments consisting solely of short 1-2 letter tokens and punctuation (e.g. "es es) re")
    const words = line.trim().split(/\s+/);
    if (words.length > 0 && words.every(w => {
      const letters = w.replace(/[^a-zA-Z]/g, "");
      return letters.length > 0 && letters.length <= 2 && !/[0-9\u4e00-\u9fa5]/.test(w);
    })) {
      continue;
    }

    // Clean leading star icon hallucinations (Ww, 沁, etc. before words)
    line = line.replace(/(?:^|\s+)(?:Ww|沁)\s+(?=[A-Z\u4e00-\u9fa5])/g, " ");

    // Remove stray spaces between CJK characters & CJK punctuation (e.g. "國 小 生 開 學 用 品" -> "國小生開學用品")
    const cjkPunc = "[\\u4e00-\\u9fa5\\u3000-\\u303f\\uff00-\\uffef]";
    line = line.replace(new RegExp(`(${cjkPunc})\\s+(?=${cjkPunc})`, "g"), "$1");

    // Normalize Currency: usS, USS, us$, etc. -> US$
    line = line.replace(/\b(?:usS|uss|USS|uS\$|Us\$)\b/g, "US$");
    line = line.replace(/\busS\s*/g, "US$ ");

    // Normalize Years & Dates: 202b/ -> 2026/, 2D2b/ -> 2026/, 2026108 -> 2026/08
    line = line.replace(/\b2[D0O]2[bB6]\/([0-1]\d)\b/g, "2026/$1");
    line = line.replace(/\b(20[12])[bB]\/([0-1][\dbB])\b/g, (m, y, mo) => y + "6/" + mo.replace(/[bB]/g, "6"));
    line = line.replace(/\b(20\d\d)[1l|I/]([0-1]\d)\b/g, "$1/$2");

    // Normalize Months: e.g. "1B" -> "1月", "7 月" -> "7月", "10月 1 12月" -> "10月 11月 12月" in calendar contexts
    if (line.includes("月")) {
      line = line.replace(/(\d+)\s+月/g, "$1月");
      line = line.replace(/(10月\s+)(?:1|11|[|Il])(\s+12月)/g, "$111月$2");
      line = line.replace(/(?<!\/)\b([1-9]|1[0-2])\s*[bB](?![.%/\d])\b/g, "$1月");
    }

    // Clean header chevrons and normalize CumulativeGap
    line = line.replace(/CumulativeGap\b/g, "Cumulative Gap");
    line = line.replace(/[»«▾▼]/g, "");
    line = line.replace(/\bvy\b/gi, "");
    line = line.replace(/\b(Month|Goal|Actual|Achv\.?|Cumulative\s+Gap)\s+v\b/gi, "$1");

    // Normalize Numbers & Financial amounts:
    // Replace pipes | and uppercase I / lowercase l inside numbers with 1
    line = line.replace(/(\d)[|Il](\d)/g, "$11$2");
    line = line.replace(/(\d)[|Il],/g, "$11,");
    line = line.replace(/,[|Il](\d)/g, ",1$1");
    line = line.replace(/\b[|Il](\d)/g, "1$1");
    line = line.replace(/(\d)[|Il]\b/g, "$11");
    line = line.replace(/-\s*[|Il]\s*/g, "-1");

    // Replace 'b' / 'B' inside numbers/amounts with 6
    line = line.replace(/(\d)[bB](\d)/g, "$16$2");
    line = line.replace(/(\d)[bB],/g, "$16,");
    line = line.replace(/,[bB](\d)/g, ",6$1");
    line = line.replace(/\b[bB](\d)/g, "6$1");
    line = line.replace(/(\d)[bB]\b/g, "$16");
    line = line.replace(/(\d)[bB]\./g, "$16.");
    line = line.replace(/\.([bB])(\d)/g, ".6$2");
    line = line.replace(/(\d)[bB]%/g, "$16%");
    line = line.replace(/([0-9,])[bB]+(\b|\s)/g, (m, p1, p2) => p1 + "6".repeat(m.length - p1.length - p2.length) + p2);

    // Replace 'o' / 'O' inside numbers/amounts with 0
    line = line.replace(/(\d)[oO](\d)/g, "$10$2");
    line = line.replace(/,[oO](\d)/g, ",0$1");
    line = line.replace(/(\d)[oO],/g, "$10,");
    line = line.replace(/(\d)[oO]%/g, "$10%");

    // Replace standalone pipes inside numbers: e.g. -1||,4|2 -> -111,412
    line = line.replace(/\|/g, "1");

    // Clean stray negative spaces: e.g. "-1 b,o34" -> "-16,034"
    line = line.replace(/-(\d+)\s+([0-9bBoO]+),/g, "-$1$2,");

    // Normalize tabular whitespace
    line = line.replace(/\s{3,}/g, "  ").trim();

    cleaned.push(line);
  }

  return cleaned.join("\n").trim();
}
