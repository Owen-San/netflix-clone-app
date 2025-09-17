/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
    remotePatterns: [
      { protocol: "https", hostname: "rb.gy", pathname: "/**" },
      { protocol: "https", hostname: "image.tmdb.org", pathname: "/**" }
    ]
  }
};

export default nextConfig;
