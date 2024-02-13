import { Image } from "sanity"

export interface BlogCard {
  _id: string
  _createdAt: string
  title: string
  subtitle: string
  category: "Web Development" | "Organisation" | "Self Development"
  image: Image
  currentSlug: string
}
