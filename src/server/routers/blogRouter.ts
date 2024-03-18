import { randomUUID } from "crypto"
import { db } from "@/db"
import { articleComments, articleLikes } from "@/db/schema"
import { and, eq, isNull } from "drizzle-orm"
import { Session } from "next-auth"
import { z } from "zod"

import { LikeData } from "@/types/blog"
import { auth } from "@/lib/auth"
import { getInfiniteBlogs } from "@/lib/blogs"
import { CommentProps } from "@/app/(Article)/article/_BlogInteraction/Comment"

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
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }): Promise<LikeData> => {
      const session = await auth()

      // Get the current likes for the article only.
      const currentLikes = await db.query.articleLikes.findMany({
        where: and(
          eq(articleLikes.articleSlug, input.slug),
          isNull(articleLikes.commentId)
        ),
      })
      const articleLiked = currentLikes.filter(
        (currentLike) => currentLike.userId === session?.user.id
      ).length

      // Return the Like Data in this format
      return { likes: currentLikes.length, isLiked: !!articleLiked }
    }),

  updateArticleLikes: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        session: z.custom<Session | null>(),
        isLiked: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.isLiked) {
        await db
          .delete(articleLikes)
          .where(
            and(
              eq(articleLikes.articleSlug, input.slug),
              eq(articleLikes.userId, input.session?.user.id!),
              isNull(articleLikes.commentId)
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
  getCommentsData: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      // filter for this slug
      const data = await db.query.articleComments.findMany({
        with: {
          likes: true,
          author: true,
          replies: {
            with: {
              author: true,
              likes: true,
            },
          },
        },
        where: eq(articleComments.articleSlug, input.slug),
      })

      return data.reverse()
    }),
  updateCommentLikes: publicProcedure
    .input(z.custom<CommentProps>())
    .mutation(async ({ input }) => {
      const session = await auth()

      const isLiked = !!input.comment.likes.filter(
        (currentLike) => currentLike.userId === session?.user.id
      ).length

      if (isLiked) {
        await db
          .delete(articleLikes)
          .where(
            and(
              eq(articleLikes.articleSlug, input.comment.articleSlug),
              eq(articleLikes.userId, session?.user.id!),
              eq(articleLikes.commentId, input.comment.id)
            )
          )

        return 0
      } else {
        await db.insert(articleLikes).values({
          articleSlug: input.comment.articleSlug,
          userId: session?.user.id!,
          commentId: input.comment.id,
        })
        return 1
      }
    }),
  addComment: publicProcedure
    .input(
      z.object({
        body: z.string(),
        slug: z.string(),
        replyingTo: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await auth()
      await db.insert(articleComments).values({
        id: randomUUID(),
        articleSlug: input.slug,
        userId: session?.user.id!,
        body: input.body,
        parentId: input.replyingTo,
      })
    }),
  deleteComment: publicProcedure
    .input(z.custom<CommentProps>())
    .mutation(async ({ input }) => {
      await db
        .delete(articleComments)
        .where(eq(articleComments.id, input.comment.id))
    }),
})
