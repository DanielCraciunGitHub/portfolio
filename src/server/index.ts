import { authRouter } from "./routers/authRouter";
import { blogRouter } from "./routers/blogRouter";
import { paymentRouter } from "./routers/paymentRouter";
import { router } from "./trpc";

export const appRouter = router({
  paymentRouter,
  blogRouter,
  authRouter,
});

export type AppRouter = typeof appRouter;
