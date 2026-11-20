'use client';
import { BP } from './config';

const UTM = ['utm_source', 'utm_medium', 'utm_campaign'];

// Remember UTM tags from the landing URL for the rest of the visit.
export function captureUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    UTM.forEach((k) => { const v = p.get(k); if (v) sessionStorage.setItem(k, v); });
  } catch {}
}

export async function submitLead(formType, fields) {
  captureUtm();
  const body = { ...fields, form_type: formType, source_site: window.location.hostname, page_url: window.location.href };
  UTM.forEach((k) => { try { const v = sessionStorage.getItem(k); if (v) body[k] = v; } catch {} });
  const r = await fetch(`${BP}/api/lead`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    throw new Error(j.error || 'Something went wrong. Please try again.');
  }
  return true;
}

// FormData -> plain object; repeated names (checkbox groups) joined with "; ".
export function formToObject(form) {
  const out = {};
  for (const [k, v] of new FormData(form).entries()) {
    if (typeof v !== 'string' || !v.trim()) continue;
    out[k] = out[k] ? `${out[k]}; ${v}` : v;
  }
  return out;
}
