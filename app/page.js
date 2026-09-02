import Link from 'next/link';
import { asset } from '../lib/config';

export const metadata = {
  title: "AgriFarm Directory — California's Agricultural Expert Network",
  description:
    'Find verified California agricultural professionals — land brokers, crop insurance, title & escrow, appraisers, and water-rights attorneys. Serving all 58 counties.',
  alternates: { canonical: '/' },
};

const SERVICES = [
  {
    t: 'Real Estate & Land Brokers',
    d: 'Agents who specialize in buying and selling farms, ranches, orchards, and raw acreage.',
    paths: ['M3 21h18', 'M5 21V9l7-5 7 5v12', 'M9 21v-6h6v6'],
  },
  {
    t: 'Crop & Farm Insurance',
    d: 'Agents fluent in crop, livestock, equipment, and liability coverage built for agriculture.',
    paths: ['M12 3 5 6v5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z', 'm9.5 12 1.8 1.8L15 10'],
  },
  {
    t: 'Title & Escrow',
    d: 'Companies experienced with land, easements, mineral & water rights, and ag closings.',
    paths: ['M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z', 'M14 3v5h5', 'm9 14 2 2 4-4'],
  },
  {
    t: 'Agricultural Appraisers',
    d: 'Certified appraisers who value farmland, improvements, water, and standing crops.',
    paths: ['M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M9 7h6M9 11h6M9 15h3'],
  },
  {
    t: 'Water Rights & Ag Attorneys',
    d: 'Legal counsel for water rights, leases, easements, succession, and land-use disputes.',
    paths: ['M12 3v18', 'M7 7h10', 'M5 7 3 13a3 3 0 0 0 4 0L5 7Z', 'm19 7-2 6a3 3 0 0 0 4 0l-2-6Z', 'M8 21h8'],
  },
];

const STEPS = [
  {
    n: 'STEP 01',
    t: 'Search your area',
    d: 'Pick your California region or city and the specialty you need, from land brokers to water rights attorneys.',
    ic: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  },
  {
    n: 'STEP 02',
    t: 'Compare verified pros',
    d: 'Review licensed, reference-checked professionals with real ag experience, ratings, and service areas.',
    ic: <><path d="M12 3 5 6v5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z" /><path d="m9.5 12 1.8 1.8L15 10" /></>,
  },
  {
    n: 'STEP 03',
    t: 'Connect directly',
    d: 'Reach out with one form, or request to be matched. No middleman, no markup on your relationship.',
    ic: <><path d="M4 4h16v12H7l-3 3V4Z" /><path d="M8 9h8M8 12h5" /></>,
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>The right specialist for <em>every acre</em> you own.</h1>
              <p className="lead">
                From your first land purchase to refinancing, insuring, or settling water rights, find vetted
                California professionals who understand farms, ranches, and rural property. One trusted directory.
              </p>

              <div className="search-card">
                <div className="search-row">
                  <button className="search-field" type="button">
                    <svg className="sf-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="sf-body"><span className="sf-label">Location</span><span className="sf-val">California</span></span>
                    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  <button className="search-field" type="button">
                    <svg className="sf-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 7h18M3 12h18M3 17h12" /></svg>
                    <span className="sf-body"><span className="sf-label">Service needed</span><span className="sf-val">All services</span></span>
                    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  <button className="search-btn" type="button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                    Search
                  </button>
                </div>
              </div>

              <div className="popular">
                <span className="pl">Popular:</span>
                <Link href="/professionals">Land brokers in Fresno</Link>
                <Link href="/professionals">Crop insurance · Central Valley</Link>
                <Link href="/professionals">Ag appraisers near me</Link>
              </div>
            </div>

            <div className="hero-visual">
              <img
                className="hero-img"
                src={asset('hero-farm.png')}
                alt="Abstract California farmland fields receding to rolling hills under a warm sky"
                fetchPriority="high"
                decoding="async"
              />
              <div className="hero-stat">
                <div className="num">58</div>
                <div className="lbl">CA counties<br />covered</div>
              </div>
              <div className="hero-float">
                <span className="avatar hf-av" style={{ background: 'linear-gradient(135deg,#2e4a37,#5a7a4f)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ecdfb8" strokeWidth="2" style={{ width: 22, height: 22 }}><path d="M12 2 4 5v6c0 5 3.3 8.6 8 10 4.7-1.4 8-5 8-10V5l-8-3Z" /><path d="m9 11 2 2 4-4" /></svg>
                </span>
                <span>
                  <span className="nm">Verified specialists</span>
                  <span className="rl">Background &amp; license checked</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="wrap">
          <div className="trust-item"><span className="ti-num">5</span><span className="ti-lbl">Core specialties covered</span></div>
          <div className="trust-item"><span className="ti-num">58</span><span className="ti-lbl">California counties</span></div>
          <div className="trust-item"><span className="ti-num">100%</span><span className="ti-lbl">License &amp; reference checked</span></div>
        </div>
      </div>

      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Browse by service</p>
            <h2 className="h-sec">Five specialists every landowner needs</h2>
            <p className="lead">
              The professionals who move an agricultural deal, and an entire operation, forward. Each one vetted for
              real ag experience.
            </p>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <Link className="svc-card" href="/professionals" key={s.t}>
                <span className="svc-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    {s.paths.map((d, i) => <path d={d} key={i} />)}
                  </svg>
                </span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="svc-meta"><span className="go">Browse <ArrowIcon /></span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section how" id="how">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 560 }}>
            <p className="eyebrow">How it works</p>
            <h2 className="h-sec">Find the right expert in three steps</h2>
            <p className="lead">No guesswork, no cold-calling firms that don&rsquo;t understand agriculture.</p>
          </div>
          <div className="how-grid">
            {STEPS.map((s) => (
              <div className="how-step" key={s.n}>
                <div className="how-num">{s.n}</div>
                <div className="step-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{s.ic}</svg>
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="professionals">
        <div className="wrap">
          <div className="pros-head">
            <div>
              <p className="eyebrow">Verified professionals</p>
              <h2 className="h-sec">Featured experts across California</h2>
            </div>
            <Link className="btn btn-ghost" href="/professionals">View all professionals →</Link>
          </div>
          {/* Cards render from the database once listings are live (see README). */}
        </div>
      </section>
    </>
  );
}
