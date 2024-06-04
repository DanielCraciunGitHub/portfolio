import { Metadata } from "next"
import { siteConfig } from "@/config"

import { baseMetadata } from "@/config/metadata"
import { getArticleMetadata } from "@/lib/blogs"

import { urlForImage } from "../../../../../sanity/lib/image"
import { ArticleContent } from "./ArticleContent"

export const revalidate = 45

interface pageProps {
  params: { title: string }
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const article = await getArticleMetadata(params.title)

  return {
    ...baseMetadata,
    title: { absolute: article.title },
    authors: {
      name: article.author?.name ?? "Daniel Craciun",
      url: siteConfig.url,
    },
    alternates: {
      canonical:
        article.canonical ?? `${siteConfig.url}/article/${article.currentSlug}`,
    },
    creator: article.author?.name ?? "Daniel Craciun",
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
          url: urlForImage(article.image),
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
          url: urlForImage(article.image),
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
  return <ArticleContent title={params.title} />
}
