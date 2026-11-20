'use client';
import { useState } from 'react';

// Draws a 1200×1500 share card in the browser and downloads it as a PNG.
// The photo must be served from the same site, or the canvas can't export it.
export default function DownloadCard({ photo, name, role, place, counties, month, file = 'agrifarm-spotlight.png', sample = false, className, children }) {
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  async function go() {
    setBusy(true);
    setMsg('Preparing your card…');
    try {
      await document.fonts.ready;
      const img = new Image();
      img.src = photo;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = 1200; c.height = 1500;
      const x = c.getContext('2d');
      x.fillStyle = '#f8f7f0'; x.fillRect(0, 0, 1200, 1500);
      const sw = Math.min(img.naturalWidth, img.naturalHeight * 1.2), sh = sw / 1.2;
      x.drawImage(img, (img.naturalWidth - sw) / 2, Math.max(0, (img.naturalHeight - sh) * 0.3), sw, sh, 0, 0, 1200, 1000);
      x.fillStyle = '#193e2d'; x.fillRect(0, 920, 1200, 580);
      x.fillStyle = '#c7d8a5'; x.font = '600 22px Inter, Arial'; x.fillText(`AGRIFARM SPOTLIGHT  /  ${month.toUpperCase()}`, 70, 990);
      x.fillStyle = '#fffdf3'; x.font = '500 110px "Cormorant Garamond", Georgia'; x.fillText(name, 66, 1120);
      x.fillStyle = '#d6e0cb'; x.font = '400 30px Inter, Arial'; x.fillText(role, 70, 1182);
      x.font = '400 26px Inter, Arial'; x.fillText(place, 70, 1228);
      x.strokeStyle = '#8b9c71'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(70, 1285); x.lineTo(1130, 1285); x.stroke();
      x.fillStyle = '#fffdf3'; x.font = '400 28px Inter, Arial'; x.fillText(`Serving ${counties}`, 70, 1345);
      x.fillStyle = '#c7d8a5'; x.font = '500 26px Inter, Arial'; x.fillText('agrifarmcapital.com/directory', 70, 1395);
      if (sample) { x.fillStyle = '#b9c7ac'; x.font = '400 20px Inter, Arial'; x.fillText('SAMPLE  ·  Fictional specialist  ·  AI-generated portrait', 70, 1455); }
      const blob = await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('export'))), 'image/png'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = file; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      setMsg('Card downloaded.');
    } catch {
      setMsg("The card couldn't be created. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={go} disabled={busy}>{children}</button>
      <span className="sp-share-status" role="status" aria-live="polite">{msg}</span>
    </>
  );
}
