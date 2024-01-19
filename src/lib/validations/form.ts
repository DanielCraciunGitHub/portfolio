import { z } from "zod"

export const contactFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .max(320, { message: "Invalid Email" }),
  message: z
    .string()
    .min(20, { message: "Enter at least 20 characters." })
    .max(1200, { message: "Exceeded limit of 1200 characters." }),
})

export const googleReCaptchaSchema = z.object({
  success: z.boolean(),
  challenge_ts: z.string(),
  hostname: z.string(),
  score: z.number(),
  action: z.string().optional(),
})
