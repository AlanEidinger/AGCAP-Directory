// Profile sections a professional fills in from their account.
const Check = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>);

function embed(url) {
  let m;
  if ((m = url.match(/youtu\.be\/([\w-]{6,})/)) || (m = url.match(/[?&]v=([\w-]{6,})/)) || (m = url.match(/youtube\.com\/(?:embed|shorts)\/([\w-]{6,})/))) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
  if ((m = url.match(/vimeo\.com\/(\d+)/))) return `https://player.vimeo.com/video/${m[1]}`;
  return '';
}

export function faqLd(m) {
  if (!m?.faq?.length || m.hide?.includes('faq')) return null;
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: m.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
}

export default function ProfileModules({ m, name }) {
  if (!m) return null;
  const show = (k) => !m.hide.includes(k);
  const facts = [m.years && `${m.years} years in agriculture`, m.languages && `Languages: ${m.languages}`, m.hours && `Hours: ${m.hours}`].filter(Boolean);
  const vid = show('video') && m.video ? embed(m.video) : '';
  return (
    <>
      {facts.length > 0 && <ul className="pm-facts">{facts.map((f) => <li key={f}>{f}</li>)}</ul>}

      {show('specialties') && m.specialties.length > 0 && <><h2>Specialties</h2><div className="spec-tags">{m.specialties.map((x) => <span key={x} className="tag-chip">{x}</span>)}</div></>}

      {show('services') && m.services.length > 0 && <><h2>Services</h2><ul className="pm-list">{m.services.map((x) => <li key={x}><Check />{x}</li>)}</ul></>}

      {show('credentials') && m.credentials.length > 0 && <><h2>Credentials</h2><ul className="pm-creds">{m.credentials.map((c) => <li key={c.name}><b>{c.name}</b>{c.detail && <span>{c.detail}</span>}</li>)}</ul></>}

      {show('gallery') && m.gallery.length > 0 && <><h2>Photos</h2><div className="pm-gallery">{m.gallery.map((g) => (
        <figure key={g.url}><img src={g.url} alt={g.caption || `Photo from ${name}`} loading="lazy" />{g.caption && <figcaption>{g.caption}</figcaption>}</figure>
      ))}</div></>}

      {vid && <><h2>Video</h2><div className="pm-video"><iframe src={vid} title={`Video from ${name}`} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen /></div></>}

      {show('faq') && m.faq.length > 0 && <><h2>Questions clients ask</h2><div className="pm-faq">{m.faq.map((f) => (
        <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
      ))}</div></>}
    </>
  );
}
