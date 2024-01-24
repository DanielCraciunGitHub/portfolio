import {
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const payees = mysqlTable("payees", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
})
