'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { checkPassword, startSession, endSession, isAdmin } from '../../lib/auth';
import { ensureSchema, sql, slugify, hasDb } from '../../lib/db';
import { BADGES, COUNTIES } from '../../lib/directory';
import { saveUpload } from '../../lib/media';
import { newToken } from '../../lib/proauth';
import { sendMail, mailConfigured, SITE } from '../../lib/mail';

const tries = new Map();

function guard() {
  if (!isAdmin()) redirect('/admin/login');
}
const s = (fd, k, max = 5000) => String(fd.get(k) ?? '').trim().slice(0, max);
const b = (fd, k) => fd.get(k) === 'on' || fd.get(k) === 'yes';
const refresh = () => revalidatePath('/', 'layout');

async function uniqueSlug(table, base, id) {
  let slug = base || 'item', n = 1;
  for (;;) {
    const rows = table === 'dir_listings'
      ? await sql`SELECT id FROM dir_listings WHERE slug = ${slug}`
      : await sql`SELECT id FROM dir_articles WHERE slug = ${slug}`;
    if (!rows.length || (id && rows[0].id === id)) return slug;
    slug = `${base}-${++n}`;
  }
}

/* ---------- session ---------- */

export async function login(prev, fd) {
  const now = Date.now();
  const recent = (tries.get('admin') || []).filter((t) => now - t < 10 * 60e3);
  if (recent.length >= 8) return { error: 'Too many attempts. Wait 10 minutes and try again.' };
  if (!checkPassword(s(fd, 'password', 200))) {
    tries.set('admin', [...recent, now]);
    return { error: process.env.ADMIN_PASSWORD ? 'That password is not correct.' : 'ADMIN_PASSWORD is not set in Railway yet.' };
  }
  tries.delete('admin');
  startSession();
  redirect('/admin');
}

export async function logout() {
  endSession();
  redirect('/admin/login');
}

/* ---------- listings ---------- */

export async function saveListing(prev, fd) {
  guard();
  if (!hasDb()) return { error: 'DATABASE_URL is not set in Railway, so changes cannot be saved.' };
  await ensureSchema();
  const id = Number(fd.get('id')) || null;
  const name = s(fd, 'name', 200);
  if (!name) return { error: 'Name is required.' };
  try {
    let photo = s(fd, 'photo_current', 500);
    if (b(fd, 'photo_remove')) photo = '';
    const up = await saveUpload(fd.get('photo_file'));
    if (up) photo = up;
    let website = s(fd, 'website', 300);
    if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;
    const counties = fd.getAll('counties').map(String).filter((c) => COUNTIES.includes(c) || c);
    const badges = fd.getAll('badges').map(String).filter((x) => BADGES[x]);
    const slug = await uniqueSlug('dir_listings', slugify(s(fd, 'slug', 100) || name), id);
    const status = ['published', 'pending', 'hidden', 'removed'].includes(s(fd, 'status')) ? s(fd, 'status') : 'published';
    const v = {
      slug, name, company: s(fd, 'company', 200), is_firm: b(fd, 'is_firm'), specialty: s(fd, 'specialty', 60) || 'land-brokers',
      title: s(fd, 'title', 200), counties, city: s(fd, 'city', 100), office: s(fd, 'office', 300), phone: s(fd, 'phone', 40),
      email: s(fd, 'email', 200), website, bio: s(fd, 'bio', 6000), photo, badges, claimed: b(fd, 'claimed'), status,
      license_type: s(fd, 'license_type', 40), license_number: s(fd, 'license_number', 60), license_status: s(fd, 'license_status', 30) || 'unverified',
      license_checked_on: s(fd, 'license_checked_on', 30), license_url: s(fd, 'license_url', 500), notes: s(fd, 'notes', 4000),
    };
    if (id) {
      await sql`UPDATE dir_listings SET slug=${v.slug}, name=${v.name}, company=${v.company}, is_firm=${v.is_firm}, specialty=${v.specialty},
        title=${v.title}, counties=${v.counties}, city=${v.city}, office=${v.office}, phone=${v.phone}, email=${v.email}, website=${v.website},
        bio=${v.bio}, photo=${v.photo}, badges=${v.badges}, claimed=${v.claimed}, status=${v.status}, license_type=${v.license_type},
        license_number=${v.license_number}, license_status=${v.license_status}, license_checked_on=${v.license_checked_on},
        license_url=${v.license_url}, notes=${v.notes}, updated_at=now() WHERE id=${id}`;
    } else {
      const [row] = await sql`INSERT INTO dir_listings (slug, name, company, is_firm, specialty, title, counties, city, office, phone, email,
        website, bio, photo, badges, claimed, status, license_type, license_number, license_status, license_checked_on, license_url, notes)
        VALUES (${v.slug}, ${v.name}, ${v.company}, ${v.is_firm}, ${v.specialty}, ${v.title}, ${v.counties}, ${v.city}, ${v.office}, ${v.phone},
        ${v.email}, ${v.website}, ${v.bio}, ${v.photo}, ${v.badges}, ${v.claimed}, ${v.status}, ${v.license_type}, ${v.license_number},
        ${v.license_status}, ${v.license_checked_on}, ${v.license_url}, ${v.notes}) RETURNING id`;
      refresh();
      redirect(`/admin/listings/${row.id}?saved=1`);
    }
  } catch (e) {
    if (e?.digest?.startsWith?.('NEXT_REDIRECT')) throw e;
    return { error: e.message || 'Could not save.' };
  }
  refresh();
  return { ok: 'Saved.', at: Date.now() };
}

export async function setListingStatus(fd) {
  guard();
  await ensureSchema();
  const id = Number(fd.get('id'));
  const status = String(fd.get('status'));
  if (!id || !['published', 'pending', 'hidden', 'removed'].includes(status)) return;
  const [before] = await sql`SELECT status, name, slug, login_email, password_hash FROM dir_listings WHERE id=${id}`;
  await sql`UPDATE dir_listings SET status=${status}, updated_at=now() WHERE id=${id}`;
  if (before && before.status !== 'published' && status === 'published' && before.password_hash && before.login_email) {
    await sql`UPDATE dir_listings SET email_verified=true WHERE id=${id}`;
    await sendMail({ to: before.login_email, subject: `${before.name} is now live on AgriFarm Directory`,
      text: `Your listing is published:\n\n${SITE}/professionals/${before.slug}\n\nSign in any time to update it: ${SITE}/account/login\n\nAgriFarm Directory` });
  }
  refresh();
  const back = String(fd.get('back') || '');
  if (back.startsWith('/admin')) redirect(back);
}

export async function approveClaim(fd) {
  guard();
  await ensureSchema();
  const id = Number(fd.get('id'));
  if (!id) return;
  await sql`UPDATE dir_listings SET claimed=true, status='published',
    email = CASE WHEN email = '' THEN claim_email ELSE email END,
    account_status = CASE WHEN password_hash <> '' THEN 'active' ELSE account_status END,
    email_verified = CASE WHEN password_hash <> '' THEN true ELSE email_verified END,
    claim_at=NULL, updated_at=now() WHERE id=${id}`;
  const [r] = await sql`SELECT name, login_email, password_hash FROM dir_listings WHERE id=${id}`;
  if (r?.password_hash && r.login_email) await sendMail({ to: r.login_email, subject: `You can now edit ${r.name} on AgriFarm Directory`,
    text: `Good news: your claim is approved. Sign in to add your photo, bio, services and more:\n\n${SITE}/account/login\n\nAgriFarm Directory` });
  refresh();
  redirect(`/admin/listings/${id}?saved=1`);
}

export async function dismissClaim(fd) {
  guard();
  await ensureSchema();
  const id = Number(fd.get('id'));
  if (id) await sql`UPDATE dir_listings SET claim_at=NULL, updated_at=now(),
    login_email = CASE WHEN account_status='pending_claim' THEN '' ELSE login_email END,
    password_hash = CASE WHEN account_status='pending_claim' THEN '' ELSE password_hash END,
    verify_token = CASE WHEN account_status='pending_claim' THEN '' ELSE verify_token END,
    account_status = CASE WHEN account_status='pending_claim' THEN '' ELSE account_status END
    WHERE id=${id}`;
  refresh();
  redirect(`/admin/listings/${id}`);
}

export async function deleteListing(fd) {
  guard();
  await ensureSchema();
  const id = Number(fd.get('id'));
  if (id) await sql`DELETE FROM dir_listings WHERE id=${id}`;
  refresh();
  redirect('/admin/listings?deleted=1');
}

/* ---------- articles ---------- */

export async function saveArticle(prev, fd) {
  guard();
  if (!hasDb()) return { error: 'DATABASE_URL is not set in Railway, so changes cannot be saved.' };
  await ensureSchema();
  const id = Number(fd.get('id')) || null;
  const title = s(fd, 'title', 250);
  if (!title) return { error: 'Title is required.' };
  try {
    let cover = s(fd, 'cover_current', 500);
    if (b(fd, 'cover_remove')) cover = '';
    const up = await saveUpload(fd.get('cover_file'));
    if (up) cover = up;
    const status = s(fd, 'status') === 'published' ? 'published' : 'draft';
    const dateIn = s(fd, 'published_at', 20);
    const publishedAt = dateIn ? new Date(`${dateIn}T12:00:00`) : status === 'published' ? new Date() : null;
    const slug = await uniqueSlug('dir_articles', slugify(s(fd, 'slug', 120) || title), id);
    const v = {
      slug, title, excerpt: s(fd, 'excerpt', 500), category: s(fd, 'category', 60), body: s(fd, 'body', 60000),
      cover, cover_alt: s(fd, 'cover_alt', 250), author: s(fd, 'author', 120), author_role: s(fd, 'author_role', 160),
      status, featured: b(fd, 'featured'), published_at: publishedAt,
    };
    if (v.featured) await sql`UPDATE dir_articles SET featured=false WHERE featured=true AND id <> ${id || 0}`;
    if (id) {
      await sql`UPDATE dir_articles SET slug=${v.slug}, title=${v.title}, excerpt=${v.excerpt}, category=${v.category}, body=${v.body},
        cover=${v.cover}, cover_alt=${v.cover_alt}, author=${v.author}, author_role=${v.author_role}, status=${v.status},
        featured=${v.featured}, published_at=${v.published_at}, updated_at=now() WHERE id=${id}`;
    } else {
      const [row] = await sql`INSERT INTO dir_articles (slug, title, excerpt, category, body, cover, cover_alt, author, author_role, status, featured, published_at)
        VALUES (${v.slug}, ${v.title}, ${v.excerpt}, ${v.category}, ${v.body}, ${v.cover}, ${v.cover_alt}, ${v.author}, ${v.author_role},
        ${v.status}, ${v.featured}, ${v.published_at}) RETURNING id`;
      refresh();
      redirect(`/admin/articles/${row.id}?saved=1`);
    }
  } catch (e) {
    if (e?.digest?.startsWith?.('NEXT_REDIRECT')) throw e;
    return { error: e.message || 'Could not save.' };
  }
  refresh();
  return { ok: 'Saved.', at: Date.now() };
}

export async function deleteArticle(fd) {
  guard();
  await ensureSchema();
  const id = Number(fd.get('id'));
  if (id) await sql`DELETE FROM dir_articles WHERE id=${id}`;
  refresh();
  redirect('/admin/articles?deleted=1');
}

/* ---------- professional logins ---------- */

export async function createInvite(prev, fd) {
  guard();
  await ensureSchema();
  const id = Number(fd.get('id'));
  const email = s(fd, 'login_email', 200).toLowerCase();
  if (!id) return { error: 'Save the listing first.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter the email they will sign in with.' };
  const [clash] = await sql`SELECT name FROM dir_listings WHERE lower(login_email) = ${email} AND id <> ${id}`;
  if (clash) return { error: `That email is already the login for ${clash.name}.` };
  const token = 'i_' + newToken();
  const [row] = await sql`UPDATE dir_listings SET login_email=${email}, invite_token=${token}, invite_expires=now() + interval '7 days', updated_at=now()
    WHERE id=${id} RETURNING name`;
  const link = `${SITE}/account/setup?token=${token}`;
  const sent = await sendMail({ to: email, subject: 'Your AgriFarm Directory listing: set your password',
    text: `Hi,\n\nYour listing for ${row.name} is ready for you to manage. Use this link to set your password. It works for 7 days.\n\n${link}\n\nAfter that, sign in any time at ${SITE}/account/login.\n\nAgriFarm Directory` });
  refresh();
  return { ok: sent ? `Invite emailed to ${email}.` : 'Copy this link and send it to them. It works for 7 days.', link, at: Date.now() };
}

export async function revokeLogin(fd) {
  guard();
  await ensureSchema();
  const id = Number(fd.get('id'));
  if (id) await sql`UPDATE dir_listings SET password_hash='', invite_token='', invite_expires=NULL WHERE id=${id}`;
  refresh();
  redirect(`/admin/listings/${id}?saved=1`);
}
