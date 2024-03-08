"use client"

import { Session } from "next-auth"

import { useScrollUp } from "@/hooks/useScrollUp"
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
  const { scrollY, scrollingUp } = useScrollUp()

  // When (100-scrollThreshold)% from the bottom of the screen, show the interactor
  const scrollThreshold = 0.85

  return (
    <Card
      className={`dark:bg-gray-500 bg-gray-200 mb-5 mt-10 flex space-x-6 justify-around items-center sticky bottom-5 transition ease-in-out duration-300 ${scrollingUp || scrollY + window.innerHeight >= document.documentElement.scrollHeight * scrollThreshold ? "-translate-y-1" : "invisible"}`}
    >
      <LikeButton currentSlug={currentSlug} session={session} />
      <CommentButton />
      <ShareButton currentSlug={currentSlug} />
    </Card>
  )
}
