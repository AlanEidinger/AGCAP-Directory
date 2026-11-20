import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hasDb, ensureSchema, sql } from '../../../../../lib/db';
import { ARTICLE_CATEGORIES } from '../../../../../lib/articles';
import { saveArticle, deleteArticle } from '../../../actions';
import { ActionForm, ConfirmForm } from '../../../../../components/admin/AdminForms';
import MarkdownField from '../../../../../components/admin/MarkdownField';

const EMPTY = { id: '', slug: '', title: '', excerpt: '', category: ARTICLE_CATEGORIES[0], body: '', cover: '', cover_alt: '', author: 'Alan Eidinger', author_role: 'AgriFarm Capital', status: 'draft', featured: false, published_at: null };

const F = ({ label, hint, children, wide }) => (
  <div className={`field${wide ? ' adm-wide' : ''}`}><label>{label}{hint && <span className="hint"> · {hint}</span>}</label>{children}</div>
);

export default async function Page({ params, searchParams }) {
  const isNew = params.id === 'new';
  let a = EMPTY;
  if (!isNew) {
    if (!hasDb()) notFound();
    await ensureSchema();
    const [row] = await sql`SELECT * FROM dir_articles WHERE id = ${Number(params.id) || 0}`;
    if (!row) notFound();
    a = row;
  }
  const day = a.published_at ? new Date(a.published_at).toISOString().slice(0, 10) : '';

  return (
    <>
      <div className="app-top">
        <div className="at-title"><Link className="back-site" href="/admin/articles">← All articles</Link><h1>{isNew ? 'New article' : a.title}</h1></div>
        {!isNew && a.status === 'published' && <div className="at-actions"><a className="btn btn-ghost btn-sm" href={`/directory/articles/${a.slug}`} target="_blank" rel="noopener">View live ↗</a></div>}
      </div>
      <div className="app-body">
        {searchParams?.saved && <p className="adm-note">Saved.</p>}
        <ActionForm action={saveArticle} className="adm-form">
          <input type="hidden" name="id" value={a.id} />
          <div className="panel"><div className="panel-body adm-grid">
            <F label="Title" wide><input name="title" defaultValue={a.title} required /></F>
            <F label="Short summary" hint="shown on the Articles page and in Google results" wide><textarea name="excerpt" rows={2} defaultValue={a.excerpt} /></F>
            <F label="Category">
              <select name="category" defaultValue={a.category}>{ARTICLE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
            </F>
            <F label="Web address" hint="leave blank to build from the title"><input name="slug" defaultValue={a.slug} /></F>
            <F label="Author"><input name="author" defaultValue={a.author} /></F>
            <F label="Author's role"><input name="author_role" defaultValue={a.author_role} placeholder="e.g. Land broker, Fresno" /></F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Cover image</h2></div><div className="panel-body adm-grid">
            <F label="Image" wide>
              <div className="adm-photo wide">
                {a.cover ? <img src={a.cover} alt="" /> : <span className="adm-ph">No image</span>}
                <div>
                  <input type="hidden" name="cover_current" value={a.cover} />
                  <input type="file" name="cover_file" accept="image/jpeg,image/png,image/webp" />
                  <div className="adm-sub">Landscape, at least 1600px wide, under 3 MB.</div>
                  {a.cover && <label className="adm-check"><input type="checkbox" name="cover_remove" /> Remove image</label>}
                </div>
              </div>
            </F>
            <F label="Describe the image" hint="for Google and screen readers" wide><input name="cover_alt" defaultValue={a.cover_alt} placeholder="e.g. Almond orchard beside an irrigation canal" /></F>
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Article</h2></div><div className="panel-body">
            <MarkdownField name="body" defaultValue={a.body} />
          </div></div>

          <div className="panel"><div className="panel-head"><h2>Publishing</h2></div><div className="panel-body adm-grid">
            <F label="Status">
              <select name="status" defaultValue={a.status}><option value="draft">Draft: not shown</option><option value="published">Live: shown on the site</option></select>
            </F>
            <F label="Publish date" hint="a future date schedules it"><input type="date" name="published_at" defaultValue={day} /></F>
            <F label="Featured" wide><label className="adm-check"><input type="checkbox" name="featured" defaultChecked={a.featured} /> Show as the large featured article at the top of the Articles page</label></F>
          </div></div>
        </ActionForm>

        {!isNew && <div className="adm-dangerzone">
          <ConfirmForm action={deleteArticle} fields={{ id: a.id }} label="Delete article" confirm={`Delete "${a.title}"? This can't be undone. To take it down but keep it, set the status to Draft.`} className="btn btn-ghost btn-sm adm-danger" />
        </div>}
      </div>
    </>
  );
}
