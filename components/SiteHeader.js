'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { asset } from '../lib/config';

const SPECIALTIES = [
  { t: 'Real Estate & Land Brokers', k: 'land-brokers', d: 'Buy & sell farmland', p: 'M3 21h18 M5 21V9l7-5 7 5v12 M9 21v-6h6v6' },
  { t: 'Crop & Farm Insurance', k: 'crop-insurance', d: 'Protect your operation', p: 'M12 3 5 6v5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z M9.5 12l1.8 1.8L15 10' },
  { t: 'Title & Escrow', k: 'title-escrow', d: 'Land & ag closings', p: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z M14 3v5h5 M9 14l2 2 4-4' },
  { t: 'Agricultural Appraisers', k: 'appraisers', d: 'Certified land valuation', p: 'M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z M9 7h6 M9 11h6 M9 15h3' },
  { t: 'Water Rights & Ag Attorneys', k: 'water-ag-attorneys', d: 'Legal & water counsel', p: 'M12 3v18 M7 7h10 M5 7 3 13a3 3 0 0 0 4 0L5 7Z M19 7l-2 6a3 3 0 0 0 4 0l-2-6Z M8 21h8' },
];

const REGIONS = [
  { r: 'San Joaquin Valley', c: ['Fresno', 'Bakersfield', 'Visalia'] },
  { r: 'Sacramento Valley', c: ['Sacramento', 'Chico', 'Yuba City'] },
  { r: 'Central Coast', c: ['Salinas', 'Paso Robles', 'Santa Maria'] },
  { r: 'Wine Country', c: ['Napa', 'Sonoma', 'Healdsburg'] },
  { r: 'Imperial Valley', c: ['El Centro', 'Brawley'] },
  { r: 'Sierra Foothills', c: ['Placerville', 'Auburn'] },
];

const CITY_COUNTY = {"Fresno":"Fresno","Bakersfield":"Kern","Visalia":"Tulare","Hanford":"Kings","Madera":"Madera"};

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const headerRef = useRef(null);
  const timer = useRef(null);

  const doOpen = () => {
    clearTimeout(timer.current);
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };
  const doClose = () => {
    setShown(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 220);
  };
  const deferClose = () => {
    timer.current = setTimeout(doClose, 140);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') doClose(); };
    const onClick = (e) => { if (headerRef.current && !headerRef.current.contains(e.target)) doClose(); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <div className="utility">
        <div className="wrap">
          <div className="utility-left">
            <span className="u-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>Serving all of California</span>
            <span className="u-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 3 7v6c0 5 3.8 8.5 9 9 5.2-.5 9-4 9-9V7l-9-5Z" /><path d="m9 12 2 2 4-4" /></svg>Every listing verified</span>
          </div>
          <div className="utility-right">
            <Link href="/articles">Articles &amp; Guides</Link>
            <span className="u-divider"></span>
            <Link href="/get-listed">List your business</Link>
            <span className="u-divider"></span>
            <Link href="/account/login">Pro sign in</Link>
          </div>
        </div>
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="wrap">
          <div className="header-row">
            <Link className="brand" href="/">
              <img className="brand-logo" src={asset('agrifarm-logo.png')} alt="AgriFarm Capital — Expert Directory" />
              <span className="brand-div"></span>
              <span className="brand-lockup"><span className="brand-eyebrow">Expert Network</span><span className="brand-word">Directory</span></span>
            </Link>
            <nav className="nav">
              <button
                className={`nav-item${open ? ' open' : ''}`}
                onMouseEnter={doOpen}
                onMouseLeave={deferClose}
                onClick={(e) => { e.preventDefault(); open ? doClose() : doOpen(); }}
                type="button"
              >
                Find Experts
                <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <Link className="nav-item" href="/#services">Services</Link>
              <Link className="nav-item" href="/#regions">Regions</Link>
              <Link className="nav-item" href="/articles">Articles</Link>
              <Link className="nav-item" href="/about">About</Link>
            </nav>
            <div className="header-cta">
              <Link className="btn btn-ghost" href="/get-listed">List your business</Link>
              <Link className="btn btn-gold" href="/get-matched"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>Get matched</Link>
            </div>
          </div>
        </div>

        <div
          className={`mega${open ? ' open' : ''}${shown ? ' shown' : ''}`}
          onMouseEnter={() => clearTimeout(timer.current)}
          onMouseLeave={deferClose}
        >
          <div className="mega-inner">
            <div>
              <p className="mega-col-label">By Specialty</p>
              <div className="mega-services">
                {SPECIALTIES.map((s) => (
                  <Link className="mega-service" href={s.k ? `/professionals?specialty=${s.k}` : '/professionals'} key={s.t}>
                    <span className="ms-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        {s.p.split(' M').map((d, i) => <path d={i === 0 ? d : `M${d}`} key={i} />)}
                      </svg>
                    </span>
                    <span className="ms-text"><strong>{s.t}</strong><span>{s.d}</span></span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mega-col-label">By Region &amp; City</p>
              <div className="mega-regions">
                {REGIONS.map((g) => (
                  <div className="region-block" key={g.r}>
                    <strong><PinIcon />{g.r}</strong>
                    <div className="cities">
                      {g.c.map((city) => (
                        <Link className="city-chip" href={CITY_COUNTY[city] ? `/professionals?county=${CITY_COUNTY[city]}` : '/professionals'} key={city}>{city}</Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mega-feature">
              <div className="mf-card-pro">
                <span className="avatar mf-avatar">MO</span>
                <span><span className="nm">Featured this week</span><span className="rl">Verified land broker · Fresno</span></span>
              </div>
              <span className="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>Verified expert</span>
              <div className="divider"></div>
              <h4>Are you an ag professional?</h4>
              <p>Get found by California landowners actively searching for your service.</p>
              <Link className="btn btn-gold" href="/get-listed" style={{ width: '100%' }}>List your business →</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
