import { publicProcedure, router } from "../trpc"

export const test = router({
  text: publicProcedure.query(async ({ ctx }) => {}),
})
