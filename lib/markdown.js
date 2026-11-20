// Small, safe Markdown renderer for articles. All HTML in the source is escaped.
// Supports: ## / ### headings, paragraphs, - and 1. lists, > quotes,
// **bold**, *italic*, [link](url), ![alt](image-url), and --- rules.

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const okUrl = (u) => /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(u);

function inline(s) {
  return esc(s)
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, u) => (okUrl(u) ? `<img src="${u}" alt="${alt}" loading="lazy" />` : m))
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => (okUrl(u) ? `<a class="inline" href="${u}"${/^https?:/i.test(u) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>` : m))
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
}

export function renderMarkdown(src = '') {
  const lines = String(src).replace(/\r/g, '').split('\n');
  const out = [];
  let para = [], list = null, quote = [];
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<${list.tag}>${list.items.map((i) => `<li><span>${inline(i)}</span></li>`).join('')}</${list.tag}>`); list = null; } };
  const flushQuote = () => { if (quote.length) { out.push(`<div class="pullquote"><p>${inline(quote.join(' '))}</p></div>`); quote = []; } };
  const flush = () => { flushPara(); flushList(); flushQuote(); };

  for (const raw of lines) {
    const l = raw.trim();
    let m;
    if (!l) { flush(); continue; }
    if ((m = l.match(/^(#{2,3})\s+(.*)$/))) { flush(); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); continue; }
    if (/^---+$/.test(l)) { flush(); out.push('<hr />'); continue; }
    if ((m = l.match(/^>\s?(.*)$/))) { flushPara(); flushList(); quote.push(m[1]); continue; }
    if ((m = l.match(/^[-*]\s+(.*)$/)) || (m = l.match(/^\d+[.)]\s+(.*)$/))) {
      flushPara(); flushQuote();
      const tag = /^\d/.test(l) ? 'ol' : 'ul';
      if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] }; }
      list.items.push(m[1]);
      continue;
    }
    flushList(); flushQuote();
    para.push(l);
  }
  flush();
  return out.join('\n');
}

export const readMinutes = (src = '') => Math.max(1, Math.round(String(src).split(/\s+/).filter(Boolean).length / 220));
