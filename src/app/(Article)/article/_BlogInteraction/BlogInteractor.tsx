"use client";

import { useScrollUp } from "@/hooks/useScrollUp";
import { Card } from "@/components/ui/card";

import { ArticleLikeButton } from "./ArticleLikeButton";
import { CommentSection } from "./CommentSection";
import { ShareButton } from "./ShareButton";

export const BlogInteractor = () => {
  const { scrollY, scrollingUp } = useScrollUp();

  // When (100-scrollThreshold)% from the bottom of the screen, show the interactor
  const scrollThreshold = 0.85;

  return (
    <Card
      className={`sticky bottom-5 mb-5 mt-10 flex items-center justify-around space-x-6 bg-muted-foreground transition duration-300 ease-in-out dark:bg-gray-500 ${scrollingUp || scrollY + window.innerHeight >= document.documentElement.scrollHeight * scrollThreshold ? "-translate-y-1" : "invisible"}`}
    >
      <ArticleLikeButton />
      <CommentSection />
      <ShareButton />
    </Card>
  );
};
