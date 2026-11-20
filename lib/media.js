// Image uploads, stored in Postgres and served from /directory/api/media/<id>.
import { sql } from './db';
import { BP } from './config';

export async function saveUpload(file) {
  if (!file || typeof file === 'string' || !file.size) return '';
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) throw new Error('Images must be JPG, PNG, WebP or GIF.');
  if (file.size > 3 * 1024 * 1024) throw new Error('Each image must be under 3 MB.');
  const data = Buffer.from(await file.arrayBuffer()).toString('base64');
  const [row] = await sql`INSERT INTO dir_media (mime, name, data_b64) VALUES (${file.type}, ${file.name || ''}, ${data}) RETURNING id`;
  return `${BP}/api/media/${row.id}`;
}
