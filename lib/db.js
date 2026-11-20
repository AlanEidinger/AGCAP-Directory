// Neon Postgres access. All tables are prefixed dir_ so they never collide
// with anything else in the database. Tables are created automatically.
import { neon } from '@neondatabase/serverless';
import SEED from './professionals.json';

export const hasDb = () => !!process.env.DATABASE_URL;

let _sql;
export function sql(strings, ...vals) {
  if (!_sql) _sql = neon(process.env.DATABASE_URL);
  return _sql(strings, ...vals);
}
export const tx = (queries) => { if (!_sql) _sql = neon(process.env.DATABASE_URL); return _sql.transaction(queries); };

let ready;
export function ensureSchema() {
  if (!hasDb()) return Promise.resolve(false);
  if (!ready) ready = setup().catch((e) => { ready = null; throw e; });
  return ready;
}

async function setup() {
  await sql`CREATE TABLE IF NOT EXISTS dir_listings (
    id serial PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    name text NOT NULL,
    company text NOT NULL DEFAULT '',
    is_firm boolean NOT NULL DEFAULT false,
    specialty text NOT NULL DEFAULT 'land-brokers',
    title text NOT NULL DEFAULT '',
    counties text[] NOT NULL DEFAULT '{}',
    city text NOT NULL DEFAULT '',
    office text NOT NULL DEFAULT '',
    phone text NOT NULL DEFAULT '',
    email text NOT NULL DEFAULT '',
    website text NOT NULL DEFAULT '',
    bio text NOT NULL DEFAULT '',
    photo text NOT NULL DEFAULT '',
    badges text[] NOT NULL DEFAULT '{}',
    claimed boolean NOT NULL DEFAULT false,
    status text NOT NULL DEFAULT 'published',
    license_type text NOT NULL DEFAULT '',
    license_number text NOT NULL DEFAULT '',
    license_status text NOT NULL DEFAULT 'unverified',
    license_checked_on text NOT NULL DEFAULT '',
    license_url text NOT NULL DEFAULT '',
    claim_name text NOT NULL DEFAULT '',
    claim_email text NOT NULL DEFAULT '',
    claim_phone text NOT NULL DEFAULT '',
    claim_at timestamptz,
    notes text NOT NULL DEFAULT '',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now())`;
  await sql`CREATE TABLE IF NOT EXISTS dir_articles (
    id serial PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    excerpt text NOT NULL DEFAULT '',
    category text NOT NULL DEFAULT '',
    body text NOT NULL DEFAULT '',
    cover text NOT NULL DEFAULT '',
    cover_alt text NOT NULL DEFAULT '',
    author text NOT NULL DEFAULT '',
    author_role text NOT NULL DEFAULT '',
    status text NOT NULL DEFAULT 'draft',
    featured boolean NOT NULL DEFAULT false,
    published_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now())`;
  await sql`CREATE TABLE IF NOT EXISTS dir_media (
    id serial PRIMARY KEY,
    mime text NOT NULL,
    name text NOT NULL DEFAULT '',
    data_b64 text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now())`;

  // Professional accounts and profile modules (added after v1; safe to re-run).
  await sql`ALTER TABLE dir_listings
    ADD COLUMN IF NOT EXISTS login_email text NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS password_hash text NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS invite_token text NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS invite_expires timestamptz,
    ADD COLUMN IF NOT EXISTS modules jsonb NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS pro_updated_at timestamptz,
    ADD COLUMN IF NOT EXISTS last_login_at timestamptz`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS dir_listings_login_email ON dir_listings (lower(login_email)) WHERE login_email <> ''`;

  // Self sign-up, email confirmation, claim review (v3; safe to re-run).
  await sql`ALTER TABLE dir_listings
    ADD COLUMN IF NOT EXISTS email_verified boolean NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS verify_token text NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS account_status text NOT NULL DEFAULT ''`;
  await sql`UPDATE dir_listings SET account_status = 'active', email_verified = true WHERE password_hash <> '' AND account_status = ''`;
  await sql`CREATE TABLE IF NOT EXISTS dir_inquiries (
    id serial PRIMARY KEY,
    listing_id int NOT NULL,
    name text NOT NULL DEFAULT '',
    email text NOT NULL DEFAULT '',
    phone text NOT NULL DEFAULT '',
    county text NOT NULL DEFAULT '',
    message text NOT NULL DEFAULT '',
    created_at timestamptz NOT NULL DEFAULT now())`;

  // First run only: load the 99 researched listings.
  const [{ n }] = await sql`SELECT count(*)::int AS n FROM dir_listings`;
  if (n === 0 && SEED.length) {
    await tx(SEED.map((p) => sql`INSERT INTO dir_listings
      (slug, name, company, is_firm, specialty, title, counties, city, office, phone, website, claimed, status,
       license_type, license_number, license_status, license_checked_on, license_url)
      VALUES (${p.slug}, ${p.name}, ${p.company || ''}, ${!!p.isFirm}, ${p.specialty}, ${p.title || ''}, ${p.counties || []},
       ${p.city || ''}, ${p.office || ''}, ${p.phone || ''}, ${p.website || ''}, ${!!p.claimed}, 'published',
       ${p.licenseType || ''}, ${p.licenseNumber || ''}, ${p.licenseStatus || 'unverified'}, ${p.licenseCheckedOn || ''}, ${p.licenseUrl || ''})
      ON CONFLICT (slug) DO NOTHING`));
  }
  return true;
}

// DB row -> the shape the public pages use.
export const toPro = (r) => ({
  id: r.id, slug: r.slug, name: r.name, company: r.company, isFirm: r.is_firm, specialty: r.specialty, title: r.title,
  counties: r.counties || [], city: r.city, office: r.office, phone: r.phone, website: r.website,
  bio: r.bio, photo: r.photo, badges: r.badges || [], claimed: r.claimed, status: r.status,
  hasLogin: !!r.password_hash && r.account_status !== 'pending_claim' && !!r.email_verified,
  licenseType: r.license_type, licenseNumber: r.license_number, licenseStatus: r.license_status,
  licenseCheckedOn: r.license_checked_on, licenseUrl: r.license_url,
  modules: normModules(r.modules),
});

// Profile modules a professional can edit. Every key is optional.
export function normModules(m) {
  const o = m && typeof m === 'object' ? m : {};
  const arr = (x) => (Array.isArray(x) ? x : []);
  return {
    specialties: arr(o.specialties).map(String).filter(Boolean).slice(0, 16),
    services: arr(o.services).map(String).filter(Boolean).slice(0, 16),
    credentials: arr(o.credentials).filter((c) => c && c.name).slice(0, 12),
    gallery: arr(o.gallery).filter((g) => g && g.url).slice(0, 12),
    faq: arr(o.faq).filter((f) => f && f.q && f.a).slice(0, 8),
    video: typeof o.video === 'string' ? o.video : '',
    hours: typeof o.hours === 'string' ? o.hours : '',
    languages: typeof o.languages === 'string' ? o.languages : '',
    years: typeof o.years === 'string' ? o.years : '',
    hide: arr(o.hide).map(String),
  };
}

export const slugify = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
