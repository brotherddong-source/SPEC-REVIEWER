/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
      { source: '/jaebulbi', destination: '/jaebulbi.html' },
    ];
  },
};

export default nextConfig;
