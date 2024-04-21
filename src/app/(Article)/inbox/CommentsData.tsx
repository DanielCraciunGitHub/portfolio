"use client"

import Link from "next/link"
import { siteConfig } from "@/config"
import { Check, Mail, X } from "lucide-react"

import {
  articleSlugToTitle,
  cn,
  formatTimeToNow,
  getInitials,
} from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { trpc } from "@/app/_trpc/client"

export const CommentsData = () => {
  const { data: commentsData, refetch: revalidateInboxComments } =
    trpc.blogRouter.fetchInboxComments.useQuery(undefined, {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    })
  const { mutate: resolveComment } = trpc.blogRouter.resolveComment.useMutation(
    {
      onSuccess: () => {
        revalidateInboxComments()
      },
    }
  )

  return (
    <div>
      <div className="text-primary md:text-center md:text-4xl text-xl font-bold pb-2">
        Comments
      </div>
      <div className="space-y-2">
        {commentsData?.map((comment) => {
          return (
            <div key={comment.id} className={"grid grid-cols-12 grid-rows-1"}>
              <Link
                className={cn(
                  buttonVariants(),
                  "w-full h-full col-span-1 rounded-r-none"
                )}
                href={`mailto:${comment.author.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail />
              </Link>
              <Link
                href={`${siteConfig.url}/article/${comment.articleSlug}?id=${comment.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-10"
              >
                <Card className="flex items-center space-x-2 p-4 rounded-none">
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
                    <div className="italic text-lg bg-muted/50 rounded p-2">
                      {comment.body}
                    </div>
                    <div className="text-blue-500 underline">
                      {articleSlugToTitle(comment.articleSlug)}
                    </div>
                  </div>
                </Card>
              </Link>

              <Button
                onClick={() =>
                  resolveComment({
                    id: comment.id,
                    resolved: comment.resolved!,
                  })
                }
                className="w-full h-full col-span-1 rounded-l-none"
                variant={`${comment.resolved ? "destructive" : "default"}`}
              >
                {comment.resolved ? <X /> : <Check />}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
