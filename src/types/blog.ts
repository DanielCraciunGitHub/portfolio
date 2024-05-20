import { articleComments, articleLikes, users } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Image, TypedObject } from "sanity";

type Category = "Web Development" | "Organisation" | "Self Development";

interface Author {
  name: string;
  avatar?: Image;
  discord?: string;
}

export interface BlogCard {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  author?: Author;
  title: string;
  subtitle?: string;
  category: Category;
  image: Image;
  currentSlug: string;
}
export interface Article {
  _id: string;
  _createdAt: string;
  author?: Author;
  title: string;
  subtitle?: string;
  category: Category;
  content: TypedObject[];
  image: Image;
  currentSlug: string;
  canonical?: string;
}
export type LikeData = { likes: number; isLiked: boolean };

export type ArticleLike = InferSelectModel<typeof articleLikes>;
export type ArticleComment = InferSelectModel<typeof articleComments>;
export type User = InferSelectModel<typeof users>;

export type Reply = ArticleComment & {
  author: User;
  likes: ArticleLike[];
};

export type TopComment = ArticleComment & {
  author: User;
  likes: ArticleLike[];
  replies: Reply[];
};
