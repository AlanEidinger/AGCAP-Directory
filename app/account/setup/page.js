import SimpleForm from '../../../components/account/SimpleForm';
import '../../styles/admin.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Set your password' };

export default function Page({ searchParams }) {
  const token = String(searchParams?.token || '');
  return (
    <main className="auth-main" style={{ minHeight: '100vh' }}>
      <div className="auth-card">
        <h1>Set your password</h1>
        <p className="auth-sub">You'll use this with your email to manage your listing.</p>
        <SimpleForm act="setPassword" label="Save password and continue">
          <input type="hidden" name="token" value={token} />
          <div className="field"><label htmlFor="p1">New password</label><input id="p1" type="password" name="password" minLength={10} autoComplete="new-password" required /><span className="hint">At least 10 characters.</span></div>
          <div className="field"><label htmlFor="p2">Type it again</label><input id="p2" type="password" name="confirm" minLength={10} autoComplete="new-password" required /></div>
        </SimpleForm>
      </div>
    </main>
  );
}
