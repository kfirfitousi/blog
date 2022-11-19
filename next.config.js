/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;
