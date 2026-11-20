'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const I = {
  home: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z',
  doc: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h4',
};

export default function AdminNav({ pending = 0 }) {
  const path = usePathname();
  const items = [
    ['/admin', 'Overview', I.home, (p) => p === '/admin'],
    ['/admin/listings?status=pending', 'Needs review', I.inbox, () => false, pending],
    ['/admin/listings', 'Listings', I.list, (p) => p.startsWith('/admin/listings')],
    ['/admin/articles', 'Articles', I.doc, (p) => p.startsWith('/admin/articles')],
  ];
  return (
    <nav className="side-nav">
      {items.map(([href, label, d, active, n]) => (
        <Link key={href} href={href} className={`side-link${active(path) ? ' active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={d} /></svg>{label}
          {n ? <span className="badge-n">{n}</span> : null}
        </Link>
      ))}
    </nav>
  );
}
