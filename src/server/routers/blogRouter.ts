import { z } from "zod"

import { getBlogs } from "@/lib/blogs"

import { publicProcedure, router } from "../trpc"

export const blogRouter = router({
  getInfinitePosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(6),
        cursor: z.string().nullish(),
        category: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const blogs = await getBlogs(
        input.cursor ?? Date.toString(),
        input.limit,
        input.category
      )

      let nextId
      if (blogs.length < input.limit) {
        nextId = null
      } else {
        nextId = blogs[blogs.length - 1]._createdAt
      }

      return {
        blogs,
        nextId,
      }
    }),
})
