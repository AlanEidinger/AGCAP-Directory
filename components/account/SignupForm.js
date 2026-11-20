'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '../../app/account/actions';
import { SmsConsent } from '../LeadForm';

const SPECS = [
  ['land-brokers', 'Land & real estate broker'], ['rural-realtors', 'Agricultural / USDA realtor'], ['crop-insurance', 'Crop & farm insurance'],
  ['appraisers', 'Agricultural appraiser'], ['title-escrow', 'Title & escrow'], ['water-ag-attorneys', 'Water rights / ag attorney'],
];

function Btn() {
  const { pending } = useFormStatus();
  return <button className="btn btn-gold btn-lg reg-submit" type="submit" disabled={pending} style={{ width: '100%' }}>{pending ? 'Creating your account…' : 'Create my account →'}</button>;
}

export default function SignupForm({ claim }) {
  const [state, action] = useFormState(signup, null);
  return (
    <form action={action} className="reg-body">
      {claim && <p className="claim-banner">Claiming the listing for <b>{claim.name}</b>. If you sign up with an email at your firm’s web address, you can start editing as soon as you confirm it. Otherwise we’ll confirm you work there, usually within one business day.</p>}
      <input type="hidden" name="claim" value={claim?.slug || ''} />
      <div className="reg-field"><label>Full name <span className="req">*</span></label><input type="text" name="name" autoComplete="name" defaultValue={claim && !claim.isFirm ? claim.name : undefined} /></div>
      <div className="reg-field"><label>Company</label><input type="text" name="company" autoComplete="organization" defaultValue={claim ? (claim.company || (claim.isFirm ? claim.name : '')) : undefined} /></div>
      <div className="reg-row2">
        <div className="reg-field"><label>Email <span className="req">*</span> <span className="hint">this is your username</span></label><input type="email" name="email" autoComplete="username" /></div>
        <div className="reg-field"><label>Phone</label><input type="tel" name="phone" autoComplete="tel" /></div>
      </div>
      {!claim && <>
        <div className="reg-field">
          <label>Specialty <span className="req">*</span></label>
          <select name="specialty" defaultValue="land-brokers">{SPECS.map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        </div>
        <div className="reg-field"><label>Counties you serve</label><input type="text" name="counties" placeholder="e.g. Fresno, Tulare, Kings" /></div>
        <div className="reg-row2">
          <div className="reg-field"><label>License type</label>
            <select name="license_type" defaultValue=""><option value="">Choose one</option><option value="DRE">DRE (real estate)</option><option value="CDI">CDI (insurance)</option><option value="BREA">BREA (appraiser)</option><option value="State Bar">State Bar (attorney)</option><option value="DFPI / CDI">DFPI / CDI (title &amp; escrow)</option></select>
          </div>
          <div className="reg-field"><label>License number</label><input type="text" name="license_number" /></div>
        </div>
      </>}
      <div className="reg-row2">
        <div className="reg-field"><label>Password <span className="req">*</span></label><input type="password" name="password" minLength={10} autoComplete="new-password" /><span className="hint">At least 10 characters</span></div>
        <div className="reg-field"><label>Password again <span className="req">*</span></label><input type="password" name="confirm" minLength={10} autoComplete="new-password" /></div>
      </div>
      <SmsConsent />
      <label className="fopt" style={{ fontSize: '.86rem' }}><input type="checkbox" name="terms" /><span className="fbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg></span><span>I agree to the <a href="/directory/terms" target="_blank">Terms</a> and <a href="/directory/privacy" target="_blank">Privacy Policy</a></span></label>
      {state?.error && <p className="lead-err" role="alert">{state.error}</p>}
      <Btn />
      <p className="reg-foot">Free to list. Already have an account? <a href="/directory/account/login">Sign in</a>.</p>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="lead-hp" />
    </form>
  );
}
