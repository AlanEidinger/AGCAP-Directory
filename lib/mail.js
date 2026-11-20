// Optional email via Resend. If RESEND_API_KEY / MAIL_FROM aren't set,
// sendMail returns false and the admin copies the link by hand instead.
export const mailConfigured = () => !!(process.env.RESEND_API_KEY && process.env.MAIL_FROM);

export async function sendMail({ to, subject, text }) {
  if (!mailConfigured() || !to) return false;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.MAIL_FROM, to: [to], subject, text }),
    });
    if (!r.ok) throw new Error(`Resend ${r.status}`);
    return true;
  } catch (e) {
    console.error('[mail]', e.message);
    return false;
  }
}

// Alerts to Alan (new sign-ups, claims). Set ADMIN_NOTIFY_EMAIL in Railway.
export async function notifyAdmin(subject, text) {
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (!to) return false;
  return sendMail({ to, subject: `[Directory] ${subject}`, text });
}

export const SITE = process.env.PUBLIC_SITE_URL || 'https://www.agrifarmcapital.com/directory';
