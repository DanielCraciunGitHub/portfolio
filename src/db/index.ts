import { env } from "@/env.mjs"
import { Client } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"

const client = new Client({
  url: env.PLANET_SCALE_DATABASE_URL,
})

export const db = drizzle(client)
export type DbClient = typeof db
