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

  // Add rewrites to bypass next-intl for cms directory
  async rewrites() {
    return {
      beforeFiles: [
        // Bypass next-intl for cms directory and all its subdirectories
        {
          source: '/cms/:path*',
          destination: '/cms/:path*',
          locale: false, // This bypasses internationalization
        },
      ],
    }
  },

  // Alternative: Use redirects if rewrites don't work
  async redirects() {
    return [
      {
        source: '/en/cms/:path*',
        destination: '/cms/:path*',
        permanent: false,
        locale: false,
      },
      {
        source: '/ne/cms/:path*',
        destination: '/cms/:path*',
        permanent: false,
        locale: false,
      },
    ]
  },
};

const withNextIntl = createNextIntlPlugin(); 

export default withNextIntl(nextConfig);