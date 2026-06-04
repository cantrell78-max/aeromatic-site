import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
};

/** Reads web-ready images from public/gallery/ at build time (with dimensions for layout + lightbox). */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  if (!fs.existsSync(galleryDir)) {
    return [];
  }

  const names = fs
    .readdirSync(galleryDir)
    .filter((name) => IMAGE_EXT.test(name) && !name.startsWith("."))
    .sort();

  return Promise.all(
    names.map(async (name) => {
      const filePath = path.join(galleryDir, name);
      const meta = await sharp(filePath).metadata();
      const base = name.replace(IMAGE_EXT, "").replace(/-/g, " ");
      return {
        src: `/gallery/${name}`,
        alt: `Aerial photograph: ${base}`,
        title: base,
        width: meta.width ?? 1600,
        height: meta.height ?? 1200,
      };
    })
  );
}