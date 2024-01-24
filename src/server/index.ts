import { contactRouter } from "./routers/contactRouter"
import { paymentRouter } from "./routers/paymentRouter"
import { router } from "./trpc"

export const appRouter = router({
  paymentRouter,
  contactRouter,
})

export type AppRouter = typeof appRouter
