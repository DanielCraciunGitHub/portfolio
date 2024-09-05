"use server"

import { headers } from "next/headers"
import { env } from "@/env.mjs"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { Resend } from "resend"
import InfoLibraryCommentReply from "src/components/Emails/infolibrary-comment-reply"
import InfoLibraryWelcome from "src/components/Emails/infolibrary-welcome"

const resend = new Resend(env.RESEND_API_KEY)

const rate = "30 m"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, rate),
})

interface WelcomePayload {
  name: string
  email: string
}

interface ReplyPayload {
  body: string
  commentLink: string
  senderName: string
  receiverEmail: string
}

export const sendWelcomeEmail = async ({ name, email }: WelcomePayload) => {
  const { data, error } = await resend.emails.send({
    from: "Daniel C. <noreply@danielfullstack.com>",
    to: [email],
    subject: "Info Library",
    react: InfoLibraryWelcome({ firstName: name.split(" ")[0]! }),
  })

  if (error) {
    return { ok: false, error }
  }

  return { ok: true, data }
}

export const sendReplyEmail = async ({
  body,
  commentLink,
  senderName,
  receiverEmail,
}: ReplyPayload) => {
  const ip = headers().get("x-forwarded-for") ?? ""
  const { success, reset } = await ratelimit.limit(ip)

  const minsLeft = Math.ceil((reset - new Date().getTime()) / (60 * 1000))

  if (!success) {
    return {
      ok: false,
      response: `${minsLeft} minutes until you can send another reply`,
    }
  }

  const { data, error } = await resend.emails.send({
    from: `Info Library <noreply@danielfullstack.com>`,
    to: [receiverEmail],
    subject: "Your comment has a reply!",
    react: InfoLibraryCommentReply({
      body,
      commentLink,
      senderName: senderName.split(" ")[0]!,
    }),
  })

  if (error) {
    return { ok: false, response: error.message }
  }

  return { ok: true, response: data?.id }
}
