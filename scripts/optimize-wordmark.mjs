/**
 * Prepare header wordmark from 02-wordmark.jpg:
 * trim padding, replace gray/navy matte with site header bg (#08090c), export webp.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src =
  process.argv[2] ??
  path.join(root, "public/images/brand/concepts/02-wordmark.jpg");
const out = path.join(root, "public/images/brand/wordmark.webp");

/** Matches --bg / header base in global.css */
const HEADER_BG = { r: 8, g: 9, b: 12 };
/** Typical matte from generated concept corners */
const MATTE_BG = { r: 15, g: 21, b: 29 };

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/** Keep teal/white logo pixels; flatten dark gray/navy panels to header bg */
function isBackgroundPixel(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const isTealAccent = g > r + 18 && g > b + 8 && lum > 70;
  const isBrightText = lum > 175;
  if (isTealAccent || isBrightText) return false;
  if (lum > 95) return false;
  if (colorDistance(r, g, b, HEADER_BG.r, HEADER_BG.g, HEADER_BG.b) < 38) return true;
  if (colorDistance(r, g, b, MATTE_BG.r, MATTE_BG.g, MATTE_BG.b) < 55) return true;
  return lum < 72 && Math.max(r, g, b) - Math.min(r, g, b) < 28;
}

const trimmed = await sharp(src).trim({ threshold: 14 }).toBuffer();
const { data, info } = await sharp(trimmed)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const outBuf = Buffer.from(data);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isBackgroundPixel(r, g, b)) {
      outBuf[i] = HEADER_BG.r;
      outBuf[i + 1] = HEADER_BG.g;
      outBuf[i + 2] = HEADER_BG.b;
      if (channels === 4) outBuf[i + 3] = 255;
    }
  }
}

await sharp(outBuf, { raw: { width, height, channels } })
  .flatten({ background: HEADER_BG })
  .webp({ quality: 92 })
  .toFile(out);

const meta = await sharp(out).metadata();
console.log(`Wrote ${out} (${meta.width}×${meta.height})`);