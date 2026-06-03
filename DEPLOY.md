# Deploy — GitHub + Cloudflare Pages

## Cloudflare Pages settings

| Setting | Value |
|---------|--------|
| Framework preset | **Astro** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | **20** or **22** (set in Pages → Settings → Environment) |

## 1. Create the GitHub repository

From your machine (WSL):

```bash
cd ~/projects/aeromatic-site
git init
git branch -M main
git add .
git commit -m "Initial Aeromatic site — Astro dark theme"
```

On GitHub (browser):

1. [github.com/new](https://github.com/new)
2. Repository name: `aeromatic-site` (or your choice)
3. **Private** or Public — your call
4. **Do not** add README, .gitignore, or license (you already have them)
5. Create repository

Connect and push (replace `YOUR_USER`):

```bash
git remote add origin git@github.com:YOUR_USER/aeromatic-site.git
# HTTPS alternative:
# git remote add origin https://github.com/YOUR_USER/aeromatic-site.git

git push -u origin main
```

### SSH vs HTTPS

- **SSH:** `git@github.com:...` — needs [SSH key added to GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- **HTTPS:** GitHub will prompt for login/token on push

## 2. Connect Cloudflare Pages to GitHub

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → your project (or **Create** → **Pages** → **Connect to Git**)
2. Authorize GitHub if prompted
3. Select repository: `aeromatic-site`
4. Build settings (table above) → **Save and Deploy**
5. Wait for first deploy → preview URL `https://something.pages.dev`

## 3. Custom domain (aeromaticdrone.com)

1. Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `aeromaticdrone.com` and `www.aeromaticdrone.com`
3. Cloudflare adds DNS records automatically if the domain is on the same account
4. HTTPS certificate provisions in a few minutes

## 4. Day-to-day updates

```bash
cd ~/projects/aeromatic-site
# edit files, add photos to public/gallery/, etc.
git add .
git commit -m "Add gallery photos"
git push
```

Cloudflare rebuilds on every push to `main`.

## 5. Local preview

```bash
source ~/.nvm/nvm.sh   # if needed
cd ~/projects/aeromatic-site
npm run dev
```

Open http://localhost:4321

## Before going live

- [ ] Replace Formspree ID in `src/pages/contact.astro`
- [ ] Replace Google Maps embed `src` in `contact.astro` (Share → Embed from your Business Profile)
- [ ] Add `public/images/about/adam.jpg`
- [ ] Add gallery images to `public/gallery/`
- [ ] Set website URL on Google Business Profile to `https://aeromaticdrone.com`