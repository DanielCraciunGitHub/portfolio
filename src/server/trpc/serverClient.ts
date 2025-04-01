import "server-only"

import { cache } from "react"
import type { UnsafeUnwrappedHeaders } from "next/headers"
import { headers } from "next/headers"
import { createCaller } from "@/server"
import { createTRPCContext } from "@/server/trpc"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers() as unknown as UnsafeUnwrappedHeaders)
  heads.set("x-trpc-source", "rsc")

  return createTRPCContext({
    headers: heads,
  })
})
export const api = createCaller(createContext)
