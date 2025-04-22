import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true, // Disable Next.js image optimization; might remove later
  }
};

export default nextConfig;
