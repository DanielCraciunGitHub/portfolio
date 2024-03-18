"use client"

import { useScrollUp } from "@/hooks/useScrollUp"
import { Card } from "@/components/ui/card"

import { ArticleLikeButton } from "./ArticleLikeButton"
import { CommentSection } from "./CommentSection"
import { ShareButton } from "./ShareButton"

export const BlogInteractor = () => {
  const { scrollY, scrollingUp } = useScrollUp()

  // When (100-scrollThreshold)% from the bottom of the screen, show the interactor
  const scrollThreshold = 0.85

  return (
    <Card
      className={`dark:bg-gray-500 bg-gray-200 mb-5 mt-10 flex space-x-6 justify-around items-center sticky bottom-5 transition ease-in-out duration-300 ${scrollingUp || scrollY + window.innerHeight >= document.documentElement.scrollHeight * scrollThreshold ? "-translate-y-1" : "invisible"}`}
    >
      <ArticleLikeButton />
      <CommentSection />
      <ShareButton />
    </Card>
  )
}
