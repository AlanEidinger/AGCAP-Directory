'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { createInvite } from '../../app/admin/actions';

function Btn({ again }) {
  const { pending } = useFormStatus();
  return <button className="btn btn-gold btn-sm" type="submit" disabled={pending}>{pending ? 'Creating…' : again ? 'Send a new link' : 'Create login invite'}</button>;
}

export default function InviteForm({ id, email, hasLogin }) {
  const [state, action] = useFormState(createInvite, null);
  return (
    <form action={action} className="adm-invite">
      <input type="hidden" name="id" value={id} />
      <div className="field"><label>Login email</label><input type="email" name="login_email" defaultValue={email} placeholder="name@company.com" required /></div>
      <Btn again={hasLogin || !!email} />
      {state?.error && <p className="adm-msg err">{state.error}</p>}
      {state?.ok && <p className="adm-msg ok">{state.ok}</p>}
      {state?.link && <input className="adm-link" readOnly value={state.link} onFocus={(e) => e.target.select()} />}
    </form>
  );
}
