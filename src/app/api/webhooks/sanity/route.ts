import { headers } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type SanityOperation = "create" | "update" | "delete"

export async function POST(req: NextRequest) {
  const operation = headers().get("sanity-operation") as SanityOperation

  switch (operation) {
    case "create":
      break
    // send a discord webhook
    // invalidate cache
    case "update":
      break
    // invalidate cache
    case "delete":
      break
    // invalidate cache
    default:
      break
  }

  return NextResponse.json(await req.json())
}
