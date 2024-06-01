"use server";

import { headers } from "next/headers";
import { env } from "@/env.mjs";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import {
  contactFormSchema,
  googleReCaptchaSchema,
} from "@/lib/validations/form";
import { z } from "zod";

// Redis syntax for rate limiting
const rate = "60 m";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, rate),
});

const captchaVerification = async (token: string) => {
  try {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      },
    );
    const data = googleReCaptchaSchema.parse(await res.json());

    if (data.score > 0.6) {
      return true;
    }
    return false;
  } catch (error: any) {
    return false;
  }
};

type receiveEmailProps = {
  contactDetails: z.infer<typeof contactFormSchema>;
} & {
  token: string;
};

export const receiveEmail = async ({
  token,
  contactDetails,
}: receiveEmailProps) => {
  try {
    const captchaSucess = await captchaVerification(token);

    if (!captchaSucess) {
      throw new Error();
    }

    const ip = headers().get("x-forwarded-for") ?? "";
    const { success, reset } = await ratelimit.limit(ip);

    if (!success) {
      throw new Error();
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.NODEMAILER_EMAIL,
        pass: env.NODEMAILER_PASSWORD,
      },
    });
    const mailOptions: Mail.Options = {
      from: env.NODEMAILER_EMAIL,
      to: env.NODEMAILER_EMAIL,
      subject: `Message from (${contactDetails.email})`,
      text: contactDetails.message,
    };

    await transport.sendMail(mailOptions);

    return true;
  } catch (error: unknown) {
    return false;
  }
};
