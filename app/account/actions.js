'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ensureSchema, sql, hasDb, slugify } from '../../lib/db';
import { hashPassword, verifyPassword, newToken, startProSession, endProSession, currentPro } from '../../lib/proauth';
import { saveUpload } from '../../lib/media';
import { sendMail, notifyAdmin, SITE } from '../../lib/mail';
import { forwardToGhl } from '../../lib/ghl';
import { COUNTIES, SPECIALTIES } from '../../lib/directory';

const s = (fd, k, max = 2000) => String(fd.get(k) ?? '').trim().slice(0, max);
const lines = (v, max = 16) => String(v || '').split('\n').map((x) => x.trim()).filter(Boolean).slice(0, max);
const tries = new Map();
function limited(key) {
  const now = Date.now();
  const t = (tries.get(key) || []).filter((x) => now - x < 15 * 60e3);
  tries.set(key, [...t, now]);
  return t.length >= 8;
}

/* ---------- sign in / out ---------- */

export async function proLogin(prev, fd) {
  if (!hasDb()) return { error: 'Accounts are not available yet.' };
  const email = s(fd, 'email', 200).toLowerCase();
  if (limited(`login:${email}`)) return { error: 'Too many attempts. Wait 15 minutes and try again.' };
  await ensureSchema();
  const [row] = await sql`SELECT id, password_hash FROM dir_listings WHERE lower(login_email) = ${email} AND password_hash <> '' AND status <> 'removed'`;
  if (!row || !verifyPassword(s(fd, 'password', 200), row.password_hash)) return { error: 'That email and password don’t match.' };
  await sql`UPDATE dir_listings SET last_login_at = now() WHERE id = ${row.id}`;
  startProSession(row.id);
  redirect('/account');
}

export async function proLogout() {
  endProSession();
  redirect('/account/login');
}

// Used by both the invite link and the password-reset link.
export async function setPassword(prev, fd) {
  await ensureSchema();
  const token = s(fd, 'token', 100);
  const pw = s(fd, 'password', 200);
  if (pw.length < 10) return { error: 'Use at least 10 characters.' };
  if (pw !== s(fd, 'confirm', 200)) return { error: 'The two passwords don’t match.' };
  if (!token) return { error: 'This link is missing its code. Open the full link from your email.' };
  const [r2] = await sql`SELECT id FROM dir_listings WHERE invite_token = ${token} AND invite_expires > now()`;
  if (!r2) return { error: 'This link has expired or was already used. Ask AgriFarm Directory for a new one.' };
  const invite = token.startsWith('i_');
  await sql`UPDATE dir_listings SET password_hash = ${hashPassword(pw)}, invite_token = '', invite_expires = NULL, email_verified = true,
    account_status = CASE WHEN ${invite}::boolean THEN 'active' ELSE account_status END,
    claimed = CASE WHEN ${invite}::boolean THEN true ELSE claimed END, last_login_at = now() WHERE id = ${r2.id}`;
  startProSession(r2.id);
  redirect('/account?welcome=1');
}

export async function requestReset(prev, fd) {
  const email = s(fd, 'email', 200).toLowerCase();
  const done = { ok: 'If that email has an account, a reset link is on its way. If it doesn’t arrive, contact AgriFarm Directory and we’ll send one.' };
  if (!hasDb() || !email || limited(`reset:${email}`)) return done;
  await ensureSchema();
  const token = 'r_' + newToken();
  const [row] = await sql`UPDATE dir_listings SET invite_token = ${token}, invite_expires = now() + interval '2 hours'
    WHERE lower(login_email) = ${email} AND password_hash <> '' RETURNING name`;
  if (row) await sendMail({ to: email, subject: 'Reset your AgriFarm Directory password', text: `Use this link to set a new password for ${row.name}. It works for 2 hours.\n\n${SITE}/account/setup?token=${token}\n\nIf you didn't ask for this, you can ignore this email.` });
  return done;
}

export async function changePassword(prev, fd) {
  const me = await currentPro();
  if (!me) redirect('/account/login');
  if (!verifyPassword(s(fd, 'current', 200), me.password_hash)) return { error: 'Your current password is not correct.' };
  const pw = s(fd, 'password', 200);
  if (pw.length < 10) return { error: 'Use at least 10 characters.' };
  if (pw !== s(fd, 'confirm', 200)) return { error: 'The two new passwords don’t match.' };
  await sql`UPDATE dir_listings SET password_hash = ${hashPassword(pw)} WHERE id = ${me.id}`;
  return { ok: 'Password changed.', at: Date.now() };
}

/* ---------- profile ---------- */

export async function saveProfile(prev, fd) {
  const me = await currentPro();
  if (!me) redirect('/account/login');
  if (me.account_status === 'pending_claim') return { error: 'Your claim is still being reviewed. You can edit once it is approved.' };
  const name = s(fd, 'name', 200);
  if (!name) return { error: 'Your name is required.' };
  try {
    let photo = me.photo;
    if (fd.get('photo_remove') === 'on') photo = '';
    const up = await saveUpload(fd.get('photo_file'));
    if (up) photo = up;

    const old = me.modules && typeof me.modules === 'object' ? me.modules : {};
    let gallery = (Array.isArray(old.gallery) ? old.gallery : []).map((g, i) => ({ url: g.url, caption: s(fd, `gcap_${i}`, 200) }))
      .filter((g, i) => fd.get(`gdel_${i}`) !== 'on');
    for (const f of fd.getAll('gallery_files')) {
      if (gallery.length >= 12) break;
      const url = await saveUpload(f);
      if (url) gallery.push({ url, caption: '' });
    }

    const faq = [];
    for (let i = 0; i < 6; i++) { const q = s(fd, `faq_q_${i}`, 200), a = s(fd, `faq_a_${i}`, 1500); if (q && a) faq.push({ q, a }); }
    const credentials = lines(fd.get('credentials'), 12).map((l) => { const [n, ...d] = l.split(/\s+[—–-]\s+/); return { name: n.trim(), detail: d.join(' – ').trim() }; });
    let video = s(fd, 'video', 300);
    if (video && !/^https:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//i.test(video)) return { error: 'Video links must be YouTube or Vimeo.' };
    const modules = {
      specialties: lines(fd.get('specialties')), services: lines(fd.get('services')), credentials, gallery, faq, video,
      hours: s(fd, 'hours', 200), languages: s(fd, 'languages', 200), years: s(fd, 'years', 10),
      hide: fd.getAll('hide').map(String),
    };
    let website = s(fd, 'website', 300);
    if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;
    const counties = fd.getAll('counties').map(String).filter((c) => COUNTIES.includes(c) || (me.counties || []).includes(c));

    await sql`UPDATE dir_listings SET name=${name}, company=${s(fd, 'company', 200)}, title=${s(fd, 'title', 200)}, phone=${s(fd, 'phone', 40)},
      website=${website}, office=${s(fd, 'office', 300)}, city=${s(fd, 'city', 100)}, counties=${counties}, bio=${s(fd, 'bio', 6000)},
      photo=${photo}, modules=${JSON.stringify(modules)}::jsonb, pro_updated_at=now(), updated_at=now() WHERE id=${me.id}`;
  } catch (e) {
    if (e?.digest?.startsWith?.('NEXT_REDIRECT')) throw e;
    return { error: e.message || 'Could not save.' };
  }
  revalidatePath('/', 'layout');
  return { ok: 'Saved. Your changes are live.', at: Date.now() };
}

/* ---------- self sign-up & email confirmation ---------- */

const hostOf = (u) => { try { return new URL(/^https?:/i.test(u) ? u : `https://${u}`).hostname.replace(/^www\./, '').toLowerCase(); } catch { return ''; } };

function verifyMail(to, first, what, token) {
  return sendMail({ to, subject: 'Confirm your email for AgriFarm Directory',
    text: `Hi ${first},\n\nConfirm your email to finish setting up your account for ${what}:\n\n${SITE}/account/verify?token=${token}\n\nIf you didn't sign up, ignore this email.\n\nAgriFarm Directory` });
}

export async function signup(prev, fd) {
  if (!hasDb()) return { error: 'Accounts are not available yet. Please try again later.' };
  if (s(fd, 'company_website')) return { error: 'Something went wrong. Please try again.' };
  const name = s(fd, 'name', 200), email = s(fd, 'email', 200).toLowerCase(), pw = s(fd, 'password', 200);
  if (!name) return { error: 'Please enter your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please check your email address.' };
  if (pw.length < 10) return { error: 'Use a password of at least 10 characters.' };
  if (pw !== s(fd, 'confirm', 200)) return { error: 'The two passwords don’t match.' };
  if (fd.get('terms') !== 'on') return { error: 'Please agree to the Terms to continue.' };
  if (limited(`signup:${email}`)) return { error: 'Too many attempts. Wait 15 minutes and try again.' };
  await ensureSchema();

  const claimSlug = s(fd, 'claim', 120);
  const phone = s(fd, 'phone', 40), company = s(fd, 'company', 200);
  const specKey = s(fd, 'specialty', 40);
  const specialty = SPECIALTIES[specKey] ? specKey : 'land-brokers';
  const counties = s(fd, 'counties', 300).split(/[,;]/).map((c) => c.trim().replace(/\s+county$/i, '')).filter(Boolean)
    .map((c) => c[0].toUpperCase() + c.slice(1).toLowerCase()).slice(0, 12);
  const vtoken = newToken();
  let id, mode, what;
  try {
    const existing = await sql`SELECT id, password_hash FROM dir_listings WHERE lower(login_email) = ${email}`;
    if (existing.some((r) => r.password_hash)) return { error: 'There’s already an account with this email. Sign in, or use “Forgot password” to reset it.' };
    if (claimSlug) {
      const [l] = await sql`SELECT id, name, password_hash FROM dir_listings WHERE slug = ${claimSlug} AND status <> 'removed'`;
      if (!l) return { error: 'We couldn’t find that listing. Contact us and we’ll sort it out.' };
      if (l.password_hash) return { error: 'This listing has already been claimed. If that’s a mistake, contact AgriFarm Directory.' };
      if (existing.some((r) => r.id !== l.id)) return { error: 'This email already has a pending invite. Use the link we emailed you, or contact us.' };
      await sql`UPDATE dir_listings SET login_email=${email}, password_hash=${hashPassword(pw)}, email_verified=false, verify_token=${vtoken},
        account_status='pending_claim', claim_name=${name}, claim_email=${email}, claim_phone=${phone}, claim_at=now(), updated_at=now() WHERE id=${l.id}`;
      id = l.id; mode = 'claim'; what = l.name;
    } else {
      if (existing.length) return { error: 'This email already has a pending invite. Use the link we emailed you, or contact us.' };
      const slug = `${slugify(company || name) || 'listing'}-${Math.random().toString(36).slice(2, 6)}`;
      const [row] = await sql`INSERT INTO dir_listings (slug, name, company, specialty, counties, phone, email, license_type, license_number, status,
        login_email, password_hash, email_verified, verify_token, account_status, notes)
        VALUES (${slug}, ${name}, ${company}, ${specialty}, ${counties}, ${phone}, ${email}, ${s(fd, 'license_type', 40)}, ${s(fd, 'license_number', 60)}, 'pending',
        ${email}, ${hashPassword(pw)}, false, ${vtoken}, 'active', ${'Signed up on ' + new Date().toISOString().slice(0, 10)}) RETURNING id`;
      id = row.id; mode = 'new'; what = company || name;
    }
  } catch (e) {
    console.error('[signup]', e.message);
    return { error: 'Something went wrong creating your account. Please try again.' };
  }

  const sent = await verifyMail(email, name.split(' ')[0], what, vtoken);
  await notifyAdmin(mode === 'claim' ? `Claim request: ${what}` : `New sign-up: ${what}`,
    `${name} <${email}>${phone ? `, ${phone}` : ''}\n\nReview: ${SITE}/admin/listings/${id}`);
  const [first, ...rest] = name.split(/\s+/);
  await forwardToGhl('pro', {
    form_type: 'get_listed', first_name: first, last_name: rest.join(' '), full_name: name, email, phone, company,
    specialty_2: SPECIALTIES[specialty]?.label, counties_served: counties.join('; '), license_type: s(fd, 'license_type', 40),
    license_number: s(fd, 'license_number', 60), claiming_listing: mode === 'claim' ? 'yes' : 'no', listing_slug: claimSlug,
    sms_consent: fd.get('sms_consent') === 'yes' ? 'yes' : 'no', source_site: 'agrifarmcapital.com',
  });
  startProSession(id);
  redirect(`/account?new=${mode}${sent ? '' : '&nomail=1'}`);
}

export async function resendVerify() {
  const me = await currentPro();
  if (!me) redirect('/account/login');
  if (me.email_verified) return { ok: 'Your email is already confirmed.' };
  if (limited(`verify:${me.id}`)) return { error: 'Please wait a few minutes before asking again.' };
  const token = newToken();
  await sql`UPDATE dir_listings SET verify_token=${token} WHERE id=${me.id}`;
  const sent = await verifyMail(me.login_email, (me.claim_name || me.name).split(' ')[0], me.name, token);
  return sent ? { ok: `Sent. Check ${me.login_email}, including the spam folder.` }
    : { error: 'Email isn’t set up on our side yet. AgriFarm Directory will confirm your account directly.' };
}

// Called by the verify page. Auto-approves a claim when the email matches the listing's website domain.
export async function confirmEmailToken(token) {
  if (!token || !hasDb()) return { state: 'bad' };
  await ensureSchema();
  const [row] = await sql`UPDATE dir_listings SET email_verified=true, verify_token='' WHERE verify_token=${token}
    RETURNING id, name, login_email, website, account_status`;
  if (!row) return { state: 'bad' };
  const domain = row.login_email.split('@')[1] || '';
  const host = hostOf(row.website);
  if (row.account_status === 'pending_claim' && host && (domain === host || domain.endsWith(`.${host}`))) {
    await sql`UPDATE dir_listings SET account_status='active', claimed=true, claim_at=NULL, updated_at=now() WHERE id=${row.id}`;
    await notifyAdmin(`Claim auto-approved: ${row.name}`, `${row.login_email} matches the listing's website (${host}), so the claim was approved automatically.\n\n${SITE}/admin/listings/${row.id}`);
    return { state: 'approved', name: row.name };
  }
  return { state: row.account_status === 'pending_claim' ? 'pending' : 'ok', name: row.name };
}
