"use server"

import { headers } from "next/headers"
import { env } from "@/env.mjs"
import { type ActionResponse } from "@/types"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import { type z } from "zod"

import {
  contactFormSchema,
  googleReCaptchaSchema,
} from "@/lib/validations/form"

// Redis syntax for rate limiting
const rate = "60 m"

export const captchaVerification = async (
  token: string
): Promise<ActionResponse> => {
  try {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    )
    const data = googleReCaptchaSchema.parse(await res.json())
    if (data.score > 0.6) {
      return { ok: true, code: 200 }
    }
    throw new Error("Recaptcha Failed")
  } catch (error: any) {
    return { ok: false, error: error.message }
  }
}

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, rate),
})

export const receiveEmail = async ({
  email,
  message,
}: z.infer<typeof contactFormSchema>): Promise<ActionResponse> => {
  try {
    const ip = headers().get("x-forwarded-for") ?? ""
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return { ok: success, code: 429 }
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.NODEMAILER_EMAIL,
        pass: env.NODEMAILER_PASSWORD,
      },
    })
    const mailOptions: Mail.Options = {
      from: env.NODEMAILER_EMAIL,
      to: env.NODEMAILER_EMAIL,
      subject: `Message from (${email})`,
      text: message,
    }

    await transport.sendMail(mailOptions)
    return { ok: true }
  } catch (error) {
    return { ok: false, code: 500 }
  }
}
