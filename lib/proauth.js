// Professional accounts: one login per listing.
// Passwords are hashed with scrypt; the session is a signed cookie holding the listing id.
import { cookies } from 'next/headers';
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { hasDb, ensureSchema, sql } from './db';

const COOKIE = 'agd_pro';
const DAYS = 30;
const secret = () => `${process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || ''}:pro`;
const sign = (v) => createHmac('sha256', secret()).update(v).digest('hex');
const eq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && timingSafeEqual(x, y); };

export function hashPassword(pw) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(pw, salt, 64).toString('hex')}`;
}
export function verifyPassword(pw, stored) {
  const [salt, hash] = String(stored || '').split(':');
  if (!salt || !hash) return false;
  return eq(scryptSync(pw, salt, 64).toString('hex'), hash);
}

export const newToken = () => randomBytes(24).toString('base64url');

export function startProSession(id) {
  const v = `${id}.${Date.now() + DAYS * 864e5}`;
  cookies().set(COOKIE, `${v}.${sign(v)}`, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/directory', maxAge: DAYS * 86400 });
}
export const endProSession = () => cookies().set(COOKIE, '', { path: '/directory', maxAge: 0 });

export function proSessionId() {
  if (!secret().replace(':pro', '')) return null;
  const [id, exp, sig] = (cookies().get(COOKIE)?.value || '').split('.');
  if (!id || !exp || !sig || Number(exp) < Date.now() || !eq(sig, sign(`${id}.${exp}`))) return null;
  return Number(id) || null;
}

// The signed-in professional's listing row, or null.
export async function currentPro() {
  const id = proSessionId();
  if (!id || !hasDb()) return null;
  await ensureSchema();
  const [row] = await sql`SELECT * FROM dir_listings WHERE id = ${id} AND password_hash <> '' AND status <> 'removed'`;
  return row || null;
}
