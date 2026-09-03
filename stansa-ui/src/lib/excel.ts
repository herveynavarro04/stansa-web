import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import * as XLSX from 'xlsx';

export type ProductTable = {
  headers: string[];
  rows: (string | number)[][];
  sheetName: string;
};

const DATA_DIR = path.join(process.cwd(), 'products-tables');

/**
 * Reads /data/{slug}.xlsx and returns the first sheet as a headers + rows table.
 * Returns null when the file is missing so pages can render a graceful placeholder.
 */
export function readProductTable(slug: string): ProductTable | null {
  const filePath = path.join(DATA_DIR, `${slug}.xlsx`);
  if (!fs.existsSync(filePath)) return null;

  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: false });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return null;

  const sheet = workbook.Sheets[sheetName];
  const raw = XLSX.utils.sheet_to_json<(string | number | null | undefined)[]>(sheet, {
    header: 1,
    blankrows: false,
    defval: '',
  });

  if (raw.length === 0) return { headers: [], rows: [], sheetName };

  // First non-empty row is treated as the header row.
  const headerIndex = raw.findIndex((row) => row.some((c) => c !== '' && c != null));
  const headerRow = raw[headerIndex] ?? [];
  const bodyRows = raw.slice(headerIndex + 1);

  const headers = headerRow.map((h, i) =>
    h == null || h === '' ? `Columna ${i + 1}` : String(h).trim(),
  );

  const rows = bodyRows
    .map((row) =>
      headers.map((_, i) => {
        const cell = row[i];
        if (cell == null || cell === '') return '';
        return typeof cell === 'number' ? cell : String(cell).trim();
      }),
    )
    .filter((row) => row.some((c) => c !== ''));

  return { headers, rows, sheetName };
}

export function listAvailableSlugs(): string[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.xlsx') && !f.startsWith('~$'))
    .map((f) => f.replace(/\.xlsx$/, ''));
}
