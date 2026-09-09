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
  for (const row of rows) {
    for (const cell of row) {
      if (typeof cell.x0 === "number") {
        allXStarts.push(cell.x0);
      }
    }
  }

  if (allXStarts.length === 0) return [];
  allXStarts.sort((a, b) => a - b);

  // Group close X coordinates into clusters
  const clusters = [];
  for (const x of allXStarts) {
    const matched = clusters.find((c) => Math.abs(c.mean - x) <= tolerance);
    if (matched) {
      matched.points.push(x);
      matched.mean = matched.points.reduce((sum, v) => sum + v, 0) / matched.points.length;
      matched.min = Math.min(matched.min, x);
      matched.max = Math.max(matched.max, x);
    } else {
      clusters.push({ points: [x], mean: x, min: x, max: x });
    }
  }

  // Filter clusters: must appear in at least 2 distinct rows or have sufficient frequency
  return clusters
    .filter((c) => c.points.length >= 2)
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
  const rows = [];
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

  // 2. Identify column alignment bins
  const columnBins = findColumnBins(rows);

  // Table Criteria:
  // - At least 2 columns identified
  // - At least 60% of rows contain 2 or more distinct columns
  const multiColRows = rows.filter((r) => r.length >= 2);
  const isTable = columnBins.length >= 2 && multiColRows.length >= Math.max(2, Math.floor(rows.length * 0.5));

  if (!isTable) {
    return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
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
 * Inspects line token patterns, multi-space delimiters, and consistent field counts.
 * @param {string} text
 * @returns {{isTable: boolean, tsv: string, rowCount: number, colCount: number}}
 */
export function detectTableFromPlainText(text) {
  if (!text || typeof text !== "string") {
    return { isTable: false, tsv: text || "", rowCount: 0, colCount: 0 };
  }

  const rawLines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (rawLines.length < 3) {
    return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
  }

  // Check if lines are delimited by tabs or 2+ spaces or pipes
  const parsedRows = [];
  for (const line of rawLines) {
    // Delimiter check: pipe '|', tab '\t', or 2+ consecutive spaces
    let tokens = [];
    if (line.includes("\t")) {
      tokens = line.split("\t");
    } else if (line.includes("|")) {
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
  const isTable = multiTokenRows.length >= 3 && multiTokenRows.length >= Math.floor(parsedRows.length * 0.6);

  if (!isTable) {
    return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
  }

  const maxCols = Math.max(...multiTokenRows.map((r) => r.length));
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
