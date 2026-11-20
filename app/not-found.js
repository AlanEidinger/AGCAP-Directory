import Link from 'next/link';
import SiteShell from '../components/SiteShell';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteShell>
    <section className="nf-wrap">
      <div className="wrap">
        <div className="nf-inner">
          <div className="nf-code">Error 404</div>
          <h1>This field lies fallow.</h1>
          <p>The page you&rsquo;re looking for doesn&rsquo;t exist, or it may have moved. Let&rsquo;s get you back to solid ground.</p>
          <div className="nf-actions">
            <Link className="btn btn-gold btn-lg" href="/">Back to home</Link>
            <Link className="btn btn-ghost btn-lg" href="/professionals">Find a professional</Link>
          </div>
          <div className="nf-links">
            <div className="nl-label">Popular destinations</div>
            <div className="nl-row">
              <Link className="tag-chip" href="/professionals">All professionals</Link>
              <Link className="tag-chip" href="/get-matched">Get matched</Link>
              <Link className="tag-chip" href="/articles">Articles &amp; guides</Link>
              <Link className="tag-chip" href="/get-listed">List your business</Link>
              <Link className="tag-chip" href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </SiteShell>
  );
}
