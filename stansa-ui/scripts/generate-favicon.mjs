// One-shot utility to generate the site favicon assets from /public/logo.png.
// Composites the transparent logo mark onto a solid white square with a small
// safe-area padding so the mark doesn't touch the icon edges (especially
// important at 32×32 in browser tabs).
//
// Output:
//   src/app/icon.png        512×512 — main icon (Next.js auto-injects <link rel="icon">)
//   src/app/apple-icon.png  180×180 — iOS Home Screen touch icon
//
// Usage:  node scripts/generate-favicon.mjs

import sharp from 'sharp';
import path from 'node:path';

const SOURCE = path.join(process.cwd(), 'public', 'logo.png');
const APP_DIR = path.join(process.cwd(), 'src', 'app');

async function makeIcon(size, padPct, outPath) {
  const pad = Math.round(size * padPct);
  const inner = size - pad * 2;

  // White filled circle SVG at target size — the icon's disc background.
  const circleSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#ffffff"/>
     </svg>`,
  );

  const resizedMark = await sharp(SOURCE)
    .resize(inner, inner, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toBuffer();

  // Start with a transparent canvas so the corners outside the circle stay
  // transparent — the icon reads as a round disc on any browser tab color.
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: circleSvg },
      { input: resizedMark, gravity: 'center' },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`  ${path.relative(process.cwd(), outPath)}  (${size}×${size})`);
}

console.log('Generating favicons:');
// padPct = safe-area around the mark, as a fraction of icon size.
// Smaller number = larger logo. 0.03 fills most of the disc without clipping.
await makeIcon(512, 0.03, path.join(APP_DIR, 'icon.png'));
await makeIcon(180, 0.04, path.join(APP_DIR, 'apple-icon.png'));
console.log('Done.');
