import { hasDb, sql } from '../../../../lib/db';

export async function GET(req, { params }) {
  const id = Number(params.id);
  if (!hasDb() || !id) return new Response('Not found', { status: 404 });
  const [row] = await sql`SELECT mime, data_b64 FROM dir_media WHERE id = ${id}`;
  if (!row) return new Response('Not found', { status: 404 });
  return new Response(Buffer.from(row.data_b64, 'base64'), {
    headers: { 'Content-Type': row.mime, 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
