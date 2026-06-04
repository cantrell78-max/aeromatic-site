#!/usr/bin/env node
/**
 * Resize & convert gallery picks → public/gallery/*.webp
 * Input:  ~/aeromatic-assets/picks/  (or FROM_GALLERY_DIR env var)
 * Output: public/gallery/
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const inputDir =
  process.env.FROM_GALLERY_DIR ||
  path.join(process.env.HOME || "", "aeromatic-assets", "picks");
const outputDir = path.join(projectRoot, "public", "gallery");

const MAX_EDGE = 2400;
const WEBP_QUALITY = 82;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|heic|heif)$/i;

if (!fs.existsSync(inputDir)) {
  console.error(`Input folder not found: ${inputDir}`);
  console.error("Create it and add photos, e.g. ~/aeromatic-assets/picks/");
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."));

if (files.length === 0) {
  console.error(`No images in ${inputDir}`);
  process.exit(1);
}

console.log(`Optimizing ${files.length} image(s) from:\n  ${inputDir}\n→ ${outputDir}\n`);

for (const file of files) {
  const base = path.basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const outName = `${base}.webp`;
  const outPath = path.join(outputDir, outName);

  await sharp(path.join(inputDir, file))
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);

  const { size } = fs.statSync(outPath);
  console.log(`  ✓ ${outName} (${Math.round(size / 1024)} KB)`);
}

console.log("\nDone. Check /gallery locally, then git add & push.");