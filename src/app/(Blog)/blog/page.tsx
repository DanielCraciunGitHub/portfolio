import { BlogCard } from "@/types/blog"
import { client } from "@/lib/sanity/lib/client"

import ArticleCards from "../ArticleCards"

export const revalidate = 10

async function getBlogs(page = 1) {
  const query = `*[_type == "blog"] | order(_createdAt desc) {
        title,
        subtitle,
        category,
        description,
        "currentSlug": slug.current,
        image,
      }[${(page - 1) * 6}...${page * 6}]
    `
  const blogs = await client.fetch<BlogCard[]>(query)

  console.log(blogs)

  return blogs
}

export default async function page() {
  //const blogs = await getBlogs()
  return (
    <>
      {/* <div>Todo: Search</div> */}
      <ArticleCards />
    </>
  )
}
