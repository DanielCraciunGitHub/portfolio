"use client"

import Link from "next/link"
import { siteConfig } from "@/config"
import { trpc } from "@/server/client"
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
      <div className="pb-2 text-xl font-bold text-primary md:text-center md:text-4xl">
        Comments
      </div>
      <div className="space-y-2">
        {commentsData?.map((comment) => {
          return (
            <div key={comment.id} className={"grid grid-cols-12 grid-rows-1"}>
              <Link
                className={cn(
                  buttonVariants(),
                  "col-span-1 h-full w-full rounded-r-none"
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
                <Card className="flex items-center space-x-2 rounded-none p-4">
                  <Avatar>
                    <AvatarImage src={comment.author.image!} />
                    <AvatarFallback>
                      {getInitials(comment.author.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-xs text-muted-foreground">
                      {formatTimeToNow(new Date(comment.updatedAt!))}
                    </div>
                    <div>
                      <span className="text-primary">
                        {comment.author.name}
                      </span>{" "}
                      Has commented on your article.
                    </div>
                    <div className="rounded bg-muted/50 p-2 text-lg italic">
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
                className="col-span-1 h-full w-full rounded-l-none"
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
