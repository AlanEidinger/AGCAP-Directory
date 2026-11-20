// Single-admin login. Password lives in the ADMIN_PASSWORD Railway variable.
// The session is a signed cookie; nothing is stored server-side.
import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'agd_admin';
const DAYS = 14;

const secret = () => process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
const sign = (v) => createHmac('sha256', secret()).update(v).digest('hex');

function safeEq(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

export const passwordConfigured = () => !!process.env.ADMIN_PASSWORD;
export const checkPassword = (pw) => passwordConfigured() && safeEq(pw, process.env.ADMIN_PASSWORD);

export function startSession() {
  const exp = String(Date.now() + DAYS * 864e5);
  cookies().set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/directory', maxAge: DAYS * 86400,
  });
}

export const endSession = () => cookies().set(COOKIE, '', { path: '/directory', maxAge: 0 });

export function isAdmin() {
  if (!passwordConfigured()) return false;
  const v = cookies().get(COOKIE)?.value || '';
  const [exp, sig] = v.split('.');
  return !!exp && !!sig && Number(exp) > Date.now() && safeEq(sig, sign(exp));
}
