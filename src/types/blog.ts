import { articleComments, articleLikes } from "@/db/schema"
import { InferSelectModel } from "drizzle-orm"
import { Image, TypedObject } from "sanity"

type Category = "Web Development" | "Organisation" | "Self Development"

export interface BlogCard {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  subtitle?: string
  category: Category
  image: Image
  currentSlug: string
}
export interface Article {
  _id: string
  _createdAt: string
  title: string
  subtitle?: string
  category: Category
  content: TypedObject[]
  image: Image
  currentSlug: string
}

export type Like = InferSelectModel<typeof articleLikes>
export type Comment = InferSelectModel<typeof articleComments>

export type LikeData = { likes: number; isLiked: boolean }
