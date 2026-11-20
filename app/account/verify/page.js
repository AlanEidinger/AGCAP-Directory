import { confirmEmailToken } from '../actions';
import '../../styles/admin.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Confirm your email', robots: { index: false } };

const MSG = {
  approved: ['You’re all set', (n) => `Your email is confirmed and your claim for ${n} is approved, because your email matches the firm’s website. You can edit your listing now.`],
  ok: ['Email confirmed', () => 'Thanks. Your account is fully set up.'],
  pending: ['Email confirmed', (n) => `Thanks. We’re confirming that you work at ${n}, usually within one business day. We’ll email you when you can start editing.`],
  bad: ['This link has expired', () => 'It may have been used already. Sign in and use “Send the link again” on your account page.'],
};

export default async function Page({ searchParams }) {
  const r = await confirmEmailToken(String(searchParams?.token || ''));
  const [title, body] = MSG[r.state];
  return (
    <main className="auth-main" style={{ minHeight: '100vh' }}>
      <div className="auth-card">
        <h1>{title}</h1>
        <p className="auth-sub">{body(r.name)}</p>
        <a className="btn btn-gold btn-lg" href="/directory/account" style={{ width: '100%' }}>Go to my account</a>
      </div>
    </main>
  );
}
