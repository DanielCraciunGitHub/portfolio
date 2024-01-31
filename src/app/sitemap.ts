import { MetadataRoute } from "next"
import { siteConfig } from "@/config"

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.navLinks.map((page) => ({
    url: siteConfig.url + page.href,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }))
}
