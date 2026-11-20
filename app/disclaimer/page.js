import SiteShell from '../../components/SiteShell';

export const metadata = {
  title: 'Disclaimer',
  description: 'The terms governing use of AgriFarm Directory, California\'s directory of verified agricultural specialists.',
  alternates: { canonical: '/disclaimer' },
};

export default function Page() {
  return (
    <SiteShell>
      <section className="legal-hero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/directory">Home</a><span className="sep">/</span><span>Disclaimer</span></div>
          <h1>Disclaimer</h1>
          <div className="updated"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>Last updated: August 11, 2026</div>
          <p className="lead">Please read these disclaimers. They explain the limits of what AgriFarm Directory is and what it is not.</p>
        </div>
      </section>


      <section className="legal-wrap">
        <div className="wrap">
          <div className="legal-layout">
            
            <nav className="legal-toc">
              <p className="toc-label">On this page</p>
              <ol>
                <li><a href="#advice"><span className="tn">01</span>No professional advice</a></li>
                <li><a href="#notparty"><span className="tn">02</span>Not a party to deals</a></li>
                <li><a href="#verification"><span className="tn">03</span>Verification limits</a></li>
                <li><a href="#accuracy"><span className="tn">04</span>Listing accuracy</a></li>
                <li><a href="#reviews"><span className="tn">05</span>Reviews &amp; ratings</a></li>
                <li><a href="#thirdparty"><span className="tn">06</span>Third-party links</a></li>
                <li><a href="#asis"><span className="tn">07</span>“As is” — no warranties</a></li>
                <li><a href="#liability"><span className="tn">08</span>Limitation of liability</a></li>
                <li><a href="#licensing"><span className="tn">09</span>External licensing</a></li>
                <li><a href="#contact"><span className="tn">10</span>Contact</a></li>
              </ol>
            </nav>

            
            <article className="legal-doc">
              <section id="advice">
                <h2><span className="sec-num">01</span>No professional advice</h2>
                <p>The information available through AgriFarm Directory is provided for general informational purposes only and does not constitute legal, financial, tax, insurance, real estate, or appraisal advice. You should consult a qualified, independently retained professional before making decisions about your land, transactions, or operations.</p>
              </section>

              <section id="notparty">
                <h2><span className="sec-num">02</span>We are not a party to your transactions</h2>
                <p>AgriFarm Directory is a listing and discovery platform. We are not a broker, insurer, title company, appraiser, or law firm, and we do not participate in, supervise, or guarantee any engagement, transaction, or outcome between you and a listed professional. Any contract you form is solely between you and that professional.</p>
              </section>

              <section id="verification">
                <h2><span className="sec-num">03</span>Limitations of verification</h2>
                <p>Our "Verified" badge means we took reasonable steps to confirm a professional’s identity, license status, and references at the time of review. It is <b>not</b> an endorsement, recommendation, or guarantee of competence, quality, or results. License and credential status can change at any time. Always confirm a professional’s current standing with the relevant licensing authority before engaging them.</p>
              </section>

              <section id="accuracy">
                <h2><span className="sec-num">04</span>Accuracy of listings &amp; content</h2>
                <p>Listing information is largely provided by the professionals themselves. While we strive for accuracy, we do not warrant that any listing, description, rating, or other content is complete, current, or error-free. Listings may be out of date, and professionals’ availability and qualifications may change without notice.</p>
              </section>

              <section id="reviews">
                <h2><span className="sec-num">05</span>Reviews &amp; aggregated ratings</h2>
                <p>Reviews and ratings reflect the opinions of the individuals who submitted them and do not represent the views of AgriFarm Directory. Aggregated scores combine ratings from third-party platforms and from the Directory; we do not independently verify the experiences described and are not responsible for their content.</p>
              </section>

              <section id="thirdparty">
                <h2><span className="sec-num">06</span>Third-party links &amp; content</h2>
                <p>The Directory may link to or display content from third-party websites and platforms. We do not control and are not responsible for the content, policies, or practices of those third parties. Accessing third-party content is at your own risk and subject to their terms.</p>
              </section>

              <section id="asis">
                <h2><span className="sec-num">07</span>“As is” — no warranties</h2>
                <p>The Directory is provided "as is" and "as available," without warranties of any kind, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that the Directory will be uninterrupted, secure, or error-free.</p>
              </section>

              <section id="liability">
                <h2><span className="sec-num">08</span>Limitation of liability</h2>
                <p>To the fullest extent permitted by law, AgriFarm Directory and AgriFarm Capital, and their officers, employees, and partners, will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, goodwill, or property, arising out of or related to your use of — or reliance on — the Directory or any professional found through it.</p>
              </section>

              <section id="licensing">
                <h2><span className="sec-num">09</span>External licensing &amp; regulation</h2>
                <p>Agricultural professionals are licensed and regulated by external authorities (for example, the California Department of Real Estate, the State Bar of California, and the California Department of Insurance). AgriFarm Directory is not affiliated with, and does not act on behalf of, any government or licensing body. Verify all licenses directly with the issuing authority.</p>
              </section>

              <section id="contact">
                <h2><span className="sec-num">10</span>Contact us</h2>
                <div className="legal-contact">
                  <h3>Questions about this disclaimer?</h3>
                  <p>Reach the AgriFarm Directory team at <a href="/directory/contact">legal@agrifarmcapital.com</a>. You can also use our <a href="/directory/contact">contact form</a>.</p>
                </div>
              </section>

              <div className="legal-siblings">
                <a href="/directory/terms"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /></svg>Terms of Use</a>
                <a href="/directory/privacy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 4 5v6c0 5 3.3 8.6 8 10 4.7-1.4 8-5 8-10V5l-8-3Z" /></svg>Privacy Policy</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
