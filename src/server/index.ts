import { createCallerFactory, createTRPCRouter } from "@/server/trpc"
import { authRouter } from "src/server/routers/authRouter"
import { blogRouter } from "src/server/routers/blogRouter"
import { paymentRouter } from "src/server/routers/paymentRouter"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authRouter,
  blogRouter,
  paymentRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
