import { getPros } from '../lib/directory';
import { getArticles } from '../lib/articles';

export const dynamic = 'force-dynamic';

const BASE = 'https://www.agrifarmcapital.com/directory';

const ROUTES = [
  ['', 1.0, 'weekly'],
  ['/professionals', 0.9, 'daily'],
  ['/get-matched', 0.9, 'monthly'],
  ['/get-listed', 0.8, 'monthly'],
  ['/articles', 0.8, 'weekly'],
  ['/articles/pricing-farmland-scarce-comps', 0.6, 'yearly'],
  ['/spotlight', 0.6, 'weekly'],
  ['/about', 0.5, 'yearly'],
  ['/contact', 0.5, 'yearly'],
  ['/spotlight-questionnaire', 0.3, 'yearly'],
  ['/terms', 0.2, 'yearly'],
  ['/privacy', 0.2, 'yearly'],
  ['/disclaimer', 0.2, 'yearly'],
];

export default async function sitemap() {
  const now = new Date();
  const pros = (await getPros()).map((p) => [`/professionals/${p.slug}`, 0.6, 'weekly']);
  const arts = (await getArticles()).map((a) => [`/articles/${a.slug}`, 0.7, 'monthly']);
  return [...ROUTES, ...pros, ...arts].map(([path, priority, changeFrequency]) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
