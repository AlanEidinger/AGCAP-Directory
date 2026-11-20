'use client';
import { useState } from 'react';

function Copy({ value, label = 'Copy' }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={async () => { try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1800); } catch {} }}>
      {done ? 'Copied' : label}
    </button>
  );
}

// Pro dashboard: ready-made posts, the share image, and a website link for backlinks.
export default function SharePanel({ url, image, posts, badge }) {
  const tag = (src) => `${url}?utm_source=${src}&utm_medium=social&utm_campaign=pro_share`;
  const open = [
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tag('facebook'))}`],
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tag('linkedin'))}`],
    ['X', `https://twitter.com/intent/tweet?text=${encodeURIComponent(posts[1]?.text || '')}`],
  ];
  return (
    <div className="panel" id="share">
      <div className="panel-head"><h2>Share your profile</h2><span className="ph-sub">Post it once when you join, and again when you add photos or a Spotlight</span></div>
      <div className="panel-body share-panel">
        <div className="sp-img">
          <img src={image} alt="Preview of your share image" loading="lazy" />
          <div className="adm-row">
            <a className="btn btn-ghost btn-sm" href={image} download="agrifarm-directory-profile.png">Download image</a>
            <Copy value={url} label="Copy link" />
          </div>
          <p className="adm-sub">Facebook, LinkedIn and X show this image automatically when you paste your link. Download it for Instagram.</p>
        </div>
        <div className="sp-posts">
          <div className="adm-row" style={{ marginBottom: '14px' }}>
            {open.map(([n, href]) => <a key={n} className="btn btn-gold btn-sm" href={href} target="_blank" rel="noopener">Post to {n}</a>)}
          </div>
          {posts.map((p) => (
            <div key={p.label} className="sp-post">
              <div className="sp-post-head"><b>{p.label}</b><Copy value={p.text} /></div>
              <p>{p.text}</p>
            </div>
          ))}
          <div className="sp-post">
            <div className="sp-post-head"><b>Link from your own website</b><Copy value={badge} label="Copy code" /></div>
            <p className="adm-sub" style={{ margin: '0 0 8px' }}>Paste this into your site's footer or About page. A link from your website to your profile helps both show up in Google.</p>
            <code>{badge}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
