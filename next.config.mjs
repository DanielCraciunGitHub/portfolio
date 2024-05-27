import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=60",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
