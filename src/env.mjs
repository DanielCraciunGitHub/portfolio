import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  },
  server: {
    PLANET_SCALE_DATABASE_URL: z.string().min(1),
    RECAPTCHA_SECRET_KEY: z.string().min(1),

    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

    NODEMAILER_EMAIL: z.string(),
    NODEMAILER_PASSWORD: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
})
