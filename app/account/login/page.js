import { redirect } from 'next/navigation';
import { proSessionId } from '../../../lib/proauth';
import SimpleForm from '../../../components/account/SimpleForm';
import '../../styles/admin.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Sign in to your listing' };

export default function Page() {
  if (proSessionId()) redirect('/account');
  return (
    <main className="auth-main" style={{ minHeight: '100vh' }}>
      <div className="auth-card">
        <a className="back-site" href="/directory" style={{ marginBottom: '20px' }}>← Back to directory</a>
        <h1>Sign in to your listing</h1>
        <p className="auth-sub">Update your details, photos and profile.</p>
        <SimpleForm act="proLogin" label="Sign in">
          <div className="field"><label htmlFor="em">Email</label><input id="em" type="email" name="email" autoComplete="username" required /></div>
          <div className="field"><label htmlFor="pw">Password</label><input id="pw" type="password" name="password" autoComplete="current-password" required /></div>
        </SimpleForm>
        <p className="auth-foot"><a href="/directory/account/forgot">Forgot your password?</a></p>
        <p className="auth-foot">New here? <a href="/directory/get-listed">Create your account</a>. To claim an existing listing, use the “Claim this listing” link on your profile page.</p>
      </div>
    </main>
  );
}
