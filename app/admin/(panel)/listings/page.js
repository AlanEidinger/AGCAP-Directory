import Link from 'next/link';
import { hasDb, ensureSchema, sql } from '../../../../lib/db';
import { SPECIALTIES, COUNTIES, BADGES } from '../../../../lib/directory';
import { setListingStatus } from '../../actions';

const STATUS = { published: 'Live', pending: 'Needs review', hidden: 'Hidden', removed: 'Removed' };
const PILL = { published: 'status-live', pending: 'status-pending', hidden: 'status-draft', removed: 'status-suspended' };

export default async function Page({ searchParams }) {
  const q = String(searchParams?.q || '').trim().toLowerCase();
  const status = STATUS[searchParams?.status] ? searchParams.status : '';
  const specialty = SPECIALTIES[searchParams?.specialty] ? searchParams.specialty : '';
  const county = COUNTIES.includes(searchParams?.county) ? searchParams.county : '';
  let rows = [];
  if (hasDb()) {
    await ensureSchema();
    rows = await sql`SELECT id, slug, name, company, specialty, counties, city, phone, status, claimed, badges, claim_at, updated_at FROM dir_listings ORDER BY name`;
  }
  const list = rows.filter((r) =>
    (!status || r.status === status || (status === 'pending' && r.claim_at)) &&
    (!specialty || r.specialty === specialty) &&
    (!county || (r.counties || []).includes(county)) &&
    (!q || `${r.name} ${r.company} ${r.city}`.toLowerCase().includes(q)));
  const back = `/admin/listings?${new URLSearchParams(Object.entries({ q, status, specialty, county }).filter(([, v]) => v))}`;

  return (
    <>
      <div className="app-top">
        <div className="at-title"><h1>Listings</h1><div className="at-sub">{list.length} of {rows.length} shown</div></div>
        <div className="at-actions"><Link className="btn btn-gold btn-sm" href="/admin/listings/new">Add a listing</Link></div>
      </div>
      <div className="app-body">
        {searchParams?.deleted && <p className="adm-note">Listing deleted.</p>}
        <form className="adm-filters" method="get" action="/directory/admin/listings">
          <input type="search" name="q" defaultValue={q} placeholder="Search name, company, city" />
          <select name="status" defaultValue={status}><option value="">Any status</option>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          <select name="specialty" defaultValue={specialty}><option value="">Any specialty</option>{Object.entries(SPECIALTIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
          <select name="county" defaultValue={county}><option value="">Any county</option>{COUNTIES.map((c) => <option key={c}>{c}</option>)}</select>
          <button className="btn btn-ghost btn-sm" type="submit">Filter</button>
          {(q || status || specialty || county) && <Link className="adm-clear" href="/admin/listings">Clear</Link>}
        </form>

        <div className="panel"><div className="panel-body flush"><div className="tbl-wrap">
          <table className="data">
            <thead><tr><th>Name</th><th>Specialty</th><th>Counties</th><th>Status</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link href={`/admin/listings/${r.id}`} className="adm-name">{r.name}</Link>
                    <div className="adm-sub">{r.company || r.city}</div>
                    {(r.badges?.length > 0 || r.claimed) && <div className="adm-tags">{r.claimed && <span>Claimed</span>}{(r.badges || []).map((b) => <span key={b}>{BADGES[b]?.label || b}</span>)}</div>}
                  </td>
                  <td>{SPECIALTIES[r.specialty]?.label || r.specialty}</td>
                  <td className="adm-sub">{(r.counties || []).join(', ')}</td>
                  <td><span className={`status ${PILL[r.status] || 'status-draft'}`}>{STATUS[r.status] || r.status}</span>{r.claim_at && <div className="adm-sub" style={{ marginTop: '4px' }}>Claim request</div>}</td>
                  <td>
                    <div className="row-actions">
                      <Link className="btn btn-ghost btn-sm" href={`/admin/listings/${r.id}`}>Edit</Link>
                      {r.status !== 'published'
                        ? <form action={setListingStatus}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="status" value="published" /><input type="hidden" name="back" value={back} /><button className="btn btn-gold btn-sm" type="submit">{r.status === 'pending' ? 'Approve' : 'Restore'}</button></form>
                        : <form action={setListingStatus}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="status" value="removed" /><input type="hidden" name="back" value={back} /><button className="btn btn-ghost btn-sm adm-danger" type="submit">Remove</button></form>}
                    </div>
                  </td>
                </tr>
              ))}
              {!list.length && <tr><td colSpan={5} className="adm-empty">No listings match.</td></tr>}
            </tbody>
          </table>
        </div></div></div>
      </div>
    </>
  );
}
