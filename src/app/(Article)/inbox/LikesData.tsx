import Link from "next/link"
import { siteConfig } from "@/config"

import { articleSlugToTitle, formatTimeToNow, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { serverClient } from "@/app/_trpc/serverClient"

interface LikesDataProps {}

export const LikesData = async ({}: LikesDataProps) => {
  const likesData = await serverClient.blogRouter.fetchInboxLikes()

  return (
    <div>
      <div className="md:text-center md:text-4xl text-xl font-bold pb-2">
        Article Likes
      </div>
      <div className="space-y-2">
        {likesData.map((like) => {
          return (
            <div key={like.id} className="grid grid-cols-12 grid-rows-1">
              <Link
                href={`${siteConfig.url}/article/${like.articleSlug}`}
                className="col-span-full"
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
    </div>
  )
}
