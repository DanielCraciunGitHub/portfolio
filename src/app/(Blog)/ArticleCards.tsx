"use client"

import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { BlogCard } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { trpc } from "../_trpc/client"
import ArticleCard from "./ArticleCard"

const articlesPerPage = 6

export default function ArticleCards() {
  const { ref, inView } = useInView()

  const { data, fetchNextPage } =
    trpc.blogRouter.getInfinitePosts.useInfiniteQuery(
      {
        limit: articlesPerPage,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextId,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const renderBlogs = (inputCategory: BlogCard["category"]) => {
    const allBlogs = data?.pages.flatMap((page) => page.blogs)

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-8">
        {allBlogs?.map((blogCard) => (
          <ArticleCard key={blogCard._id} {...blogCard} />
        ))}
      </div>
    )
  }
  return (
    <Tabs defaultValue="Web Development" className="flex flex-col items-center">
      <TabsList>
        <TabsTrigger value="Web Development">Web Development</TabsTrigger>
        <TabsTrigger value="Organisation">Organisation</TabsTrigger>
        <TabsTrigger value="Self Development">Self Development</TabsTrigger>
      </TabsList>
      <TabsContent value="Web Development">
        {renderBlogs("Web Development")}
      </TabsContent>
      <TabsContent value="Organisation">
        {renderBlogs("Organisation")}
      </TabsContent>
      <TabsContent value="Self Development">
        {renderBlogs("Self Development")}
      </TabsContent>
      <Button ref={ref} variant={"ghost"}></Button>
    </Tabs>
  )
}
