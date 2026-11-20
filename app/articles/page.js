import SiteShell from '../../components/SiteShell';
import ArticlesLive from '../../components/ArticlesLive';
import { getArticles } from '../../lib/articles';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Articles &amp; Guides | AgriFarm Directory — California\'s Agricultural Expert Network',
  description: 'Practical guides and expert insight for California agricultural landowners: buying and selling farmland, water rights, crop insurance, appraisals, and more.',
  alternates: { canonical: '/articles' },
};

export default async function Page() {
  const live = await getArticles();
  return (
    <SiteShell>
      <section className="articles-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/directory">Home</a><span className="sep">/</span><span>Articles &amp; Guides</span></div>
          <span className="tag-chip green">Knowledge base</span>
          <h1 style={{marginTop:'14px'}}>Guides &amp; insight for California landowners</h1>
          <p className="lead">Practical, local knowledge from the specialists in our directory, covering everything from water rights and 1031 exchanges to crop insurance and farmland valuation.</p>
          <div className="cat-row">
            <a className="cat-pill active" href="#">All topics</a>
            <a className="cat-pill" href="#">Buying &amp; Selling</a>
            <a className="cat-pill" href="#">Water Rights</a>
            <a className="cat-pill" href="#">Insurance</a>
            <a className="cat-pill" href="#">Appraisal &amp; Value</a>
            <a className="cat-pill" href="#">Legal &amp; Tax</a>
            <a className="cat-pill" href="#">Spotlights</a>
          </div>
        </div>
      </section>


      {live.length ? <ArticlesLive live={live} /> : <SampleArticles />}

      <section style={{padding:'0 0 90px'}}>
        <div className="wrap">
          <div className="news-band">
            <div>
              <p className="eyebrow">Stay in the loop</p>
              <h2>Local ag insight, a few times a month</h2>
              <p>Guides, deadline reminders, and specialist spotlights for California landowners. No spam.</p>
            </div>
            <form className="news-form">
              <input type="email" placeholder="you@example.com" />
              <button className="btn btn-gold" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

// Shown until the first article is published from the admin.
function SampleArticles() {
  return (
    <>
      <section style={{padding:'8px 0 0'}}>
        <div className="wrap">
          <article className="feat-article">
            <div className="fa-img">
              <span className="fa-badge">Featured</span>
              <img src="/directory/article-water.webp" alt="Pump station and irrigation canal beside an almond orchard" loading="lazy" decoding="async" />
            </div>
            <div className="fa-body">
              <span className="tag-chip">Water Rights</span>
              <h2>SGMA in 2026: what every San Joaquin Valley landowner should be doing now</h2>
              <p>Groundwater rules are tightening across the Central Valley. We asked three water-rights attorneys and an appraiser how it changes the value of your ground, and the moves to make before the next reporting deadline.</p>
              <div className="article-meta">
                <span className="avatar" style={{background:'linear-gradient(135deg,#3d5a6c,#5f7e8e)'}}>PR</span>
                <span>Priya Raman, Esq.</span>
                <span className="dot"></span>
                <span>12 min read</span>
                <span className="dot"></span>
                <span>June 2026</span>
              </div>
            </div>
          </article>
        </div>
      </section>


      <section className="section" style={{paddingTop:'40px'}}>
        <div className="wrap">
          <div className="articles-grid">
            <a className="art-card" href="/directory/articles/pricing-farmland-scarce-comps">
              <div className="ac-img"><span className="ac-cat tag-chip">Buying &amp; Selling</span><img src="/directory/article-harvest.webp" alt="Wheat field at harvest beside a ranch home" loading="lazy" decoding="async" /></div>
              <div className="ac-body">
                <h3>How to price farmland when comps are scarce</h3>
                <p>Why ag land doesn't appraise like a house, and the data brokers actually use to set a number.</p>
                <div className="article-meta"><span>8 min read</span><span className="dot"></span><span>Appraisal</span></div>
              </div>
            </a>
            <a className="art-card" href="/directory/articles/pricing-farmland-scarce-comps">
              <div className="ac-img"><span className="ac-cat tag-chip">Legal &amp; Tax</span><img src="/directory/article-vineyard.webp" alt="Grapevines and a farmhouse in oak-covered hills" loading="lazy" decoding="async" /></div>
              <div className="ac-body">
                <h3>The 1031 exchange timeline, explained for growers</h3>
                <p>45 days to identify, 180 to close. A step-by-step look at deferring tax on a farm sale.</p>
                <div className="article-meta"><span>10 min read</span><span className="dot"></span><span>Tax</span></div>
              </div>
            </a>
            <a className="art-card" href="/directory/articles/pricing-farmland-scarce-comps">
              <div className="ac-img"><span className="ac-cat tag-chip">Insurance</span><img src="/directory/article-soil.webp" alt="Young row crops beside a citrus orchard" loading="lazy" decoding="async" /></div>
              <div className="ac-body">
                <h3>Crop insurance basics for first-generation farmers</h3>
                <p>MPCI, crop-hail, and revenue protection, what each covers and when it pays out.</p>
                <div className="article-meta"><span>7 min read</span><span className="dot"></span><span>Risk</span></div>
              </div>
            </a>
            <a className="art-card" href="/directory/articles/pricing-farmland-scarce-comps">
              <div className="ac-img"><span className="ac-cat tag-chip">Buying &amp; Selling</span><img src="/directory/article-ranch.webp" alt="Cattle on foothill pasture beside a ranch house" loading="lazy" decoding="async" /></div>
              <div className="ac-body">
                <h3>Buying your first cattle ranch in the Sierra foothills</h3>
                <p>Water, access, carrying capacity, and the diligence checklist before you make an offer.</p>
                <div className="article-meta"><span>11 min read</span><span className="dot"></span><span>Ranch</span></div>
              </div>
            </a>
            <a className="art-card" href="/directory/articles/pricing-farmland-scarce-comps">
              <div className="ac-img"><span className="ac-cat tag-chip">Water Rights</span><img src="/directory/region-imperial.webp" alt="Desert ranch home beside irrigated fields" loading="lazy" decoding="async" /></div>
              <div className="ac-body">
                <h3>Surface vs. groundwater rights: a plain-English primer</h3>
                <p>Riparian, appropriative, overlying. What the categories mean for what you can pump.</p>
                <div className="article-meta"><span>9 min read</span><span className="dot"></span><span>Legal</span></div>
              </div>
            </a>
            <a className="art-card" href="/directory/spotlight">
              <div className="ac-img"><span className="ac-cat tag-chip green">Spotlight</span><img src="/directory/region-wine-country.webp" alt="Farmhouse beside vineyard rows" loading="lazy" decoding="async" /></div>
              <div className="ac-body">
                <h3>Specialist Spotlight: Marcela Ortíz on valley land</h3>
                <p>Our June featured specialist on reading water reliability and timing a farm sale.</p>
                <div className="article-meta"><span>Interview</span><span className="dot"></span><span>15 min read</span></div>
              </div>
            </a>
          </div>

          <div className="pagination" style={{marginTop:'44px'}}>
            <a className="cur" href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a className="nav-arrow" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg></a>
          </div>
        </div>
      </section>


    </>
  );
}
