/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  // Redirects for blog posts that have already been published
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

module.exports = nextConfig;
