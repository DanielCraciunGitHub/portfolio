import type { Metadata } from "next"
import { siteConfig } from "@/config"
import { urlForImage } from "@/sanity/lib/image"
import { ArticleContent } from "src/app/(Article)/article/[title]/ArticleContent"

import { baseMetadata } from "@/config/metadata"
import { getArticleMetadata } from "@/lib/blogs"

export const revalidate = 45

interface pageProps {
  params: Promise<{ title: string }>
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { title } = await params
  const article = await getArticleMetadata(title)

  return {
    ...baseMetadata,
    title: { absolute: article.title },
    authors: {
      name: article.authors?.join(", ") ?? "Daniel Craciun",
      url: siteConfig.url,
    },
    alternates: {
      canonical:
        article.canonical ?? `${siteConfig.url}/article/${article.currentSlug}`,
    },
    creator: article.authors?.join(", ") ?? "Daniel Craciun",
    description: `${article.category}: ${article.title} | ${article.subtitle}`,
    keywords: [
      ...new Set([
        ...baseMetadata.keywords!,
        ...article.title.split(" "),
        ...(article.subtitle?.split(" ") ?? ""),
        article.category,
      ]),
    ],
    openGraph: {
      ...baseMetadata.openGraph,
      title: { absolute: article.title },
      description: article.subtitle,
      url: `/article/${article.currentSlug}`,
      images: [
        {
          url: article.image
            ? urlForImage(article.image)
            : "/images/daniel.webp",
          type: "image/png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: { absolute: article.title },
      description: article.subtitle,
      images: [
        {
          url: article.image
            ? urlForImage(article.image)
            : "/images/daniel.webp",
          type: "image/png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  }
}

export default async function page({ params }: pageProps) {
  const { title } = await params
  return <ArticleContent title={title} />
}
