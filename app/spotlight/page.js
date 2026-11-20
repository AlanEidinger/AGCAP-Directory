import SiteShell from '../../components/SiteShell';
import CopyLink from '../../components/CopyLink';
import DownloadCard from '../../components/DownloadCard';
import SpotlightOffer from '../../components/SpotlightOffer';
import { BENEFITS, BOOKING_URL } from '../../lib/spotlight';
import '../styles/spotlight.css';

export const metadata = {
  title: 'The AgriFarm Spotlight — Sample Feature',
  description: 'A sample AgriFarm Spotlight: a free feature on a San Joaquin Valley agricultural professional, written from a 20-minute interview.',
  alternates: { canonical: '/spotlight' },
  robots: { index: false, follow: true },
};

const img = (f) => `/directory/spotlight/${f}`;
const Arrow = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17 17 7M8 7h9v9" /></svg>);
const Down = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M6 13l6 6 6-6" /></svg>);

const QA = [
  ['What do you check first on a farm property?', '“Water. Which irrigation district it’s in, what the surface allocation has been the last few years, and the well records. Under the groundwater rules, two parcels side by side can have very different futures. After that I look at soil class, orchard age, and access.”'],
  ['What do sellers most often get wrong?', '“Pricing off a neighbor’s sale without adjusting for water. If the neighbor has district water and you rely on one well, that sale isn’t your number.”'],
  ['Who do you work with most?', '“Families selling ground they’ve farmed for decades, growers adding acreage, and buyers looking for a rural home on a few acres. Each one needs different questions answered before they can decide.”'],
  ['What should someone bring to a first call?', '“The parcel number if you have it, and what you want to happen. I can pull the district and well information from there.”'],
];

function Q({ i }) {
  const [q, a] = QA[i];
  return (
    <div className="sp-qa">
      <span className="n">{String(i + 1).padStart(2, '0')}</span>
      <div><h3>{q}</h3><p>{a}</p></div>
    </div>
  );
}

export default function Page() {
  return (
    <SiteShell>
      <div className="sp">
        <div className="sp-banner">
          <div className="wrap">
            <span className="sp-tag">Sample feature</span>
            <p>This is a demo of a free AgriFarm Spotlight.</p>
            <span className="sp-banner-a">
              <a href="#offer" data-open-offer="">What you get</a>
              <a className="sp-banner-go" href={BOOKING_URL}>Get featured <Arrow /></a>
            </span>
          </div>
        </div>

        <div className="wrap">
          <div className="sp-mast"><span>The AgriFarm <b>Spotlight</b></span><span>San Joaquin Valley &nbsp;/&nbsp; November 2026</span></div>

          <section className="sp-hero" id="sp-hero">
            <div>
              <span className="sp-kicker"><span className="dot"></span>Featured specialist</span>
              <h1 className="sp-serif">Marcela Ortíz</h1>
              <p className="sp-role">Agricultural Real Estate Specialist</p>
              <div className="sp-loc">Fresno, California <i></i> San Joaquin Valley</div>
              <hr className="sp-rule" />
              <h2 className="sp-serif">18 years selling farmland in the San Joaquin Valley.</h2>
              <p className="lede">Marcela represents buyers and sellers of orchards, row-crop ground, and rural homes in Fresno, Tulare, Kings, and Madera counties. Here she talks with Alan Eidinger about how she sizes up a property.</p>
              <div className="sp-ctas">
                <a className="sp-btn" href="#story">Read the interview <Down /></a>
                <a className="sp-link" href={BOOKING_URL}>Get a Spotlight like this <Arrow /></a>
              </div>
              <div className="sp-host">
                <img src="/directory/alan-avatar.png" alt="Alan Eidinger" />
                <span>Interview by <b>Alan Eidinger</b><small>Founder, AgriFarm Capital</small></span>
              </div>
            </div>
            <div className="sp-photo">
              <div className="frame"><img src={img('spotlight-portrait.webp')} alt="Marcela Ortíz standing in a blooming almond orchard" loading="eager" /></div>
              <div className="sp-seal"><small>Featured</small><b>NOV</b><small>2026</small></div>
              <div className="sp-cap"><span>Almond orchard, Fresno County</span></div>
            </div>
          </section>
        </div>

        <div className="sp-band">
          <div className="wrap">
            <span className="l">Service area</span>
            <span className="places">Fresno <i></i> Tulare <i></i> Kings <i></i> Madera</span>
            <span className="r">Orchards / Row crops / Rural homes</span>
          </div>
        </div>

        <div className="wrap">
          <section className="sp-story" id="story">
            <div>
              <span className="sp-kicker sp-num">01 <i></i> The interview</span>
              <h2 className="sp-serif">She starts with the water.</h2>
              <p className="sub">Before price, Marcela checks the irrigation district, the well records, and the groundwater rules that decide what the land can grow.</p>
              <div className="body">
                <p>This is a sample interview. In a real Spotlight, Alan talks with you for about 20 minutes, and we write the feature from that conversation.</p>
              </div>
              <div className="sp-meta"><i></i>Interview by Alan Eidinger &nbsp;/&nbsp; Sample</div>
              <Q i={0} />
              <Q i={1} />
              <blockquote className="sp-pull">
                <span className="q">“</span>
                <p>Two parcels side by side can have very different futures.</p>
                <cite>Marcela Ortíz <span>/ Sample interview</span></cite>
              </blockquote>
              <Q i={2} />
              <Q i={3} />
            </div>
            <aside className="sp-aside">
              <div className="sp-card">
                <div className="who">
                  <img src={img('spotlight-portrait.webp')} alt="" />
                  <div><small>Featured specialist</small><b>Marcela Ortíz</b><span>Land &amp; rural property</span></div>
                </div>
                <p className="desc">Buyer and seller representation for farmland and rural homes.</p>
                <dl>
                  <div><dt>Based in</dt><dd>Fresno, California</dd></div>
                  <div><dt>Works with</dt><dd>Orchards, row crops &amp; rural homes</dd></div>
                  <div><dt>Counties</dt><dd>Fresno, Tulare, Kings &amp; Madera</dd></div>
                </dl>
                <a className="go" href="/directory/professionals/marcela-ortiz">See her profile <Arrow /></a>
                <span className="fine">Sample profile</span>
              </div>
              <div className="sp-imagine">
                <div className="star">✳</div>
                <span className="sp-kicker">For ag professionals</span>
                <h4>Get a free Spotlight.</h4>
                <p>One 20-minute call.<br />We write it, you approve it.</p>
                <a href="#offer" data-open-offer="">What you get <Arrow /></a>
              </div>
            </aside>
          </section>
        </div>

        <section className="sp-gallery">
          <div className="wrap">
            <div className="head">
              <div><span className="sp-kicker sp-num">02 <i></i> Photos</span><h2 className="sp-serif">On the property.</h2></div>
              <p>Every Spotlight includes photos of you at work. We use photos you send us.</p>
            </div>
            <div className="sp-grid">
              <figure className="sp-fig big"><img src={img('spotlight-in-the-field.webp')} alt="Marcela Ortíz walking beside an almond orchard near a farmhouse" loading="lazy" /><figcaption>Walking a listing, Fresno County</figcaption></figure>
              <div className="stack">
                <figure className="sp-fig"><img src="/directory/region-san-joaquin.webp" alt="Rural home beside working farmland" loading="lazy" /><figcaption>Rural home on working acreage</figcaption></figure>
                <figure className="sp-fig"><img src="/directory/article-water.webp" alt="Irrigation pump station and canal beside an orchard" loading="lazy" /><figcaption>Pump station and district canal</figcaption></figure>
              </div>
            </div>
            <p className="sp-note">Sample imagery. A published Spotlight uses your own approved photos.</p>
          </div>
        </section>

        <section className="sp-share">
          <div className="wrap">
            <div>
              <span className="sp-kicker">Included: a shareable card</span>
              <h2 className="sp-serif">A card you can post anywhere.</h2>
              <p>Every Spotlight comes with a link and an image card sized for your website, email signature, Facebook, and LinkedIn.</p>
              <div className="acts">
                <DownloadCard className="sp-outline" photo={img('spotlight-portrait.webp')} name="Marcela Ortíz" role="Agricultural Real Estate Specialist" place="Fresno, California" counties="Fresno, Tulare, Kings & Madera counties" month="November 2026" file="agrifarm-spotlight-sample.png" sample>Download the card ↓</DownloadCard>
                <CopyLink className="sp-outline">Copy this page’s link ↗</CopyLink>
              </div>
            </div>
            <div className="sp-fcard" aria-hidden="true">
              <div className="ph"><img src={img('spotlight-portrait.webp')} alt="" loading="lazy" /></div>
              <div className="tx">
                <small>AgriFarm Spotlight</small>
                <b>Marcela Ortíz</b>
                <span>Agricultural Real Estate Specialist</span>
                <div className="ft"><span>November 2026</span><span>↗</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="sp-recruit" id="offer">
          <div className="wrap">
            <div className="intro">
              <span className="sp-kicker">For agricultural professionals in the San Joaquin Valley</span>
              <h2>Get your own Spotlight. It’s free.</h2>
              <p>Brokers, realtors, appraisers, insurance agents, title officers, and ag attorneys.</p>
            </div>
            <div className="cols">
              <div>
                <h3>What you get</h3>
                <ul className="sp-points">
                  {BENEFITS.map((b, i) => (
                    <li key={b.t}><span>{String(i + 1).padStart(2, '0')}</span><div><b>{b.t}</b><p>{b.d}</p></div></li>
                  ))}
                </ul>
              </div>
              <div className="sp-hostcard">
                <div className="who">
                  <img src="/directory/alan-avatar.png" alt="Alan Eidinger" />
                  <div><small>Your interviewer</small><b>Alan Eidinger</b><span>Founder, AgriFarm Capital</span></div>
                </div>
                <p className="pitch">Book a 20-minute call. Alan asks about your work, and we send you the draft to approve before it goes live.</p>
                <ul><li>No cost, no contract</li><li>20-minute Zoom call</li><li>You approve before publishing</li></ul>
                <a className="cta" href={BOOKING_URL}>Book my Spotlight call <Arrow /></a>
              </div>
            </div>
          </div>
        </section>

        <div className="sp-signoff">
          <div className="wrap">
            <img src="/directory/agrifarm-logo.png" alt="AgriFarm Capital" />
            <p>Agricultural professionals in the San Joaquin Valley.</p>
            <a href="/directory/professionals">Browse the directory <Arrow /></a>
          </div>
        </div>
        <p className="sp-disclaim">Sample feature: Marcela Ortíz is a fictional demonstration persona. Her photos, background, and interview are illustrative.</p>
        <SpotlightOffer watch="sp-hero" />
      </div>
    </SiteShell>
  );
}
