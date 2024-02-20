"use client"

import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { BlogCard } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { trpc } from "../_trpc/client"
import ArticleCard from "./ArticleCard"
import { ArticleCardsShell } from "./ArticleCardShell"

const articlesPerPage = 6

interface ArticleCardProps {
  category?: BlogCard["category"] | string | undefined
}

export default function ArticleCards({ category }: ArticleCardProps) {
  const { ref, inView } = useInView()

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    trpc.blogRouter.getInfinitePosts.useInfiniteQuery(
      {
        limit: articlesPerPage,
        category,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, hasNextPage])
  const blogs = data?.pages.flatMap((page) => page.blogs)

  return (
    <>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center ${isFetching && !isFetchingNextPage ? "gap-28" : "gap-y-24"}`}
      >
        {isFetching && !isFetchingNextPage ? (
          <ArticleCardsShell />
        ) : (
          blogs?.map((blogCard) => (
            <ArticleCard key={blogCard._id} {...blogCard} />
          ))
        )}
      </div>
      <Button variant={"ghost"} ref={ref}></Button>
    </>
  )
}
