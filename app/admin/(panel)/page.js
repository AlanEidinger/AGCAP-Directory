import Link from 'next/link';
import { hasDb, ensureSchema, sql } from '../../../lib/db';
import { SPECIALTIES } from '../../../lib/directory';

export default async function Page() {
  let counts = { published: 0, pending: 0, hidden: 0, removed: 0 }, claims = [], pending = [], articles = { published: 0, draft: 0 }, recent = [];
  if (hasDb()) {
    await ensureSchema();
    for (const r of await sql`SELECT status, count(*)::int AS n FROM dir_listings GROUP BY status`) counts[r.status] = r.n;
    claims = await sql`SELECT id, name, company, claim_name, claim_email, claim_phone, claim_at FROM dir_listings WHERE claim_at IS NOT NULL ORDER BY claim_at DESC LIMIT 20`;
    pending = await sql`SELECT id, name, company, specialty, counties, created_at FROM dir_listings WHERE status='pending' ORDER BY created_at DESC LIMIT 20`;
    for (const r of await sql`SELECT status, count(*)::int AS n FROM dir_articles GROUP BY status`) articles[r.status] = r.n;
    recent = await sql`SELECT id, name, updated_at FROM dir_listings ORDER BY updated_at DESC LIMIT 6`;
  }
  const when = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <>
      <div className="app-top">
        <div className="at-title"><h1>Overview</h1><div className="at-sub">What needs your attention today.</div></div>
        <div className="at-actions">
          <Link className="btn btn-ghost btn-sm" href="/admin/listings/new">Add a listing</Link>
          <Link className="btn btn-gold btn-sm" href="/admin/articles/new">Write an article</Link>
        </div>
      </div>
      <div className="app-body">
        <div className="kpi-grid">
          <Link className="kpi-card" href="/admin/listings?status=published"><div className="kpi-label">Live listings</div><div className="kpi-num">{counts.published}</div></Link>
          <Link className="kpi-card" href="/admin/listings?status=pending"><div className="kpi-label">Needs review</div><div className="kpi-num">{counts.pending + claims.length}</div></Link>
          <Link className="kpi-card" href="/admin/listings?status=hidden"><div className="kpi-label">Hidden or removed</div><div className="kpi-num">{counts.hidden + counts.removed}</div></Link>
          <Link className="kpi-card" href="/admin/articles"><div className="kpi-label">Articles live</div><div className="kpi-num">{articles.published}</div><span className="kpi-trend flat">{articles.draft} in draft</span></Link>
        </div>

        <div className="panel">
          <div className="panel-head"><h2>Claim requests</h2><span className="ph-sub">Pros who asked to take over an existing listing</span></div>
          <div className="panel-body flush">
            {claims.length ? <table className="data"><tbody>
              {claims.map((c) => <tr key={c.id}>
                <td><b>{c.name}</b><div className="adm-sub">{c.company}</div></td>
                <td>{c.claim_name}<div className="adm-sub">{c.claim_email}{c.claim_phone ? ` · ${c.claim_phone}` : ''}</div></td>
                <td className="adm-sub">{when(c.claim_at)}</td>
                <td style={{ textAlign: 'right' }}><Link className="btn btn-gold btn-sm" href={`/admin/listings/${c.id}`}>Review</Link></td>
              </tr>)}
            </tbody></table> : <p className="adm-empty">No claim requests right now.</p>}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><h2>New applications</h2><span className="ph-sub">Submitted through Get Listed</span></div>
          <div className="panel-body flush">
            {pending.length ? <table className="data"><tbody>
              {pending.map((p) => <tr key={p.id}>
                <td><b>{p.name}</b><div className="adm-sub">{p.company}</div></td>
                <td>{SPECIALTIES[p.specialty]?.label || p.specialty}<div className="adm-sub">{(p.counties || []).join(', ')}</div></td>
                <td className="adm-sub">{when(p.created_at)}</td>
                <td style={{ textAlign: 'right' }}><Link className="btn btn-gold btn-sm" href={`/admin/listings/${p.id}`}>Review</Link></td>
              </tr>)}
            </tbody></table> : <p className="adm-empty">No new applications.</p>}
          </div>
        </div>

        {recent.length > 0 && <div className="panel">
          <div className="panel-head"><h2>Recently edited</h2></div>
          <div className="panel-body flush"><table className="data"><tbody>
            {recent.map((r) => <tr key={r.id}><td><Link href={`/admin/listings/${r.id}`}><b>{r.name}</b></Link></td><td className="adm-sub" style={{ textAlign: 'right' }}>{when(r.updated_at)}</td></tr>)}
          </tbody></table></div>
        </div>}
      </div>
    </>
  );
}
