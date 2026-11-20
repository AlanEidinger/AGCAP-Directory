import { currentPro } from '../../../lib/proauth';
import { normModules, sql } from '../../../lib/db';
import { COUNTIES, SPECIALTIES, BADGES } from '../../../lib/directory';
import { saveProfile } from '../actions';
import { ActionForm } from '../../../components/admin/AdminForms';
import SimpleForm from '../../../components/account/SimpleForm';
import SharePanel from '../../../components/account/SharePanel';

export const metadata = { title: 'Your listing' };

const F = ({ label, hint, children, wide }) => (
  <div className={`field${wide ? ' adm-wide' : ''}`}><label>{label}{hint && <span className="hint"> · {hint}</span>}</label>{children}</div>
);

const SECTIONS = { specialties: 'Specialties', services: 'Services', credentials: 'Credentials', gallery: 'Photo gallery', faq: 'Questions & answers', video: 'Video' };

export default async function Page({ searchParams }) {
  const p = await currentPro();
  const m = normModules(p.modules);
  const counties = [...new Set([...COUNTIES, ...(p.counties || [])])];
  const faq = [...m.faq, ...Array(6).fill({ q: '', a: '' })].slice(0, 6);
  const canEdit = p.account_status !== 'pending_claim';
  const inquiries = canEdit ? await sql`SELECT name, email, phone, county, message, created_at FROM dir_inquiries WHERE listing_id = ${p.id} ORDER BY created_at DESC LIMIT 25` : [];

  return (
    <>
      <div className="app-top">
        <div className="at-title"><h1>Your listing</h1><div className="at-sub">{SPECIALTIES[p.specialty]?.label} · changes go live when you save</div></div>
        {p.status === 'published' && <div className="at-actions"><a className="btn btn-ghost btn-sm" href={`/directory/professionals/${p.slug}`} target="_blank" rel="noopener">View my page ↗</a></div>}
      </div>
      <div className="app-body">
        {searchParams?.welcome && <p className="adm-note">Your password is set. Fill in as much as you can below. Complete profiles get more inquiries.</p>}
        {searchParams?.new === 'new' && <p className="adm-note">Your account is created. Fill in your profile below. AgriFarm Directory reviews new listings and publishes them, usually within one business day.</p>}
        {searchParams?.new === 'claim' && <p className="adm-note">Your claim for {p.name} is in.</p>}
        {!p.email_verified && <div className="panel" style={{ maxWidth: '620px' }}><div className="panel-head"><h2>Confirm your email</h2></div><div className="panel-body">
          <p style={{ marginTop: 0 }}>{searchParams?.nomail ? 'We couldn\'t send a confirmation email just now. ' : `We sent a link to ${p.login_email}. `}Confirming lets you reset your password and receive inquiries by email{p.account_status === 'pending_claim' ? ', and can approve your claim right away if your email matches your firm\'s website' : ''}.</p>
          <SimpleForm act="resendVerify" label="Send the link again" />
        </div></div>}
        {!canEdit && <div className="adm-alert" style={{ margin: '0 0 18px' }}>We’re confirming that you work at <b>{p.company || p.name}</b>, usually within one business day. We’ll email you when you can start editing. Questions? <a href={`/directory/contact?listing=${p.slug}`}>Contact us</a>.</div>}
        {canEdit && <div className="panel"><div className="panel-head"><h2>Inquiries</h2><span className="ph-sub">{inquiries.length ? 'Landowners who contacted you through your listing' : 'None yet'}</span></div>
          {inquiries.length > 0 && <div className="panel-body flush"><table className="data"><tbody>{inquiries.map((q, i) => (
            <tr key={i}><td><b>{q.name}</b><div className="adm-sub">{[q.email, q.phone, q.county && `${q.county} County`].filter(Boolean).join(' · ')}</div>{q.message && <div style={{ marginTop: '6px' }}>{q.message}</div>}</td>
            <td className="adm-sub" style={{ textAlign: 'right', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{new Date(q.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td></tr>
          ))}</tbody></table></div>}
        </div>}
        {p.status !== 'published' && <div className="adm-alert" style={{ margin: '0 0 18px' }}>Your listing isn't live yet. AgriFarm Directory will review it and publish it shortly. You can keep editing in the meantime.</div>}
        {(p.badges || []).length > 0 && <p className="adm-sub" style={{ marginBottom: '18px' }}>Badges on your listing: <b>{p.badges.map((b) => BADGES[b]?.label || b).join(', ')}</b>. Badges and license details are set by AgriFarm Directory.</p>}

        {canEdit && p.status === 'published' && (() => {
          const url = `https://www.agrifarmcapital.com/directory/professionals/${p.slug}`;
          const cs = p.counties || [];
          const where = cs.length ? `${cs.join(', ').replace(/, ([^,]*)$/, ' and $1')} ${cs.length > 1 ? 'counties' : 'County'}` : 'California';
          const role = (SPECIALTIES[p.specialty]?.label || 'agricultural services').toLowerCase();
          return <SharePanel url={url} image={`/directory/api/share-image/${p.slug}`} badge={`<a href="${url}" target="_blank" rel="noopener">Find ${p.company || p.name} on AgriFarm Directory</a>`}
            posts={[
              { label: 'LinkedIn or Facebook', text: `I'm now listed on AgriFarm Directory, a directory of agricultural specialists in California's San Joaquin Valley. If you're buying, selling, financing or insuring farmland in ${where}, you can find my details and contact me here:\n\n${url}` },
              { label: 'X or a short post', text: `Find me on AgriFarm Directory for ${role} in ${where}. ${url}` },
              { label: 'Email signature', text: `Find me on AgriFarm Directory: ${url}` },
            ]} />;
        })()}
        {canEdit && <ActionForm action={saveProfile} className="adm-form">
          <div className="panel"><div className="panel-head"><h2>Business details</h2></div><div className="panel-body adm-grid">
            <F label="Your name or firm name"><input name="name" defaultValue={p.name} required /></F>
            <F label="Company"><input name="company" defaultValue={p.company} /></F>
            <F label="Job title"><input name="title" defaultValue={p.title} placeholder="e.g. Agricultural Land Broker" /></F>
            <F label="Phone"><input name="phone" defaultValue={p.phone} /></F>
            <F label="Website"><input name="website" defaultValue={p.website} placeholder="yourfirm.com" /></F>
            <F label="City"><input name="city" defaultValue={p.city} /></F>
            <F label="Office address" wide><input name="office" defaultValue={p.office} placeholder="Street, city, ZIP" /></F>
            <F label="Counties you serve" wide>
              <div className="adm-checks inline">{counties.map((c) => <label key={c} className="adm-check"><input type="checkbox" name="counties" value={c} defaultChecked={(p.counties || []).includes(c)} /> {c}</label>)}</div>
            </F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Photo and about</h2></div><div className="panel-body adm-grid">
            <F label="Headshot or logo" wide>
              <div className="adm-photo">
                {p.photo ? <img src={p.photo} alt="" /> : <span className="adm-ph">No photo</span>}
                <div>
                  <input type="file" name="photo_file" accept="image/jpeg,image/png,image/webp" />
                  <div className="adm-sub">Square, at least 600px, under 3 MB.</div>
                  {p.photo && <label className="adm-check"><input type="checkbox" name="photo_remove" /> Remove photo</label>}
                </div>
              </div>
            </F>
            <F label="About you" hint="leave a blank line between paragraphs" wide><textarea name="bio" rows={7} defaultValue={p.bio} placeholder="What you do, who you work with, and what you know about land in your area." /></F>
            <F label="Years in agriculture"><input name="years" defaultValue={m.years} inputMode="numeric" /></F>
            <F label="Languages"><input name="languages" defaultValue={m.languages} placeholder="English, Spanish" /></F>
            <F label="Office hours" wide><input name="hours" defaultValue={m.hours} placeholder="Mon–Fri 8am–5pm, weekends by appointment" /></F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>What you do</h2></div><div className="panel-body adm-grid">
            <F label="Specialties" hint="one per line"><textarea name="specialties" rows={6} defaultValue={m.specialties.join('\n')} placeholder={'Almond and pistachio orchards\nDairy properties\n1031 exchanges'} /></F>
            <F label="Services" hint="one per line"><textarea name="services" rows={6} defaultValue={m.services.join('\n')} placeholder={'Listing farmland for sale\nBuyer representation\nBroker opinion of value'} /></F>
            <F label="Credentials" hint="one per line: name – detail" wide><textarea name="credentials" rows={4} defaultValue={m.credentials.map((c) => (c.detail ? `${c.name} – ${c.detail}` : c.name)).join('\n')} placeholder={'Accredited Land Consultant (ALC) – REALTORS Land Institute\nCA Real Estate Broker – since 2009'} /></F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Photo gallery</h2><span className="ph-sub">Properties, your team, your work. Up to 12.</span></div><div className="panel-body">
            {m.gallery.length > 0 && <div className="pro-gal-edit">
              {m.gallery.map((g, i) => (
                <div key={g.url} className="pge-item">
                  <img src={g.url} alt="" />
                  <input name={`gcap_${i}`} defaultValue={g.caption} placeholder="Caption (optional)" />
                  <label className="adm-check"><input type="checkbox" name={`gdel_${i}`} /> Remove</label>
                </div>
              ))}
            </div>}
            {m.gallery.length < 12 && <F label="Add photos" hint="you can pick several at once, 3 MB each"><input type="file" name="gallery_files" accept="image/jpeg,image/png,image/webp" multiple /></F>}
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Questions clients ask you</h2><span className="ph-sub">Shown on your page and read by Google and AI search</span></div><div className="panel-body">
            {faq.map((f, i) => (
              <div key={i} className="adm-grid" style={{ marginBottom: '14px' }}>
                <F label={`Question ${i + 1}`}><input name={`faq_q_${i}`} defaultValue={f.q} placeholder={i === 0 ? 'How long does it take to sell an orchard?' : ''} /></F>
                <F label="Answer"><textarea name={`faq_a_${i}`} rows={2} defaultValue={f.a} /></F>
              </div>
            ))}
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Video</h2></div><div className="panel-body">
            <F label="YouTube or Vimeo link" wide><input name="video" defaultValue={m.video} placeholder="https://www.youtube.com/watch?v=…" /></F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Sections on your page</h2><span className="ph-sub">Tick any you want to hide</span></div><div className="panel-body">
            <div className="adm-checks inline">{Object.entries(SECTIONS).map(([k, v]) => <label key={k} className="adm-check"><input type="checkbox" name="hide" value={k} defaultChecked={m.hide.includes(k)} /> Hide {v.toLowerCase()}</label>)}</div>
          </div></div>
        </ActionForm>}

        <div className="panel" id="password" style={{ marginTop: '28px', maxWidth: '520px' }}>
          <div className="panel-head"><h2>Change password</h2></div>
          <div className="panel-body">
            <SimpleForm act="changePassword" label="Change password">
              <div className="field"><label>Current password</label><input type="password" name="current" autoComplete="current-password" required /></div>
              <div className="field"><label>New password</label><input type="password" name="password" minLength={10} autoComplete="new-password" required /></div>
              <div className="field"><label>New password again</label><input type="password" name="confirm" minLength={10} autoComplete="new-password" required /></div>
            </SimpleForm>
          </div>
        </div>
        <p className="adm-sub" style={{ marginTop: '18px' }}>To change your email, specialty, or license details, or to take your listing down, <a href={`/directory/contact?listing=${p.slug}`}>contact AgriFarm Directory</a>.</p>
      </div>
    </>
  );
}
