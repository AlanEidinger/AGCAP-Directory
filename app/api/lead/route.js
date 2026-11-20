import { hasDb, ensureSchema, sql, slugify } from '../../../lib/db';
import { sendMail, SITE } from '../../../lib/mail';

// POST /directory/api/lead
// Receives every lead form, renames fields to the GHL keys, and forwards to
// the right GHL Inbound Webhook. Webhook URLs live in Railway variables only.

const WEBHOOKS = {
  landowner: process.env.GHL_WEBHOOK_LANDOWNER,
  finance: process.env.GHL_WEBHOOK_FINANCE,
  pro: process.env.GHL_WEBHOOK_PRO,
  spotlight: process.env.GHL_WEBHOOK_SPOTLIGHT,
};

const FORM_TYPES = ['get_matched', 'profile_inquiry', 'contact', 'get_listed', 'spotlight', 'finance_lead'];

// Spec key -> actual GHL key (see ghl-keys.md). Per-form overrides first.
const RENAME_BY_FORM = {
  profile_inquiry: { message: 'how_can_i_help' },
  finance_lead: { message: 'message_alan' },
  get_listed: { county: 'counties_served' },
};
const RENAME = {
  county: 'county_2',
  acreage: 'approximate_acreage',
  specialty: 'specialty_2',
  years_experience: 'years_in_agriculture',
  sq_tips: 'your_top_3_tips_andor_advice_for_california_landowners',
  sq_photo_notes: 'photo_notes_or_captions_optional',
};

const ALLOWED = new Set([
  'name', 'email', 'phone', 'company', 'website',
  'form_type', 'source_site', 'page_url', 'utm_source', 'utm_medium', 'utm_campaign', 'sms_consent',
  'service_needed', 'region', 'county', 'acreage', 'crop_type', 'timeline', 'message', 'contact_pref', 'email_optin',
  'listing_slug', 'specialty', 'contact_role', 'topic',
  'license_type', 'license_number', 'claiming_listing', 'already_listed',
  'finance_interest',
  'credit_name', 'job_title', 'years_experience',
  'sq_origin', 'sq_approach', 'sq_proud_deal', 'sq_change', 'sq_tips', 'sq_mistake', 'sq_question',
  'sq_headshot_url', 'sq_hero_url', 'sq_gallery_urls', 'sq_logo_url', 'sq_photo_notes',
  'sq_video_url', 'sq_audio_url', 'sq_other_links', 'sq_produce', 'sq_availability', 'sq_confidential',
  'sq_consent_rights', 'sq_consent_publish', 'sq_review_draft',
]);

const YES_NO = ['sms_consent', 'email_optin', 'claiming_listing', 'sq_consent_rights', 'sq_consent_publish', 'sq_review_draft'];

const ORIGINS = new Set([
  'https://www.agrifarmcapital.com', 'https://agrifarmcapital.com',
  'https://agcap-directory-production.up.railway.app',
  'https://farmcreditspecialists.com', 'https://www.farmcreditspecialists.com',
  'https://farmcreditspecialists.net', 'https://www.farmcreditspecialists.net',
  'https://farmcreditspecialists.org', 'https://www.farmcreditspecialists.org',
  'https://farmfinanceauthority.com', 'https://www.farmfinanceauthority.com',
  'https://farmfinanceauthority.net', 'https://www.farmfinanceauthority.net',
]);

function cors(req) {
  const o = req.headers.get('origin');
  const h = { 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' };
  if (o && ORIGINS.has(o)) h['Access-Control-Allow-Origin'] = o;
  return h;
}

const json = (req, status, body) => Response.json(body, { status, headers: cors(req) });

// Basic per-IP throttle. Resets when the service restarts; enough to stop casual spam.
const hits = new Map();
function throttled(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 8;
}

function pickWebhook(d) {
  switch (d.form_type) {
    case 'finance_lead': return 'finance';
    case 'get_listed': return 'pro';
    case 'spotlight': return 'spotlight';
    case 'contact': return /professional/i.test(d.contact_role || '') ? 'pro' : 'landowner';
    default: return 'landowner';
  }
}

const SPEC = [[/usda|realtor/i, 'rural-realtors'], [/insur/i, 'crop-insurance'], [/apprais/i, 'appraisers'], [/title|escrow/i, 'title-escrow'], [/water|attorney|law/i, 'water-ag-attorneys'], [/broker|land/i, 'land-brokers']];

// Get Listed submissions also land in the admin panel: claims attach to the
// existing listing, new applications become a "Needs review" listing.
async function recordApplication(d) {
  if (d.form_type !== 'get_listed' || !hasDb()) return false;
  try {
    await ensureSchema();
    if (d.listing_slug) {
      const r = await sql`UPDATE dir_listings SET claim_name=${d.name}, claim_email=${d.email || ''}, claim_phone=${d.phone || ''}, claim_at=now()
        WHERE slug=${d.listing_slug} RETURNING id`;
      if (r.length) return true;
    }
    const specialty = (SPEC.find(([re]) => re.test(d.specialty || '')) || [, 'land-brokers'])[1];
    const counties = String(d.county || '').split(/[,;]/).map((c) => c.trim().replace(/\s+county$/i, '')).filter(Boolean)
      .map((c) => c[0].toUpperCase() + c.slice(1).toLowerCase());
    const slug = `${slugify(d.name)}-${Math.random().toString(36).slice(2, 6)}`;
    await sql`INSERT INTO dir_listings (slug, name, company, specialty, counties, phone, email, website, license_type, license_number, status, notes)
      VALUES (${slug}, ${d.name}, ${d.company || ''}, ${specialty}, ${counties}, ${d.phone || ''}, ${d.email || ''}, ${d.website || ''},
      ${d.license_type || ''}, ${d.license_number || ''}, 'pending', ${'Applied via Get Listed ' + new Date().toISOString().slice(0, 10) + (d.specialty ? ' as ' + d.specialty : '')})`;
    return true;
  } catch (e) {
    console.error('[lead] Could not record application:', e.message);
    return false;
  }
}

// Profile inquiries: saved for the pro's dashboard, and emailed to them once their account is confirmed.
async function recordInquiry(d) {
  if (d.form_type !== 'profile_inquiry' || !d.listing_slug || !hasDb()) return;
  try {
    await ensureSchema();
    const [l] = await sql`SELECT id, name, login_email, email_verified, account_status, password_hash FROM dir_listings WHERE slug = ${d.listing_slug}`;
    if (!l) return;
    await sql`INSERT INTO dir_inquiries (listing_id, name, email, phone, county, message)
      VALUES (${l.id}, ${d.name}, ${d.email || ''}, ${d.phone || ''}, ${d.county || ''}, ${d.message || ''})`;
    if (l.password_hash && l.email_verified && l.account_status !== 'pending_claim' && l.login_email) {
      await sendMail({ to: l.login_email, subject: `New inquiry from ${d.name} via AgriFarm Directory`,
        text: `${d.name} sent an inquiry through your listing.\n\nEmail: ${d.email || '-'}\nPhone: ${d.phone || '-'}\nCounty: ${d.county || '-'}\n\n${d.message || ''}\n\nSee all inquiries: ${SITE}/account` });
    }
  } catch (e) {
    console.error('[lead] Could not record inquiry:', e.message);
  }
}

export async function OPTIONS(req) {
  return new Response(null, { status: 204, headers: cors(req) });
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return json(req, 400, { error: 'Invalid request.' }); }
  if (!body || typeof body !== 'object') return json(req, 400, { error: 'Invalid request.' });

  // Honeypot: real visitors never fill this. Pretend success.
  if (body.company_website) return json(req, 200, { ok: true });

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (throttled(ip)) return json(req, 429, { error: 'Too many submissions. Please wait a minute and try again.' });

  const d = {};
  for (const [k, v] of Object.entries(body)) {
    if (!ALLOWED.has(k) || v == null) continue;
    d[k] = String(v).trim().slice(0, 5000);
  }
  if (!FORM_TYPES.includes(d.form_type)) return json(req, 400, { error: 'Unknown form.' });
  if (!d.name) return json(req, 400, { error: 'Please enter your name.' });
  if (!d.email && !d.phone) return json(req, 400, { error: 'Please enter an email or phone number.' });
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return json(req, 400, { error: 'Please check your email address.' });

  for (const k of YES_NO) if (k in d || k === 'sms_consent') d[k] = d[k] === 'yes' ? 'yes' : 'no';

  const recorded = await recordApplication(d);
  await recordInquiry(d);

  const route = pickWebhook(d);
  const url = WEBHOOKS[route];
  if (!url && recorded) return json(req, 200, { ok: true });
  if (!url) {
    console.error(`[lead] No webhook configured for "${route}" (form ${d.form_type}). Lead NOT delivered.`);
    return json(req, 503, { error: 'Our form is being set up. Please call or email us directly for now.' });
  }

  const [first, ...rest] = d.name.split(/\s+/);
  const out = { first_name: first, last_name: rest.join(' '), full_name: d.name, submitted_at: new Date().toISOString() };
  const formRename = RENAME_BY_FORM[d.form_type] || {};
  for (const [k, v] of Object.entries(d)) {
    if (k === 'name') continue;
    out[formRename[k] || RENAME[k] || k] = v;
  }

  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(out) });
    if (!r.ok) throw new Error(`GHL responded ${r.status}`);
  } catch (e) {
    console.error('[lead] Forward to GHL failed:', e.message, JSON.stringify(out));
    return json(req, 502, { error: 'Something went wrong sending your request. Please try again.' });
  }
  return json(req, 200, { ok: true });
}
