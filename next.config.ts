import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true, // Disable Next.js image optimization; might remove later
  },
  i18n: {
    locales: ['en', 'ne'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
