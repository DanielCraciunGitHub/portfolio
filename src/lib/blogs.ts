import { groq } from "next-sanity"

import { Article, BlogCard } from "@/types/blog"

import { client } from "../../sanity/lib/client"

export async function getBlogs(
  cursor: string,
  limit: number,
  category?: string
) {
  const query = groq`*[_type == "blog" && _createdAt < $cursor${category ? ` && category == $category` : ""}] | order(_createdAt desc) [${0}...${limit}]{
            _id,
            _createdAt,
            title,
            subtitle,
            category,
            description,
            "currentSlug": slug.current,
            image,
          }`
  // console.log(query)

  const blogs = await client.fetch<BlogCard[]>(query, {
    cursor,
    category: category ?? "",
  })

  return blogs
}
export async function getCurrentArticle(slug: string) {
  const query = groq`*[_type == "blog" && slug.current == $slug] {
    "currentSlug": slug.current,
    _createdAt,
    title,
    subtitle,
    category,
    image,
    description,
    content
}[0]
`
  const article = await client.fetch<Article>(query, { slug })

  return article
}
