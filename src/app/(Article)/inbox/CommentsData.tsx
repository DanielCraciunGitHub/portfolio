import Link from "next/link"
import { siteConfig } from "@/config"

import { articleSlugToTitle, formatTimeToNow, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { serverClient } from "@/app/_trpc/serverClient"

interface CommentsDataProps {}

export const CommentsData = async ({}: CommentsDataProps) => {
  const commentsData = await serverClient.blogRouter.fetchInboxComments()

  return commentsData.map((comment) => {
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
                <span className="text-primary">{comment.author.name}</span> Has
                commented on your article.
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
  })
}
