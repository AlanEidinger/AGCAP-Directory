import Link from 'next/link';
import SiteShell from '../components/SiteShell';
import { asset } from '../lib/config';
import ProCard from '../components/ProCard';
import { getPros, SPECIALTIES, COUNTIES, isFeatured, isVerified } from '../lib/directory';

export const dynamic = 'force-dynamic';
const DIR_SPECIALTIES = SPECIALTIES;


export const metadata = {
  title: "AgriFarm Directory — California's Agricultural Expert Network",
  description:
    'Find California agricultural professionals — land brokers, crop insurance, title & escrow, appraisers, and water-rights attorneys. Now serving Fresno, Tulare, Kings, Madera, and Kern counties.',
  alternates: { canonical: '/' },
};

const SERVICES = [
  {
    t: 'Real Estate & Land Brokers',
    k: 'land-brokers',
    d: 'Agents who specialize in buying and selling farms, ranches, orchards, and raw acreage.',
    paths: ['M3 21h18', 'M5 21V9l7-5 7 5v12', 'M9 21v-6h6v6'],
  },
  {
    t: 'Crop & Farm Insurance',
    k: 'crop-insurance',
    d: 'Agents fluent in crop, livestock, equipment, and liability coverage built for agriculture.',
    paths: ['M12 3 5 6v5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z', 'm9.5 12 1.8 1.8L15 10'],
  },
  {
    t: 'Title & Escrow',
    k: 'title-escrow',
    d: 'Companies experienced with land, easements, mineral & water rights, and ag closings.',
    paths: ['M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z', 'M14 3v5h5', 'm9 14 2 2 4-4'],
  },
  {
    t: 'Agricultural Appraisers',
    k: 'appraisers',
    d: 'Certified appraisers who value farmland, improvements, water, and standing crops.',
    paths: ['M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M9 7h6M9 11h6M9 15h3'],
  },
  {
    t: 'Water Rights & Ag Attorneys',
    k: 'water-ag-attorneys',
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
    t: 'Compare local pros',
    d: 'See who works in your county, what they specialize in, and how to check their license.',
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

export default async function Home() {
  const PROS = await getPros();
  // One listing per specialty: featured, then verified, then has a phone.
  const score = (p) => (isFeatured(p) ? 8 : 0) + (isVerified(p) ? 4 : 0) + (p.claimed ? 2 : 0) + (p.phone ? 1 : 0);
  const FEATURED = Object.keys(SPECIALTIES).map((k) => PROS.filter((p) => p.specialty === k).sort((a, b) => score(b) - score(a))[0]).filter(Boolean);
  return (
    <SiteShell>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>The right specialist for every acre you own.</h1>
              <p className="lead">
                From your first land purchase to refinancing, insuring, or settling water rights, find vetted
                California professionals who understand farms, ranches, and rural property. One trusted directory.
              </p>

              <form className="search-card" action="/directory/professionals" method="get">
                <div className="search-row">
                  <label className="search-field">
                    <svg className="sf-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="sf-body"><span className="sf-label">County</span>
                      <select className="sf-select" name="county" defaultValue="">
                        <option value="">All counties</option>
                        {COUNTIES.map((c) => <option key={c} value={c}>{c} County</option>)}
                      </select>
                    </span>
                    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                  </label>
                  <label className="search-field">
                    <svg className="sf-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 7h18M3 12h18M3 17h12" /></svg>
                    <span className="sf-body"><span className="sf-label">Service needed</span>
                      <select className="sf-select" name="specialty" defaultValue="">
                        <option value="">All services</option>
                        {Object.entries(DIR_SPECIALTIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                    </span>
                    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                  </label>
                  <button className="search-btn" type="submit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                    Search
                  </button>
                </div>
              </form>

              <div className="popular">
                <span className="pl">Popular:</span>
                <Link href="/professionals?specialty=land-brokers&county=Fresno">Land brokers in Fresno</Link>
                <Link href="/professionals?specialty=crop-insurance&county=Tulare">Crop insurance in Tulare</Link>
                <Link href="/professionals?specialty=appraisers">Ag appraisers</Link>
              </div>
            </div>

            <div className="hero-visual">
              <img
                className="hero-img"
                src={asset('hero-farm.webp')}
                alt="Illustration of a ranch home beside an almond orchard in the Central Valley"
                fetchPriority="high"
                decoding="async"
              />
              <div className="hero-float">
                <span className="avatar hf-av" style={{ background: 'linear-gradient(135deg,#2e4a37,#5a7a4f)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ecdfb8" strokeWidth="2" style={{ width: 22, height: 22 }}><path d="M12 2 4 5v6c0 5 3.3 8.6 8 10 4.7-1.4 8-5 8-10V5l-8-3Z" /><path d="m9 11 2 2 4-4" /></svg>
                </span>
                <span>
                  <span className="nm">Local specialists</span>
                  <span className="rl">License info on every listing</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="wrap">
          <span className="ts-label">Now serving</span>
          <nav className="ts-counties" aria-label="Browse by county">
            {COUNTIES.map((c) => <Link key={c} href={`/professionals?county=${c}`}>{c} County</Link>)}
          </nav>
          <Link className="ts-more" href="/get-matched">Somewhere else? Tell us where →</Link>
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
              <Link className="svc-card" href={`/professionals?specialty=${s.k}`} key={s.t}>
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
              <p className="eyebrow">In the directory</p>
              <h2 className="h-sec">Agricultural professionals in the San Joaquin Valley</h2>
            </div>
            <Link className="btn btn-ghost" href="/professionals">View all professionals →</Link>
          </div>
          <div className="pros-grid">{FEATURED.map((p) => <ProCard key={p.slug} p={p} />)}</div>
        </div>
      </section>
    </SiteShell>
  );
}
