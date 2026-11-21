import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/occasion/birthday',
        destination: '/custom-birthday-song',
        permanent: true,
      },
      {
        source: '/occasion/anniversary',
        destination: '/personalized-anniversary-song',
        permanent: true,
      },
      {
        source: '/occasion/:path*',
        destination: '/#create',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
