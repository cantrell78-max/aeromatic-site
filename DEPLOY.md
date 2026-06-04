# Deploy — GitHub + Cloudflare Pages

## Cloudflare build settings (Workers Builds)

This project uses Cloudflare’s **Workers Builds** flow (Git → build → `wrangler deploy`), not the older “Pages only” screen that shows **Build output directory: `dist`**.

| Setting | Value |
|---------|--------|
| Git repository | `cantrell78-max/aeromatic-site` |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (default) |
| Static files | `./dist` via `wrangler.jsonc` in the repo |

Node version **20** or **22** in the project’s environment settings.

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
git remote add origin git@github.com:cantrell78-max/aeromatic-site.git
# HTTPS alternative:
# git remote add origin https://github.com/cantrell78-max/aeromatic-site.git

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

Cloudflare rebuilds on every push to `main` **only if** the Pages project is connected to Git (not “Direct Upload”).

### Auto-deploy not running?

In [Workers & Pages](https://dash.cloudflare.com) → your **aeromatic-site** project:

1. **Deployments** tab — open a recent deploy. Under **Source**, it should say **Git** and show the commit hash. If it says **Direct Upload** or **Wrangler**, pushes to GitHub will **not** trigger builds; you must redeploy from the dashboard or reconnect Git.
2. **Settings → Builds**
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy` (needs `wrangler.jsonc` with `"assets": { "directory": "./dist" }`)
   - There is no separate “output directory” field in Workers Builds — Wrangler uploads `dist` after the build
3. **Settings → Builds & deployments → Build configuration → Connect to Git** — re-authorize GitHub if needed and confirm repo `cantrell78-max/aeromatic-site`.
4. After `git push`, a new row should appear in **Deployments** within ~30 seconds (queued → building → success). If nothing appears, the GitHub ↔ Cloudflare link is broken; use **Retry deployment** on the last good build or **Create deployment** from the latest `main` commit while you fix the integration.

Manual deploy is fine as a fallback: **Deployments → Create deployment → Production branch `main`**.

## 5. Local preview

```bash
source ~/.nvm/nvm.sh   # if needed
cd ~/projects/aeromatic-site
npm run dev
```

Open http://localhost:4321

## Before going live

- [x] Formspree — `mrevblgq` in `src/config/site.ts` (https://formspree.io/f/mrevblgq)
- [ ] Replace Google Maps embed `src` in `contact.astro` (Share → Embed from your Business Profile)
- [ ] Add `public/images/about/adam.jpg`
- [ ] Add gallery images to `public/gallery/`
- [ ] Set website URL on Google Business Profile to `https://aeromaticdrone.com`