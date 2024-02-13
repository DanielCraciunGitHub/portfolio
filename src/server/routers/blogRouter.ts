import { groq } from "next-sanity"
import { z } from "zod"

import { BlogCard } from "@/types/blog"
import { client } from "@/lib/sanity/lib/client"

import { publicProcedure, router } from "../trpc"

async function getBlogs(cursor: string, limit: number) {
  const query = groq`*[_type == "blog" && _createdAt < $cursor] | order(_createdAt desc) [${0}...${limit}]{
          _id,
          _createdAt,
          title,
          subtitle,
          category,
          description,
          "currentSlug": slug.current,
          image,
        }`
  const blogs = await client.fetch<BlogCard[]>(query, { cursor })

  return blogs
}

export const blogRouter = router({
  getInfinitePosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(6),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const blogs = await getBlogs(input.cursor ?? Date.toString(), input.limit)

      const nextId = blogs[blogs.length - 1]._createdAt

      console.log(blogs)

      return {
        blogs,
        nextId,
      }
    }),
})
