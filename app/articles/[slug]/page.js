import { notFound } from 'next/navigation';
import SiteShell from '../../../components/SiteShell';
import { getArticle, getArticles, fmtDate } from '../../../lib/articles';
import { renderMarkdown, readMinutes } from '../../../lib/markdown';
import { initials } from '../../../lib/directory';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const a = await getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt || undefined,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: { type: 'article', title: a.title, description: a.excerpt || undefined, ...(a.cover && { images: [`https://www.agrifarmcapital.com${a.cover}`] }) },
  };
}

export default async function Page({ params }) {
  const a = await getArticle(params.slug);
  if (!a) notFound();
  const more = (await getArticles()).filter((x) => x.slug !== a.slug).slice(0, 3);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt || undefined,
    ...(a.publishedAt && { datePublished: new Date(a.publishedAt).toISOString() }),
    ...(a.author && { author: { '@type': 'Person', name: a.author } }),
    ...(a.cover && { image: `https://www.agrifarmcapital.com${a.cover}` }),
    publisher: { '@type': 'Organization', name: 'AgriFarm Capital' },
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="art-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/directory">Home</a><span className="sep">/</span><a href="/directory/articles">Articles</a><span className="sep">/</span><span>{a.title}</span></div>
          {a.category && <span className="tag-chip">{a.category}</span>}
          <h1>{a.title}</h1>
          {a.excerpt && <p className="art-lede">{a.excerpt}</p>}
          <div className="art-byline">
            {a.author && <><span className="avatar">{initials(a.author)}</span><span><span className="ab-n">{a.author}</span>{a.authorRole && <span className="ab-r">{a.authorRole}</span>}</span></>}
            <span className="ab-meta">{a.publishedAt && <span>{fmtDate(a.publishedAt)}</span>}<span>{readMinutes(a.body)} min read</span></span>
          </div>
          {a.cover && <figure className="art-figure"><img src={a.cover} alt={a.coverAlt || ''} /></figure>}
        </div>
      </section>
      <section className="art-body">
        <div className="wrap">
          <div className="art-layout">
            <article className="art-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(a.body) }} />
            <aside className="art-aside">
              <div className="aside-cta">
                <h3>Need a specialist for this?</h3>
                <p>Tell us your county and what you need, and we'll introduce you to someone who works there.</p>
                <a className="btn btn-gold" href="/directory/get-matched" style={{ width: '100%' }}>Get matched, free →</a>
              </div>
              {more.length > 0 && <div className="aside-list">
                <h4>More articles</h4>
                <ol>{more.map((m) => <li key={m.id}><a href={`/directory/articles/${m.slug}`}>{m.title}</a></li>)}</ol>
              </div>}
            </aside>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
