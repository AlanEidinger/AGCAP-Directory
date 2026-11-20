import SiteShell from '../../components/SiteShell';
import ProCard from '../../components/ProCard';
import { getPros, SPECIALTIES, COUNTIES, filterPros, countBy } from '../../lib/directory';

export const dynamic = 'force-dynamic';

export function generateMetadata({ searchParams }) {
  const s = SPECIALTIES[searchParams?.specialty]?.label;
  const c = COUNTIES.includes(searchParams?.county) ? `${searchParams.county} County` : '';
  const what = s || 'Agricultural Professionals';
  return {
    title: c ? `${what} in ${c}, CA` : `Find ${what}`,
    description: `Browse California ${what.toLowerCase()}${c ? ` serving ${c}` : ''}: land brokers, crop insurance, appraisers, title & escrow, and water rights attorneys.`,
    alternates: { canonical: '/professionals' },
  };
}

const Check = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>);

function href(q) {
  const s = new URLSearchParams(Object.entries(q).filter(([, v]) => v)).toString();
  return `/directory/professionals${s ? `?${s}` : ''}`;
}

export default async function Page({ searchParams }) {
  const PROS = await getPros();
  const specialty = SPECIALTIES[searchParams?.specialty] ? searchParams.specialty : '';
  const county = COUNTIES.includes(searchParams?.county) ? searchParams.county : '';
  const list = filterPros(PROS, { specialty, county });
  const inCounty = county ? PROS.filter((p) => p.counties.includes(county)) : PROS;
  const inSpec = specialty ? PROS.filter((p) => p.specialty === specialty) : PROS;
  const heading = `${SPECIALTIES[specialty]?.label || 'Agricultural professionals'}${county ? ` in ${county} County` : ''}`;

  return (
    <SiteShell>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/directory">Home</a><span className="sep">/</span><span>Professionals</span></div>
          <h1>{heading}</h1>
          <p className="lead">Land brokers, crop insurance agents, appraisers, title and escrow officers, and water attorneys working in California's San Joaquin Valley.</p>
        </div>
      </section>

      <section className="listing">
        <div className="wrap">
          <div className="listing-layout">
            <aside className="filter-sidebar">
              <div className="filter-card">
                <div className="filter-group">
                  <h4>Service type</h4>
                  <a className="fopt fopt-link" href={href({ county })}><span className={`fbox${!specialty ? ' on' : ''}`}><Check /></span>All services<span className="fcount">{inCounty.length}</span></a>
                  {Object.entries(SPECIALTIES).map(([k, v]) => (
                    <a key={k} className="fopt fopt-link" href={href({ specialty: k, county })}><span className={`fbox${specialty === k ? ' on' : ''}`}><Check /></span>{v.label}<span className="fcount">{countBy('specialty', k, inCounty)}</span></a>
                  ))}
                </div>
                <div className="filter-group">
                  <h4>County</h4>
                  <a className="fopt fopt-link" href={href({ specialty })}><span className={`fbox${!county ? ' on' : ''}`}><Check /></span>All counties<span className="fcount">{inSpec.length}</span></a>
                  {COUNTIES.map((c) => (
                    <a key={c} className="fopt fopt-link" href={href({ specialty, county: c })}><span className={`fbox${county === c ? ' on' : ''}`}><Check /></span>{c}<span className="fcount">{countBy('county', c, inSpec)}</span></a>
                  ))}
                </div>
                {(specialty || county) && <div className="filter-group"><a className="filter-clear" href="/directory/professionals">Clear all filters</a></div>}
              </div>
            </aside>

            <div className="listing-results">
              <div className="listing-toolbar">
                <span className="count">Showing <b>{list.length}</b> {list.length === 1 ? 'professional' : 'professionals'}</span>
              </div>
              {list.length
                ? <div className="pros-grid">{list.map((p) => <ProCard key={p.slug} p={p} />)}</div>
                : <div className="empty-results"><h3>No listings here yet</h3><p>We're adding professionals county by county. <a href="/directory/get-matched">Tell us what you need</a> and we'll find someone for you.</p></div>}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: '0' }}>
        <div className="wrap">
          <div className="cta-inner">
            <div>
              <p className="eyebrow">For agricultural professionals</p>
              <h2>Don't see your firm here yet?</h2>
              <p>List your business in the directory built for agriculture and get found by California landowners.</p>
            </div>
            <div className="cta-actions">
              <a className="btn btn-gold btn-lg" href="/directory/get-listed">List your business</a>
              <span className="note">Free to apply</span>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
