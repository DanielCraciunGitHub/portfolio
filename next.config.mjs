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
        source:
          "/api/trpc/(blogRouter.getInfinitePosts.*|blogRouter.getArticleViews.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
        ],
      },
      // {
      //   source: "/api/:path*",
      //   headers: [
      //     { key: "Access-Control-Allow-Credentials", value: "true" },
      //     {
      //       key: "Access-Control-Allow-Origin",
      //       value: "https://www.danielfullstack.com",
      //     },
      //     {
      //       key: "Access-Control-Allow-Methods",
      //       value: "GET,DELETE,PATCH,POST,PUT",
      //     },
      //     {
      //       key: "Access-Control-Allow-Headers",
      //       value:
      //         "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      //     },
      //   ],
      // },
    ];
  },
};

export default nextConfig;
