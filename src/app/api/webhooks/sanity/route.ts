import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type SanityOperation = "create" | "update" | "delete"

export async function POST(req: NextRequest) {
  const operation = headers().get("sanity-operation") as SanityOperation
  console.log(headers())

  switch (operation) {
    case "create":
    // send a discord webhook
    // invalidate cache
    case "update":
    // invalidate cache
    case "delete":
    // invalidate cache
  }

  return NextResponse.json(await req.json())
}
