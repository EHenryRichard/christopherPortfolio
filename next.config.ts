import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Ensure there are no typos and you are on Next.js 14.3+ or 15
    allowedDevOrigins: ['http://10.88.54.99:3000', 'http://localhost:3000'],
  },
};

export default nextConfig;
