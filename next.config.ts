import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "queeryouthgroup.org.np",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: '/studio/:path*', // Points to the Next.js route
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin(); 
export default withNextIntl(nextConfig);