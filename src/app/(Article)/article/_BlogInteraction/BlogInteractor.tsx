"use client";

import { ArticleLikeButton } from "src/app/(Article)/article/_BlogInteraction/ArticleLikeButton";
import { CommentSection } from "src/app/(Article)/article/_BlogInteraction/CommentSection";
import { ShareButton } from "src/app/(Article)/article/_BlogInteraction/ShareButton";

import { useScrollUp } from "@/hooks/useScrollUp";
import { Card } from "@/components/ui/card";

export const BlogInteractor = () => {
  const { scrollY, scrollingUp } = useScrollUp();

  // When (100-scrollThreshold)% from the bottom of the screen, show the interactor
  const scrollThreshold = 0.85;

  const isVisible =
    scrollingUp ||
    scrollY + window.innerHeight >=
      document.documentElement.scrollHeight * scrollThreshold;

  return (
    <Card
      className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transform transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0"
      }`}
    >
      <div className="flex items-center space-x-1 rounded-md border border-border/50 bg-background/95 px-4 py-3 shadow-lg backdrop-blur-md">
        <ArticleLikeButton />
        <div className="mx-2 h-6 w-px bg-border/50" />
        <CommentSection />
        <div className="mx-2 h-6 w-px bg-border/50" />
        <ShareButton />
      </div>
    </Card>
  );
};
