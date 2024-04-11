import { Suspense } from "react"
import { Metadata } from "next"

import { baseMetadata } from "@/config/metadata"
import { getCurrentArticle } from "@/lib/blogs"
import { Skeleton } from "@/components/ui/skeleton"

import { urlForImage } from "../../../../../sanity/lib/image"
import { ArticleContent } from "./ArticleContent"

interface pageProps {
  params: { title: string }
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const article = await getCurrentArticle(params.title)

  return {
    ...baseMetadata,
    title: { absolute: article.title },
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
  return (
    <Suspense
      fallback={
        <div className="mt-5 mx-auto max-w-2xl space-y-3">
          <Skeleton className="h-7" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-7" />

          <Skeleton className="h-screen" />
        </div>
      }
    >
      <ArticleContent title={params.title} />
    </Suspense>
  )
}
