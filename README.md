# AgriFarm Directory

Next.js app serving the AgriFarm Directory at **https://www.agrifarmcapital.com/directory/**

Deployed as its own Railway service. The main `agrifarmcapital` service is **not** modified.

---

## Why basePath

`next.config.mjs` sets `basePath: '/directory'`. Every route, `next/link`, and static
asset resolves under that prefix, so this app can run as a separate service while
appearing as a subfolder of the primary domain. Ranking authority stays on one domain.

Raw `<img src>` and `<a href>` are **not** auto-prefixed by Next. Use the `asset()`
helper from `lib/config.js` for those.

---

## Local development

```bash
npm install
npm run dev
```

Then open **http://localhost:3000/directory** (not `/` — basePath applies in dev too).

---

## Deploy — in this order

The sequence matters. Nothing touches production until step 3.

### 1. Commit to GitHub

Push this directory to `AlanEidinger/AGCAP-Directory` on `main`.

### 2. New Railway service — isolated, zero production risk

In the **existing Railway project** (so it shares the environment) or a new one:

1. **New** → **GitHub Repo** → select `AGCAP-Directory`
2. Railway auto-detects Next.js via Railpack. No build command needed.
3. Under **Settings → Networking**, click **Generate Domain**.
   You get something like `agcap-directory-production.up.railway.app`.
4. Visit `https://<that-domain>/directory` and verify the site fully.

At this point the live site is untouched. This is a separate service on a separate
domain. Verify everything here before continuing.

### 3. Route `/directory/*` at Cloudflare — the only production change

Do this at **Cloudflare**, not Railway, so the existing service is never redeployed.

Cloudflare Dashboard → `agrifarmcapital.com` → **Workers Routes** (or **Rules → Origin Rules**).

Worker route: `www.agrifarmcapital.com/directory*` → a Worker containing:

```js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'agcap-directory-production.up.railway.app'; // step 2 domain
    return fetch(new Request(url, request));
  },
};
```

**Rollback:** delete the route. Traffic returns to normal immediately. No redeploy.

### 4. robots.txt

`robots.txt` is only honored at the domain root. The rules in the project's
`robots.txt` must be **merged into** `https://www.agrifarmcapital.com/robots.txt`
by whoever controls the main site. A file at `/directory/robots.txt` is ignored.

### 5. Search Console

Submit `https://www.agrifarmcapital.com/directory/sitemap.xml`.

---

## ⚠️ Warning about the main service

As of the last check, the `agrifarmcapital` Railway service shows
**"GitHub Repo not found"** under Settings → Source. Its source repo
(`HyperactiveSloth79/agrifarmcapital`) is unreachable.

The site is Online only because Railway is serving the last successful build.

**Do not redeploy or restart that service.** A rebuild would likely fail with no
reachable repo to build from, taking the live site down. This is a pre-existing
issue and should be resolved with the original developer.

Routing at Cloudflare (step 3) specifically avoids touching that service.

---

## Structure

```
app/
  layout.js          shared shell — header, footer, fonts, global CSS
  page.js            home
  styles/            ported stylesheets, imported once in layout
components/
  SiteHeader.js      utility bar, nav, mega-menu (client component)
  SiteFooter.js      footer
lib/
  config.js          BP prefix + asset() helper
public/              images, favicon
```

## Still to port

Routes not yet built: `/professionals`, `/professionals/[slug]`, `/articles`,
`/articles/[slug]`, `/about`, `/contact`, `/get-matched`, `/get-listed`,
`/spotlight`, `/sign-in`, `/account/profile`, `/admin`, `/terms`, `/privacy`,
`/disclaimer`, `not-found.js`.

Source HTML for each lives in the project root and ports directly — the CSS and
markup are already final.
