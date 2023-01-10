import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Redirects for blog posts that have already been published
  // under the old URL structure
  redirects: async () => {
    return [
      {
        source: '/web-dev/:path*',
        destination: '/posts/web-dev/:path*',
        permanent: true,
      },
      {
        source: '/computer-vision/:path*',
        destination: '/posts/computer-vision/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
