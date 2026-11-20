'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '../../app/admin/actions';

function Btn() {
  const { pending } = useFormStatus();
  return <button className="btn btn-gold btn-lg" type="submit" disabled={pending} style={{ width: '100%' }}>{pending ? 'Signing in…' : 'Sign in'}</button>;
}

export default function LoginForm() {
  const [state, action] = useFormState(login, null);
  return (
    <form action={action}>
      <div className="field">
        <label htmlFor="pw">Admin password</label>
        <input id="pw" type="password" name="password" autoComplete="current-password" autoFocus required />
      </div>
      {state?.error && <p className="lead-err" role="alert" style={{ marginBottom: '14px' }}>{state.error}</p>}
      <Btn />
    </form>
  );
}
