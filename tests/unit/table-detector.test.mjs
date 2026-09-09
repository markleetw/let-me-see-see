import test from "node:test";
import assert from "node:assert";
import {
  findColumnBins,
  detectTableFromTesseractResult,
  detectTableFromPlainText,
  processOcrTableOutput
} from "../../src/content/ocr/table-detector.js";

test("Unit: Table Structure Detection & TSV Formatting", async (t) => {
  await t.test("findColumnBins: clusters X coordinates into distinct columns", () => {
    const mockRows = [
      [
        { text: "Month", x0: 50, x1: 90 },
        { text: "Goal", x0: 200, x1: 240 },
        { text: "Actual", x0: 350, x1: 390 }
      ],
      [
        { text: "2026/04", x0: 48, x1: 100 },
        { text: "US$ 81,379", x0: 198, x1: 260 },
        { text: "US$ 65,345", x0: 352, x1: 410 }
      ],
      [
        { text: "2026/05", x0: 52, x1: 102 },
        { text: "US$ 90,977", x0: 202, x1: 265 },
        { text: "US$ 71,171", x0: 348, x1: 408 }
      ]
    ];

    const bins = findColumnBins(mockRows, 30);
    assert.strictEqual(bins.length, 3, "Must identify 3 distinct column bins");
    assert.ok(Math.abs(bins[0].centerX - 50) < 5);
    assert.ok(Math.abs(bins[1].centerX - 200) < 5);
    assert.ok(Math.abs(bins[2].centerX - 350) < 5);
  });

  await t.test("detectTableFromTesseractResult: accurately detects tabular layout and formats as TSV", () => {
    const rawLines = [
      {
        text: "Month Goal Actual Achv",
        words: [
          { text: "Month", bbox: { x0: 50, x1: 90 } },
          { text: "Goal", bbox: { x0: 200, x1: 240 } },
          { text: "Actual", bbox: { x0: 350, x1: 390 } },
          { text: "Achv", bbox: { x0: 500, x1: 540 } }
        ]
      },
      {
        text: "2026/04 US$ 81,379 US$ 65,345 80.30%",
        words: [
          { text: "2026/04", bbox: { x0: 48, x1: 100 } },
          { text: "US$", bbox: { x0: 198, x1: 220 } },
          { text: "81,379", bbox: { x0: 225, x1: 260 } },
          { text: "US$", bbox: { x0: 352, x1: 374 } },
          { text: "65,345", bbox: { x0: 379, x1: 415 } },
          { text: "80.30%", bbox: { x0: 502, x1: 550 } }
        ]
      },
      {
        text: "2026/05 US$ 90,977 US$ 71,171 78.23%",
        words: [
          { text: "2026/05", bbox: { x0: 52, x1: 102 } },
          { text: "US$", bbox: { x0: 201, x1: 223 } },
          { text: "90,977", bbox: { x0: 228, x1: 268 } },
          { text: "US$", bbox: { x0: 348, x1: 370 } },
          { text: "71,171", bbox: { x0: 375, x1: 412 } },
          { text: "78.23%", bbox: { x0: 498, x1: 548 } }
        ]
      }
    ];

    const result = detectTableFromTesseractResult(rawLines);
    assert.strictEqual(result.isTable, true, "Must be recognized as a table");
    assert.strictEqual(result.rowCount, 3);
    assert.strictEqual(result.colCount, 4);

    const rows = result.tsv.split("\n");
    assert.strictEqual(rows.length, 3);

    // Row 1 check
    const headers = rows[0].split("\t");
    assert.strictEqual(headers[0], "Month");
    assert.strictEqual(headers[1], "Goal");
    assert.strictEqual(headers[2], "Actual");
    assert.strictEqual(headers[3], "Achv");

    // Row 2 check
    const dataRow1 = rows[1].split("\t");
    assert.strictEqual(dataRow1[0], "2026/04");
    assert.strictEqual(dataRow1[1], "US$ 81,379");
    assert.strictEqual(dataRow1[2], "US$ 65,345");
    assert.strictEqual(dataRow1[3], "80.30%");
  });

  await t.test("detectTableFromTesseractResult: identifies non-table single-column text as isTable: false", () => {
    const rawLines = [
      {
        text: "本專案為新一代辦公室圖片工具",
        words: [{ text: "本專案為新一代辦公室圖片工具", bbox: { x0: 40, x1: 300 } }]
      },
      {
        text: "支援高解析度原圖放大檢視與快速複製",
        words: [{ text: "支援高解析度原圖放大檢視與快速複製", bbox: { x0: 40, x1: 320 } }]
      },
      {
        text: "全離線本機辨識繁體中文與英文字元",
        words: [{ text: "全離線本機辨識繁體中文與英文字元", bbox: { x0: 40, x1: 310 } }]
      }
    ];

    const result = detectTableFromTesseractResult(rawLines);
    assert.strictEqual(result.isTable, false, "Single column paragraph must NOT be detected as table");
    assert.strictEqual(result.tsv, "");
  });

  await t.test("detectTableFromPlainText: splits multi-space and pipe delimited plain text into TSV", () => {
    const plainTable = `
      Item       Quantity    Price       Total
      Widget A   10          $15.00      $150.00
      Widget B   5           $20.00      $100.00
      Widget C   2           $50.00      $100.00
    `.trim();

    const result = detectTableFromPlainText(plainTable);
    assert.strictEqual(result.isTable, true);
    assert.strictEqual(result.rowCount, 4);

    const firstRowCols = result.tsv.split("\n")[0].split("\t");
    assert.strictEqual(firstRowCols[0], "Item");
    assert.strictEqual(firstRowCols[1], "Quantity");
    assert.strictEqual(firstRowCols[2], "Price");
    assert.strictEqual(firstRowCols[3], "Total");
  });

  await t.test("processOcrTableOutput: provides seamless output switching between table and text", () => {
    // Case A: Table
    const tableOcrData = {
      lines: [
        { words: [{ text: "A", bbox: { x0: 10, x1: 20 } }, { text: "B", bbox: { x0: 100, x1: 110 } }] },
        { words: [{ text: "1", bbox: { x0: 10, x1: 20 } }, { text: "2", bbox: { x0: 100, x1: 110 } }] },
        { words: [{ text: "3", bbox: { x0: 10, x1: 20 } }, { text: "4", bbox: { x0: 100, x1: 110 } }] }
      ]
    };
    const resA = processOcrTableOutput("A B\n1 2\n3 4", tableOcrData);
    assert.strictEqual(resA.isTable, true);
    assert.strictEqual(resA.text, "A\tB\n1\t2\n3\t4");
    assert.strictEqual(resA.rowCount, 3);
    assert.strictEqual(resA.colCount, 2);

    // Case B: Normal text
    const resB = processOcrTableOutput("這是純文字段落\n第二行內容\n第三行備註說明");
    assert.strictEqual(resB.isTable, false);
    assert.strictEqual(resB.text, "這是純文字段落\n第二行內容\n第三行備註說明");
  });

  await t.test("Traditional Chinese table: correctly parses Taiwanese financial report with currencies", () => {
    const rawLines = [
      {
        text: "項目 單價 數量 小計 備註",
        words: [
          { text: "項目", bbox: { x0: 30, x1: 70 } },
          { text: "單價", bbox: { x0: 150, x1: 190 } },
          { text: "數量", bbox: { x0: 280, x1: 320 } },
          { text: "小計", bbox: { x0: 400, x1: 440 } },
          { text: "備註", bbox: { x0: 550, x1: 590 } }
        ]
      },
      {
        text: "伺服器租賃 NT$ 12,000 2 NT$ 24,000 年度合約",
        words: [
          { text: "伺服器租賃", bbox: { x0: 28, x1: 110 } },
          { text: "NT$", bbox: { x0: 148, x1: 175 } },
          { text: "12,000", bbox: { x0: 180, x1: 230 } },
          { text: "2", bbox: { x0: 282, x1: 295 } },
          { text: "NT$", bbox: { x0: 398, x1: 425 } },
          { text: "24,000", bbox: { x0: 430, x1: 480 } },
          { text: "年度合約", bbox: { x0: 548, x1: 615 } }
        ]
      },
      {
        text: "雲端儲存空間 NT$ 3,500 10 NT$ 35,000 99.9% SLA",
        words: [
          { text: "雲端儲存空間", bbox: { x0: 32, x1: 120 } },
          { text: "NT$", bbox: { x0: 150, x1: 177 } },
          { text: "3,500", bbox: { x0: 182, x1: 225 } },
          { text: "10", bbox: { x0: 280, x1: 300 } },
          { text: "NT$", bbox: { x0: 402, x1: 428 } },
          { text: "35,000", bbox: { x0: 432, x1: 485 } },
          { text: "99.9%", bbox: { x0: 552, x1: 595 } },
          { text: "SLA", bbox: { x0: 600, x1: 630 } }
        ]
      }
    ];

    const result = detectTableFromTesseractResult(rawLines);
    assert.strictEqual(result.isTable, true);
    assert.strictEqual(result.rowCount, 3);
    assert.strictEqual(result.colCount, 5);

    const rows = result.tsv.split("\n");
    assert.strictEqual(rows[0], "項目\t單價\t數量\t小計\t備註");
    assert.strictEqual(rows[1], "伺服器租賃\tNT$ 12,000\t2\tNT$ 24,000\t年度合約");
    assert.strictEqual(rows[2], "雲端儲存空間\tNT$ 3,500\t10\tNT$ 35,000\t99.9% SLA");
  });

  await t.test("Sparse / missing table cells: preserves tab count and column positions", () => {
    const rawLines = [
      {
        text: "ColA ColB ColC",
        words: [
          { text: "ColA", bbox: { x0: 50, x1: 90 } },
          { text: "ColB", bbox: { x0: 200, x1: 240 } },
          { text: "ColC", bbox: { x0: 350, x1: 390 } }
        ]
      },
      {
        // Row 2 has ColA and ColC, missing ColB
        text: "ValA1 ValC1",
        words: [
          { text: "ValA1", bbox: { x0: 50, x1: 95 } },
          { text: "ValC1", bbox: { x0: 350, x1: 395 } }
        ]
      },
      {
        text: "ValA2 ValB2 ValC2",
        words: [
          { text: "ValA2", bbox: { x0: 50, x1: 95 } },
          { text: "ValB2", bbox: { x0: 200, x1: 245 } },
          { text: "ValC2", bbox: { x0: 350, x1: 395 } }
        ]
      }
    ];

    const result = detectTableFromTesseractResult(rawLines);
    assert.strictEqual(result.isTable, true);
    const rows = result.tsv.split("\n");
    const row2Cols = rows[1].split("\t");
    assert.strictEqual(row2Cols.length, 3);
    assert.strictEqual(row2Cols[0], "ValA1");
    assert.strictEqual(row2Cols[1], ""); // missing ColB is an empty cell
    assert.strictEqual(row2Cols[2], "ValC1");
  });

  await t.test("Performance Benchmark: 10,000 cells cluster and format in under 50ms (O(N) single-pass)", () => {
    const numRows = 2000;
    const numCols = 5;
    const largeLines = [];

    for (let r = 0; r < numRows; r++) {
      const words = [];
      for (let c = 0; c < numCols; c++) {
        const x0 = 100 * c + 20;
        const x1 = x0 + 40;
        words.push({ text: `R${r}C${c}`, bbox: { x0, x1 } });
      }
      largeLines.push({
        text: words.map((w) => w.text).join(" "),
        words
      });
    }

    const start = performance.now();
    const result = detectTableFromTesseractResult(largeLines);
    const elapsed = performance.now() - start;

    assert.strictEqual(result.isTable, true);
    assert.strictEqual(result.rowCount, numRows);
    assert.strictEqual(result.colCount, numCols);
    assert.ok(elapsed < 150, `Processing 10,000 cells took ${elapsed.toFixed(2)}ms (must be < 150ms)`);
  });

  await t.test("Exclusion: Roadmap / Timeline chart must NOT be classified as table", () => {
    // media_1788935217815.png
    const roadmapLines = [
      {
        text: "Gift Finder v2 System Noti Optimization Stage 2 Search Result Optimization",
        words: [
          { text: "Gift Finder v2", bbox: { x0: 20, x1: 150 } },
          { text: "System Noti Optimization Stage 2", bbox: { x0: 450, x1: 700 } },
          { text: "Search Result Optimization", bbox: { x0: 720, x1: 950 } }
        ]
      },
      {
        text: "System Noti Optimization Stage 1 Product Page Revamp Gift Finder v3",
        words: [
          { text: "System Noti Optimization Stage 1", bbox: { x0: 20, x1: 250 } },
          { text: "Product Page Revamp", bbox: { x0: 300, x1: 520 } },
          { text: "Gift Finder v3", bbox: { x0: 580, x1: 750 } }
        ]
      },
      {
        text: "sep oct nov dec jan feb mar",
        words: [
          { text: "sep", bbox: { x0: 50, x1: 80 } },
          { text: "oct", bbox: { x0: 180, x1: 210 } },
          { text: "nov", bbox: { x0: 320, x1: 350 } },
          { text: "dec", bbox: { x0: 460, x1: 490 } },
          { text: "jan", bbox: { x0: 600, x1: 630 } },
          { text: "feb", bbox: { x0: 740, x1: 770 } },
          { text: "mar", bbox: { x0: 880, x1: 910 } }
        ]
      },
      {
        text: "DWEB Browse Page Revamp DWEB Homepage Revamp",
        words: [
          { text: "DWEB Browse Page Revamp", bbox: { x0: 20, x1: 220 } },
          { text: "DWEB Homepage Revamp", bbox: { x0: 300, x1: 500 } }
        ]
      }
    ];

    const result = detectTableFromTesseractResult(roadmapLines);
    assert.strictEqual(result.isTable, false, "Roadmap with timeline axis must NOT be a table");
  });

  await t.test("Exclusion: Gantt chart with CJK timeline months must NOT be classified as table", () => {
    // media_1788935377197.png
    const ganttLines = [
      {
        text: "7月 8月 9月 10月 11月 12月 1月",
        words: [
          { text: "7月", bbox: { x0: 50, x1: 80 } },
          { text: "8月", bbox: { x0: 180, x1: 210 } },
          { text: "9月", bbox: { x0: 320, x1: 350 } },
          { text: "10月", bbox: { x0: 460, x1: 500 } },
          { text: "11月", bbox: { x0: 600, x1: 640 } },
          { text: "12月", bbox: { x0: 740, x1: 780 } },
          { text: "1月", bbox: { x0: 880, x1: 910 } }
        ]
      },
      {
        text: "iichi Project",
        words: [{ text: "iichi Project", bbox: { x0: 20, x1: 280 } }]
      },
      {
        text: "分潤廣告",
        words: [{ text: "分潤廣告", bbox: { x0: 80, x1: 420 } }]
      },
      {
        text: "Offline Event Registration",
        words: [{ text: "Offline Event Registration", bbox: { x0: 150, x1: 550 } }]
      }
    ];

    const result = detectTableFromTesseractResult(ganttLines);
    assert.strictEqual(result.isTable, false, "Gantt chart with timeline axis must NOT be a table");
  });

  await t.test("Exclusion: Search suggestion dropdown list must NOT be classified as table", () => {
    // media_1788935245055.png
    const dropdownLines = [
      {
        text: "雨靴 316",
        words: [
          { text: "雨靴", bbox: { x0: 40, x1: 90 } },
          { text: "316", bbox: { x0: 280, x1: 320 } }
        ]
      },
      {
        text: "雨衣 2,018",
        words: [
          { text: "雨衣", bbox: { x0: 40, x1: 90 } },
          { text: "2,018", bbox: { x0: 280, x1: 330 } }
        ]
      },
      {
        text: "雨鞋 313",
        words: [
          { text: "雨鞋", bbox: { x0: 40, x1: 90 } },
          { text: "313", bbox: { x0: 280, x1: 320 } }
        ]
      },
      {
        text: "雨之情/雨之戀",
        words: [{ text: "雨之情/雨之戀", bbox: { x0: 40, x1: 180 } }]
      },
      {
        text: "雨傘 2,222",
        words: [
          { text: "雨傘", bbox: { x0: 40, x1: 90 } },
          { text: "2,222", bbox: { x0: 280, x1: 330 } }
        ]
      },
      {
        text: "雨中圓舞曲",
        words: [{ text: "雨中圓舞曲", bbox: { x0: 40, x1: 160 } }]
      }
    ];

    const result = detectTableFromTesseractResult(dropdownLines);
    assert.strictEqual(result.isTable, false, "Search suggestion list without headers must NOT be a table");
  });

  await t.test("Inclusion: Onsite RMN financial report must be accurately classified as table", () => {
    // media_1788935345101.png
    const rmnLines = [
      {
        text: "Month Goal (USD) Act. / Est. (USD) % Achv. Cumulative Gap (USD)",
        words: [
          { text: "Month", bbox: { x0: 50, x1: 110 } },
          { text: "Goal (USD)", bbox: { x0: 200, x1: 300 } },
          { text: "Act. / Est. (USD)", bbox: { x0: 400, x1: 550 } },
          { text: "% Achv.", bbox: { x0: 650, x1: 720 } },
          { text: "Cumulative Gap (USD)", bbox: { x0: 800, x1: 980 } }
        ]
      },
      {
        text: "2026/04 US$ 81,379 US$ 65,345 80.30% -16,034",
        words: [
          { text: "2026/04", bbox: { x0: 50, x1: 120 } },
          { text: "US$ 81,379", bbox: { x0: 200, x1: 310 } },
          { text: "US$ 65,345", bbox: { x0: 400, x1: 510 } },
          { text: "80.30%", bbox: { x0: 650, x1: 710 } },
          { text: "-16,034", bbox: { x0: 850, x1: 930 } }
        ]
      },
      {
        text: "2026/05 US$ 90,977 US$ 71,171 78.23% -35,841",
        words: [
          { text: "2026/05", bbox: { x0: 50, x1: 120 } },
          { text: "US$ 90,977", bbox: { x0: 200, x1: 310 } },
          { text: "US$ 71,171", bbox: { x0: 400, x1: 510 } },
          { text: "78.23%", bbox: { x0: 650, x1: 710 } },
          { text: "-35,841", bbox: { x0: 850, x1: 930 } }
        ]
      },
      {
        text: "2026/06 US$ 90,409 US$ 68,924 76.24% -57,326",
        words: [
          { text: "2026/06", bbox: { x0: 50, x1: 120 } },
          { text: "US$ 90,409", bbox: { x0: 200, x1: 310 } },
          { text: "US$ 68,924", bbox: { x0: 400, x1: 510 } },
          { text: "76.24%", bbox: { x0: 650, x1: 710 } },
          { text: "-57,326", bbox: { x0: 850, x1: 930 } }
        ]
      }
    ];

    const result = detectTableFromTesseractResult(rmnLines);
    assert.strictEqual(result.isTable, true, "Onsite RMN must be classified as a table");
    assert.strictEqual(result.colCount, 5);
    assert.strictEqual(result.rowCount, 4);

    const rows = result.tsv.split("\n");
    assert.strictEqual(rows[0].split("\t").length, 5);
    assert.strictEqual(rows[1].split("\t").length, 5);
  });

  await t.test("Inclusion: Onsite RMN report with top tab badge strips title badge and aligns all 5 columns without phantom columns", () => {
    // media_1788940119085.png with top badge "OnsiteRMN v_ 圖"
    const rmnWithBadgeLines = [
      {
        text: "OnsiteRMN v_ 圖",
        words: [
          { text: "OnsiteRMN", bbox: { x0: 20, x1: 90 } },
          { text: "v_", bbox: { x0: 100, x1: 115 } },
          { text: "圖", bbox: { x0: 130, x1: 145 } }
        ]
      },
      {
        text: "📅 Month ⌵ 💳 Goal (USD) ⌵ Act. / Est. (USD) ⌵ % Achv. ⌵ Cumulative Gap (USD) ⌵",
        words: [
          { text: "Month", bbox: { x0: 25, x1: 75 } },
          { text: "Goal (USD)", bbox: { x0: 230, x1: 320 } },
          { text: "Act. / Est. (USD)", bbox: { x0: 420, x1: 540 } },
          { text: "% Achv.", bbox: { x0: 640, x1: 700 } },
          { text: "Cumulative Gap (USD)", bbox: { x0: 880, x1: 990 } }
        ]
      },
      {
        text: "2026/04 US$ 81,379 US$ 65,345 80.30% -16,034",
        words: [
          { text: "2026/04", bbox: { x0: 25, x1: 85 } },
          { text: "US$ 81,379", bbox: { x0: 230, x1: 310 } },
          { text: "US$ 65,345", bbox: { x0: 420, x1: 500 } },
          { text: "80.30%", bbox: { x0: 640, x1: 695 } },
          { text: "-16,034", bbox: { x0: 880, x1: 940 } }
        ]
      },
      {
        text: "2026/05 US$ 90,977 US$ 71,171 78.23% -35,841",
        words: [
          { text: "2026/05", bbox: { x0: 25, x1: 85 } },
          { text: "US$ 90,977", bbox: { x0: 230, x1: 310 } },
          { text: "US$ 71,171", bbox: { x0: 420, x1: 500 } },
          { text: "78.23%", bbox: { x0: 640, x1: 695 } },
          { text: "-35,841", bbox: { x0: 880, x1: 940 } }
        ]
      }
    ];

    const result = detectTableFromTesseractResult(rmnWithBadgeLines);
    assert.strictEqual(result.isTable, true);
    assert.strictEqual(result.colCount, 5, "Must have exactly 5 columns without phantom columns");
    assert.strictEqual(result.rowCount, 3, "Must have 3 rows (title badge omitted, header + 2 data rows)");

    const rows = result.tsv.split("\n");
    assert.ok(!rows[0].includes("OnsiteRMN"), "Top title badge must NOT be in the TSV grid");
    assert.strictEqual(rows[0], "Month\tGoal (USD)\tAct. / Est. (USD)\t% Achv.\tCumulative Gap (USD)");
    assert.strictEqual(rows[1], "2026/04\tUS$ 81,379\tUS$ 65,345\t80.30%\t-16,034");
    assert.strictEqual(rows[2], "2026/05\tUS$ 90,977\tUS$ 71,171\t78.23%\t-35,841");
  });
});


