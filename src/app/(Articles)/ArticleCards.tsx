/* eslint-disable no-nested-ternary */

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { siteConfig } from "@/config"
import { useInView } from "react-intersection-observer"
import ArticleCard from "src/app/(Articles)/ArticleCard"
import { ArticleCardsShell } from "src/app/(Articles)/ArticleCardShell"
import { KeybindsModal } from "src/app/(Articles)/KeybindsModal"
import { SearchBar } from "src/app/(Articles)/SearchBar"
import { api } from "src/server/client"

import type { BlogCard } from "@/types/blog"
import { Button } from "@/components/ui/button"

const articlesPerPage = 6

interface ArticleCardProps {
  category?: BlogCard["category"] | string | undefined
}

export default function ArticleCards({ category }: ArticleCardProps) {
  const { ref, inView } = useInView()
  const [searchTitle, setSearchTitle] = useState<string | undefined>()

  const updateSearchTitle = (title: string) => {
    setSearchTitle(title)
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = api.blogRouter.getInfinitePosts.useInfiniteQuery(
    {
      limit: articlesPerPage,
      category,
      title: searchTitle,
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
    <div className="relative flex flex-col items-center">
      <div className="flex">
        <SearchBar updateSearchTitle={updateSearchTitle} />
        <KeybindsModal />
      </div>
      <div className="mt-6 grid grid-cols-1 place-items-center gap-20 lg:grid-cols-2 2xl:grid-cols-3">
        {isError ? (
          <div className="flex flex-col">
            <div>
              <div className="text-3xl font-extrabold text-red-500">
                Articles are not loading?
              </div>
              <Link
                className="text-blue-500 underline"
                href={`${siteConfig.url}/blog`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Please try this URL
              </Link>
            </div>
          </div>
        ) : isFetching && !isFetchingNextPage ? (
          <ArticleCardsShell />
        ) : (
          blogs?.map((blogCard) => (
            // eslint-disable-next-line no-underscore-dangle
            <ArticleCard key={blogCard._id} {...blogCard} />
          ))
        )}
      </div>
      <Button
        className="absolute bottom-64"
        variant="ghost"
        ref={ref}
        tabIndex={-1}
      />
    </div>
  )
}
