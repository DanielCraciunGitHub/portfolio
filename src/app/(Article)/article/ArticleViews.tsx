import { Eye } from "lucide-react"

import { serverClient } from "@/app/_trpc/serverClient"

interface ArticleViewsProps {
  title: string
}

const ArticleViews = async ({ title }: ArticleViewsProps) => {
  const views = await serverClient.blogRouter.getArticleViews(title)
  await serverClient.blogRouter.addArticleView(title)

  return (
    <div className="flex space-x-1">
      <Eye className="h-5 w-5" />
      <div>{views}</div>
    </div>
  )
}
export default ArticleViews
