import { pathToName } from "@/lib/utils"

import ArticleCards from "../../ArticleCards"

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
