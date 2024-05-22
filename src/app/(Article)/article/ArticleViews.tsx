import { Eye } from "lucide-react";

import { serverClient } from "@/app/_trpc/serverClient";
import { formatArticleViews } from "@/lib/utils";

interface ArticleViewsProps {
  title: string;
}

const ArticleViews = async ({ title }: ArticleViewsProps) => {
  const views = await serverClient.blogRouter.getArticleViews({ slug: title });
  await serverClient.blogRouter.addArticleView(title);

  return (
    <div className="flex space-x-1">
      <Eye
        className={`h-5 w-5 ${views && views > 500 ? "text-yellow-500" : ""}`}
      />
      <div className={`${views && views > 500 ? "text-yellow-500" : ""}`}>
        {formatArticleViews(views ?? 0)}
      </div>
    </div>
  );
};
export default ArticleViews;
