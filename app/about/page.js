import SiteShell from '../../components/SiteShell';

export const metadata = {
  title: 'About | AgriFarm Directory — California\'s Agricultural Expert Network',
  description: 'AgriFarm Directory connects California agricultural landowners with verified specialists: land brokers, insurance, title & escrow, appraisers, and water rights attorneys.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/directory">Home</a><span className="sep">/</span><span>About</span></div>
          <h1>Built for California agriculture, by people who know it.</h1>
          <p className="lead">AgriFarm Directory exists to connect landowners with the specialists who actually understand farms, ranches, and rural property, and to make those experts easy to find.</p>
        </div>
      </section>


      <section className="about-intro">
        <div className="wrap">
          <div className="about-intro-grid">
            <div className="prose">
              <p className="eyebrow">Our mission</p>
              <h2 style={{fontSize:'clamp(1.7rem,2.6vw,2.2rem)',marginBottom:'18px'}}>Owning agricultural land comes with decisions most directories never account for.</h2>
              <p>Water rights. Soil classes. Crop cycles. 1031 timelines. A general real-estate site or insurance marketplace rarely speaks the language of agriculture, and that gap costs landowners time and money.</p>
              <p>AgriFarm Directory is a focused network of vetted California professionals across the five disciplines that matter most when you buy, sell, finance, protect, or settle agricultural property. Every listing is license and reference checked, organized by region and city so you can find the right expert close to your ground.</p>
              <p>The directory is a resource of <strong>AgriFarm Capital</strong>, created to add genuine value for the agricultural community, not just generate leads.</p>
            </div>
            <div className="ph about-img" style={{padding:'0',border:'none',overflow:'hidden'}}><img loading="lazy" decoding="async" src="/directory/hero-farm.webp"   alt="Illustration of a ranch home beside an almond orchard" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'var(--r-lg)'}} /></div>
          </div>
        </div>
      </section>


      <section className="section" style={{paddingTop:'0'}}>
        <div className="wrap">
          <div className="founder">
            <div className="founder-photo">
              <img src="/directory/alan-portrait.png" alt="Alan Eidinger, founder of AgriFarm Directory" />
            </div>
            <div className="founder-copy">
              <p className="eyebrow">Meet the founder</p>
              <h2 style={{fontSize:'clamp(1.8rem,2.8vw,2.4rem)'}}>Alan Eidinger</h2>
              <p className="founder-role">Founder &amp; Principal, AgriFarm Capital</p>
              <p>Alan built his career financing and advising California's agricultural operators, and he kept hearing the same frustration from landowners: finding a broker, appraiser, or attorney who truly understands farmland is far harder than it should be.</p>
              <p>AgriFarm Directory is his answer. It brings the specialists who serve California agriculture into one verified, easy-to-navigate network, so growers and investors can spend less time vetting and more time on the land itself.</p>
              <div className="founder-sign">
                <span className="sig">Alan Eidinger</span>
                <span className="sig-sub">Founder, AgriFarm Directory</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="stat-band">
        <div className="wrap">
          <div className="stat-grid">
            <div><div className="num">480+</div><div className="lbl">Verified professionals</div></div>
            <div><div className="num">58</div><div className="lbl">California counties</div></div>
            <div><div className="num">5</div><div className="lbl">Core ag specialties</div></div>
            <div><div className="num">100%</div><div className="lbl">License &amp; reference checked</div></div>
          </div>
        </div>
      </section>


      <section className="section">
        <div className="wrap">
          <div className="section-head center">
            <p className="eyebrow" style={{justifyContent:'center'}}>What sets us apart</p>
            <h2 className="h-sec">A directory you can actually trust</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="v-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2 3 7v6c0 5 3.8 8.5 9 9 5.2-.5 9-4 9-9V7l-9-5Z" /><path d="m9 12 2 2 4-4" /></svg></div>
              <h3>Verified, not pay-to-play</h3>
              <p>Every professional is screened for an active license and real agricultural experience before they appear. No anonymous listings.</p>
            </div>
            <div className="value-card">
              <div className="v-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></div>
              <h3>Hyper-local by design</h3>
              <p>Browse by California region and city. The expert who knows your irrigation district is the one who shows up first.</p>
            </div>
            <div className="value-card">
              <div className="v-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 7h18M3 12h18M3 17h12" /></svg></div>
              <h3>Specialists, end to end</h3>
              <p>From the first land search to closing, insuring, appraising, and protecting your rights, the whole team lives in one place.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="section how">
        <div className="wrap">
          <div className="section-head" style={{maxWidth:'560px'}}>
            <p className="eyebrow">How it works</p>
            <h2 className="h-sec">Find the right expert in three steps</h2>
          </div>
          <div className="how-grid">
            <div className="how-step">
              <div className="how-num">STEP 01</div>
              <div className="step-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></div>
              <h3>Search your area</h3>
              <p>Pick your California region or city and the specialty you need.</p>
            </div>
            <div className="how-step">
              <div className="how-num">STEP 02</div>
              <div className="step-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3 5 6v5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z" /><path d="m9.5 12 1.8 1.8L15 10" /></svg></div>
              <h3>Compare verified pros</h3>
              <p>Review licensed, reference-checked professionals with real ag experience.</p>
            </div>
            <div className="how-step">
              <div className="how-num">STEP 03</div>
              <div className="step-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 4h16v12H7l-3 3V4Z" /><path d="M8 9h8M8 12h5" /></svg></div>
              <h3>Connect directly</h3>
              <p>Reach out with one form, or request to be matched. No markup on your relationship.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="cta-band">
        <div className="wrap">
          <div className="cta-inner">
            <div>
              <p className="eyebrow">Two ways to start</p>
              <h2>Find an expert, or get listed as one.</h2>
              <p>Landowners search free. Agricultural professionals can apply to join the directory built specifically for their work.</p>
            </div>
            <div className="cta-actions">
              <a className="btn btn-gold btn-lg" href="/directory/professionals">Find an expert</a>
              <a className="btn btn-ghost btn-lg" href="/directory/get-listed" style={{background:'rgba(255,255,255,.06)',color:'#eef1e6',borderColor:'rgba(255,255,255,.25)'}}>List your business</a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
