// Single source of truth for the deployed path prefix.
// Must match `basePath` in next.config.mjs.
// Raw <img src> and <a href> are NOT auto-prefixed by Next — use BP for those.
export const BP = '/directory';

export const SITE_URL = 'https://www.agrifarmcapital.com/directory';

export const asset = (p) => `${BP}/${String(p).replace(/^\//, '')}`;
