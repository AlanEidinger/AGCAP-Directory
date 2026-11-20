import SiteShell from '../../../components/SiteShell';

export const metadata = {
  title: 'How to price farmland when comps are scarce',
  description: 'Why ag land does not appraise like a house, and the data brokers actually use to set a number.',
  alternates: { canonical: '/articles/pricing-farmland-scarce-comps' },
};

export default function Page() {
  return (
    <SiteShell>
      <section className="art-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="../index.html">Home</a><span className="sep">/</span><a href="../articles.html">Articles</a><span className="sep">/</span><span>Pricing farmland</span></div>
          <span className="tag-chip">Buying &amp; Selling</span>
          <h1>How to price farmland when comps are scarce</h1>
          <p className="art-lede">Ag land doesn't appraise like a house. When the nearest comparable sale is twelve miles away and two years old, brokers fall back on income, water, and soil &mdash; in that order.</p>
          <div className="art-byline">
            <span className="avatar">MO</span>
            <span><span className="ab-n">Marcela Ort&iacute;z</span><span className="ab-r">Land &amp; Ranch Broker, Fresno</span></span>
            <span className="ab-meta"><span>June 12, 2026</span><span>8 min read</span></span>
          </div>
          <figure className="art-figure">
            <img src="/directory/article-harvest.webp" alt="Illustration of a ranch home beside a wheat field at harvest" />
            <figcaption>Row-crop ground in the San Joaquin Valley. Comparable sales thin out quickly outside major crop districts.</figcaption>
          </figure>
        </div>
      </section>

      <section className="art-body">
        <div className="wrap">
          <div className="art-layout">
            <article className="art-prose">
              <h2 id="s1">Why residential logic breaks down</h2>
              <p>A suburban appraiser can usually find six sales within a mile that closed in the last six months. Agricultural ground rarely offers that. Parcels are large, transactions are infrequent, and no two pieces of land carry the same water, soil, or access. A 200-acre almond orchard and the 200 acres next door can differ in value by a third because one sits in a district with senior surface rights and the other pumps from a declining aquifer.</p>
              <p>That means price discovery on farmland leans on the property's ability to produce income rather than on what a neighbor paid.</p>

              <h2 id="s2">Start with income, not sales</h2>
              <p>The income approach asks a simple question: what can this ground earn, and what would a buyer pay for that earning stream? In practice that means building a stabilized annual budget.</p>
              <ul>
                <li><b>Gross revenue</b> &mdash; realistic yield per acre times a multi-year average price, not last year's peak.</li>
                <li><b>Cultural costs</b> &mdash; irrigation, labor, fertilizer, pest management, harvest.</li>
                <li><b>Fixed costs</b> &mdash; district assessments, property tax, equipment, management.</li>
                <li><b>Net operating income</b> &mdash; what's left, capitalized at a rate drawn from recent ag sales in the region.</li>
              </ul>
              <p>Cap rates for California ag ground have generally run in the low single digits for premium permanent crops and higher for open ground with weaker water. Small movements matter: at a 4% cap rate, every $100 per acre of net income shifts value by $2,500 an acre.</p>

              <div className="pullquote">
                <p>Water reliability is doing more work in valuation today than crop type or soil class.</p>
                <cite>&mdash; on the post-SGMA market</cite>
              </div>

              <h2 id="s3">Then adjust for water</h2>
              <p>Since the Sustainable Groundwater Management Act began phasing in allocations, water has moved from a footnote to the center of the analysis. Two adjacent parcels with identical soil can trade at very different numbers based on district, allocation history, and whether the ground has access to surface deliveries in a dry year.</p>
              <h3>What buyers actually ask</h3>
              <p>Expect diligence on the irrigation district and its allocation record, well depth and pump test results, subsidence history, and any GSA pumping restrictions that will bind in the coming years. A parcel with junior groundwater and no surface backup should be priced with an explicit discount rather than an optimistic footnote.</p>

              <h2 id="s4">Widen the comp search deliberately</h2>
              <p>When local comps are thin, expand the search on purpose and document every adjustment. Reach further geographically within the same water district before reaching across districts. Go back further in time and adjust for market movement rather than jumping to a dissimilar parcel next door.</p>
              <ul>
                <li><b>Same district, farther away</b> is usually a better comp than <b>next door, different district</b>.</li>
                <li>Adjust for crop maturity &mdash; a third-leaf orchard is not a producing one.</li>
                <li>Separate improvement value (wells, irrigation systems, barns) from bare land.</li>
              </ul>

              <h2 id="s5">Where an appraiser earns their fee</h2>
              <p>A certified agricultural appraiser reconciles the income and sales approaches and defends the result to a lender. If your transaction involves financing, a 1031 exchange, an estate, or a partnership split, that documentation matters more than a broker's opinion of value. For a straightforward listing, a broker's market analysis is often enough to set an asking price.</p>
              <p>Either way, the number should come with its reasoning attached. On farmland, the assumptions are the valuation.</p>

              <div className="art-tags">
                <span className="tag-chip">Appraisal</span>
                <span className="tag-chip">Water rights</span>
                <span className="tag-chip">Buying &amp; selling</span>
                <span className="tag-chip">San Joaquin Valley</span>
              </div>
            </article>

            <aside className="art-aside">
              <div className="aside-cta">
                <h3>Need a number you can defend?</h3>
                <p>We'll match you with a certified ag appraiser or land broker who works in your county.</p>
                <a className="btn btn-gold" href="../get-matched.html" style={{width:'100%'}}>Get matched free &rarr;</a>
              </div>
              <div className="aside-list">
                <h4>In this article</h4>
                <ol>
                  <li><a href="#s1">Why residential logic breaks down</a></li>
                  <li><a href="#s2">Start with income, not sales</a></li>
                  <li><a href="#s3">Then adjust for water</a></li>
                  <li><a href="#s4">Widen the comp search</a></li>
                  <li><a href="#s5">Where an appraiser earns their fee</a></li>
                </ol>
              </div>
              <div className="aside-list">
                <h4>Related reading</h4>
                <ol>
                  <li><a href="../articles.html">The 1031 exchange timeline, explained for growers</a></li>
                  <li><a href="../articles.html">Surface vs. groundwater rights: a primer</a></li>
                  <li><a href="../spotlight.html">Spotlight: Marcela Ort&iacute;z on valley land</a></li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
