import { groq } from "next-sanity";

import { Article, BlogCard } from "@/types/blog";

import { client } from "../../sanity/lib/client";

export async function getInfiniteBlogs(
  cursor: string,
  limit: number,
  category?: string,
) {
  const query = groq`*[_type == "blog" && _createdAt < $cursor${category ? ` && category == $category` : ""}] | order(_createdAt desc) [${0}...${limit}]{
            _id,
            _createdAt,
            _updatedAt,
            author,
            title,
            subtitle,
            category,
            "currentSlug": slug.current,
            image,
          }`;

  const blogs = await client.fetch<BlogCard[]>(query, {
    cursor,
    category: category ?? "",
  });

  return blogs;
}

export async function getBlogs() {
  const query = groq`*[_type == "blog"] | order(_createdAt desc) {
            _id,
            _createdAt,
            _updatedAt,
            title,
            subtitle,
            category,
            "currentSlug": slug.current,
            image,
          }`;

  const blogs = await client.fetch<BlogCard[]>(query);

  return blogs;
}

export async function getCurrentArticle(slug: string) {
  const query = groq`*[_type == "blog" && slug.current == $slug] {
    "currentSlug": slug.current,
    _createdAt,
    _updatedAt,
    author,
    title,
    subtitle,
    category,
    image,
    content,
    canonical
}[0]
`;
  const article = await client.fetch<Article>(query, { slug });

  return article;
}
export async function getArticleMetadata(slug: string) {
  const query = groq`*[_type == "blog" && slug.current == $slug] {
    "currentSlug": slug.current,
    author,
    title,
    subtitle,
    category,
    image,
    canonical
}[0]
`;
  const article = await client.fetch<
    Omit<Article, "_id" | "content" | "_createdAt">
  >(query, { slug });

  return article;
}
