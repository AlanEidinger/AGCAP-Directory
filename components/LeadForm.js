'use client';
import { useEffect, useState } from 'react';
import { captureUtm, submitLead, formToObject } from '../lib/lead';

// Wraps any form markup. Inputs just need name="" attributes matching the spec keys.
export default function LeadForm({ formType, extra = {}, className, style, successTitle = 'Thanks, we got it.', successText = "We'll be in touch within one business day.", children }) {
  const [state, setState] = useState('idle');
  const [err, setErr] = useState('');
  useEffect(() => { captureUtm(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const data = formToObject(e.currentTarget);
    if (!data.name) return setErr('Please enter your name.');
    if (!data.email && !data.phone) return setErr('Please enter an email or phone number.');
    setErr('');
    setState('sending');
    try {
      await submitLead(formType, { ...extra, ...data });
      setState('done');
    } catch (x) {
      setErr(x.message);
      setState('idle');
    }
  }

  if (state === 'done') {
    return (
      <div className={className} style={style}>
        <div className="lead-done" role="status">
          <span className="ld-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg></span>
          <h3>{successTitle}</h3>
          <p>{successText}</p>
        </div>
      </div>
    );
  }

  return (
    <form className={className} style={style} onSubmit={onSubmit} noValidate>
      <fieldset disabled={state === 'sending'} className="lead-fs">
        {children}
        {err && <p className="lead-err" role="alert">{err}</p>}
      </fieldset>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="lead-hp" />
    </form>
  );
}

export function SmsConsent({ style }) {
  return (
    <label className="fopt" style={{ fontSize: '.84rem', alignItems: 'flex-start', ...style }}>
      <input type="checkbox" name="sms_consent" value="yes" />
      <span className="fbox" style={{ marginTop: '2px' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg></span>
      <span>OK to text me about this request. Msg &amp; data rates may apply. Reply STOP to opt out.</span>
    </label>
  );
}
