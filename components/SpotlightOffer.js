'use client';
import { useEffect, useState } from 'react';
import { BENEFITS, BOOKING_URL } from '../lib/spotlight';

// Bottom bar that appears after the hero, plus a slide-in panel listing what a Spotlight includes.
export default function SpotlightOffer({ watch = 'sp-hero' }) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById(watch);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    const openIt = (ev) => { if (ev.target.closest('[data-open-offer]')) { ev.preventDefault(); setOpen(true); } };
    document.addEventListener('click', openIt);
    return () => { io.disconnect(); document.removeEventListener('click', openIt); };
  }, [watch]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div className={`sp-bar${show && !open ? ' on' : ''}`} aria-hidden={!show}>
        <div className="wrap">
          <span className="sp-bar-t"><b>Want a Spotlight like this?</b> It's free and takes one 20-minute call.</span>
          <span className="sp-bar-a">
            <button type="button" className="sp-bar-more" onClick={() => setOpen(true)}>What you get</button>
            <a className="sp-bar-go" href={BOOKING_URL}>Book a call</a>
          </span>
        </div>
      </div>

      <div className={`sp-drawer${open ? ' on' : ''}`} role="dialog" aria-modal="true" aria-label="What a Spotlight includes" aria-hidden={!open}>
        <div className="sp-drawer-bg" onClick={() => setOpen(false)}></div>
        <div className="sp-drawer-panel">
          <button type="button" className="sp-drawer-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
          <span className="sp-kicker">For agricultural professionals</span>
          <h2>What a free Spotlight gets you</h2>
          <ol className="sp-drawer-list">
            {BENEFITS.map((b) => <li key={b.t}><b>{b.t}</b><p>{b.d}</p></li>)}
          </ol>
          <a className="sp-drawer-go" href={BOOKING_URL}>Book my 20-minute call</a>
          <p className="sp-drawer-fine">No cost. You approve the feature before it's published.</p>
        </div>
      </div>
    </>
  );
}
