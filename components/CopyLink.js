'use client';
import { useState } from 'react';

export default function CopyLink({ className, children }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={className} onClick={async () => {
      try { await navigator.clipboard.writeText(window.location.href.split('#')[0]); setDone(true); setTimeout(() => setDone(false), 2000); } catch {}
    }}>
      {done ? 'Link copied' : children}
    </button>
  );
}
