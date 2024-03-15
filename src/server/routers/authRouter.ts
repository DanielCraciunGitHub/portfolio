import { auth } from "@/lib/auth"

import { publicProcedure, router } from "../trpc"

export const authRouter = router({
  getSession: publicProcedure.query(async () => {
    const session = await auth()

    return session
  }),
})
