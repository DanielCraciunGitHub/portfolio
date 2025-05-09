/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createEnv } from "@t3-oss/env-nextjs"
import dotenv from "dotenv"
import { z } from "zod"

dotenv.config({ path: ".env.local" })

export const env = createEnv({
  client: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  },
  server: {
    RECAPTCHA_SECRET_KEY: z.string().min(1),

    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

    NODEMAILER_EMAIL: z.string(),
    NODEMAILER_PASSWORD: z.string(),
    RESEND_API_KEY: z.string().min(1),

    DISCORD_WEBHOOK_URL_INBOX: z.string().min(1),
    DISCORD_WEBHOOK_URL_WRITER: z.string().min(1),
    DISCORD_WEBHOOK_URL_PUBLISH: z.string().min(1),

    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_PUBLIC_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    EBOOK_PRODUCT_ID: z.string().min(1),

    AUTH_SECRET: z.string().min(1),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),

    TURSO_AUTH_TOKEN: z.string().min(1),
    TURSO_DATABASE_URL: z.string().min(1),
    AUTH_DRIZZLE_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
})
