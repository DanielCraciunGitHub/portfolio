import {
  articleComments,
  articleLikes,
  articleViews,
  users,
} from "@/db/schema";
import { env } from "@/env.mjs";
import { and, asc, eq, isNull, or } from "drizzle-orm";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "src/server/trpc";
import { ulid } from "ulid";
import { z } from "zod";

import type { LikeData } from "@/types/blog";
import { getInfiniteBlogs } from "@/lib/blogs";
import { sqliteTimestampNow } from "@/lib/utils";
import { sendInbox, sendPublishedPost } from "@/app/_actions/discord";
import type { CommentProps } from "@/app/(Article)/article/_BlogInteraction/Comment";

export const blogRouter = createTRPCRouter({
  getInfinitePosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(6),
        cursor: z.string().nullish(),
        category: z.string().optional(),
        title: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const blogs = await getInfiniteBlogs(
        input.cursor ?? Date.toString(),
        input.limit,
        input.category,
        input.title
      );

      let nextId;
      if (blogs.length < input.limit) {
        nextId = null;
      } else {
        // eslint-disable-next-line no-underscore-dangle
        nextId = blogs[blogs.length - 1]?._createdAt;
      }

      return {
        blogs,
        nextId,
      };
    }),

  getArticleLikeData: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }): Promise<LikeData> => {
      const { db, session } = ctx;

      // Get the current likes for the article only.
      const currentLikes = await db.query.articleLikes.findMany({
        where: and(
          eq(articleLikes.articleSlug, input.slug),
          isNull(articleLikes.commentId)
        ),
      });
      const articleLiked = currentLikes.filter(
        (currentLike) => currentLike.userId === session?.user.id
      ).length;

      // Return the Like Data in this format
      return { likes: currentLikes.length, isLiked: !!articleLiked };
    }),

  updateArticleLikes: protectedProcedure
    .input(z.object({ slug: z.string(), isLiked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      if (input.isLiked) {
        await db
          .delete(articleLikes)
          .where(
            and(
              eq(articleLikes.articleSlug, input.slug),
              eq(articleLikes.userId, session.user.id),
              isNull(articleLikes.commentId)
            )
          );

        return 0;
      }
      await db.insert(articleLikes).values({
        articleSlug: input.slug,
        userId: session.user.id,
      });
      return 1;
    }),
  getCommentsData: publicProcedure
    .input(z.object({ slug: z.string() }))

    .query(async ({ ctx, input }) => {
      const { db } = ctx;

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
      });

      return data.reverse();
    }),
  updateCommentLikes: protectedProcedure
    .input(z.custom<CommentProps>())
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      const isLiked = !!input.comment.likes.filter(
        (currentLike) => currentLike.userId === session.user.id
      ).length;

      if (isLiked) {
        await db
          .delete(articleLikes)
          .where(
            and(
              eq(articleLikes.articleSlug, input.comment.articleSlug),
              eq(articleLikes.userId, session.user.id),
              eq(articleLikes.commentId, input.comment.id)
            )
          );

        return 0;
      }
      await db.insert(articleLikes).values({
        articleSlug: input.comment.articleSlug,
        userId: session.user.id,
        commentId: input.comment.id,
      });
      return 1;
    }),
  addComment: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        slug: z.string(),
        replyingToId: z.string().optional(),
        replyingTo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      const [user] = await db
        .insert(articleComments)
        .values({
          id: ulid(),
          articleSlug: input.slug,
          userId: session.user.id,
          body: input.body,
          parentId: input.replyingToId,
          replyingTo: input.replyingTo,
        })
        .returning();

      await sendInbox({
        body: input.body,
        slug: input.slug,
        commentId: user?.id!,
      });

      return { newCommentId: user?.id };
    }),
  deleteComment: protectedProcedure
    .input(z.custom<CommentProps>())
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      await db
        .delete(articleComments)
        .where(eq(articleComments.id, input.comment.id));
    }),
  editComment: protectedProcedure
    .input(
      z.intersection(
        z.object({ body: z.string() }),
        z.custom<CommentProps>()
      )
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      await db
        .update(articleComments)
        .set({
          body: input.body,
          updatedAt: sqliteTimestampNow(),
          isEdited: 1,
        })
        .where(eq(articleComments.id, input.comment.id));
    }),

  fetchInboxLikes: adminProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const likes = await db.query.articleLikes.findMany({
      with: {
        liker: true,
      },
      where: isNull(articleLikes.commentId),
    });

    return likes;
  }),

  fetchInboxComments: adminProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const [daniel] = await db
      .select()
      .from(users)
      .where(eq(users.email, env.NODEMAILER_EMAIL));

    // replies or top-level comments to me
    const comments = await db.query.articleComments.findMany({
      with: {
        replyTo: true,
        author: true,
      },
      where: or(
        isNull(articleComments.parentId),
        eq(articleComments.replyingTo, daniel?.name!)
      ),
      orderBy: asc(articleComments.resolved),
    });

    return comments;
  }),

  resolveComment: protectedProcedure
    .input(z.object({ id: z.string(), resolved: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      await db
        .update(articleComments)
        .set({ resolved: !input.resolved })
        .where(eq(articleComments.id, input.id));
    }),

  getArticleViews: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        authors: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const [data] = await db
        .select({ views: articleViews.views })
        .from(articleViews)
        .where(eq(articleViews.articleSlug, input.slug));

      if (!data) {
        await db.insert(articleViews).values({ articleSlug: input.slug });

        await sendPublishedPost({
          slug: input.slug,
          authors: input.authors,
        });
        return 0;
      }

      return data.views;
    }),

  addArticleView: publicProcedure
    .input(z.object({ views: z.number(), slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      await db
        .update(articleViews)
        .set({ views: input.views + 1 })
        .where(eq(articleViews.articleSlug, input.slug));
    }),
});
