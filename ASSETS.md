# Assets guide — Aeromatic site

## Two-folder workflow

| Location | Purpose |
|----------|---------|
| `~/aeromatic-assets/` (your machine, optional) | Originals from Google Photos — **not** in git |
| `public/` in this repo | **Web-ready** files only — deployed to Cloudflare |

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

1. Export from Google Photos → resize (long edge ~1920–2400px, WebP or JPEG ~80%).
2. Name descriptively: `deschutes-river-bend-sunset.webp`
3. Copy into `public/gallery/`
4. `git add` → `commit` → `push` → Cloudflare rebuilds

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