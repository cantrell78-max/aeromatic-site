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

### Blog images

- Put files in `public/images/blog/`
- Reference in Markdown: `![Alt text](/images/blog/my-photo.webp)`

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