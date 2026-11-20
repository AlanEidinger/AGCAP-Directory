'use client';
import { useEffect, useRef, useState } from 'react';

// Share button for public profiles. Uses the phone's share sheet on mobile,
// a small menu of platforms on desktop.
export default function ShareButton({ url, title, text, className = 'btn btn-ghost' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  const tag = (src) => `${url}${url.includes('?') ? '&' : '?'}utm_source=${src}&utm_medium=social&utm_campaign=profile_share`;
  const links = [
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tag('facebook'))}`],
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tag('linkedin'))}`],
    ['X', `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(tag('x'))}`],
    ['Email', `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${tag('email')}`)}`],
  ];

  async function onClick() {
    if (typeof navigator !== 'undefined' && navigator.share && window.matchMedia('(max-width: 860px)').matches) {
      try { await navigator.share({ title, text, url: tag('mobile_share') }); return; } catch { return; }
    }
    setOpen((o) => !o);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(tag('copy')); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  }

  return (
    <div className="share-wrap" ref={ref}>
      <button type="button" className={className} onClick={onClick} aria-expanded={open} aria-haspopup="menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>Share
      </button>
      {open && <div className="share-menu" role="menu">
        {links.map(([n, href]) => <a key={n} role="menuitem" href={href} target="_blank" rel="noopener">{n}</a>)}
        <button type="button" role="menuitem" onClick={copy}>{copied ? 'Link copied' : 'Copy link'}</button>
      </div>}
    </div>
  );
}
