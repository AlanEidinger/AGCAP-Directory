import SiteShell from '../../components/SiteShell';
import SignupForm from '../../components/account/SignupForm';
import { getPro } from '../../lib/directory';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'List Your Business | AgriFarm Directory — California\'s Agricultural Expert Network',
  description: 'Join AgriFarm Directory and get found by California agricultural landowners actively searching for land brokers, insurance, title, appraisal, and legal services.',
  alternates: { canonical: '/get-listed' },
};

export default async function Page({ searchParams }) {
  const claim = await getPro(searchParams?.claim);
  return (
    <SiteShell>
      <section className="listed-hero">
        <div className="wrap">
          <div className="breadcrumb" style={{color:'#aebaa0'}}><a href="/directory" style={{color:'#cdd6c2'}}>Home</a><span className="sep">/</span><span>List your business</span></div>
          <div className="listed-grid">
            
            <div>
              <p className="eyebrow">For agricultural professionals</p>
              <h1>Get found by the landowners already searching for you.</h1>
              <p className="lead">AgriFarm Directory puts verified ag specialists in front of California farmers, ranchers, and investors at the exact moment they need help. Claim your spot in minutes.</p>
              <div className="listed-benefits">
                <div className="benefit">
                  <span className="b-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></span>
                  <span><b>Rank where buyers look</b><span>Built for hyper-local search so you surface for your service and your region.</span></span>
                </div>
                <div className="benefit">
                  <span className="b-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2 4 5v6c0 5 3.3 8.6 8 10 4.7-1.4 8-5 8-10V5l-8-3Z" /><path d="m9 11 2 2 4-4" /></svg></span>
                  <span><b>A verified badge that converts</b><span>Stand out with a trust mark landowners recognize and act on.</span></span>
                </div>
                <div className="benefit">
                  <span className="b-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg></span>
                  <span><b>Your full profile, your words</b><span>Add your bio, photo, credentials, and the specialties you want to be found for.</span></span>
                </div>
                <div className="benefit">
                  <span className="b-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 4h16v12H7l-3 3V4Z" /><path d="M8 9h8M8 12h5" /></svg></span>
                  <span><b>Leads straight to your inbox</b><span>Inquiries go directly to you. No middleman, no markup on your relationships.</span></span>
                </div>
              </div>
            </div>

            
            <div className="reg-card">
              <div className="reg-top">
                <h2>Claim your listing</h2>
                <p>Start with the basics. We'll follow up to verify your license and build out your profile.</p>
                <div className="reg-steps">
                  <span className="rs cur"><span className="n">1</span>Your details</span>
                  <span className="rs-line"></span>
                  <span className="rs"><span className="n">2</span>Verify</span>
                  <span className="rs-line"></span>
                  <span className="rs"><span className="n">3</span>Go live</span>
                </div>
              </div>
              <SignupForm claim={claim ? { slug: claim.slug, name: claim.name, company: claim.company || '', isFirm: !!claim.isFirm } : null} />
            </div>
          </div>
        </div>
      </section>


      <div className="trust-strip">
        <div className="wrap">
          <div className="trust-item"><span className="ti-num">480+</span><span className="ti-lbl">Verified ag professionals</span></div>
          <div className="trust-item"><span className="ti-num">58</span><span className="ti-lbl">California counties</span></div>
          <div className="trust-item"><span className="ti-num">5</span><span className="ti-lbl">Core specialties</span></div>
          <div className="trust-item"><span className="ti-num">24h</span><span className="ti-lbl">Typical verification turnaround</span></div>
        </div>
      </div>


      <section className="section steps-band">
        <div className="wrap">
          <div className="section-head center">
            <p className="eyebrow" style={{justifyContent:'center'}}>Three steps to live</p>
            <h2 className="h-sec">Listing takes minutes, not weeks</h2>
          </div>
          <div className="how-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
            <div className="value-card">
              <div className="v-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 4h16v12H7l-3 3V4Z" /></svg></div>
              <h3>1. Tell us the basics</h3>
              <p>Submit your name, company, and contact details. That's all it takes to get started.</p>
            </div>
            <div className="value-card">
              <div className="v-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2 4 5v6c0 5 3.3 8.6 8 10 4.7-1.4 8-5 8-10V5l-8-3Z" /><path d="m9 11 2 2 4-4" /></svg></div>
              <h3>2. Get verified</h3>
              <p>We confirm your license and ag experience so your listing carries the verified badge.</p>
            </div>
            <div className="value-card">
              <div className="v-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12l5 5L20 7" /></svg></div>
              <h3>3. Go live &amp; get leads</h3>
              <p>Your profile publishes to the directory and inquiries start arriving in your inbox.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
