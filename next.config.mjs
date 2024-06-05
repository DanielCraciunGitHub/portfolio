import "./src/env.mjs"

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
  // async headers() {
  //   return [
  //     {
  //       source:
  //         "/api/trpc/(blogRouter.getInfinitePosts.*|blogRouter.getArticleViews.*)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "s-maxage=1, stale-while-revalidate=1799",
  //         },
  //       ],
  //     },
  //   ]
  // },
}

export default nextConfig
