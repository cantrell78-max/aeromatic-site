import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
};

/** Reads web-ready images from public/gallery/ at build time. */
export function getGalleryImages(): GalleryImage[] {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  if (!fs.existsSync(galleryDir)) {
    return [];
  }

  return fs
    .readdirSync(galleryDir)
    .filter((name) => IMAGE_EXT.test(name) && !name.startsWith("."))
    .sort()
    .map((name) => {
      const base = name.replace(IMAGE_EXT, "").replace(/-/g, " ");
      return {
        src: `/gallery/${name}`,
        alt: `Aerial photograph: ${base}`,
        title: base,
      };
    });
}