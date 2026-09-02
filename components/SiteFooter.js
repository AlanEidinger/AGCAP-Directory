import Link from 'next/link';
import { asset } from '../lib/config';

const SERVICES = ['Land & Real Estate Brokers', 'Crop & Farm Insurance', 'Title & Escrow', 'Agricultural Appraisers', 'Water Rights & Attorneys'];
const REGIONS = ['San Joaquin Valley', 'Central Coast', 'Sacramento Valley', 'Wine Country', 'Imperial Valley'];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              <img className="brand-logo" src={asset('agrifarm-logo.png')} alt="AgriFarm Capital — Expert Directory" />
              <span className="brand-div"></span>
              <span className="brand-lockup"><span className="brand-eyebrow">Expert Network</span><span className="brand-word">Directory</span></span>
            </div>
            <p>California&rsquo;s directory of verified agricultural specialists, connecting landowners with the experts who know farms, ranches, and rural property.</p>
          </div>
          <div className="foot-col">
            <h4>Services</h4>
            <ul>{SERVICES.map((s) => <li key={s}><Link href="/professionals">{s}</Link></li>)}</ul>
          </div>
          <div className="foot-col">
            <h4>Regions</h4>
            <ul>{REGIONS.map((r) => <li key={r}><Link href="/professionals">{r}</Link></li>)}</ul>
          </div>
          <div className="foot-col">
            <h4>Directory</h4>
            <ul>
              <li><Link href="/professionals">Find an expert</Link></li>
              <li><Link href="/get-listed">List your business</Link></li>
              <li><Link href="/articles">Articles &amp; guides</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 AgriFarm Directory. A resource of AgriFarm Capital.</span>
          <span className="foot-legal">
            <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/disclaimer">Disclaimer</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
