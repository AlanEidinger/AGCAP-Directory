import SiteShell from '../../../components/SiteShell';
import LeadForm, { SmsConsent } from '../../../components/LeadForm';

export const metadata = {
  title: 'Marcela Ortíz — Land &amp; Ranch Broker, Fresno',
  description: 'Marcela Ortíz is a verified California land and ranch broker serving Fresno and the San Joaquin Valley, specializing in row-crop and orchard acreage.',
  alternates: { canonical: '/professionals/marcela-ortiz' },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <SiteShell>
      <section className="profile-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="../index.html">Home</a><span className="sep">/</span><a href="../professionals.html">Professionals</a><span className="sep">/</span><a href="../professionals.html">Land &amp; Ranch Brokers</a><span className="sep">/</span><span>Marcela Ortíz</span></div>
          <div className="profile-id">
            <span className="avatar profile-av">MO</span>
            <div className="profile-main-id">
              <div className="role">Land &amp; Ranch Broker</div>
              <h1>Marcela Ortíz</h1>
              <div className="profile-meta">
                <span className="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>Verified</span>
                <span className="dot"></span>
                <span className="pm"><span className="stars"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg></span><b>4.9</b>&nbsp;(37 reviews)</span>
                <span className="dot"></span>
                <span className="pm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Fresno · San Joaquin Valley</span>
                <span className="dot"></span>
                <span className="pm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>18+ years experience</span>
              </div>
              <div className="profile-actions">
                <a className="btn btn-gold" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v12H7l-3 3V4Z" /></svg>Contact Marcela</a>
                <a className="btn btn-ghost" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 4v3a17 17 0 0 1-16-16Z" /></svg>Call</a>
                <a className="btn btn-ghost" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12v18l-6-4-6 4Z" /></svg>Save</a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="profile-body">
        <div className="wrap">
          <div className="profile-grid">
            
            <div className="prose">
              
              <div className="rep">
                <div className="rep-head">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.8" style={{width:'20px',height:'20px'}}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
                  <h2>Reputation across the web</h2>
                  <span className="sample-flag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>Sample data</span>
                </div>
                <div className="rep-grid">
                  <div className="rep-aggregate">
                    <div className="rep-score">4.9</div>
                    <span className="stars">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg>
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg>
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg>
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg>
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg>
                    </span>
                    <div className="rep-sub">Illustrative figures &mdash; live review aggregation is not yet connected.</div>
                  </div>
                  <div className="rep-platforms">
                    <div className="rep-row">
                      <span className="rep-mark" style={{background:'#4285F4'}}>G</span>
                      <span className="rep-name">Google</span>
                      <span className="rep-bar"><i style={{width:'98%'}}></i></span>
                      <span className="rep-val">4.9 <small>(112)</small></span>
                    </div>
                    <div className="rep-row">
                      <span className="rep-mark" style={{background:'#1877F2'}}>f</span>
                      <span className="rep-name">Facebook</span>
                      <span className="rep-bar"><i style={{width:'96%'}}></i></span>
                      <span className="rep-val">4.8 <small>(47)</small></span>
                    </div>
                    <div className="rep-row">
                      <span className="rep-mark" style={{background:'#D32323'}}>Y</span>
                      <span className="rep-name">Yelp</span>
                      <span className="rep-bar"><i style={{width:'94%'}}></i></span>
                      <span className="rep-val">4.7 <small>(28)</small></span>
                    </div>
                    <div className="rep-row">
                      <span className="rep-mark" style={{background:'#0B8484'}}>b</span>
                      <span className="rep-name">Bing</span>
                      <span className="rep-bar"><i style={{width:'100%'}}></i></span>
                      <span className="rep-val">5.0 <small>(16)</small></span>
                    </div>
                    <div className="rep-row">
                      <span className="rep-mark" style={{background:'#6001D2'}}>y!</span>
                      <span className="rep-name">Yahoo</span>
                      <span className="rep-bar"><i style={{width:'96%'}}></i></span>
                      <span className="rep-val">4.8 <small>(11)</small></span>
                    </div>
                  </div>
                </div>
              </div>

              <h2>About</h2>
              <p className="lead">Marcela Ortíz has represented buyers and sellers of California farmland for nearly two decades, with a focus on the row-crop and permanent-crop ground of the San Joaquin Valley.</p>
              <p>A grower's daughter from Kingsburg, Marcela brings firsthand knowledge of irrigation districts, soil classes, and water reliability to every transaction. She works closely with appraisers, lenders, and title teams across the directory to keep complex agricultural deals moving, and she is known for straight talk about a property's real productive value.</p>

              <h2>Specialties</h2>
              <div className="spec-tags">
                <span className="spec-tag">Row-crop acreage</span>
                <span className="spec-tag">Orchards &amp; vineyards</span>
                <span className="spec-tag">Dairy &amp; pasture</span>
                <span className="spec-tag">1031 exchanges</span>
                <span className="spec-tag">Water-district transfers</span>
                <span className="spec-tag">Investment buyers</span>
              </div>

              <h2>Service areas</h2>
              <div className="areas-grid">
                <span className="area-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Fresno County</span>
                <span className="area-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Tulare County</span>
                <span className="area-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Kings County</span>
                <span className="area-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Madera County</span>
                <span className="area-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Merced County</span>
                <span className="area-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Kern County</span>
              </div>

              <h2>Credentials</h2>
              <ul className="cred-list">
                <li><span className="cred-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2 3 7v6c0 5 3.8 8.5 9 9 5.2-.5 9-4 9-9V7l-9-5Z" /><path d="m9 12 2 2 4-4" /></svg></span><span><b>CA DRE Broker License</b><span>License #0192xxxx · Active since 2011</span></span></li>
                <li><span className="cred-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg></span><span><b>Accredited Land Consultant (ALC)</b><span>REALTORS® Land Institute</span></span></li>
                <li><span className="cred-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 21h16M6 21V8l6-4 6 4v13M10 21v-5h4v5" /></svg></span><span><b>AgriFarm Verified Professional</b><span>Identity, license &amp; references confirmed</span></span></li>
              </ul>

              <h2>Recent reviews <span className="sample-flag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>Sample data</span></h2>
              <div className="review">
                <div className="review-top"><span className="avatar review-av">WA</span><div><div className="nm">Walter A.</div><div className="meta">Ranch purchase · 2 months ago</div></div><span className="stars" style={{marginLeft:'auto'}}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg></span></div>
                <p>"Marcela knew the ground better than anyone we talked to. She flagged a water-district issue early that would have cost us dearly. The whole deal went smooth and we got a fair price."</p>
              </div>
              <div className="review">
                <div className="review-top"><span className="avatar review-av">HF</span><div><div className="nm">The Hassani Family</div><div className="meta">Orchard sale · 5 months ago</div></div><span className="stars" style={{marginLeft:'auto'}}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg></span></div>
                <p>"Sold our almond orchard above asking in a tough market. Marcela's marketing reached the right buyers and she handled the 1031 timeline perfectly."</p>
              </div>
            </div>

            
            <aside>
              <div className="contact-card">
                <div className="cc-head">
                  <div className="rate">Request a consultation</div>
                  <div className="resp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>Typically responds within 1 business day</div>
                </div>
                <LeadForm formType="profile_inquiry" className="cc-body" extra={{ listing_slug: 'marcela-ortiz', specialty: 'Land & Ranch Broker' }} successTitle="Message sent" successText="Your request is on its way. Expect a reply within one business day.">
                  <div className="cc-field"><label>Your name</label><input type="text" name="name" autoComplete="name" placeholder="Full name" /></div>
                  <div className="cc-field"><label>Email</label><input type="email" name="email" autoComplete="email" placeholder="you@example.com" /></div>
                  <div className="cc-field"><label>Phone</label><input type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-5555" /></div>
                  <div className="cc-field"><label>County of the property</label><input type="text" name="county" placeholder="e.g. Fresno" /></div>
                  <div className="cc-field"><label>How can Marcela help?</label><textarea name="message" rows="3" placeholder="Tell us about your property or what you're looking to buy or sell…" defaultValue={``}></textarea></div>
                  <SmsConsent />
                  <button className="btn btn-gold" type="submit" style={{width:'100%'}}>Send message</button>
                  <span className="note" style={{fontSize:'.78rem',color:'var(--muted)',textAlign:'center'}}>No obligation · Your details stay private</span>
                </LeadForm>
                <div className="cc-meta">
                  <span className="cm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a17 17 0 0 1-16-16Z" /></svg>(559) 555-0148</span>
                  <span className="cm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>marcela@example.com</span>
                  <span className="cm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Downtown Fresno office</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>


      <section className="related">
        <div className="wrap">
          <div className="pros-head">
            <div><p className="eyebrow">More land brokers nearby</p><h2 className="h-sec">Similar professionals</h2></div>
            <a className="btn btn-ghost" href="../professionals.html">View all professionals →</a>
          </div>
          <div className="pros-grid">
            <article className="pro-card">
              <div className="pro-top"><span className="avatar pro-av">TC</span><div className="pro-id"><a className="nm" href="../professionals/marcela-ortiz.html" style={{color:'inherit'}}>Tom Castellano</a><div className="rl">Land &amp; Vineyard Broker</div><div className="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Visalia</div></div></div>
              <div className="pro-body"><p>Producing vineyards and permanent-crop ranches.</p></div>
              <div className="pro-foot"><span className="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>Verified</span><span className="pro-rating"><span className="stars"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg></span><b>5.0</b><span className="rc">(29)</span></span></div>
            </article>
            <article className="pro-card">
              <div className="pro-top"><span className="avatar pro-av">GH</span><div className="pro-id"><a className="nm" href="../professionals/marcela-ortiz.html" style={{color:'inherit'}}>Grant Halloway</a><div className="rl">Ranch &amp; Land Broker</div><div className="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Merced</div></div></div>
              <div className="pro-body"><p>Cattle ranches and irrigated cropland.</p></div>
              <div className="pro-foot"><span className="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>Verified</span><span className="pro-rating"><span className="stars"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg></span><b>4.9</b><span className="rc">(45)</span></span></div>
            </article>
            <article className="pro-card">
              <div className="pro-top"><span className="avatar pro-av">RF</span><div className="pro-id"><a className="nm" href="../professionals/marcela-ortiz.html" style={{color:'inherit'}}>Reuben Falk</a><div className="rl">Orchard &amp; Nut Land Broker</div><div className="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>Visalia</div></div></div>
              <div className="pro-body"><p>Almond, pistachio, and walnut orchard sales.</p></div>
              <div className="pro-foot"><span className="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>Verified</span><span className="pro-rating"><span className="stars"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.6.5-5 4.3 1.6 6.4L12 16.9 5.9 19.2 7.5 12.8l-5-4.3 6.6-.5z" /></svg></span><b>5.0</b><span className="rc">(38)</span></span></div>
            </article>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
