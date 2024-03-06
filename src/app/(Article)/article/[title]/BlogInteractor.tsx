"use client"

import { Card } from "@/components/ui/card"

import { CommentButton } from "./CommentButton"
import { LikeButton } from "./LikeButton"
import { ShareButton } from "./ShareButton"

interface BlogInteractorProps {
  currentSlug: string
}

export const BlogInteractor = ({ currentSlug }: BlogInteractorProps) => {
  return (
    <Card className="mb-10 flex space-x-6 justify-around items-center">
      <LikeButton currentSlug={currentSlug} />
      <CommentButton />
      <ShareButton currentSlug={currentSlug} />
    </Card>
  )
}
