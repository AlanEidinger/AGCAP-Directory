'use client';
import { useFormState, useFormStatus } from 'react-dom';
import * as acts from '../../app/account/actions';

function Btn({ label }) {
  const { pending } = useFormStatus();
  return <button className="btn btn-gold btn-lg" type="submit" disabled={pending} style={{ width: '100%' }}>{pending ? 'One moment…' : label}</button>;
}

// Small auth forms (sign in, set password, reset). `act` names an export of app/account/actions.
export default function SimpleForm({ act, label, children }) {
  const [state, action] = useFormState(acts[act], null);
  return (
    <form action={action}>
      {children}
      {state?.error && <p className="lead-err" role="alert" style={{ margin: '0 0 14px' }}>{state.error}</p>}
      {state?.ok ? <p className="adm-note" role="status">{state.ok}</p> : <Btn label={label} />}
    </form>
  );
}
