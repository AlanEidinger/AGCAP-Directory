// Rebuild lib/professionals.json from the candidate CSVs.
// Run from nextjs-app/:  node scripts/build-pros.mjs ../import
// Only public business fields are copied. Rows with listing_status "removed" are skipped.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] || '../import';
const files = readdirSync(dir).filter((f) => f.startsWith('candidates-') && f.endsWith('.csv'));

function parse(t) {
  const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"' && t[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
    else if (c !== '\r') cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

const out = new Map();
for (const f of files) {
  const rows = parse(readFileSync(join(dir, f), 'utf8'));
  const H = rows.shift();
  for (const r of rows) {
    if (r.length < 5) continue;
    const o = Object.fromEntries(H.map((h, i) => [h, (r[i] || '').trim()]));
    if (!o.slug || o.listing_status === 'removed') continue;
    const counties = o.counties_served.split(';').map((s) => s.trim()).filter(Boolean);
    if (out.has(o.slug)) { const e = out.get(o.slug); e.counties = [...new Set([...e.counties, ...counties])]; continue; }
    const firm = o.full_name.startsWith('[');
    let web = o.website; if (web && !/^https?:/.test(web)) web = 'https://' + web;
    out.set(o.slug, {
      slug: o.slug, name: firm ? o.company : o.full_name, company: firm ? '' : o.company, isFirm: firm,
      specialty: o.specialty, title: o.title,
      licenseType: o.license_type, licenseNumber: o.license_number, licenseStatus: o.license_status || 'unverified',
      licenseCheckedOn: o.license_verified_date, licenseUrl: o.license_source_url,
      region: o.primary_region, counties, city: o.city, phone: o.phone, website: web, office: o.office_location,
      claimed: o.consent_received === 'TRUE',
    });
  }
}
const list = [...out.values()].sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(new URL('../lib/professionals.json', import.meta.url), JSON.stringify(list, null, 1));
console.log(`Wrote ${list.length} listings from ${files.length} files.`);
