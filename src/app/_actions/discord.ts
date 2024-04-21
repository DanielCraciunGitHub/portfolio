"use server"

import { siteConfig } from "@/config"
import { env } from "@/env.mjs"

import { articleSlugToTitle } from "@/lib/utils"

interface Payload {
  commentId: string
  body: string
  slug: string
}

export const sendCheckComments = async ({ body, slug, commentId }: Payload) => {
  try {
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Comment Received ✅",
            description: `[Check Inbox](${siteConfig.url}/inbox)`,
            fields: [
              {
                name: "Article",
                value: `[${articleSlugToTitle(slug)}](${siteConfig.url}/article/${slug}?id=${commentId})`,
              },
              {
                name: "Message",
                value: body,
              },
            ],
          },
        ],
      }),
    })
  } catch (error: any) {
    console.log(error.message)
  }
}
