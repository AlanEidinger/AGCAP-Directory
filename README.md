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
  layout.js          html/body, fonts, global CSS (no chrome)
  page.js            home
  sitemap.js         generates /directory/sitemap.xml
  not-found.js       404
  about/ contact/ terms/ privacy/ disclaimer/
  articles/          index + pricing-farmland-scarce-comps/
  professionals/     index + marcela-ortiz/
  spotlight/ spotlight-questionnaire/ get-listed/
  get-matched/       4-step wizard (client)
  sign-in/           redirects to account/login
  account/           professional login, password setup, profile editor (noindex)
  admin/             admin login and panel (noindex)
  styles/            ported stylesheets, imported once in layout
components/
  SiteShell.js       header + footer wrapper for public pages
  SiteHeader.js      utility bar, nav, mega-menu (client)
  SiteFooter.js
lib/
  config.js          BP prefix + asset() helper
public/              images, favicon
```

### Why SiteShell instead of a route group

The dashboard routes (`sign-in`, `account/profile`, `admin`) render their own
full-page shell and must not inherit the site header and footer. Rather than a
`(site)` route group, the root layout stays chrome-free and public pages opt in
by wrapping their content in `<SiteShell>`. Same result, one less directory
convention to remember.

### Dashboard interactivity

The ported dashboards keep their original vanilla-JS behaviour, installed via
`useEffect` against the same markup and IDs. This was deliberate: it preserves
exact behaviour from the approved designs. When these pages become
database-driven, convert them to React state at the same time.

## Sample data

Every professional, review count, and directory total is **placeholder content**.
None of it can be published as a live directory. Replace with real, consenting,
verified professionals before routing production traffic.

The home page's featured-professionals grid is intentionally empty — it renders
from the database once listings exist.

## Lead forms → GoHighLevel

All forms post to `POST /directory/api/lead` (`app/api/lead/route.js`), which
validates, renames fields to the GHL keys, and forwards to a GHL Inbound Webhook.
Webhook URLs are **Railway variables on this service only**, never in page code.

| Railway variable | Receives |
|---|---|
| `GHL_WEBHOOK_LANDOWNER` | Get Matched, profile inquiry, Contact (landowner / other) |
| `GHL_WEBHOOK_PRO` | Get Listed, Contact (ag professional) |
| `GHL_WEBHOOK_FINANCE` | Mini-site forms (`finance_lead`) |
| `GHL_WEBHOOK_SPOTLIGHT` | Spotlight questionnaire (not wired yet; needs file storage) |

If a variable is missing the form shows an error rather than silently losing
the lead, and the service log records `[lead] No webhook configured`.

Every payload also carries `first_name`, `last_name`, `full_name`, `submitted_at`.
Field-name mapping lives at the top of `route.js` and mirrors `ghl-keys.md`.
Spam protection: hidden honeypot field + 8 submissions/minute per IP.

## Professional listings

Listings come from `lib/professionals.json`, generated from the candidate CSVs:

```
node scripts/build-pros.mjs ../import
```

Re-run it after editing a CSV, then commit the updated JSON.

- **Unclaimed** (`consent_received` = FALSE): public business info only, no Verified badge,
  summary line generated from specialty + counties. Inquiries go to Alan via the landowner
  webhook with `listing_slug` set. "Claim this listing" opens Get Listed prefilled;
  "Request changes or removal" opens Contact tagged with the slug.
- **Claimed** (`consent_received` = TRUE): Verified badge, sorted first.
- **License line** shows "active · checked <date>" only when `license_status` is `active`
  and `license_verified_date` is filled. Otherwise it links to the state lookup.
- **Removing someone:** set `listing_status` to `removed`, re-run the script, deploy.
- `marcela-ortiz` is a sample page, marked noindex and left out of the listing and sitemap.

## Admin panel (`/directory/admin`)

Alan signs in at `/directory/admin/login` with one password. From the panel he can:

- **Review** new Get Listed applications and claim requests (Overview → Needs review)
- **Approve, hide, remove, or delete** any listing
- **Edit** every listing field, upload a photo or logo, and switch badges on
  (Verified, License checked, Featured, Spotlight, Founding member, Accredited)
- **Write, schedule, and publish articles** with a cover image, in a simple
  Markdown editor with a preview tab

### Railway variables (directory service)

| Variable | What it is |
|---|---|
| `DATABASE_URL` | Neon connection string. Tables (`dir_listings`, `dir_articles`, `dir_media`) are created on first use, and the 99 researched listings are loaded automatically. |
| `ADMIN_PASSWORD` | Alan's admin password. Use a long one. |
| `SESSION_SECRET` | Optional. Any long random string; signs the login cookie. Changing it signs everyone out. |

Without `DATABASE_URL` the public site keeps working from `lib/professionals.json`
and the admin shows a warning instead of saving.

**Once the database is live, edit listings in the admin, not the CSVs.** The CSV
script only rebuilds the fallback file.

- Uploaded images are stored in the database (3 MB cap) and served from `/directory/api/media/<id>`.
- Get Listed submissions are saved as "Needs review" listings; claims attach to the existing listing.
  They are still sent to GHL as well.
- "Verified" shows on a listing only when it is both claimed and has the Verified badge.

## Professional accounts (`/directory/account`)

Each listing can have one login. Professionals can edit their name, company, title,
phone, website, address, city, counties, photo, bio, specialties, services,
credentials, photo gallery (up to 12), FAQ, video link, hours, languages, and
which sections show. They **cannot** change status, badges, specialty category,
or license details; those stay with the admin.

**How a pro gets a login:** Admin → Listings → open the listing → *Professional login* →
enter their email → *Create login invite*. If email is set up (below), the invite
is emailed; otherwise copy the link shown and send it from GHL. The link works for
7 days and lets them set a password. Setting it marks the listing as claimed.

Edits go live immediately. The admin listing page shows when they last edited.
To lock someone out, use *Turn off their login*.

Optional email (invites and password resets) via Resend:

| Variable | Example |
|---|---|
| `RESEND_API_KEY` | from resend.com |
| `MAIL_FROM` | `AgriFarm Directory <listings@agrifarmcapital.com>` |

Without these, "Forgot password" can't send anything; Alan sends a new invite link instead.

### Self sign-up (v3)

Professionals create their own account on **Get Listed** (email = username, password).

- **New listing:** account is active right away; the listing is "Needs review" until Alan approves it.
  Approving emails them "your listing is live".
- **Claiming a listing** (Claim this listing → Get Listed?claim=slug): account is created but locked
  ("pending claim") until either
  - they confirm their email **and** it matches the listing's website domain (auto-approved), or
  - Alan clicks **Approve claim** (emails them). **Dismiss** deletes their login.
- **Email confirmation:** a link is emailed at sign-up; "Send the link again" is on their account page.
- **Forgot password** emails a reset link (2 hours).
- **Inquiries** from a listing are saved to `dir_inquiries`, shown on the pro's account page, and
  emailed to the pro once their account is confirmed. They still go to GHL as before.
- Header and footer have a "Pro sign in" link.

**Email is required for this flow.** Set in Railway:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | from resend.com (domain agrifarmcapital.com verified) |
| `MAIL_FROM` | `AgriFarm Directory <listings@agrifarmcapital.com>` |
| `ADMIN_NOTIFY_EMAIL` | where Alan gets sign-up and claim alerts |

Without email, sign-up still works, but confirmations, resets, approvals and inquiry emails don't send;
Alan approves claims manually and sends invite links instead.

## Still to build

- Spotlight form: file uploads to a Railway volume, then wire to `GHL_WEBHOOK_SPOTLIGHT`
- Database (Neon), schema, and data-driven listing/article routes
- Login (Auth.js) and real dashboard persistence
- Inquiry email delivery (Resend)
- Review aggregation — see the constraint in the Tech Setup Plan
