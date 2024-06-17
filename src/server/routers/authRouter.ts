import { db } from "@/db"
import { users } from "@/db/schema"
import { eq, InferSelectModel } from "drizzle-orm"

import { auth } from "@/lib/auth"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(async () => {
    const session = await auth()

    return session
  }),
  getRole: publicProcedure.query(
    async (): Promise<InferSelectModel<typeof users>["role"]> => {
      const session = await auth()

      if (session) {
        const [data] = await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.id, session.user.id))
        return data.role
      } else {
        return "USER"
      }
    }
  ),
})
