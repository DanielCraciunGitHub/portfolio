/* eslint-disable no-nested-ternary */

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config";
import { useAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import ArticleCard from "src/app/(Articles)/ArticleCard";
import { ArticleCardsShell } from "src/app/(Articles)/ArticleCardShell";
import { api } from "src/server/client";

import type { BlogCard } from "@/types/blog";
import { searchAtom } from "@/hooks/searchAtoms";

const articlesPerPage = 6;

interface ArticleCardProps {
  category?: BlogCard["category"] | string | undefined;
}

export default function ArticleCards({ category }: ArticleCardProps) {
  const { ref, inView } = useInView();
  const [searchTitle] = useAtom(searchAtom);

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
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);
  const blogs = data?.pages.flatMap((page) => page.blogs);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {isError ? (
          <div className="col-span-full">
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-12 text-center">
              <div className="mb-4 text-2xl font-bold text-destructive">
                Articles are not loading?
              </div>
              <p className="mb-4 text-muted-foreground">
                There seems to be an issue loading the articles. Please try
                the direct link below.
              </p>
              <Link
                className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                href={`${siteConfig.url}/blog`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Try this URL
                <ArrowRight className="size-4" />
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

      {/* Loading trigger */}
      <div
        ref={ref}
        className="mt-8 flex h-20 items-center justify-center"
      >
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
            Loading more articles...
          </div>
        )}
      </div>
    </div>
  );
}
