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
      if (words.length === 1 && /^(?:[A-Z0-9]{1,3}|No)$/.test(w)) {
        return false;
      }
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

    // Clean center dot between CJK characters (e.g. "茶筅架 . 茶筅座" -> "茶筅架．茶筅座")
    line = line.replace(/([\u4e00-\u9fa5])\s*[.．·・•]\s*(?=[\u4e00-\u9fa5])/g, "$1．");

    // Normalize opening quotation marks / brackets
    line = line.replace(/(?:^|\s+)\[(?=[\u4e00-\u9fa5])/g, "「");

    // Clean trailing chevron/arrow hallucinations inside quotes
    // e.g. 「防水鞋 m」 -> 「防水鞋」, 「會呼吸的雨衣 "ARR」 -> 「會呼吸的雨衣」, 「會呼吸的雨衣 > J」 -> 「會呼吸的雨衣」
    line = line.replace(/([\u4e00-\u9fa5])\s*["'“]*(?:[a-zA-Z]{1,4}|[►▶>»~^"'\-]+|\s*[>▶►]\s*[a-zA-Z]?)*\s*[」』J]+/g, "$1」");
    line = line.replace(/[」』]{2,}/g, "」");

    // Clean stray trailing ARR noise if remaining (and close quote if after CJK)
    line = line.replace(/([\u4e00-\u9fa5])\s*["'“]*ARR[a-zA-Z]*\s*$/gi, "$1」");
    line = line.replace(/\s*["'“]*ARR[a-zA-Z]*\s*$/gi, "");

    // Normalize spacing between quotes
    line = line.replace(/」\s*([「])/g, "」「");

    // Contextual CJK disambiguation (e.g. 雨 vs 兩, 茶筅 vs 茶笑, 質感 vs 質硬)
    line = disambiguateCjkCharacters(line);

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
    line = line.replace(/[»«▾▼►▶]/g, "");
    line = line.replace(/\bvy\b/gi, "");
    line = line.replace(/\b(Month|Goal|Actual|Achv\.?|Cumulative\s+Gap)\s+v\b/gi, "$1");

    // Remove Gantt chart double pipe noise (e.g. "| |")
    line = line.replace(/\|\s+\|/g, " ");

    // Normalize Numbers & Financial amounts:
    // Replace pipes | and uppercase I / lowercase l inside numbers with 1
    line = line.replace(/(\d)[|Il]+(?=[,\s\t]|$)/g, (m, d) => d + "1".repeat(m.length - 1));
    line = line.replace(/,[|Il]+(\d)/g, (m, d) => ",1" + d);
    line = line.replace(/(\d)[|Il]+(\d)/g, (m, d1, d2) => d1 + "1" + d2);
    line = line.replace(/\b[|Il](\d)/g, "1$1");
    line = line.replace(/([0-9,])[|Il]+([0-9,])/g, (m, p1, p2) => p1 + "1".repeat(m.length - p1.length - p2.length) + p2);
    line = line.replace(/-\s*[|Il]+\s*(?=[0-9bBoO])/g, "-1");

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

    // Clean stray negative spaces: e.g. "-1 b,o34" -> "-16,034"
    line = line.replace(/-(\d+)\s+([0-9bBoO]+),/g, "-$1$2,");

    // Clean stray pipes strictly surrounded by financial numbers / dates
    line = line.replace(/(?<=[0-9%])\s*\|\s*(?=[0-9$])/g, " ");

    // Normalize tabular whitespace
    line = line.replace(/\s{3,}/g, "  ").trim();

    cleaned.push(line);
  }

  return cleaned.join("\n").trim();
}

/**
 * Sanitize an individual table cell value while preserving single letters/numbers.
 */
export function cleanTableCell(text) {
  if (!text) return "";
  let val = text.trim();
  val = val.replace(/[\t\r\n]+/g, " ").trim();

  // Normalize Currency: usS, USS, us$, etc. -> US$
  val = val.replace(/\b(?:usS|uss|USS|uS\$|Us\$)\b/g, "US$");
  val = val.replace(/\busS\s*/g, "US$ ");

  // Normalize Years & Dates: 202b/ -> 2026/, 2D2b/ -> 2026/, 2026108 -> 2026/08
  val = val.replace(/\b2[D0O]2[bB6]\/([0-1]\d)\b/g, "2026/$1");
  val = val.replace(/\b(20[12])[bB]\/([0-1][\dbB])\b/g, (m, y, mo) => y + "6/" + mo.replace(/[bB]/g, "6"));
  val = val.replace(/\b(20\d\d)[1l|I/]([0-1]\d)\b/g, "$1/$2");

  // Clean header chevrons and normalize CumulativeGap
  val = val.replace(/CumulativeGap\b/g, "Cumulative Gap");
  val = val.replace(/^[📅💳\s]+/g, "");
  val = val.replace(/[»«▾▼►▶]/g, "");
  val = val.replace(/\s*[⌵▼▾►▶]\s*$/g, "");
  val = val.replace(/\s+[vV]\s*$/g, "");
  val = val.replace(/\bvy\b/gi, "");
  val = val.replace(/\b(Month|Goal|Actual|Achv\.?|Cumulative\s+Gap)\s+v\b/gi, "$1");

  // Normalize Numbers & Financial amounts:
  val = val.replace(/(\d)[|Il]+(?=[,\s\t]|$)/g, (m, d) => d + "1".repeat(m.length - 1));
  val = val.replace(/,[|Il]+(\d)/g, (m, d) => ",1" + d);
  val = val.replace(/(\d)[|Il]+(\d)/g, (m, d1, d2) => d1 + "1" + d2);
  val = val.replace(/\b[|Il](\d)/g, "1$1");
  val = val.replace(/([0-9,])[|Il]+([0-9,])/g, (m, p1, p2) => p1 + "1".repeat(m.length - p1.length - p2.length) + p2);
  val = val.replace(/-\s*[|Il]+\s*(?=[0-9bBoO])/g, "-1");

  val = val.replace(/(\d)[bB](\d)/g, "$16$2");
  val = val.replace(/(\d)[bB],/g, "$16,");
  val = val.replace(/,[bB](\d)/g, ",6$1");
  val = val.replace(/\b[bB](\d)/g, "6$1");
  val = val.replace(/(\d)[bB]\b/g, "$16");
  val = val.replace(/(\d)[bB]\./g, "$16.");
  val = val.replace(/\.([bB])(\d)/g, ".6$2");
  val = val.replace(/(\d)[bB]%/g, "$16%");

  val = val.replace(/(\d)[oO](\d)/g, "$10$2");
  val = val.replace(/,[oO](\d)/g, ",0$1");
  val = val.replace(/(\d)[oO],/g, "$10,");
  val = val.replace(/(\d)[oO]%/g, "$10%");

  // Remove stray standalone pipes
  val = val.replace(/\|+/g, " ").trim();

  // Clean stray negative spaces: e.g. "-1 b,o34" -> "-16,034"
  val = val.replace(/-(\d+)\s+([0-9bBoO]+),/g, "-$1$2,");

  const cjkPunc = "[\\u4e00-\\u9fa5\\u3000-\\u303f\\uff00-\\uffef]";
  val = val.replace(new RegExp(`(${cjkPunc})\\s+(?=${cjkPunc})`, "g"), "$1");
  val = disambiguateCjkCharacters(val);
  return val.trim();
}

/**
 * Disambiguate visually similar CJK characters based on high-frequency linguistic context.
 * Resolves frequent Tesseract confusion between '雨' (rain) and '兩' (two/dual/both),
 * and tea whisk '茶筅' vs '茶笑'.
 */
export function disambiguateCjkCharacters(text) {
  if (!text) return "";
  let val = text;

  // 0. Fix '茶筅' (matcha whisk) falsely recognized as '茶笑' or '茶咲'
  val = val.replace(/茶[笑咲]/g, "茶筅");
  val = val.replace(/[笑咲]架/g, "筅架");
  val = val.replace(/[笑咲]座/g, "筅座");
  val = val.replace(/百本[笑咲]/g, "百本筅");
  val = val.replace(/竹[笑咲]/g, "竹筅");

  // Fix missing '片' before '口抹茶' (e.g. 「口抹茶碗推薦」 -> 「片口抹茶碗推薦」)
  val = val.replace(/(?<![\u4e00-\u9fa5])口抹茶/g, "片口抹茶");

  // Fix '質硬' falsely recognized where '質感' is intended (e.g. 質感雨具)
  val = val.replace(/質硬/g, "質感");

  // Fix '十中圓舞曲' -> '雨中圓舞曲'
  val = val.replace(/十中圓舞曲/g, "雨中圓舞曲");

  // 1. Fix '雨' falsely recognized where '兩' is the intended character:
  // e.g. "雨用" -> "兩用" (兩用托特包, 兩用後背包, 兩用手提包, 兩用包, 晴雨兩用)
  val = val.replace(/雨用/g, "兩用");
  // e.g. "兩種", "兩者", "兩個", "兩款", "兩件", "兩組", "兩套", "兩面", "兩色", "兩岸", "兩難", "兩倍", "兩側", "兩旁", "兩端", "兩邊", "兩隻", "兩條", "兩位", "兩次", "兩張", "兩把", "兩台", "兩瓶", "兩盒", "兩度"
  val = val.replace(/雨([種者個款件組套面色岸難倍側旁端邊隻條位次張把台瓶盒度])/g, "兩$1");

  // 2. Fix '兩' falsely recognized where '雨' is the intended character:
  // e.g. "兩衣" -> "雨衣", "兩傘" -> "雨傘", "兩靴" -> "雨靴"
  val = val.replace(/兩([衣傘靴])/g, "雨$1");
  // e.g. "兩具" -> "雨具" (質感雨具, 防雨/雨具, 雨具, 雨衣)
  val = val.replace(/兩具/g, "雨具");
  // e.g. "兩中圓舞曲", "兩中漫步" -> "雨中圓舞曲", "雨中漫步"
  val = val.replace(/兩中([圓漫步曲景情風])/g, "雨中$1");
  // e.g. "防兩" -> "防雨", "避兩" -> "避雨", "淋兩" -> "淋雨", "梅兩" -> "梅雨", "暴兩" -> "暴雨", "陣兩" -> "陣雨", "雷兩" -> "雷雨", "下兩" -> "下雨", "落兩" -> "落雨", "細兩" -> "細雨", "微兩" -> "微雨", "大兩" -> "大雨", "晴兩" -> "晴雨"
  val = val.replace(/([防避淋梅暴陣雷下落細微大晴])兩/g, "$1雨");
  // e.g. "兩滴", "兩勢", "兩季", "兩量", "兩水", "兩停"
  val = val.replace(/兩([滴勢季量水停])/g, "雨$1");

  // 3. Fix '已' vs '己' (e.g. 已經, 自己, 早已, 知己)
  val = val.replace(/[已己]經/g, "已經");
  val = val.replace(/自[已己]/g, "自己");
  val = val.replace(/早[已己]/g, "早已");
  val = val.replace(/知[已己]/g, "知己");

  // 4. Fix '未' vs '末' (e.g. 週末, 期末, 年末, 月末, 未來, 尚未, 從未, 未必, 未知)
  val = val.replace(/週[未末]/g, "週末");
  val = val.replace(/期[未末]/g, "期末");
  val = val.replace(/年[未末]/g, "年末");
  val = val.replace(/月[未末]/g, "月末");
  val = val.replace(/[未末]日/g, "末日");
  val = val.replace(/[未末]尾/g, "末尾");
  val = val.replace(/[未末]來/g, "未來");
  val = val.replace(/尚[未末]/g, "尚未");
  val = val.replace(/從[未末]/g, "從未");
  val = val.replace(/[未末]必/g, "未必");
  val = val.replace(/[未末]知/g, "未知");

  // 5. Fix '折' vs '拆' (e.g. 折扣, 打折, 拆除, 拆封, 拆開)
  val = val.replace(/[折拆]扣/g, "折扣");
  val = val.replace(/打[折拆]/g, "打折");
  val = val.replace(/[折拆]除/g, "拆除");
  val = val.replace(/[折拆]封/g, "拆封");
  val = val.replace(/[折拆]開/g, "拆開");

  // 6. Fix '士' vs '土' (e.g. 女士, 紳士, 碩士, 博士, 土地, 泥土)
  val = val.replace(/女[士土]/g, "女士");
  val = val.replace(/紳[士土]/g, "紳士");
  val = val.replace(/碩[士土]/g, "碩士");
  val = val.replace(/博[士土]/g, "博士");
  val = val.replace(/泥[士土]/g, "泥土");
  val = val.replace(/[士土]地/g, "土地");

  // 7. Fix '烏' vs '鳥' (e.g. 烏雲, 烏龍, 小鳥, 候鳥)
  val = val.replace(/[烏鳥]雲/g, "烏雲");
  val = val.replace(/[烏鳥]龍/g, "烏龍");
  val = val.replace(/小[烏鳥]/g, "小鳥");
  val = val.replace(/候[烏鳥]/g, "候鳥");

  return val;
}
