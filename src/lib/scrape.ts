import { siteConfig } from "@/config"
import { parse } from "node-html-parser"

export const fetchFollowersCount = async () => {
  try {
    const url = siteConfig.socialLinks[0].href
    const res = await fetch(`${url}/followers`, { method: "GET" })
    const data = await res.text()

    const root = parse(data)

    const followersText = root.querySelector('h2:contains("Followers")')?.text

    // Extract the number from the text, e.g., "11.9K followers"
    const followersCount = followersText?.split(" ")[0]

    return followersCount
  } catch (error) {
    console.error("Error fetching followers count:", error)
    return null
  }
}
