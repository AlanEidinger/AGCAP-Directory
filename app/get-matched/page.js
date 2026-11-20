'use client';

import { useEffect } from 'react';
import SiteShell from '../../components/SiteShell';
import { SmsConsent } from '../../components/LeadForm';
import { captureUtm, submitLead } from '../../lib/lead';

export default function Page() {
  useEffect(() => {
    const steps = [...document.querySelectorAll('.match-step')];
    const dots = [...document.querySelectorAll('#stepper .st')];
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const count = document.getElementById('stepCount');
    const foot = document.getElementById('matchFoot');
    if (!nextBtn || !backBtn) return;
    const TOTAL = 4;
    let cur = 1;
    const render = () => {
      steps.forEach((s) => s.classList.toggle('active', +s.dataset.step === cur));
      dots.forEach((d) => {
        const n = +d.dataset.s;
        d.classList.toggle('cur', n === cur);
        d.classList.toggle('done', n < cur);
        const dot = d.querySelector('.st-dot');
        if (dot) dot.innerHTML = n < cur
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>'
          : String(n);
      });
      if (cur > TOTAL) { foot.style.display = 'none'; return; }
      foot.style.display = 'flex';
      count.textContent = 'Step ' + cur + ' of ' + TOTAL;
      backBtn.style.display = cur === 1 ? 'none' : '';
      nextBtn.textContent = cur === TOTAL ? 'Get my matches \u2192' : 'Continue \u2192';
      // Keep the card in view instead of jumping to the top of the page.
      const card = document.getElementById('matchForm');
      const top = card ? card.getBoundingClientRect().top : 0;
      if (card && top < 80) window.scrollTo({ top: window.scrollY + top - 90, behavior: 'smooth' });
      const h = steps.find((s) => +s.dataset.step === cur)?.querySelector('h2');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    };
    captureUtm();
    const root = document.getElementById('matchForm');
    const err = document.getElementById('matchErr');
    const val = (sel) => (root.querySelector(sel)?.value || '').trim();
    const collect = () => {
      const d = {};
      root.querySelectorAll('[name]').forEach((el) => {
        if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
        const v = (el.value || '').trim(); if (!v) return;
        d[el.name] = d[el.name] ? d[el.name] + '; ' + v : v;
      });
      return d;
    };
    const showErr = (m) => { err.textContent = m; err.style.display = m ? 'block' : 'none'; };
    const onNext = async () => {
      showErr('');
      if (cur < TOTAL) { cur += 1; render(); return; }
      if (!val('[name=name]')) return showErr('Please enter your name.');
      if (!val('[name=phone]') && !val('[name=email]')) return showErr('Please enter a phone number or email.');
      nextBtn.disabled = true; backBtn.disabled = true; nextBtn.textContent = 'Sending\u2026';
      try {
        await submitLead('get_matched', collect());
        cur = TOTAL + 1; render();
      } catch (x) {
        showErr(x.message); nextBtn.textContent = 'Get my matches \u2192';
      } finally { nextBtn.disabled = false; backBtn.disabled = false; }
    };
    const onBack = () => { cur = Math.max(cur - 1, 1); render(); };
    nextBtn.addEventListener('click', onNext);
    backBtn.addEventListener('click', onBack);
    return () => {
      nextBtn.removeEventListener('click', onNext);
      backBtn.removeEventListener('click', onBack);
    };
  }, []);

  return (
    <SiteShell>
      <section className="match-hero">
        <div className="wrap">
          <span className="eyebrow">Free · No obligation</span>
          <h1>Tell us what you need. We'll match you with the right specialist.</h1>
          <p>Answer four short questions and we'll hand-pick up to three verified California ag professionals who work in your county and know your situation.</p>
          <div className="stepper" id="stepper">
            <span className="st cur" data-s="1"><span className="st-dot">1</span><span className="st-label">Service</span></span>
            <span className="st-line"></span>
            <span className="st" data-s="2"><span className="st-dot">2</span><span className="st-label">Location</span></span>
            <span className="st-line"></span>
            <span className="st" data-s="3"><span className="st-dot">3</span><span className="st-label">Details</span></span>
            <span className="st-line"></span>
            <span className="st" data-s="4"><span className="st-dot">4</span><span className="st-label">Contact</span></span>
          </div>
        </div>
      </section>


      <section className="match-wrap">
        <div className="wrap">
          <div className="match-card" id="matchForm">
            
            <div className="match-step active" data-step="1">
              <h2>What do you need help with?</h2>
              <p className="step-sub">Pick the service closest to your situation. You can add detail in a moment.</p>
              <div className="opt-grid">
              <label className="opt"><input type="radio" name="service_needed" defaultValue="Buying or selling land" defaultChecked /><span><span className="o-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 21h18" /><path d="M5 21V9l7-5 7 5v12" /><path d="M9 21v-6h6v6" /></svg></span><span className="o-txt"><span className="o-t">Buying or selling land</span><span className="o-d">Farms, ranches, orchards, vineyards</span></span></span></label>
              <label className="opt"><input type="radio" name="service_needed" defaultValue="Crop & farm insurance" /><span><span className="o-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3 5 6v5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z" /><path d="m9.5 12 1.8 1.8L15 10" /></svg></span><span className="o-txt"><span className="o-t">Crop &amp; farm insurance</span><span className="o-d">MPCI, crop-hail, revenue protection</span></span></span></label>
              <label className="opt"><input type="radio" name="service_needed" defaultValue="Title & escrow" /><span><span className="o-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /><path d="m9 14 2 2 4-4" /></svg></span><span className="o-txt"><span className="o-t">Title &amp; escrow</span><span className="o-d">Closings on ag property</span></span></span></label>
              <label className="opt"><input type="radio" name="service_needed" defaultValue="Appraisal & valuation" /><span><span className="o-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M9 7h6M9 11h6M9 15h3" /></svg></span><span className="o-txt"><span className="o-t">Appraisal &amp; valuation</span><span className="o-d">Certified ag land appraisers</span></span></span></label>
              <label className="opt"><input type="radio" name="service_needed" defaultValue="Water rights or legal counsel" /><span><span className="o-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3v18" /><path d="M7 7h10" /><path d="M5 7 3 13a3 3 0 0 0 4 0L5 7Z" /><path d="m19 7-2 6a3 3 0 0 0 4 0l-2-6Z" /><path d="M8 21h8" /></svg></span><span className="o-txt"><span className="o-t">Water rights or legal counsel</span><span className="o-d">Ag attorneys and water specialists</span></span></span></label>
              <label className="opt"><input type="radio" name="service_needed" defaultValue="Not sure yet" /><span><span className="o-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span><span className="o-txt"><span className="o-t">I'm not sure yet</span><span className="o-d">Describe it and we will route you</span></span></span></label>
              </div>
            </div>

            
            <div className="match-step" data-step="2">
              <h2>Where is the property?</h2>
              <p className="step-sub">Choose the region, then narrow to a county if you can.</p>
              <div className="field" style={{marginBottom:'18px'}}>
                <label>Region</label>
                <select id="regionSel" name="region">
                  <option>San Joaquin Valley</option>
                  <option>Sacramento Valley</option>
                  <option>Central Coast</option>
                  <option>Wine Country</option>
                  <option>Imperial Valley</option>
                  <option>Sierra Foothills</option>
                  <option>Not sure / multiple regions</option>
                </select>
              </div>
              <div className="field">
                <label>County <span className="hint">select all that apply</span></label>
                <div className="chip-group">
                  <label className="chip-check"><input type="checkbox" name="county" value="Fresno" /><span>Fresno</span></label>
                  <label className="chip-check"><input type="checkbox" name="county" value="Tulare" /><span>Tulare</span></label>
                  <label className="chip-check"><input type="checkbox" name="county" value="Kings" /><span>Kings</span></label>
                  <label className="chip-check"><input type="checkbox" name="county" value="Kern" /><span>Kern</span></label>
                  <label className="chip-check"><input type="checkbox" name="county" value="Madera" /><span>Madera</span></label>
                  <label className="chip-check"><input type="checkbox" name="county" value="Merced" /><span>Merced</span></label>
                  <label className="chip-check"><input type="checkbox" name="county" value="Stanislaus" /><span>Stanislaus</span></label>
                  <label className="chip-check"><input type="checkbox" name="county" value="San Joaquin" /><span>San Joaquin</span></label>
                </div>
              </div>
            </div>

            
            <div className="match-step" data-step="3">
              <h2>A little more detail</h2>
              <p className="step-sub">This helps us pick the right specialist rather than the nearest one.</p>
              <div className="field-row" style={{marginBottom:'16px'}}>
                <div className="field"><label>Approximate acreage</label><input type="text" name="acreage" placeholder="e.g. 220 acres" /></div>
                <div className="field"><label>Crop or land type</label><input type="text" name="crop_type" placeholder="e.g. almonds, row crop, pasture" /></div>
              </div>
              <div className="field" style={{marginBottom:'18px'}}>
                <label>Timeline</label>
                <select name="timeline" defaultValue="Within 3 months">
                  <option>As soon as possible</option>
                  <option>Within 3 months</option>
                  <option>This season</option>
                  <option>Next 6&ndash;12 months</option>
                  <option>Just researching</option>
                </select>
              </div>
              <div className="field">
                <label>Anything else we should know? <span className="hint">optional</span></label>
                <textarea name="message" rows="4" placeholder="Water district, financing questions, deadlines, or anything that affects who we match you with." defaultValue={``}></textarea>
              </div>
            </div>

            
            <div className="match-step" data-step="4">
              <h2>Where should they reach you?</h2>
              <p className="step-sub">We share your details only with the professionals we match you to.</p>
              <div className="field-row" style={{marginBottom:'16px'}}>
                <div className="field"><label>Full name <span className="req">*</span></label><input type="text" name="name" autoComplete="name" placeholder="Your name" /></div>
                <div className="field"><label>Phone <span className="req">*</span></label><input type="tel" name="phone" autoComplete="tel" placeholder="(559) 555-0100" /></div>
              </div>
              <div className="field" style={{marginBottom:'18px'}}><label>Email <span className="req">*</span></label><input type="email" name="email" autoComplete="email" placeholder="you@example.com" /></div>
              <div className="field" style={{marginBottom:'18px'}}>
                <label>Preferred contact method</label>
                <div className="chip-group">
                  <label className="chip-check"><input type="radio" name="contact_pref" value="Phone call" defaultChecked /><span>Phone call</span></label>
                  <label className="chip-check"><input type="radio" name="contact_pref" value="Text" /><span>Text</span></label>
                  <label className="chip-check"><input type="radio" name="contact_pref" value="Email" /><span>Email</span></label>
                </div>
              </div>
              <SmsConsent style={{marginBottom:'4px'}} />
              <label className="fopt" style={{fontSize:'.88rem'}}><input type="checkbox" name="email_optin" value="yes" /><span className="fbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg></span>Email me relevant guides from AgriFarm Directory</label>
              <p style={{fontSize:'.8rem',color:'var(--muted)',margin:'14px 0 0'}}>By submitting you agree to our <a href="/directory/terms" style={{color:'var(--forest)',fontWeight:'600'}}>Terms</a> and <a href="/directory/privacy" style={{color:'var(--forest)',fontWeight:'600'}}>Privacy Policy</a>.</p>
            </div>

            
            <div className="match-step" data-step="5">
              <div className="match-done">
                <div className="md-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg></div>
                <h2>Request received</h2>
                <p>Thanks. We're reviewing your details and will introduce you to specialists who work in your county, usually within one business day. Watch for a call or email from AgriFarm Directory.</p>
                <div style={{display:'flex',gap:'10px',justifyContent:'center',marginTop:'26px',flexWrap:'wrap'}}>
                  <a className="btn btn-gold" href="/directory/professionals">Browse all professionals</a>
                  <a className="btn btn-ghost" href="/directory">Back to home</a>
                </div>
              </div>
            </div>

            <div className="match-foot" id="matchFoot">
              <span className="mf-count" id="stepCount">Step 1 of 4</span>
              <p id="matchErr" role="alert" className="lead-err" style={{display:'none',margin:'0 0 0 12px'}}></p>
              <span className="mf-actions">
                <button className="btn btn-ghost" type="button" id="backBtn" style={{display:'none'}}>Back</button>
                <button className="btn btn-gold" type="button" id="nextBtn">Continue &rarr;</button>
              </span>
            </div>
          </div>

          <div className="match-trust">
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 4 5v6c0 5 3.3 8.6 8 10 4.7-1.4 8-5 8-10V5l-8-3Z" /><path d="m9 11 2 2 4-4" /></svg>Every match is a verified professional</span>
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>Response within one business day</span>
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>Free &mdash; no obligation</span>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
