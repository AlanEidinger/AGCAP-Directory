import SimpleForm from '../../../components/account/SimpleForm';
import '../../styles/admin.css';

export const metadata = { title: 'Reset your password' };

export default function Page() {
  return (
    <main className="auth-main" style={{ minHeight: '100vh' }}>
      <div className="auth-card">
        <a className="back-site" href="/directory/account/login" style={{ marginBottom: '20px' }}>← Back to sign in</a>
        <h1>Reset your password</h1>
        <p className="auth-sub">Enter the email you sign in with and we'll send a link to set a new password.</p>
        <SimpleForm act="requestReset" label="Send reset link">
          <div className="field"><label htmlFor="em">Email</label><input id="em" type="email" name="email" autoComplete="username" required /></div>
        </SimpleForm>
      </div>
    </main>
  );
}
