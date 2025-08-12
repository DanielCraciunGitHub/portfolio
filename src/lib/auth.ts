import { db } from "@/db";
import { env } from "@/env.mjs";
import type { Adapter } from "@auth/core/adapters";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";

import { sendWelcome } from "@/app/_actions/discord";
import { sendWelcomeEmail } from "@/app/_actions/email";

declare module "@auth/core/types" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [Google],
  trustHost: true,
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const { name, email } = user;

      if (name && email) {
        await sendWelcomeEmail({ name, email });

        await sendWelcome({ name, email });
      }
    },
  },
  secret: env.AUTH_SECRET,
});
