import { SPECIALTIES, BADGES, isVerified, roleOf, initials, summary } from '../lib/directory';

const Pin = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>);

export default function ProCard({ p }) {
  const place = p.city || (p.counties[0] ? `${p.counties[0]} County` : '');
  return (
    <article className="pro-card">
      <div className="pro-top">
        <span className="avatar pro-av">{p.photo ? <img src={p.photo} alt="" loading="lazy" /> : initials(p.name)}</span>
        <div className="pro-id">
          <a className="nm" href={`/directory/professionals/${p.slug}`} style={{ color: 'inherit' }}>{p.name}</a>
          <div className="rl">{p.company || roleOf(p)}</div>
          {place && <div className="loc"><Pin />{place}</div>}
        </div>
      </div>
      <div className="pro-body"><p>{summary(p)}</p>{(p.badges || []).some((b) => b !== 'verified') && <div className="pro-badges">{p.badges.filter((b) => b !== 'verified').slice(0, 3).map((b) => <span key={b}>{BADGES[b]?.label || b}</span>)}</div>}</div>
      <div className="pro-foot">
        {isVerified(p)
          ? <span className="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>Verified</span>
          : <span className="pro-spec">{SPECIALTIES[p.specialty]?.label}</span>}
        <a className="pro-more" href={`/directory/professionals/${p.slug}`}>View profile →</a>
      </div>
    </article>
  );
}
