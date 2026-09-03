// One-shot utility: takes the source logo (which has a checker pattern baked
// in as pixels because it was exported from a design tool without a real
// alpha channel) and produces a proper RGBA PNG with those neutral gray
// pixels turned transparent. The logo itself is warm bronze/copper, so
// keying by "near-neutral and light" doesn't touch the mark.
//
// Usage:  node scripts/dechecker.mjs <input> <output>

import sharp from 'sharp';

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error('Usage: node scripts/dechecker.mjs <input> <output>');
  process.exit(1);
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let cleared = 0;
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  // Neutral gray: R, G, B all close together
  const maxDelta = Math.max(
    Math.abs(r - g),
    Math.abs(g - b),
    Math.abs(r - b),
  );
  const avg = (r + g + b) / 3;

  // Fully clear anything that's light + neutral (the checker squares)
  if (maxDelta <= 10 && avg >= 180) {
    data[i + 3] = 0;
    cleared++;
  } else if (maxDelta <= 12 && avg >= 160) {
    // Feather zone — reduce alpha instead of full clear so edges stay smooth
    const t = (avg - 160) / 20; // 0..1
    data[i + 3] = Math.round(data[i + 3] * (1 - t));
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(
  `Wrote ${output} (${info.width}×${info.height}, cleared ${cleared.toLocaleString()} px)`,
);
