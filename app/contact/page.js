import SiteShell from '../../components/SiteShell';
import LeadForm, { SmsConsent } from '../../components/LeadForm';
import { getPro } from '../../lib/directory';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with the AgriFarm Directory team about listings, matches, or working together.',
  alternates: { canonical: '/contact' },
};

export default async function Page({ searchParams }) {
  const listing = await getPro(searchParams?.listing);
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/directory">Home</a><span className="sep">/</span><span>Contact</span></div>
          <h1>Contact us</h1>
          <p className="lead" style={{maxWidth:'60ch'}}>Questions about a listing, a match, or working with the directory? Send a note and we'll get back to you within one business day.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            {listing && <p className="claim-banner" style={{gridColumn:'1 / -1'}}>About the listing for <b>{listing.name}</b>. Tell us what to correct, or ask us to remove it. Removal requests are handled within one business day.</p>}
            <LeadForm formType="contact" className="contact-form" extra={listing ? { listing_slug: listing.slug } : {}} successTitle="Message sent" successText="Thanks for reaching out. We'll reply within one business day.">
              <div className="field" style={{marginBottom:'18px'}}>
                <label>I am a&hellip;</label>
                <div className="chip-group">
                  <label className="chip-check"><input type="radio" name="contact_role" value="Landowner or grower" defaultChecked={!listing} /><span>Landowner or grower</span></label>
                  <label className="chip-check"><input type="radio" name="contact_role" value="Ag professional" defaultChecked={!!listing} /><span>Ag professional</span></label>
                  <label className="chip-check"><input type="radio" name="contact_role" value="Something else" /><span>Something else</span></label>
                </div>
              </div>
              <div className="field-row" style={{marginBottom:'16px'}}>
                <div className="field"><label>Full name <span className="req">*</span></label><input type="text" name="name" autoComplete="name" placeholder="Your name" /></div>
                <div className="field"><label>Email <span className="req">*</span></label><input type="email" name="email" autoComplete="email" placeholder="you@example.com" /></div>
              </div>
              <div className="field-row" style={{marginBottom:'16px'}}>
                <div className="field"><label>Phone <span className="hint">optional</span></label><input type="tel" name="phone" autoComplete="tel" placeholder="(559) 555-0100" /></div>
                <div className="field"><label>Topic</label>
                  <select name="topic" defaultValue={listing ? 'About my listing' : undefined}>
                    <option>General question</option>
                    <option>Help finding a professional</option>
                    <option>About my listing</option>
                    <option>Verification &amp; credentials</option>
                    <option>Report a problem or listing</option>
                    <option>Press or partnership</option>
                  </select>
                </div>
              </div>
              <div className="field" style={{marginBottom:'18px'}}>
                <label>Message <span className="req">*</span></label>
                <textarea name="message" rows="6" placeholder="Tell us what you need and we'll point you in the right direction." defaultValue={``}></textarea>
              </div>
              <SmsConsent style={{marginBottom:'14px'}} />
              <button className="btn btn-gold btn-lg" type="submit">Send message</button>
              <p style={{fontSize:'.8rem',color:'var(--muted)',margin:'14px 0 0'}}>We use your details only to respond. See our <a href="/directory/privacy" style={{color:'var(--forest)',fontWeight:'600'}}>Privacy Policy</a>.</p>
            </LeadForm>

            <aside className="contact-aside">
              <div className="info-card">
                <div className="ic-top"><span className="ic-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg></span><h3>Email</h3></div>
                <p><a href="#">hello@agrifarmcapital.com</a></p>
                <div className="ic-meta">Replies within 1 business day</div>
              </div>
              <div className="info-card">
                <div className="ic-top"><span className="ic-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" /></svg></span><h3>Phone</h3></div>
                <p><a href="#">(559) 555-0190</a></p>
                <div className="ic-meta">Mon&ndash;Fri, 8am&ndash;5pm PT</div>
              </div>
              <div className="info-card">
                <div className="ic-top"><span className="ic-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6" /></svg></span><h3>Office</h3></div>
                <p>Fresno, California<br />Serving all 58 counties</p>
              </div>
              <div className="info-card" style={{background:'var(--forest-tint)',borderColor:'#d6dfcd'}}>
                <div className="ic-top"><span className="ic-ic" style={{background:'var(--forest)',borderColor:'var(--forest)',color:'var(--gold-soft)'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 4 5v6c0 5 3.3 8.6 8 10 4.7-1.4 8-5 8-10V5l-8-3Z" /><path d="m9 11 2 2 4-4" /></svg></span><h3>Are you a professional?</h3></div>
                <p style={{marginBottom:'14px'}}>Listing is free while we build out the directory.</p>
                <a className="btn btn-gold btn-sm" href="/directory/get-listed">List your business &rarr;</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
