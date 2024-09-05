import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "src/server/trpc"

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(async ({ ctx }) => {
    return ctx.session
  }),
  getRole: protectedProcedure.query(async ({ ctx }) => {
    const [data] = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, ctx.session.user.id))
    return data.role
  }),
})
