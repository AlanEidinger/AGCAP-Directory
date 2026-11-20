import { redirect } from 'next/navigation';
import { isAdmin } from '../../../lib/auth';
import { hasDb, ensureSchema, sql } from '../../../lib/db';
import AdminNav from '../../../components/admin/AdminNav';
import { logout } from '../actions';
import '../../styles/admin.css';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }) {
  if (!isAdmin()) redirect('/admin/login');
  let pending = 0, dbError = '';
  if (hasDb()) {
    try {
      await ensureSchema();
      const [r] = await sql`SELECT count(*)::int AS n FROM dir_listings WHERE status='pending' OR claim_at IS NOT NULL`;
      pending = r.n;
    } catch (e) { dbError = e.message; }
  }
  return (
    <div className="app">
      <aside className="app-side">
        <a className="side-brand" href="/directory/admin">
          <img src="/directory/agrifarm-emblem-reversed.png" alt="" />
          <span className="sb-lock"><span className="sb-eyebrow">Admin</span><span className="sb-word">Directory</span></span>
        </a>
        <AdminNav pending={pending} />
        <div className="side-foot">
          <a className="side-link" href="/directory" target="_blank" rel="noopener">View public site ↗</a>
          <form action={logout}><button className="side-link adm-logout" type="submit">Sign out</button></form>
        </div>
      </aside>
      <div className="app-main">
        {!hasDb() && <div className="adm-alert">The database isn't connected. Add <b>DATABASE_URL</b> to this service's Railway variables. Until then you can look around, but nothing can be saved.</div>}
        {dbError && <div className="adm-alert">Database error: {dbError}</div>}
        {children}
      </div>
    </div>
  );
}
