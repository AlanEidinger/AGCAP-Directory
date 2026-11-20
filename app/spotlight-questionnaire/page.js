import SiteShell from '../../components/SiteShell';

export const metadata = {
  title: 'Spotlight Questionnaire',
  description: 'Tell us your story so we can craft your AgriFarm Specialist Spotlight feature. Share answers, photos, and video links with recommended specs and guidelines.',
  alternates: { canonical: '/spotlight-questionnaire' },
};

export default function Page() {
  return (
    <SiteShell>
      <section className="q-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/directory">Home</a><span className="sep">/</span><a href="/directory/articles">Articles</a><span className="sep">/</span><span>Spotlight Questionnaire</span></div>
          <span className="tag-chip green">Specialist Spotlight</span>
          <h1 style={{marginTop:'14px'}}>Tell us your story</h1>
          <p className="lead">Congratulations on being considered for a AgriFarm Specialist Spotlight. Your answers below become the raw material for your feature article, video, and podcast segment. Be candid and specific, the best stories come from real detail. Nothing is published without your review.</p>
          <span className="q-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>Takes about 20–30 minutes. You can save and finish later.</span>
        </div>
      </section>


      <section className="q-body">
        <div className="wrap">
          <div className="q-layout">

            
            <nav className="q-nav">
              <ol>
                <li><a className="active" href="#s1">About you</a></li>
                <li><a href="#s2">Your story</a></li>
                <li><a href="#s3">Tips &amp; advice</a></li>
                <li><a href="#s4">Photos</a></li>
                <li><a href="#s5">Video &amp; audio</a></li>
                <li><a href="#s6">Final details</a></li>
              </ol>
            </nav>

            <form className="q-form">

              
              <section className="q-section" id="s1">
                <header>
                  <h2><span className="qs-n">01</span> About you</h2>
                  <p>The basics for your byline and verification. This won't all be published.</p>
                </header>
                <div className="upload-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
                  <div className="q-field"><label className="q-label">Full name</label><input type="text" placeholder="Jane Grower" /></div>
                  <div className="q-field"><label className="q-label">Preferred name / how you're credited <span className="opt">optional</span></label><input type="text" placeholder="Jane" /></div>
                  <div className="q-field"><label className="q-label">Company / firm</label><input type="text" placeholder="Valley Land &amp; Ranch Co." /></div>
                  <div className="q-field"><label className="q-label">Job title / role</label><input type="text" placeholder="Land &amp; Ranch Broker" /></div>
                  <div className="q-field"><label className="q-label">Email</label><input type="email" placeholder="you@company.com" /></div>
                  <div className="q-field"><label className="q-label">Phone</label><input type="tel" placeholder="(555) 555-5555" /></div>
                  <div className="q-field"><label className="q-label">Primary city</label><input type="text" placeholder="Fresno" /></div>
                  <div className="q-field">
                    <label className="q-label">Specialty</label>
                    <select>
                      <option>Real Estate &amp; Land Brokerage</option>
                      <option>Crop &amp; Farm Insurance</option>
                      <option>Title &amp; Escrow</option>
                      <option>Agricultural Appraisal</option>
                      <option>Water Rights &amp; Legal</option>
                    </select>
                  </div>
                </div>
                <div className="q-field"><label className="q-label">Years in agriculture</label><input type="text" placeholder="e.g. 18" style={{maxWidth:'200px'}} /></div>
              </section>

              
              <section className="q-section" id="s2">
                <header>
                  <h2><span className="qs-n">02</span> Your story</h2>
                  <p>This is the heart of the feature. Write as much or as little as you like, we'll shape it.</p>
                </header>
                <div className="q-field">
                  <label className="q-label">How did you get into agriculture and your specialty?
                    <span className="tip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 17v-1m0-3a2 2 0 1 0-2-2" /><circle cx="12" cy="12" r="9" /></svg><span className="tip-pop">Origin stories make the best openings. A specific memory (a family farm, a first deal) beats a résumé summary.</span></span>
                  </label>
                  <textarea rows="4" placeholder="Tell us where you started…" defaultValue={``}></textarea>
                  <div className="q-help">A few sentences to a couple of paragraphs is perfect.</div>
                </div>
                <div className="q-field">
                  <label className="q-label">What makes your approach different?</label>
                  <textarea rows="4" placeholder="Your philosophy, your edge, what clients say about working with you…" defaultValue={``}></textarea>
                </div>
                <div className="q-field">
                  <label className="q-label">Tell us about a deal or project you're proud of
                    <span className="tip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 17v-1m0-3a2 2 0 1 0-2-2" /><circle cx="12" cy="12" r="9" /></svg><span className="tip-pop">Specifics shine: the challenge, what you did, and the outcome. Keep client names confidential unless you have permission.</span></span>
                  </label>
                  <textarea rows="4" placeholder="The challenge, what you did, and how it turned out…" defaultValue={``}></textarea>
                </div>
                <div className="q-field">
                  <label className="q-label">What's the biggest change facing California ag landowners right now?</label>
                  <textarea rows="3" placeholder="Water, regulation, markets, succession…" defaultValue={``}></textarea>
                </div>
              </section>

              
              <section className="q-section" id="s3">
                <header>
                  <h2><span className="qs-n">03</span> Tips &amp; advice</h2>
                  <p>Practical takeaways our readers can act on. These often become the most-shared part of the feature.</p>
                </header>
                <div className="q-field">
                  <label className="q-label">Your top 3 tips for landowners in your specialty
                    <span className="tip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 17v-1m0-3a2 2 0 1 0-2-2" /><circle cx="12" cy="12" r="9" /></svg><span className="tip-pop">One tip per line. Lead with the action, then a sentence of why. We'll format these as a numbered "playbook" box.</span></span>
                  </label>
                  <textarea rows="5" placeholder="1. …&#10;2. …&#10;3. …" defaultValue={``}></textarea>
                </div>
                <div className="q-field">
                  <label className="q-label">The most common mistake you see, and how to avoid it</label>
                  <textarea rows="3" placeholder="What goes wrong, and the simple fix…" defaultValue={``}></textarea>
                </div>
                <div className="q-field">
                  <label className="q-label">A question you wish more clients asked you</label>
                  <textarea rows="3" placeholder="…and your answer to it." defaultValue={``}></textarea>
                </div>
              </section>

              
              <section className="q-section" id="s4">
                <header>
                  <h2><span className="qs-n">04</span> Photos</h2>
                  <p>Upload anything you'd like considered. You don't need professional shots, real photos of you at work are often the best. Hover the <span className="tip" style={{verticalAlign:'-3px'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 17v-1m0-3a2 2 0 1 0-2-2" /><circle cx="12" cy="12" r="9" /></svg><span className="tip-pop">Each upload box shows recommended size, resolution, and format. These are guidelines, not hard rules.</span></span> icons for specs.</p>
                </header>
                <div className="upload-grid">
                  <label className="dropzone">
                    <input type="file" accept="image/*" hidden />
                    <span className="dz-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="10" r="3.2" /><path d="M4 8h3l1.5-2h7L17 8h3v11H4Z" /></svg></span>
                    <span className="dz-title">Headshot / portrait</span>
                    <span className="dz-sub">Drag &amp; drop or click to upload</span>
                    <span className="dz-btn">Choose file</span>
                    <span className="dz-specs">Recommended: 1200×1500px (4:5) · ≥ 1080px wide · JPG or PNG · under 10 MB</span>
                  </label>
                  <label className="dropzone">
                    <input type="file" accept="image/*" hidden />
                    <span className="dz-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 17l5-5 4 4 5-6 4 5" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg></span>
                    <span className="dz-title">Cover / hero image</span>
                    <span className="dz-sub">A wide landscape or you in the field</span>
                    <span className="dz-btn">Choose file</span>
                    <span className="dz-specs">Recommended: 1920×1080px (16:9) · landscape · JPG · under 15 MB</span>
                  </label>
                  <label className="dropzone">
                    <input type="file" accept="image/*" multiple hidden />
                    <span className="dz-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg></span>
                    <span className="dz-title">Gallery photos (up to 8)</span>
                    <span className="dz-sub">At work, properties, your team</span>
                    <span className="dz-btn">Choose files</span>
                    <span className="dz-specs">Recommended: ≥ 1600px on the long edge · JPG · landscape preferred · under 15 MB each</span>
                  </label>
                  <label className="dropzone">
                    <input type="file" accept="image/*,.svg,.pdf" hidden />
                    <span className="dz-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3c-1 4-4 5-7 5 0 6 3 10 7 13 4-3 7-7 7-13-3 0-6-1-7-5Z" /></svg></span>
                    <span className="dz-title">Company logo</span>
                    <span className="dz-sub">For your profile &amp; byline</span>
                    <span className="dz-btn">Choose file</span>
                    <span className="dz-specs">Recommended: transparent PNG or SVG · ≥ 512px · square or horizontal</span>
                  </label>
                </div>
                <div className="q-field" style={{marginTop:'20px'}}>
                  <label className="q-label">Photo notes / captions <span className="opt">optional</span></label>
                  <textarea rows="2" placeholder="Tell us who or what is in each photo, and any you especially want used." defaultValue={``}></textarea>
                </div>
              </section>

              
              <section className="q-section" id="s5">
                <header>
                  <h2><span className="qs-n">05</span> Video &amp; audio</h2>
                  <p>Have footage, a podcast clip, or want us to record one? Drop links to anything you'd like considered, no need to upload large files here.</p>
                </header>
                <div className="q-field">
                  <label className="q-label">Video link
                    <span className="tip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 17v-1m0-3a2 2 0 1 0-2-2" /><circle cx="12" cy="12" r="9" /></svg><span className="tip-pop">Paste a <b>YouTube, Vimeo, Drive, or Dropbox</b> link. For raw footage, shoot <b>1080p or 4K, horizontal (16:9)</b>. We handle the editing.</span></span>
                  </label>
                  <div className="link-row">
                    <span className="lr-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="5" width="15" height="14" rx="2" /><path d="m17 9 5-3v12l-5-3" /></svg></span>
                    <input type="url" placeholder="https://youtube.com/… or a Drive/Dropbox link" />
                  </div>
                  <div className="q-help">Recommended: 1080p (1920×1080) or higher, horizontal, MP4. Keep clips raw, we'll edit.</div>
                </div>
                <div className="q-field">
                  <label className="q-label">Audio / podcast link <span className="opt">optional</span></label>
                  <div className="link-row">
                    <span className="lr-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg></span>
                    <input type="url" placeholder="https://… link to audio or a podcast episode" />
                  </div>
                  <div className="q-help">Recommended for new recordings: WAV or MP3 (≥ 192 kbps), recorded in a quiet room.</div>
                </div>
                <div className="q-field">
                  <label className="q-label">Other links &amp; resources <span className="opt">optional</span></label>
                  <div className="link-row">
                    <span className="lr-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1" /></svg></span>
                    <input type="url" placeholder="Website, LinkedIn, press coverage, case study…" />
                  </div>
                  <div className="link-row">
                    <span className="lr-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1" /></svg></span>
                    <input type="url" placeholder="Add another link…" />
                  </div>
                </div>
                <div className="q-field">
                  <label className="q-label">Would you like us to produce the video / podcast for you?</label>
                  <div className="radio-row">
                    <label className="pick"><input type="radio" name="produce" /> Yes, please reach out</label>
                    <label className="pick"><input type="radio" name="produce" /> I'll provide my own</label>
                    <label className="pick"><input type="radio" name="produce" /> Not sure yet</label>
                  </div>
                </div>
              </section>

              
              <section className="q-section" id="s6">
                <header>
                  <h2><span className="qs-n">06</span> Final details</h2>
                  <p>A few logistics so we can schedule and publish smoothly.</p>
                </header>
                <div className="q-field">
                  <label className="q-label">Best way and time to reach you for a short interview</label>
                  <input type="text" placeholder="e.g. Phone, weekday mornings PT" />
                </div>
                <div className="q-field">
                  <label className="q-label">Anything we should avoid or keep confidential? <span className="opt">optional</span></label>
                  <textarea rows="2" placeholder="Topics, client names, or details to keep off the record." defaultValue={``}></textarea>
                </div>
                <div className="q-field">
                  <label className="q-label">Consent</label>
                  <div className="check-col">
                    <label className="pick" style={{borderRadius:'var(--r-sm)'}}><input type="checkbox" /> I confirm I have the rights to share the photos, video, and audio I've submitted.</label>
                    <label className="pick" style={{borderRadius:'var(--r-sm)'}}><input type="checkbox" /> I grant AgriFarm Directory permission to edit and publish this material in my spotlight.</label>
                    <label className="pick" style={{borderRadius:'var(--r-sm)'}}><input type="checkbox" /> I'd like to review the draft before it goes live.</label>
                  </div>
                </div>
              </section>

              
              <div className="q-submit-bar">
                <p>We'll review your submission and reach out within <b>3–5 business days</b> to schedule your interview. Thank you for sharing your story.</p>
                <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                  <button className="btn btn-ghost btn-lg" type="button" style={{background:'rgba(255,255,255,.06)',color:'#eef1e6',borderColor:'rgba(255,255,255,.25)'}}>Save &amp; finish later</button>
                  <button className="btn btn-gold btn-lg" type="submit">Submit questionnaire</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
