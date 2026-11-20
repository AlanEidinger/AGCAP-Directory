import { fmtDate } from '../lib/articles';
import { readMinutes } from '../lib/markdown';

const Card = ({ href, cat, img, alt, title, text, meta }) => (
  <a className="art-card" href={href}>
    <div className="ac-img">{cat && <span className="ac-cat tag-chip">{cat}</span>}{img ? <img src={img} alt={alt || ''} loading="lazy" decoding="async" /> : <span className="ac-noimg" />}</div>
    <div className="ac-body"><h3>{title}</h3>{text && <p>{text}</p>}<div className="article-meta">{meta}</div></div>
  </a>
);

// Articles page once Alan has published at least one article from the admin.
export default function ArticlesLive({ live }) {
  const feat = live.find((a) => a.featured);
  const rest = live.filter((a) => a !== feat);
  return (
    <>
      {feat && <section style={{ padding: '8px 0 0' }}>
        <div className="wrap">
          <a className="feat-article" href={`/directory/articles/${feat.slug}`} style={{ color: 'inherit' }}>
            <div className="fa-img"><span className="fa-badge">Featured</span>{feat.cover && <img src={feat.cover} alt={feat.coverAlt || ''} />}</div>
            <div className="fa-body">
              {feat.category && <span className="tag-chip">{feat.category}</span>}
              <h2>{feat.title}</h2>
              {feat.excerpt && <p>{feat.excerpt}</p>}
              <div className="article-meta">{feat.author && <><span>{feat.author}</span><span className="dot"></span></>}<span>{readMinutes(feat.body)} min read</span>{feat.publishedAt && <><span className="dot"></span><span>{fmtDate(feat.publishedAt)}</span></>}</div>
            </div>
          </a>
        </div>
      </section>}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="articles-grid">
            {rest.map((a) => (
              <Card key={a.id} href={`/directory/articles/${a.slug}`} cat={a.category} img={a.cover} alt={a.coverAlt} title={a.title} text={a.excerpt}
                meta={<><span>{readMinutes(a.body)} min read</span>{a.publishedAt && <><span className="dot"></span><span>{fmtDate(a.publishedAt)}</span></>}</>} />
            ))}
            <Card href="/directory/articles/pricing-farmland-scarce-comps" cat="Buying & Selling" img="/directory/article-harvest.webp" alt="Wheat field at harvest beside a ranch home"
              title="How to price farmland when comps are scarce" text="Why ag land doesn't appraise like a house, and the data brokers actually use to set a number." meta={<span>8 min read</span>} />
          </div>
        </div>
      </section>
    </>
  );
}
