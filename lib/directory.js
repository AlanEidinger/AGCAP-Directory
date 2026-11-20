import SEED from './professionals.json';
import { hasDb, ensureSchema, sql, toPro, normModules } from './db';

export const SPECIALTIES = {
  'land-brokers': { label: 'Land & Real Estate Brokers', one: 'Agricultural land broker' },
  'rural-realtors': { label: 'Agricultural & USDA Realtors', one: 'Rural & agricultural realtor' },
  'crop-insurance': { label: 'Crop & Farm Insurance', one: 'Crop & farm insurance' },
  'appraisers': { label: 'Agricultural Appraisers', one: 'Agricultural appraiser' },
  'title-escrow': { label: 'Title & Escrow', one: 'Title & escrow' },
  'water-ag-attorneys': { label: 'Water Rights & Ag Attorneys', one: 'Water rights & agricultural law' },
};

export const COUNTIES = ['Fresno', 'Tulare', 'Kings', 'Madera', 'Kern'];

// Badges Alan can switch on per listing. "verified" also shows the Verified pill.
export const BADGES = {
  verified: { label: 'Verified', hint: 'Business confirmed its listing and license was checked' },
  license: { label: 'License checked', hint: 'License looked up on the state site' },
  featured: { label: 'Featured', hint: 'Shown first in results and on the homepage' },
  spotlight: { label: 'Spotlight', hint: 'Has been an AgriFarm Spotlight' },
  founding: { label: 'Founding member', hint: 'One of the first pros to join' },
  accredited: { label: 'Accredited', hint: 'Holds an ARA, AFM, or ALC designation' },
};

export const LICENSES = {
  DRE: { label: 'California Department of Real Estate', lookup: 'https://www2.dre.ca.gov/PublicASP/pplinfo.asp' },
  CDI: { label: 'California Department of Insurance', lookup: 'https://interactive.web.insurance.ca.gov/webuser/licw_name_search$.startup' },
  BREA: { label: 'Bureau of Real Estate Appraisers', lookup: 'https://www2.brea.ca.gov/breasearch/' },
  'State Bar': { label: 'State Bar of California', lookup: 'https://apps.calbar.ca.gov/attorney/LicenseeSearch/QuickSearch' },
  'DFPI / CDI': { label: 'California DFPI (escrow) / Department of Insurance (title)', lookup: 'https://docqnet.dfpi.ca.gov/licensesearch/' },
};

const FALLBACK = SEED.map((p) => ({ ...p, bio: '', photo: '', badges: [], status: 'published', modules: normModules({}) }));

// Published listings. Falls back to the bundled file if the database is
// not configured or unreachable, so the public site never goes blank.
export async function getPros() {
  if (!hasDb()) return FALLBACK;
  try {
    await ensureSchema();
    const rows = await sql`SELECT * FROM dir_listings WHERE status = 'published' ORDER BY name`;
    return rows.map(toPro);
  } catch (e) {
    console.error('[directory] DB read failed, using bundled listings:', e.message);
    return FALLBACK;
  }
}

export async function getPro(slug) {
  if (!slug) return null;
  return (await getPros()).find((p) => p.slug === slug) || null;
}

export const isVerified = (p) => p.claimed && (p.badges || []).includes('verified');
export const isFeatured = (p) => (p.badges || []).includes('featured');

export const roleOf = (p) => p.title || SPECIALTIES[p.specialty]?.one || '';

export const initials = (name) =>
  String(name).replace(/[^A-Za-z\s&]/g, ' ').split(/\s+/).filter((w) => w && w !== '&' && !/^(inc|llp|llc|pc|co|the|of|and)$/i.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

export function summary(p) {
  const what = SPECIALTIES[p.specialty]?.one || 'Agricultural professional';
  const where = p.counties.length ? `${p.counties.join(', ').replace(/, ([^,]*)$/, ' and $1')} ${p.counties.length > 1 ? 'counties' : 'County'}` : 'California';
  return `${what} serving ${where}.`;
}

// Featured, then verified/claimed, then alphabetical.
const rank = (p) => (isFeatured(p) ? 4 : 0) + (isVerified(p) ? 2 : 0) + (p.claimed ? 1 : 0);
export function filterPros(all, { specialty, county } = {}) {
  return all.filter((p) => (!specialty || p.specialty === specialty) && (!county || p.counties.includes(county)))
    .sort((a, b) => (rank(b) - rank(a)) || a.name.localeCompare(b.name));
}

export const countBy = (key, val, base) =>
  base.filter((p) => (key === 'county' ? p.counties.includes(val) : p[key] === val)).length;
