import { Metadata } from "next"
import Image from "next/image"
import { PortableText } from "@portabletext/react"

import { baseMetadata } from "@/config/metadata"
import { getCurrentArticle } from "@/lib/blogs"
import { Badge } from "@/components/ui/badge"

import { urlForImage } from "../../../../../sanity/lib/image"
import { BlogInteractor } from "./BlogInteractor"
import { myPortableTextComponents } from "./SanityCustomComponents"

export const revalidate = 60

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
  const article = await getCurrentArticle(params.title)

  return (
    <div className="mt-5 mx-auto max-w-2xl">
      <div className="flex items-center justify-between space-x-4">
        <Badge variant="secondary" className="inline-flex">
          {article.category}
        </Badge>
        <div className="font-semibold text-xs">
          {new Date(article._createdAt).toDateString()}
        </div>
      </div>
      <h1 className="mt-3 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
        {article.title}
      </h1>
      <h2 className="mt-2 block text-xl leading-8 tracking-tight sm:text-2xl text-muted-foreground">
        {article.subtitle}
      </h2>
      <Image
        priority
        src={urlForImage(article.image)}
        alt={article.title}
        width={800}
        height={800}
        className="rounded-md mt-5"
      />
      <div className="mt-10 prose prose-xl dark:prose-invert mb-10">
        <PortableText
          value={article.content}
          components={myPortableTextComponents}
        />
      </div>
      <BlogInteractor />
    </div>
  )
}
