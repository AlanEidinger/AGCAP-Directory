// Server-side forward to a GHL Inbound Webhook (used by sign-up, which doesn't go through /api/lead).
const URLS = { pro: () => process.env.GHL_WEBHOOK_PRO };

export async function forwardToGhl(kind, payload) {
  const url = URLS[kind]?.();
  if (!url) return false;
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, submitted_at: new Date().toISOString() }) });
    if (!r.ok) throw new Error(`GHL ${r.status}`);
    return true;
  } catch (e) {
    console.error('[ghl]', e.message);
    return false;
  }
}
