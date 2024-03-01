import { MetadataRoute } from "next"
import { siteConfig } from "@/config"

import { getBlogs } from "@/lib/blogs"

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs()

  const sitemapEntries = [
    ...siteConfig.navLinks.map((page) => ({
      url: siteConfig.url + page.href,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    })),
    ...blogs.map((blog) => ({
      url: `${siteConfig.url}/article/${blog.currentSlug}`,
      lastModified: new Date(blog._updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    })),
  ] as MetadataRoute.Sitemap

  return sitemapEntries
}
