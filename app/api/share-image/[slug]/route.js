import { ImageResponse } from 'next/og';
import { hasDb, sql } from '../../../../lib/db';
import { getPro, SPECIALTIES, initials, isVerified } from '../../../../lib/directory';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// 1200x630 share card for a professional's profile (Open Graph / X / download).
export async function GET(req, { params }) {
  const p = await getPro(params.slug);
  if (!p) return new Response('Not found', { status: 404 });

  let photo = '';
  const m = String(p.photo || '').match(/\/api\/media\/(\d+)/);
  if (m && hasDb()) {
    try {
      const [r] = await sql`SELECT mime, data_b64 FROM dir_media WHERE id = ${Number(m[1])}`;
      if (r && /image\/(png|jpe?g)/.test(r.mime)) photo = `data:${r.mime};base64,${r.data_b64}`;
    } catch {}
  }
  const role = p.title || SPECIALTIES[p.specialty]?.one || 'Agricultural professional';
  const where = p.counties.length ? `${p.counties.join(' · ')} ${p.counties.length > 1 ? 'counties' : 'County'}` : 'California';

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#1f3a2a', color: '#f3f1e8', padding: '64px 72px', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '56px', flex: 1 }}>
          {photo
            ? <img src={photo} width={260} height={260} style={{ borderRadius: '28px', objectFit: 'cover', border: '6px solid #68b550' }} />
            : <div style={{ width: 260, height: 260, borderRadius: '28px', background: '#2e4a37', border: '6px solid #68b550', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 104, fontWeight: 700, color: '#ecdfb8' }}>{initials(p.name)}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: 26, letterSpacing: '3px', textTransform: 'uppercase', color: '#9fd18a', fontWeight: 700 }}>{role}</div>
            <div style={{ fontSize: p.name.length > 22 ? 62 : 76, fontWeight: 700, lineHeight: 1.05, marginTop: '14px' }}>{p.name}</div>
            {p.company && <div style={{ fontSize: 32, color: '#d6dccb', marginTop: '14px' }}>{p.company}</div>}
            <div style={{ fontSize: 28, color: '#d6dccb', marginTop: '22px' }}>{where}</div>
            {isVerified(p) && <div style={{ display: 'flex', marginTop: '22px' }}><div style={{ fontSize: 24, fontWeight: 700, background: '#68b550', color: '#0d2a1e', padding: '8px 20px', borderRadius: '999px' }}>Verified</div></div>}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid rgba(255,255,255,.18)', paddingTop: '26px', fontSize: 26 }}>
          <div style={{ fontWeight: 700 }}>AgriFarm Directory</div>
          <div style={{ color: '#c4cfb7' }}>agrifarmcapital.com/directory</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=600' } },
  );
}
