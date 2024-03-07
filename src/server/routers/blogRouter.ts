import { db } from "@/db"
import { articleLikes } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { Session } from "next-auth"
import { z } from "zod"

import { getInfiniteBlogs } from "@/lib/blogs"

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
      const blogs = await getInfiniteBlogs(
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
  getArticleLikeData: publicProcedure
    .input(z.object({ slug: z.string(), session: z.custom<Session | null>() }))
    .query(async ({ input }) => {
      const likes = (
        await db
          .select()
          .from(articleLikes)
          .where(eq(articleLikes.articleSlug, input.slug))
      ).length
      const articleLiked = (
        await db
          .select()
          .from(articleLikes)
          .where(
            and(
              eq(articleLikes.articleSlug, input.slug),
              eq(articleLikes.userId, input.session?.user.id ?? "")
            )
          )
      ).length

      if (articleLiked) {
        return { likes, fill: "red" }
      }
      return { likes, fill: "none" }
    }),
  updateArticleLikes: publicProcedure
    .input(z.object({ slug: z.string(), session: z.custom<Session | null>() }))
    .mutation(async ({ input }) => {
      // get current like state for the user and article
      const articleLiked = (
        await db
          .select()
          .from(articleLikes)
          .where(
            and(
              eq(articleLikes.articleSlug, input.slug),
              eq(articleLikes.userId, input.session?.user.id ?? "")
            )
          )
      ).length

      if (articleLiked) {
        await db
          .delete(articleLikes)
          .where(
            and(
              eq(articleLikes.articleSlug, input.slug),
              eq(articleLikes.userId, input.session?.user.id!)
            )
          )
        return 0
      } else {
        await db.insert(articleLikes).values({
          articleSlug: input.slug,
          userId: input.session?.user.id!,
        })
        return 1
      }
    }),
})
