/** @type {import('next').NextConfig} */

// The directory is served at https://www.agrifarmcapital.com/directory/
// basePath makes every route, asset and next/link resolve under that prefix,
// so this app can be deployed as its own service and routed by path.
const nextConfig = {
  basePath: '/directory',
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
