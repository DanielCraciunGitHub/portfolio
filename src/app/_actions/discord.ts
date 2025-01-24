"use server"

import { siteConfig } from "@/config"
import { env } from "@/env.mjs"
import type { z } from "zod"

import { articleSlugToTitle } from "@/lib/utils"
import type { writeForUsFormSchema } from "@/lib/validations/form"

interface InboxPayload {
  commentId: string
  body: string
  slug: string
}

type WriterPayload = z.infer<typeof writeForUsFormSchema>

interface PublishedPayload {
  slug: string
  authors?: string
}

interface WelcomePayload {
  name: string
  email: string
}

export const sendInbox = async ({ body, slug, commentId }: InboxPayload) => {
  try {
    await fetch(env.DISCORD_WEBHOOK_URL_INBOX, {
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
    /* empty catch */
  }
}
export const sendWelcome = async ({ name, email }: WelcomePayload) => {
  try {
    await fetch(env.DISCORD_WEBHOOK_URL_INBOX, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "NEW DANIELFULLSTACK USER Alert 🚨",
            fields: [
              {
                name: "Name",
                value: `${name}`,
                inline: true,
              },
              {
                name: "email",
                value: `mailto:${email}`,
                inline: true,
              },
            ],
          },
        ],
      }),
    })
  } catch (error: any) {
    /* empty catch */
  }
}
export const sendWriterSubmission = async (writerSubmission: WriterPayload) => {
  try {
    await fetch(env.DISCORD_WEBHOOK_URL_WRITER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Submission Received ✅",
            fields: [
              {
                name: "Discord",
                value: `@${writerSubmission.discord}`,
                inline: true,
              },
              {
                name: "Email",
                value: `${writerSubmission.email ? `mailto:${writerSubmission.email}` : "N/A"}`,
                inline: true,
              },
              {
                name: "Article Link",
                value: writerSubmission.articleLink,
              },
              {
                name: "Name?",
                value: writerSubmission.namePermission,
                inline: true,
              },
              {
                name: "Profile Pic?",
                value: writerSubmission.profilePicturePermission,
                inline: true,
              },
              {
                name: "Additional Details",
                value: writerSubmission.otherDetails ?? "N/A",
              },
            ],
          },
        ],
      }),
    })
  } catch (error: any) {
    /* empty catch */
  }
}
export const sendPublishedPost = async (published: PublishedPayload) => {
  try {
    await fetch(env.DISCORD_WEBHOOK_URL_PUBLISH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Check out this new article published by ${published.authors ?? "Daniel Craciun"}!\n\n${siteConfig.url}/article/${published.slug}`,
      }),
    })
  } catch (error: any) {
    /* empty catch */
  }
}
