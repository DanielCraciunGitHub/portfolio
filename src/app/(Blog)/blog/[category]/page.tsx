import { pathToName } from "@/lib/utils"

import ArticleCards from "../../ArticleCards"

interface pageProps {
  params: { category: string }
}

export default async function page({ params }: pageProps) {
  return <ArticleCards category={pathToName(params.category)} />
}
