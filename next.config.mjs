/** @type {import('next').NextConfig} */

// The directory is served at https://www.agrifarmcapital.com/directory/
// basePath makes every route, asset and next/link resolve under that prefix,
// so this app can be deployed as its own service and routed by path.
const nextConfig = {
  basePath: '/directory',
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  // Allows photo and cover uploads from the admin panel (images are capped at 3 MB).
  experimental: { serverActions: { bodySizeLimit: '4mb' } },
};

export default nextConfig;
