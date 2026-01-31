import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // This allows your specific device IP to access the dev server
    allowedDevOrigins: ['10.88.54.99'],
  },
};

export default nextConfig;
