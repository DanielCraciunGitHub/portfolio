import ArticleCards from "../ArticleCards"

export const revalidate = 10

export default async function page() {
  return <ArticleCards />
}
