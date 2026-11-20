import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hasDb, ensureSchema, sql } from '../../../../../lib/db';
import { SPECIALTIES, COUNTIES, BADGES, LICENSES } from '../../../../../lib/directory';
import { saveListing, setListingStatus, approveClaim, dismissClaim, deleteListing, revokeLogin } from '../../../actions';
import { ActionForm, ConfirmForm } from '../../../../../components/admin/AdminForms';
import InviteForm from '../../../../../components/admin/InviteForm';

const EMPTY = { id: '', slug: '', name: '', company: '', is_firm: false, specialty: 'land-brokers', title: '', counties: [], city: '', office: '', phone: '', email: '', website: '', bio: '', photo: '', badges: [], claimed: false, status: 'published', license_type: '', license_number: '', license_status: 'unverified', license_checked_on: '', license_url: '', notes: '', claim_at: null };

const F = ({ label, hint, children, wide }) => (
  <div className={`field${wide ? ' adm-wide' : ''}`}><label>{label}{hint && <span className="hint"> · {hint}</span>}</label>{children}</div>
);

export default async function Page({ params, searchParams }) {
  const isNew = params.id === 'new';
  let p = EMPTY;
  if (!isNew) {
    if (!hasDb()) notFound();
    await ensureSchema();
    const [row] = await sql`SELECT * FROM dir_listings WHERE id = ${Number(params.id) || 0}`;
    if (!row) notFound();
    p = row;
  }
  const extraCounties = (p.counties || []).filter((c) => !COUNTIES.includes(c));

  return (
    <>
      <div className="app-top">
        <div className="at-title">
          <Link className="back-site" href="/admin/listings">← All listings</Link>
          <h1>{isNew ? 'Add a listing' : p.name}</h1>
        </div>
        {!isNew && <div className="at-actions">
          {p.status === 'published' && <a className="btn btn-ghost btn-sm" href={`/directory/professionals/${p.slug}`} target="_blank" rel="noopener">View live page ↗</a>}
          {p.status === 'pending' && <form action={setListingStatus}><input type="hidden" name="id" value={p.id} /><input type="hidden" name="status" value="published" /><input type="hidden" name="back" value={`/admin/listings/${p.id}?saved=1`} /><button className="btn btn-gold btn-sm" type="submit">Approve &amp; publish</button></form>}
        </div>}
      </div>

      <div className="app-body">
        {searchParams?.saved && <p className="adm-note">Saved.</p>}

        {p.claim_at && <div className="panel adm-claim">
          <div className="panel-head"><h2>Claim request</h2><span className="ph-sub">{new Date(p.claim_at).toLocaleString('en-US')}</span></div>
          <div className="panel-body">
            <p><b>{p.claim_name}</b> · {p.claim_email}{p.claim_phone ? ` · ${p.claim_phone}` : ''}</p>
            <p className="adm-sub">{p.account_status === 'pending_claim' ? <>They created a login and are waiting for you. {p.email_verified ? 'Their email is confirmed.' : 'They haven\'t confirmed their email yet.'} Check they work at the business (a quick call works), then approve. Approving lets them edit and emails them. Dismissing deletes their login.</> : <>Check that this person works at the business before approving. Approving marks the listing as claimed; then use <b>Professional login</b> below to send them a login.</>} Add the Verified badge once you've checked their license.</p>
            <div className="adm-row">
              <form action={approveClaim}><input type="hidden" name="id" value={p.id} /><button className="btn btn-gold btn-sm" type="submit">Approve claim</button></form>
              <form action={dismissClaim}><input type="hidden" name="id" value={p.id} /><button className="btn btn-ghost btn-sm" type="submit">Dismiss</button></form>
            </div>
          </div>
        </div>}

        {!isNew && <div className="panel">
          <div className="panel-head"><h2>Professional login</h2><span className="ph-sub">{p.account_status === 'pending_claim' ? `Waiting for your approval · ${p.login_email}${p.email_verified ? ' · email confirmed' : ' · email not confirmed'}` : p.password_hash ? `Active${p.email_verified ? '' : ' (email not confirmed)'} · ${p.login_email}${p.last_login_at ? ` · last signed in ${new Date(p.last_login_at).toLocaleDateString('en-US')}` : ''}` : p.invite_token ? `Invite sent to ${p.login_email}` : 'No login yet'}</span></div>
          <div className="panel-body">
            <p className="adm-sub" style={{ marginTop: 0 }}>Give the business its own login so they can update their details, photos and profile sections. They can't change status, badges or license details. {p.pro_updated_at && <b>They last edited their profile on {new Date(p.pro_updated_at).toLocaleDateString('en-US')}.</b>}</p>
            <InviteForm id={p.id} email={p.login_email || p.claim_email || p.email} hasLogin={!!p.password_hash} />
            {p.password_hash && <div style={{ marginTop: '12px' }}><ConfirmForm action={revokeLogin} fields={{ id: p.id }} label="Turn off their login" confirm="Turn off this login? They won't be able to sign in until you send a new invite." className="btn btn-ghost btn-sm adm-danger" /></div>}
          </div>
        </div>}

        <ActionForm action={saveListing} className="adm-form">
          <input type="hidden" name="id" value={p.id} />

          <div className="panel"><div className="panel-head"><h2>Status &amp; badges</h2></div><div className="panel-body adm-grid">
            <F label="Status">
              <select name="status" defaultValue={p.status}>
                <option value="published">Live: shown on the site</option>
                <option value="pending">Needs review: not shown yet</option>
                <option value="hidden">Hidden: kept, not shown</option>
                <option value="removed">Removed: taken down</option>
              </select>
            </F>
            <F label="Claimed by the business">
              <label className="adm-check"><input type="checkbox" name="claimed" defaultChecked={p.claimed} /> The business has confirmed this listing</label>
            </F>
            <F label="Badges" hint="shown on the profile and card" wide>
              <div className="adm-checks">
                {Object.entries(BADGES).map(([k, v]) => (
                  <label key={k} className="adm-check"><input type="checkbox" name="badges" value={k} defaultChecked={(p.badges || []).includes(k)} /> <span><b>{v.label}</b><span className="adm-sub">{v.hint}</span></span></label>
                ))}
              </div>
            </F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Who they are</h2></div><div className="panel-body adm-grid">
            <F label="Name"><input name="name" defaultValue={p.name} required /></F>
            <F label="Company"><input name="company" defaultValue={p.company} /></F>
            <F label="Job title"><input name="title" defaultValue={p.title} placeholder="e.g. Agricultural Land Broker" /></F>
            <F label="Specialty">
              <select name="specialty" defaultValue={p.specialty}>{Object.entries(SPECIALTIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
            </F>
            <F label="This listing is a firm, not a person"><label className="adm-check"><input type="checkbox" name="is_firm" defaultChecked={p.is_firm} /> Firm listing</label></F>
            <F label="Web address" hint="leave blank to build from the name"><input name="slug" defaultValue={p.slug} placeholder="robb-stewart" /></F>
            <F label="Photo or logo" wide>
              <div className="adm-photo">
                {p.photo ? <img src={p.photo} alt="" /> : <span className="adm-ph">No photo</span>}
                <div>
                  <input type="hidden" name="photo_current" value={p.photo} />
                  <input type="file" name="photo_file" accept="image/jpeg,image/png,image/webp" />
                  <div className="adm-sub">JPG, PNG or WebP, under 3 MB. Square works best.</div>
                  {p.photo && <label className="adm-check"><input type="checkbox" name="photo_remove" /> Remove current photo</label>}
                </div>
              </div>
            </F>
            <F label="Bio" hint="shown under About. Leave blank for unclaimed listings" wide><textarea name="bio" rows={6} defaultValue={p.bio} /></F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Where and how to reach them</h2></div><div className="panel-body adm-grid">
            <F label="Counties served" wide>
              <div className="adm-checks inline">
                {[...COUNTIES, ...extraCounties].map((c) => <label key={c} className="adm-check"><input type="checkbox" name="counties" value={c} defaultChecked={(p.counties || []).includes(c)} /> {c}</label>)}
              </div>
            </F>
            <F label="City"><input name="city" defaultValue={p.city} /></F>
            <F label="Office address"><input name="office" defaultValue={p.office} /></F>
            <F label="Phone"><input name="phone" defaultValue={p.phone} /></F>
            <F label="Website"><input name="website" defaultValue={p.website} /></F>
            <F label="Email" hint="private, never shown on the site"><input name="email" type="email" defaultValue={p.email} /></F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>License</h2></div><div className="panel-body adm-grid">
            <F label="License type">
              <select name="license_type" defaultValue={p.license_type}><option value="">None</option>{Object.keys(LICENSES).map((k) => <option key={k} value={k}>{k}</option>)}</select>
            </F>
            <F label="License number"><input name="license_number" defaultValue={p.license_number} /></F>
            <F label="Status">
              <select name="license_status" defaultValue={p.license_status}>
                <option value="unverified">Not checked yet</option><option value="active">Active</option><option value="expired">Expired</option><option value="not_applicable">Not applicable</option>
              </select>
            </F>
            <F label="Date checked"><input name="license_checked_on" type="date" defaultValue={p.license_checked_on} /></F>
            <F label="Link to the official record" wide><input name="license_url" defaultValue={p.license_url} placeholder="https://" /></F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Private notes</h2></div><div className="panel-body">
            <F label="Notes" hint="only you see these" wide><textarea name="notes" rows={4} defaultValue={p.notes} /></F>
          </div></div>
        </ActionForm>

        {!isNew && <div className="adm-dangerzone">
          <ConfirmForm action={deleteListing} fields={{ id: p.id }} label="Delete permanently" confirm={`Delete ${p.name} permanently? This can't be undone. To take the page down but keep the record, set the status to Removed instead.`} className="btn btn-ghost btn-sm adm-danger" />
        </div>}
      </div>
    </>
  );
}
