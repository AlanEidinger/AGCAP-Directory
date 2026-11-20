import { redirect } from 'next/navigation';
import { isAdmin } from '../../../lib/auth';
import LoginForm from '../../../components/admin/LoginForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin sign in', robots: { index: false, follow: false } };

export default function Page() {
  if (isAdmin()) redirect('/admin');
  return (
    <main className="auth-main" style={{ minHeight: '100vh' }}>
      <div className="auth-card">
        <a className="back-site" href="/directory" style={{ marginBottom: '20px' }}>← Back to directory</a>
        <h1>Directory admin</h1>
        <p className="auth-sub">Manage listings and articles for AgriFarm Directory.</p>
        <LoginForm />
      </div>
    </main>
  );
}
