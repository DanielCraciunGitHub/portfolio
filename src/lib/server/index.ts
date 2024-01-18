import { test } from "./routers/test"
import { router } from "./trpc"

export const appRouter = router({
  test,
})

export type AppRouter = typeof appRouter
