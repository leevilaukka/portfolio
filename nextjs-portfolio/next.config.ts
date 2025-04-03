import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  i18n: {
    locales: ["en", "fi"],
    defaultLocale: "fi",
  },
};

export default nextConfig;
