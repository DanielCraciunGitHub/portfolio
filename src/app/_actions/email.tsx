"use server";

import { Resend } from "resend";
import InfoLibraryWelcome from "../../../react-email-starter/emails/infolibrary-welcome";
import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

interface WelcomePayload {
  name: string;
  email: string;
}

export const sendWelcomeEmail = async ({ name, email }: WelcomePayload) => {
  const { data, error } = await resend.emails.send({
    from: "Daniel C. <noreply@blog.danielfullstack.com>",
    to: [email],
    subject: "Info Library",
    react: InfoLibraryWelcome({ firstName: name.split(" ")[0] }),
  });

  if (error) {
    return { ok: false, error };
  }

  return { ok: true, data };
};
