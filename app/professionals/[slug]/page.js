import { notFound } from 'next/navigation';
import SiteShell from '../../../components/SiteShell';
import ProCard from '../../../components/ProCard';
import ProfileModules, { faqLd } from '../../../components/ProfileModules';
import ShareButton from '../../../components/ShareButton';
import LeadForm, { SmsConsent } from '../../../components/LeadForm';
import { getPros, SPECIALTIES, LICENSES, BADGES, isVerified, roleOf, initials, summary } from '../../../lib/directory';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const p = (await getPros()).find((x) => x.slug === params.slug);
  if (!p) return {};
  const where = p.city || (p.counties[0] ? `${p.counties[0]} County` : 'California');
  return {
    title: `${p.name} — ${SPECIALTIES[p.specialty]?.one || 'Agricultural professional'}, ${where}`,
    description: `${p.name}${p.company ? ` of ${p.company}` : ''}: ${summary(p)} Contact details and license information on AgriFarm Directory.`,
    alternates: { canonical: `/professionals/${p.slug}` },
    openGraph: {
      type: 'profile', title: `${p.name} on AgriFarm Directory`, description: summary(p), url: `/professionals/${p.slug}`,
      images: [{ url: `/api/share-image/${p.slug}`, width: 1200, height: 630, alt: `${p.name}, ${SPECIALTIES[p.specialty]?.one || ''}` }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

const Pin = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>);
const Shield = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2 3 7v6c0 5 3.8 8.5 9 9 5.2-.5 9-4 9-9V7l-9-5Z" /><path d="m9 12 2 2 4-4" /></svg>);
const Phone = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a17 17 0 0 1-16-16Z" /></svg>);
const Globe = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>);

const fmtDate = (d) => { const t = new Date(d); return isNaN(t) ? d : t.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); };

export default async function Page({ params }) {
  const PROS = await getPros();
  const p = PROS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const spec = SPECIALTIES[p.specialty];
  const lic = LICENSES[p.licenseType];
  const licChecked = p.licenseStatus === 'active' && p.licenseCheckedOn;
  const tel = p.phone ? p.phone.replace(/[^\d+]/g, '') : '';
  const host = p.website ? p.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '';
  const related = PROS.filter((x) => x.slug !== p.slug && x.specialty === p.specialty && x.counties.some((c) => p.counties.includes(c))).slice(0, 3);

  const ld = {
    '@context': 'https://schema.org',
    '@type': p.isFirm ? 'ProfessionalService' : 'Person',
    name: p.name,
    ...(p.company && { worksFor: { '@type': 'Organization', name: p.company } }),
    ...(p.phone && { telephone: p.phone }),
    ...(p.website && { url: p.website }),
    ...(p.photo && { image: `https://www.agrifarmcapital.com${p.photo}` }),
    ...(p.city && { address: { '@type': 'PostalAddress', addressLocality: p.city, addressRegion: 'CA', addressCountry: 'US' } }),
    areaServed: p.counties.map((c) => ({ '@type': 'AdministrativeArea', name: `${c} County, California` })),
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {faqLd(p.modules) && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(p.modules)) }} />}
      <section className="profile-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/directory">Home</a><span className="sep">/</span><a href="/directory/professionals">Professionals</a><span className="sep">/</span><a href={`/directory/professionals?specialty=${p.specialty}`}>{spec?.label}</a><span className="sep">/</span><span>{p.name}</span></div>
          <div className="profile-id">
            <span className="avatar profile-av">{p.photo ? <img src={p.photo} alt={p.name} /> : initials(p.name)}</span>
            <div className="profile-main-id">
              <div className="role">{roleOf(p)}</div>
              <h1>{p.name}</h1>
              <div className="profile-meta">
                {isVerified(p) && <><span className="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>Verified</span><span className="dot"></span></>}
                {p.company && <><span className="pm">{p.company}</span><span className="dot"></span></>}
                <span className="pm"><Pin />{p.city || p.counties.map((c) => `${c} County`).join(', ')}</span>
              </div>
              <div className="profile-actions">
                <a className="btn btn-gold" href="#inquiry"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v12H7l-3 3V4Z" /></svg>Request info</a>
                {tel && <a className="btn btn-ghost" href={`tel:${tel}`}><Phone />Call</a>}
                {p.website && <a className="btn btn-ghost" href={p.website} target="_blank" rel="noopener nofollow"><Globe />Website</a>}
                <ShareButton url={`https://www.agrifarmcapital.com/directory/professionals/${p.slug}`} title={`${p.name} on AgriFarm Directory`} text={`${p.name}: ${summary(p)}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-body">
        <div className="wrap">
          <div className="profile-grid">
            <div className="prose">
              <h2>About</h2>
              {(p.badges || []).some((b) => b !== 'verified') && <div className="pro-badges" style={{ marginBottom: '16px' }}>{p.badges.filter((b) => b !== 'verified').map((b) => <span key={b}>{BADGES[b]?.label || b}</span>)}</div>}
              <p className="lead">{summary(p)}</p>
              {p.bio && p.bio.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
              {!p.claimed && <p className="unclaimed-note">This listing is based on public business information. Details such as a full bio, photos, and specialties appear once the business confirms its listing.</p>}
              <ProfileModules m={p.modules} name={p.name} />
              <h2>Service areas</h2>
              <div className="areas-grid">
                {p.counties.map((c) => <a key={c} className="area-item" href={`/directory/professionals?county=${c}`}><Pin />{c} County</a>)}
              </div>

              {(p.licenseType || p.licenseNumber) && <>
                <h2>License</h2>
                <ul className="cred-list">
                  <li>
                    <span className="cred-ic"><Shield /></span>
                    <span>
                      <b>{lic?.label || p.licenseType}{p.licenseNumber ? ` · #${p.licenseNumber}` : ''}</b>
                      {licChecked
                        ? <span>License active · checked {fmtDate(p.licenseCheckedOn)}{p.licenseUrl && <> · <a href={p.licenseUrl} target="_blank" rel="noopener">view official record</a></>}</span>
                        : <span>{lic ? <>Confirm current status on the <a href={lic.lookup} target="_blank" rel="noopener">official license lookup</a>.</> : 'Confirm license status with the issuing authority.'}</span>}
                    </span>
                  </li>
                </ul>
              </>}
            </div>

            <aside>
              <div className="contact-card" id="inquiry">
                <div className="cc-head">
                  <div className="rate">Request information</div>
                  <div className="resp">{p.hasLogin ? 'Sent to this professional by email' : 'Our team will connect you, usually within one business day'}</div>
                </div>
                <LeadForm formType="profile_inquiry" className="cc-body" extra={{ listing_slug: p.slug, specialty: spec?.label || p.specialty }} successTitle="Request sent" successText="Thanks. We'll be in touch within one business day.">
                  <div className="cc-field"><label>Your name</label><input type="text" name="name" autoComplete="name" placeholder="Full name" /></div>
                  <div className="cc-field"><label>Email</label><input type="email" name="email" autoComplete="email" placeholder="you@example.com" /></div>
                  <div className="cc-field"><label>Phone</label><input type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-5555" /></div>
                  <div className="cc-field"><label>County of the property</label><input type="text" name="county" placeholder={`e.g. ${p.counties[0] || 'Fresno'}`} /></div>
                  <div className="cc-field"><label>What do you need?</label><textarea name="message" rows="3" placeholder="Tell us about your property or what you're looking for…" defaultValue={``}></textarea></div>
                  <SmsConsent />
                  <button className="btn btn-gold" type="submit" style={{ width: '100%' }}>Send request</button>
                </LeadForm>
                {(p.phone || p.website || p.office) && <div className="cc-meta">
                  {p.phone && <a className="cm" href={`tel:${tel}`}><Phone />{p.phone}</a>}
                  {p.website && <a className="cm" href={p.website} target="_blank" rel="noopener nofollow"><Globe />{host}</a>}
                  {p.office && <span className="cm"><Pin />{p.office}</span>}
                </div>}
                {!p.claimed && <div className="claim-box">
                  <b>Is this your business?</b>
                  <span>Claim this listing to confirm your details, add a photo and bio, and receive inquiries directly.</span>
                  <span className="claim-links"><a href={`/directory/get-listed?claim=${p.slug}`}>Claim this listing</a><span>·</span><a href={`/directory/contact?listing=${p.slug}`}>Request changes or removal</a></span>
                </div>}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="mobile-cta">
        <a className="btn btn-gold" href="#inquiry">Request info</a>
        {tel && <a className="btn btn-ghost" href={`tel:${tel}`}><Phone />Call</a>}
      </div>

      {related.length > 0 && <section className="related">
        <div className="wrap">
          <div className="pros-head">
            <div><p className="eyebrow">Nearby</p><h2 className="h-sec">More {spec?.label.toLowerCase()}</h2></div>
            <a className="btn btn-ghost" href={`/directory/professionals?specialty=${p.specialty}`}>View all →</a>
          </div>
          <div className="pros-grid">{related.map((r) => <ProCard key={r.slug} p={r} />)}</div>
        </div>
      </section>}
    </SiteShell>
  );
}
