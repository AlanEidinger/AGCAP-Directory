import Link from 'next/link';
import { hasDb, ensureSchema, sql } from '../../../../lib/db';

export default async function Page({ searchParams }) {
  let rows = [];
  if (hasDb()) {
    await ensureSchema();
    rows = await sql`SELECT id, slug, title, category, status, featured, published_at, updated_at FROM dir_articles ORDER BY coalesce(published_at, updated_at) DESC`;
  }
  const when = (d) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—');
  return (
    <>
      <div className="app-top">
        <div className="at-title"><h1>Articles</h1><div className="at-sub">Guides and posts on the Articles page</div></div>
        <div className="at-actions"><Link className="btn btn-gold btn-sm" href="/admin/articles/new">Write an article</Link></div>
      </div>
      <div className="app-body">
        {searchParams?.deleted && <p className="adm-note">Article deleted.</p>}
        <div className="panel"><div className="panel-body flush"><div className="tbl-wrap">
          <table className="data">
            <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Published</th><th></th></tr></thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id}>
                  <td><Link className="adm-name" href={`/admin/articles/${a.id}`}>{a.title}</Link>{a.featured && <div className="adm-tags"><span>Featured</span></div>}</td>
                  <td>{a.category}</td>
                  <td><span className={`status ${a.status === 'published' ? 'status-live' : 'status-draft'}`}>{a.status === 'published' ? 'Live' : 'Draft'}</span></td>
                  <td className="adm-sub">{when(a.published_at)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="row-actions">
                      <Link className="btn btn-ghost btn-sm" href={`/admin/articles/${a.id}`}>Edit</Link>
                      {a.status === 'published' && <a className="btn btn-ghost btn-sm" href={`/directory/articles/${a.slug}`} target="_blank" rel="noopener">View ↗</a>}
                    </div>
                  </td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan={5} className="adm-empty">No articles yet. <Link href="/admin/articles/new">Write the first one</Link>.</td></tr>}
            </tbody>
          </table>
        </div></div></div>
      </div>
    </>
  );
}
