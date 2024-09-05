"use client"

import { ArticleLikeButton } from "src/app/(Article)/article/_BlogInteraction/ArticleLikeButton"
import { CommentSection } from "src/app/(Article)/article/_BlogInteraction/CommentSection"
import { ShareButton } from "src/app/(Article)/article/_BlogInteraction/ShareButton"

import { useScrollUp } from "@/hooks/useScrollUp"
import { Card } from "@/components/ui/card"

export const BlogInteractor = () => {
  const { scrollY, scrollingUp } = useScrollUp()

  // When (100-scrollThreshold)% from the bottom of the screen, show the interactor
  const scrollThreshold = 0.85

  return (
    <Card
      className={`sticky bottom-5 mb-5 mt-10 flex items-center justify-around space-x-6 border-none bg-muted-foreground text-white transition duration-300 ease-in-out dark:bg-gray-500 ${scrollingUp || scrollY + window.innerHeight >= document.documentElement.scrollHeight * scrollThreshold ? "-translate-y-1" : "invisible"}`}
    >
      <ArticleLikeButton />
      <CommentSection />
      <ShareButton />
    </Card>
  )
}
