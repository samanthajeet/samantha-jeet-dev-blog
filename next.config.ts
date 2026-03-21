import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old blog index → current Sanity-backed listing
      { source: '/blog', destination: '/blog_v2', permanent: false },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: []
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
