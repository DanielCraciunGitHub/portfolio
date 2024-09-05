import type { Metadata } from "next"
import { blogConfig } from "@/config"
import ArticleCards from "src/app/(Articles)/ArticleCards"

import { staticMetadata } from "@/config/metadata"
import { pathToName } from "@/lib/utils"

export const revalidate = 60

export function generateMetadata({ params }: pageProps): Metadata {
  return {
    ...staticMetadata.blog,
    title: params.category ? pathToName(params.category[0]) : blogConfig.title,
  }
}

interface pageProps {
  params: { category: string[] }
}

export default async function page({ params }: pageProps) {
  return (
    <ArticleCards
      category={pathToName(params.category ? params.category[0] : undefined)}
    />
  )
}
