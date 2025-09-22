/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  distDir: '.next',

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  env: {
    // Only custom variables allowed
    MONGODB_URI: process.env.MONGODB_URI || '',
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;