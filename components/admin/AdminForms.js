'use client';
import { useFormState, useFormStatus } from 'react-dom';

// Wraps a server-action form and shows its saved / error message.
export function ActionForm({ action, children, className, encType }) {
  const [state, formAction] = useFormState(action, null);
  return (
    <form action={formAction} className={className} encType={encType}>
      {children}
      <div className="adm-savebar">
        <span role="status" className={state?.error ? 'adm-msg err' : 'adm-msg ok'}>{state?.error || state?.ok || ''}</span>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className="btn btn-gold" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save changes'}</button>;
}

// A small form that asks before running a destructive action.
export function ConfirmForm({ action, fields = {}, label, confirm, className = 'btn btn-ghost btn-sm' }) {
  return (
    <form action={action} onSubmit={(e) => { if (confirm && !window.confirm(confirm)) e.preventDefault(); }} style={{ display: 'inline' }}>
      {Object.entries(fields).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <button className={className} type="submit">{label}</button>
    </form>
  );
}
