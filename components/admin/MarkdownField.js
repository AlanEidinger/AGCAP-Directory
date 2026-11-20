'use client';
import { useState } from 'react';
import { renderMarkdown } from '../../lib/markdown';

export default function MarkdownField({ name, defaultValue = '' }) {
  const [val, setVal] = useState(defaultValue);
  const [tab, setTab] = useState('write');
  return (
    <div className="md-field">
      <div className="md-tabs">
        <button type="button" className={tab === 'write' ? 'on' : ''} onClick={() => setTab('write')}>Write</button>
        <button type="button" className={tab === 'preview' ? 'on' : ''} onClick={() => setTab('preview')}>Preview</button>
        <span className="md-help">## Heading · **bold** · *italic* · - list · &gt; quote · [link](https://…)</span>
      </div>
      <textarea name={name} rows={22} value={val} onChange={(e) => setVal(e.target.value)} style={{ display: tab === 'write' ? 'block' : 'none' }} />
      {tab === 'preview' && <div className="art-prose md-preview" dangerouslySetInnerHTML={{ __html: renderMarkdown(val) || '<p><em>Nothing to preview yet.</em></p>' }} />}
    </div>
  );
}
