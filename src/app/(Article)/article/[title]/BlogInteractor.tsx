"use client"

import { Session } from "next-auth"

import { Card } from "@/components/ui/card"

import { CommentButton } from "./CommentButton"
import { LikeButton } from "./LikeButton"
import { ShareButton } from "./ShareButton"

interface BlogInteractorProps {
  currentSlug: string
  session: Session | null
}

export const BlogInteractor = ({
  currentSlug,
  session,
}: BlogInteractorProps) => {
  return (
    <Card className="mb-5 mt-10 flex space-x-6 justify-around items-center">
      <LikeButton currentSlug={currentSlug} session={session} />
      <CommentButton />
      <ShareButton currentSlug={currentSlug} />
    </Card>
  )
}
