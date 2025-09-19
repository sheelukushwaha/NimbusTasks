/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // use Next.js compiler for faster builds

  // Enable output directory for Docker static copy
  distDir: '.next',

  // Allow API calls to external endpoints if needed
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*', // Keep API routes as is
      },
    ];
  },

  // Environment variables for runtime
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
    MONGODB_URI: process.env.MONGODB_URI || '',
  },

  eslint: {
    // Disable ESLint errors from blocking builds in Docker
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Disable TS errors blocking production build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;