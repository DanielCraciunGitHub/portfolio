import { client } from "../../../../../lib/sanity/lib/client"

async function getBlogs() {
  const query = `*[_type == "blog"] | order(_createdAt desc) {
        title,
        subtitle,
        description,
        "currentSlug": slug.current,
        image,
      }
    `
  const data = await client.fetch(query)

  return data
}

export default async function page() {
  const data = await getBlogs()

  return <div>test</div>
}
