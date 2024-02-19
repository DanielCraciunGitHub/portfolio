import { Metadata } from "next"

import { staticMetadata } from "@/config/metadata"
import { pathToName } from "@/lib/utils"

import ArticleCards from "../../ArticleCards"

export const metadata: Metadata = {
  ...staticMetadata.blog,
}

interface pageProps {
  params: { category: string[] }
}

export const revalidate = 10

export default async function page({ params }: pageProps) {
  return (
    <ArticleCards
      category={pathToName(params.category ? params.category[0] : undefined)}
    />
  )
}
