import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  // distDir: 'dist',
  // images: {
  //   unoptimized: true, // Disable Next.js image optimization; might remove later
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "queeryouthgroup.org.np",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin(); 

export default withNextIntl(nextConfig);
