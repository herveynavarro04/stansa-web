// One-shot utility to (re)create xlsx dimension tables for the 8 construction
// products from the source images in /Users/herveynavarro/Desktop/missing_products.
// Data below is transcribed directly from those images.
//
// Usage:  node scripts/create-construction-tables.mjs

import * as XLSX from 'xlsx';
import path from 'node:path';
import fs from 'node:fs';

const OUT_DIR = path.join(process.cwd(), 'products-tables');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function saveTable(slug, sheetName, headers, rows) {
  const aoa = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const outPath = path.join(OUT_DIR, `${slug}.xlsx`);
  XLSX.writeFile(wb, outPath);
  console.log(`  ${slug}.xlsx  (${rows.length} rows)`);
}

console.log('Creating construction-material tables:');

// --- alambre_recocido ---
saveTable(
  'alambre_recocido',
  'Alambre Recocido',
  [
    'Calibre',
    'Diámetro (mm)',
    'Diámetro (pulg)',
    'Rollo — Diám. interior (cm)',
    'Rollo — Diám. interior (pulg)',
    'Rollo — Diám. exterior (cm)',
    'Rollo — Diám. exterior (pulg)',
    'Rollo — Peso (kg)',
  ],
  [
    [16, 1.59, 0.063, 30, 11.8, 50, 19.7, 50],
  ],
);

// --- alambrón ---
saveTable(
  'alambrón',
  'Alambrón',
  ['Calibre (mm)', 'Calibre (pulg)'],
  [
    [5.5, 0.218],
    [6.3, 0.250],
  ],
);

// --- clavo_con_cabeza ---
saveTable(
  'clavo_con_cabeza',
  'Clavo con Cabeza',
  [
    'Calibre',
    'Longitud (pulg)',
    'Longitud (mm)',
    'Diámetro (pulg)',
    'Diámetro (mm)',
  ],
  [
    [8,    '4',     102, 0.162, 4.11],
    [8,    '3 1/2',  89, 0.162, 4.11],
    [10.5, '3',      76, 0.128, 3.25],
    [11,   '2 1/2',  64, 0.120, 3.05],
  ],
);

// --- clavo_para_concreto ---
saveTable(
  'clavo_para_concreto',
  'Clavo para Concreto',
  ['Calibre', 'Longitud (pulg)', 'Longitud (mm)'],
  [
    ['*8', '1',      25],
    ['*8', '1 1/2',  38],
    ['8',  '2',      51],
    ['8',  '2 1/2',  63],
    ['*8', '3',      76],
    ['*8', '3 1/2',  89],
    ['*8', '4',     102],
  ],
);

// --- hoja_para_castillo ---
saveTable(
  'hoja_para_castillo',
  'Hoja para Castillo',
  [
    'Dimensión',
    'Sección castillo (cm)',
    'Sección concreto',
    'Separación entre estribos (mm)',
    'Piezas por hoja (castillos)',
  ],
  [
    ['12 x 12 – 3', '8 x 8',   '12 x 12', 158, 8],
    ['15 x 15 – 3', '11 x 11', '15 x 15', 158, 6],
    ['12 x 12 – 4', '8 x 8',   '12 x 12', 158, 6],
    ['15 x 15 – 4', '11 x 11', '15 x 15', 158, 5],
    ['12 x 20 – 4', '8 x 16',  '12 x 20', 158, 4],
    ['15 x 20 – 4', '11 x 16', '15 x 20', 158, 4],
    ['15 x 25 – 4', '11 x 21', '15 x 25', 158, 3],
    ['15 x 30 – 4', '11 x 26', '15 x 30', 158, 3],
  ],
);

// --- malla_electrosoldada ---
saveTable(
  'malla_electrosoldada',
  'Malla Electrosoldada',
  ['Presentación', 'Producto', 'Área (m²)', 'Dimensiones (Ancho x Largo) m'],
  [
    ['Rollo', 'R-6×6-10/10',   100, '2.5 x 40'],
    ['Rollo', 'R-6×6-08/08',   100, '2.5 x 40'],
    ['Rollo', 'R-6×6-06/06',   100, '2.5 x 40'],
    ['Rollo', 'R-6×6-04/04',   100, '2.5 x 40'],
    ['Hoja',  'H-6×6-10/10',    15, '2.5 x 6'],
    ['Hoja',  'H-6×6-08/08',    15, '2.5 x 6'],
    ['Hoja',  'H-6×6-06/06',    15, '2.5 x 6'],
    ['Hoja',  'H-6×6-04/04',    15, '2.5 x 6'],
    ['Hoja',  'H-6×6-03/03 *',  15, '2.5 x 6'],
    ['Hoja',  'H-6×6-02/02 *',  15, '2.5 x 6'],
  ],
);

// --- varilla_corrugada ---
saveTable(
  'varilla_corrugada',
  'Varilla Corrugada',
  [
    'No. Designación',
    'Calibre (pulg)',
    'Calibre (mm)',
    'Peso (kg/m)',
    'Peso (lb/m)',
    'Área (mm²)',
    'Perímetro (mm)',
  ],
  [
    [3,  '3/8',    9.5, 0.56, 0.38,   71,  29.8],
    [4,  '1/2',   12.7, 0.99, 0.67,  127,  39.9],
    [5,  '5/8',   15.9, 1.55, 1.04,  198,  50.0],
    [6,  '3/4',   19.1, 2.24, 1.50,  285,  60.0],
    [8,  '1',     25.4, 3.97, 2.67,  507,  79.8],
    [10, '1 1/4', 31.8, 6.23, 4.30,  794,  99.9],
    [12, '1 1/2', 38.1, 8.94, 5.99, 1140, 119.7],
  ],
);

// --- varilla_grado_6000 ---
saveTable(
  'varilla_grado_6000',
  'Varilla Grado 6000',
  [
    'No. Designación (B)',
    'Diámetro nominal (pulg)',
    'Diámetro nominal (mm)',
    'Peso (kg/m)',
    'Área (mm²)',
    'Área (pulg²)',
    'Peso por varilla 6 m (kg)',
    'No. varillas por tonelada (6 m)',
  ],
  [
    [2.5,  '5/16', 7.94, 0.384, 49.51, 0.077, 2.30,  434],
    [2,    '1/4',  6.35, 0.248, 31.67, 0.049, 1.49,  672],
    [1.5,  '3/16', 4.76, 0.140, 17.80, 0.028, 0.84, 1190],
    [1.25, '5/32', 3.97, 0.097, 12.38, 0.019, 0.58, 1718],
    [3,    '3/8',  9.53, 0.559, 71.26, 0.110, 3.35,  298],
  ],
);

console.log('Done.');
