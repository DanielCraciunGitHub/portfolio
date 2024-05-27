"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { BlogCard } from "@/types/blog";
import { Button } from "@/components/ui/button";

import { trpc } from "../../server/client";
import ArticleCard from "./ArticleCard";
import { ArticleCardsShell } from "./ArticleCardShell";
import { SearchBar } from "./SearchBar";
import { KeybindsModal } from "./KeybindsModal";

const articlesPerPage = 6;

interface ArticleCardProps {
  category?: BlogCard["category"] | string | undefined;
}

export default function ArticleCards({ category }: ArticleCardProps) {
  const { ref, inView } = useInView();
  const [searchTitle, setSearchTitle] = useState<string | undefined>();

  const updateSearchTitle = (title: string) => {
    setSearchTitle(title);
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    trpc.blogRouter.getInfinitePosts.useInfiniteQuery(
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
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);
  const blogs = data?.pages.flatMap((page) => page.blogs);

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex">
        <SearchBar updateSearchTitle={updateSearchTitle} />
        <KeybindsModal />
      </div>
      <div
        className={`mt-6 grid grid-cols-1 place-items-center gap-20 gap-x-36 lg:grid-cols-2 2xl:grid-cols-3`}
      >
        {isFetching && !isFetchingNextPage ? (
          <ArticleCardsShell />
        ) : (
          blogs?.map((blogCard) => (
            <ArticleCard key={blogCard._id} {...blogCard} />
          ))
        )}
      </div>
      <Button
        className="absolute bottom-64"
        variant="ghost"
        ref={ref}
        tabIndex={-1}
      ></Button>
    </div>
  );
}
