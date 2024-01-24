import { headers } from "next/headers"
import { env } from "@/env.mjs"
import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import { z } from "zod"

import {
  contactFormSchema,
  googleReCaptchaSchema,
} from "@/lib/validations/form"

import { publicProcedure, router } from "../trpc"

// Redis syntax for rate limiting
const rate = "60 m"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, rate),
})
const captchaVerification = async (token: string) => {
  try {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    )
    const data = googleReCaptchaSchema.parse(await res.json())

    if (data.score > 0.6) {
      return true
    }
    return false
  } catch (error: any) {
    return false
  }
}

export const contactRouter = router({
  receiveEmail: publicProcedure
    .input(z.intersection(z.object({ token: z.string() }), contactFormSchema))
    .mutation(async ({ input }) => {
      try {
        const captchaSucess = await captchaVerification(input.token)

        if (!captchaSucess) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to send email! Please try again later.",
          })
        }

        const ip = headers().get("x-forwarded-for") ?? ""
        const { success, reset } = await ratelimit.limit(ip)

        const minsLeft = Math.ceil((reset - new Date().getTime()) / (60 * 1000))

        if (!success) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: `${minsLeft} minutes until you can submit another request. Meanwhile please enquire on social media.`,
          })
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
          subject: `Message from (${input.email})`,
          text: input!.message,
        }

        await transport.sendMail(mailOptions)
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: error.code,
            message: error.message,
          })
        }
      }
    }),
})
