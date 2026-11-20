import { hasDb, ensureSchema, sql } from './db';

export const ARTICLE_CATEGORIES = ['Buying & Selling', 'Water Rights', 'Insurance', 'Appraisal & Value', 'Legal & Tax', 'Spotlights', 'News'];

const toArticle = (r) => ({
  id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt, category: r.category, body: r.body,
  cover: r.cover, coverAlt: r.cover_alt, author: r.author, authorRole: r.author_role,
  status: r.status, featured: r.featured, publishedAt: r.published_at,
});

export async function getArticles() {
  if (!hasDb()) return [];
  try {
    await ensureSchema();
    const rows = await sql`SELECT * FROM dir_articles WHERE status = 'published' AND (published_at IS NULL OR published_at <= now())
      ORDER BY featured DESC, published_at DESC NULLS LAST, id DESC`;
    return rows.map(toArticle);
  } catch (e) {
    console.error('[articles] DB read failed:', e.message);
    return [];
  }
}

export async function getArticle(slug) {
  return (await getArticles()).find((a) => a.slug === slug) || null;
}

export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '');
