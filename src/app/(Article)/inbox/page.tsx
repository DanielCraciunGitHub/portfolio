import Link from "next/link"
import { redirect } from "next/navigation"
import { siteConfig } from "@/config"

import type { ArticleComment, ArticleLike, User } from "@/types/blog"
import { articleSlugToTitle, formatTimeToNow, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { serverClient } from "@/app/_trpc/serverClient"

export const dynamic = "force-dynamic"

interface pageProps {}

const page = async ({}: pageProps) => {
  const userRole = await serverClient.authRouter.getRole()

  if (userRole !== "ADMIN") redirect("/")

  const inboxData = await serverClient.blogRouter.fetchInboxData()

  const likesData: (ArticleLike & { liker: User })[] = []
  const commentsData: (ArticleComment & {
    replyTo: ArticleComment | null
    author: User
  })[] = []

  inboxData.forEach((dataItem) => {
    if (isArticleLike(dataItem)) {
      likesData.push(dataItem)
    } else {
      commentsData.push(dataItem)
    }
  })

  return (
    <div className="grid md:grid-cols-2 grid-rows-2 md:gap-x-20">
      <div className="space-y-2">
        {likesData.map((like) => {
          return (
            <div key={like.id} className="grid grid-cols-12 grid-rows-1">
              <Separator
                className="col-span-1 mx-auto w-2 bg-primary/50"
                orientation="vertical"
              />
              <Link
                href={`${siteConfig.url}/article/${like.articleSlug}`}
                className="col-span-11"
              >
                <Card className="flex items-center space-x-2 p-4">
                  <Avatar>
                    <AvatarImage src={like.liker.image!} />
                    <AvatarFallback>
                      {getInitials(like.liker.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-muted-foreground text-xs">
                      {formatTimeToNow(new Date(like.createdAt!))}
                    </div>
                    <div>
                      <span className="text-primary">{like.liker.name}</span>{" "}
                      has liked your article.
                    </div>
                    <div className="text-blue-500 underline">
                      {articleSlugToTitle(like.articleSlug)}
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="space-y-2">
        {commentsData.map((comment) => {
          return (
            <div key={comment.id} className="grid grid-cols-12 grid-rows-1">
              <Separator
                className="col-span-1 mx-auto w-2 bg-primary/50"
                orientation="vertical"
              />
              <Link
                href={`${siteConfig.url}/article/${comment.articleSlug}?id=${comment.id}`}
                className="col-span-11"
              >
                <Card className="flex items-center space-x-2 p-4">
                  <Avatar>
                    <AvatarImage src={comment.author.image!} />
                    <AvatarFallback>
                      {getInitials(comment.author.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-muted-foreground text-xs">
                      {formatTimeToNow(new Date(comment.updatedAt!))}
                    </div>
                    <div>
                      <span className="text-primary">
                        {comment.author.name}
                      </span>{" "}
                      Has commented on your article.
                    </div>
                    <div>"{comment.body}"</div>
                    <div className="text-blue-500 underline">
                      {articleSlugToTitle(comment.articleSlug)}
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default page

function isArticleLike(
  inboxDataItem: ArticleLike | ArticleComment
): inboxDataItem is ArticleLike {
  return (inboxDataItem as ArticleLike).commentId !== undefined
}
