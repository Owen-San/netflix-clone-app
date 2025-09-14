import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rb.gy",
      },
    ],
  },
};

export default nextConfig;
