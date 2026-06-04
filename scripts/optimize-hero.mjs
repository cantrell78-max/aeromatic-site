#!/usr/bin/env node
/**
 * Build homepage hero image → public/images/hero/hero.webp
 * Usage: npm run hero:optimize [path-to-source-image]
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public");
const defaultSrc = path.join(root, "gallery", "dji-fly-20260202-103438-0027-1770060465666-photo-2.webp");
const src = path.resolve(process.argv[2] ?? defaultSrc);
const outDir = path.join(root, "images", "hero");
const out = path.join(outDir, "hero.webp");

if (!fs.existsSync(src)) {
  console.error(`Source not found: ${src}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const meta = await sharp(src).metadata();
const width = Math.min(meta.width ?? 2400, 2400);

await sharp(src)
  .resize(width, null, { withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(out);

console.log(`Wrote ${out} (${width}px wide)`);