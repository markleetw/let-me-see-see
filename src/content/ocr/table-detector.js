/**
 * Table Structure Detection & TSV Formatter
 * Analyzes OCR token geometry and text alignments to detect table grids.
 * If detected as a table, outputs clean Tab-Separated Values (TSV) ready for Google Sheets/Excel.
 * If not a table, preserves standard paragraphs without intrusive tabs.
 */

import { cleanOcrText, cleanTableCell } from "./text-cleaner.js";

/**
 * Cluster horizontal coordinates to identify column boundaries.
 * @param {Array<Array<{text: string, x0: number, x1: number}>>} rows
 * @param {number} tolerance Horizontal alignment tolerance in pixels
 * @returns {Array<{minX: number, maxX: number, centerX: number}>}
 */
export function findColumnBins(rows, tolerance = 35) {
  const allXStarts = [];
  for (let r = 0; r < rows.length; r++) {
    for (const cell of rows[r]) {
      if (typeof cell.x0 === "number") {
        allXStarts.push({ x: cell.x0, rowIdx: r });
      }
    }
  }

  if (allXStarts.length === 0) return [];
  allXStarts.sort((a, b) => a.x - b.x);

  // Group close X coordinates into clusters via single-pass linear sweep across distinct rows
  const clusters = [];
  let currentCluster = null;

  for (const item of allXStarts) {
    const x = item.x;
    if (!currentCluster) {
      currentCluster = { points: [x], rows: new Set([item.rowIdx]), mean: x, min: x, max: x };
      clusters.push(currentCluster);
    } else if (Math.abs(currentCluster.mean - x) <= tolerance) {
      currentCluster.points.push(x);
      currentCluster.rows.add(item.rowIdx);
      currentCluster.mean = (currentCluster.mean * (currentCluster.points.length - 1) + x) / currentCluster.points.length;
      currentCluster.max = x;
    } else {
      currentCluster = { points: [x], rows: new Set([item.rowIdx]), mean: x, min: x, max: x };
      clusters.push(currentCluster);
    }
  }

  // Filter clusters: must appear in at least 2 distinct rows to prevent phantom columns
  const minRows = Math.max(2, Math.floor(rows.length * 0.35));
  return clusters
    .filter((c) => c.rows.size >= minRows)
    .sort((a, b) => a.mean - b.mean)
    .map((c) => ({
      centerX: c.mean,
      minX: c.min,
      maxX: c.max
    }));
}

/**
 * Detect whether structured OCR lines represent a tabular layout.
 * @param {Array<{text: string, bbox?: {x0: number, y0: number, x1: number, y1: number}, words?: Array<{text: string, bbox?: {x0: number, y0: number, x1: number, y1: number}}>}>} rawLines
 * @returns {{isTable: boolean, tsv: string, rowCount: number, colCount: number}}
 */
export function detectTableFromTesseractResult(rawLines) {
  if (!Array.isArray(rawLines) || rawLines.length < 2) {
    return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
  }

  // 1. Group words within each line into cell candidates based on horizontal spacing
  let rows = [];
  for (const line of rawLines) {
    const validWords = (line.words || []).filter((w) => {
      const t = (w.text || "").trim();
      return t && !/^[|—_\-]+$/.test(t);
    });

    if (!validWords.length) continue;

    // Group adjacent words whose bounding boxes are close (<= 25px apart) into a single cell
    const lineCells = [];
    let currentCell = null;

    for (const w of validWords) {
      const wText = (w.text || "").trim();
      const x0 = w.bbox ? w.bbox.x0 : null;
      const x1 = w.bbox ? w.bbox.x1 : null;

      if (!currentCell) {
        currentCell = { text: wText, x0, x1 };
      } else if (x0 !== null && currentCell.x1 !== null && x0 - currentCell.x1 <= 24) {
        // Merge into current cell
        currentCell.text += (isCjk(currentCell.text.slice(-1)) && isCjk(wText.charAt(0)) ? "" : " ") + wText;
        currentCell.x1 = Math.max(currentCell.x1, x1);
      } else {
        lineCells.push(currentCell);
        currentCell = { text: wText, x0, x1 };
      }
    }
    if (currentCell) lineCells.push(currentCell);
    if (lineCells.length > 0) rows.push(lineCells);
  }

  if (rows.length < 2) {
    return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
  }

  // 1.5. Strip leading non-grid title tabs / document badges (e.g. "OnsiteRMN v_ 圖" which has <= 2 cells while table body has >= 4 cells)
  if (rows.length >= 3) {
    const subsequentColCounts = rows.slice(1).map((r) => r.length);
    const sortedCounts = [...subsequentColCounts].sort((a, b) => a - b);
    const medianCols = sortedCounts[Math.floor(sortedCounts.length / 2)];
    if (medianCols >= 4 && rows[0].length <= Math.floor(medianCols * 0.5)) {
      rows.shift(); // Remove top title badge from grid
    }
  }

  // Reject timelines, roadmaps, and Gantt charts with month/quarter axes
  if (rows.some(isTimelineRow)) {
    return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
  }

  // 2. Identify column alignment bins
  const columnBins = findColumnBins(rows);
  if (columnBins.length < 2) {
    return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
  }

  // Check occupancy for each column across rows
  const colOccupancy = new Array(columnBins.length).fill(0);
  for (const row of rows) {
    const presentBins = new Set();
    for (const cell of row) {
      if (cell.x0 === null) continue;
      let closestColIdx = 0;
      let minDiff = Infinity;
      for (let i = 0; i < columnBins.length; i++) {
        const diff = Math.abs(cell.x0 - columnBins[i].centerX);
        if (diff < minDiff) {
          minDiff = diff;
          closestColIdx = i;
        }
      }
      presentBins.add(closestColIdx);
    }
    for (const idx of presentBins) {
      colOccupancy[idx]++;
    }
  }

  // A genuine table requires columns to be populated consistently across rows
  // At least 2 columns must appear in at least 55% of rows
  const highOccupancyCols = colOccupancy.filter((cnt) => cnt >= Math.max(2, Math.floor(rows.length * 0.55)));
  if (highOccupancyCols.length < 2) {
    return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
  }

  // For 2-column candidates: guard against search autocomplete / item count lists (e.g. "雨靴 316", "雨衣 2,018")
  if (columnBins.length === 2) {
    const row0Text = rows[0].map((c) => c.text).join(" ");
    const hasHeaderKeyword = /^(?:Month|Date|Time|Item|Name|Title|Type|Category|Price|Cost|Total|Amount|Qty|Quantity|Goal|Actual|Achv|Status|Note|Description|Key|Value|項目|名稱|標題|日期|時間|月份|類別|單價|數量|小計|總計|金額|狀態|備註|範例|建議|命中|順序|資料源)/i.test(row0Text);

    let col1CountDigits = 0;
    let col1Total = 0;
    for (const row of rows) {
      for (const cell of row) {
        if (cell.x0 !== null && Math.abs(cell.x0 - columnBins[1].centerX) < Math.abs(cell.x0 - columnBins[0].centerX)) {
          col1Total++;
          if (/^[\d,.\s]+$/.test(cell.text.trim())) col1CountDigits++;
        }
      }
    }

    if (!hasHeaderKeyword && col1Total > 0 && col1CountDigits / col1Total >= 0.7) {
      return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
    }
  }

  // 3. Format into TSV
  const tsvLines = [];
  for (const row of rows) {
    const rowSlots = new Array(columnBins.length).fill("");

    for (const cell of row) {
      if (cell.x0 === null) continue;

      // Find closest matching column bin
      let closestColIdx = 0;
      let minDiff = Infinity;
      for (let i = 0; i < columnBins.length; i++) {
        const diff = Math.abs(cell.x0 - columnBins[i].centerX);
        if (diff < minDiff) {
          minDiff = diff;
          closestColIdx = i;
        }
      }

      if (rowSlots[closestColIdx]) {
        rowSlots[closestColIdx] += " " + cell.text;
      } else {
        rowSlots[closestColIdx] = cell.text;
      }
    }

    // Clean each cell using table cell cleaner rules
    const cleanedRow = rowSlots.map((cellStr) => cleanTableCell(cellStr));
    if (cleanedRow.some((c) => c.length > 0)) {
      tsvLines.push(cleanedRow.join("\t"));
    }
  }

  return {
    isTable: true,
    tsv: tsvLines.join("\n"),
    rowCount: tsvLines.length,
    colCount: columnBins.length
  };
}

/**
 * Text-based table detection fallback (when bounding boxes are absent)
 * Inspects explicit tab or markdown table pipe delimiters.
 * @param {string} text
 * @returns {{isTable: boolean, tsv: string, rowCount: number, colCount: number}}
 */
export function detectTableFromPlainText(text) {
  if (!text || typeof text !== "string") {
    return { isTable: false, tsv: text || "", rowCount: 0, colCount: 0 };
  }

  const rawLines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (rawLines.length < 2) {
    return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
  }

  // Reject timeline rows
  if (rawLines.some((l) => isTimelineRow([{ text: l }]))) {
    return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
  }

  const hasTabs = rawLines.filter((l) => l.includes("\t")).length >= Math.max(2, Math.floor(rawLines.length * 0.6));
  const hasPipes = rawLines.filter((l) => (l.match(/\|/g) || []).length >= 2).length >= Math.max(2, Math.floor(rawLines.length * 0.6));

  const parsedRows = [];
  for (const line of rawLines) {
    let tokens = [];
    if (hasTabs && line.includes("\t")) {
      tokens = line.split("\t");
    } else if (hasPipes && line.includes("|")) {
      tokens = line.split("|").map((t) => t.trim()).filter(Boolean);
    } else if (/\s{2,}/.test(line)) {
      tokens = line.split(/\s{2,}/);
    } else {
      tokens = [line];
    }
    tokens = tokens.map((t) => t.trim()).filter(Boolean);
    if (tokens.length > 0) parsedRows.push(tokens);
  }

  const multiTokenRows = parsedRows.filter((r) => r.length >= 2);
  if (multiTokenRows.length < 2 || multiTokenRows.length < Math.floor(parsedRows.length * 0.6)) {
    return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
  }

  const maxCols = Math.max(...multiTokenRows.map((r) => r.length));

  // If delimited merely by multi-spaces (no tabs or pipes):
  // Require at least 3 columns, high column count uniformity across rows, and header keyword
  if (!hasTabs && !hasPipes) {
    if (maxCols < 3) {
      return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
    }
    const uniformRows = parsedRows.filter((r) => r.length === maxCols);
    if (uniformRows.length / parsedRows.length < 0.75) {
      return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
    }
    const row0Text = parsedRows[0].join(" ");
    const hasHeaderKeyword = /(?:Month|Date|Time|Item|Name|Title|Type|Category|Price|Cost|Total|Amount|Qty|Quantity|Goal|Actual|Achv|Status|Note|Description|Key|Value|項目|名稱|標題|日期|時間|月份|類別|單價|數量|小計|總計|金額|狀態|備註|範例|建議|命中|順序|資料源)/i.test(row0Text);
    if (!hasHeaderKeyword) {
      return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
    }
  }

  const tsvLines = parsedRows.map((r) => {
    const cleanedTokens = r.map((t) => cleanTableCell(t));
    return cleanedTokens.join("\t");
  });

  return {
    isTable: true,
    tsv: tsvLines.join("\n"),
    rowCount: tsvLines.length,
    colCount: maxCols
  };
}

/**
 * High-level table detection and formatter
 * @param {string} cleanedText
 * @param {object} [rawOcrData] Optional Tesseract result data
 * @returns {{isTable: boolean, text: string, rowCount: number, colCount: number}}
 */
export function processOcrTableOutput(cleanedText, rawOcrData = null) {
  if (rawOcrData && Array.isArray(rawOcrData.lines) && rawOcrData.lines.length >= 2) {
    const geoResult = detectTableFromTesseractResult(rawOcrData.lines);
    if (geoResult.isTable && geoResult.tsv) {
      return {
        isTable: true,
        text: geoResult.tsv,
        rowCount: geoResult.rowCount,
        colCount: geoResult.colCount
      };
    }
  }

  // Fallback to text-based table detection
  const plainResult = detectTableFromPlainText(cleanedText);
  if (plainResult.isTable && plainResult.tsv) {
    return {
      isTable: true,
      text: plainResult.tsv,
      rowCount: plainResult.rowCount,
      colCount: plainResult.colCount
    };
  }

  return {
    isTable: false,
    text: cleanedText,
    rowCount: 0,
    colCount: 0
  };
}

function isCjk(char) {
  return /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/.test(char);
}

export function isTimelineRow(row) {
  if (!Array.isArray(row)) return false;
  const rowText = row.map((c) => c.text || "").join(" ");
  const months = (rowText.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/gi) || []).length;
  const cjkMonths = (rowText.match(/\b([1-9]|1[0-2])\s*月/g) || []).length;
  const quarters = (rowText.match(/\bQ[1-4]\b/gi) || []).length;
  return months >= 3 || cjkMonths >= 3 || quarters >= 3;
}
