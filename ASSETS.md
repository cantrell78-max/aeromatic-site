# Assets guide — Aeromatic site

## Two-folder workflow

| Location | Purpose |
|----------|---------|
| `~/aeromatic-assets/` | Originals & picks — **not** in git (see `~/aeromatic-assets/README.md`) |
| `public/` in this repo | **Web-ready** files only — deployed to Cloudflare |

### Staging folders (created on your machine)

```text
~/aeromatic-assets/
  from-google-photos/   ← paste Google Photos downloads here first
  picks/                ← copy your best shots here, then run optimizer
  hero/                 ← homepage banner candidates
  about/                ← headshot originals
  blog/                 ← blog image originals
```

## Where files go in this project

```text
public/
  gallery/                 ← Portfolio (auto-listed on /gallery)
  images/
    hero/                  ← Homepage hero (future use)
    about/
      adam.jpg             ← Your headshot for /about
    blog/                  ← Inline images for blog posts
    brand/                 ← Logo, favicon (optional)
```

### Gallery

1. Download from Google Photos → copy into `~/aeromatic-assets/from-google-photos/`
2. Copy keepers into `~/aeromatic-assets/picks/`
3. Optimize into the site:

   ```bash
   cd ~/projects/aeromatic-site
   npm run gallery:optimize
   ```

   Writes `.webp` files to `public/gallery/` (max edge 2400px).

4. Preview `/gallery/` → `git add public/gallery` → `commit` → `push`

**Manual alternative:** resize in [Squoosh](https://squoosh.app) and copy `.webp`/`.jpg` directly into `public/gallery/`.

No JSON edit needed — the site scans `public/gallery/` at build time.

### About photo

- Path: `public/images/about/adam.jpg`
- Size: ~800–1200px wide is enough
- Staging: copy original to `~/aeromatic-assets/about/` then:

  ```bash
  cp ~/aeromatic-assets/about/your-photo.jpg public/images/about/adam.jpg
  ```

### Homepage hero

```bash
npm run hero:optimize
# or pick a source file:
npm run hero:optimize -- ~/aeromatic-assets/picks/my-favorite-shot.jpg
```

Writes `public/images/hero/hero.webp`.

### Logo

- Mark in header: `public/images/brand/logo-mark.svg` — schematic reticle + drone (matches brand concept 01)
- Favicon: `public/favicon.svg`
- **Reference only** (not deployed): `public/images/brand/concepts/*.jpg` — AI exploration mocks; gitignored. Edit the SVG if you want to tweak the live mark.

### Contact & maps (env)

Copy `env.example` → `.env` and set:

- `PUBLIC_FORMSPREE_ID` — form submissions
- `PUBLIC_MAPS_EMBED_SRC` — Google Business Profile embed URL
- `PUBLIC_CONTACT_EMAIL` — shown if Formspree isn't set yet
- `PUBLIC_YOUTUBE_URL` — optional link on contact page

### Blog images

- Put files in `public/images/blog/`
- Reference in Markdown: `![Alt text](/images/blog/my-photo.webp)`

### Blog posts

Add `src/content/blog/my-post.md`:

```yaml
---
title: "Post title"
description: "Short summary for SEO"
pubDate: 2026-06-04
youtubeId: "optional_video_id"
---
```

### YouTube

- Upload to your **company YouTube channel**
- In a post frontmatter: `youtubeId: "VIDEO_ID_HERE"` (the id from `youtube.com/watch?v=VIDEO_ID`)

## Staging folder (recommended)

```text
~/aeromatic-assets/
  from-google-photos/
  picks/
  hero/
  about/
```

Keep masters there; copy optimized exports into `public/` above.