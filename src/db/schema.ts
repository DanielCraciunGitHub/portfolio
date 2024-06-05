import type { AdapterAccount } from "@auth/core/adapters"
import { relations, sql } from "drizzle-orm"
import {
  AnySQLiteColumn,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"
import { ulid } from "ulid"

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  role: text("role", { enum: ["ADMIN", "USER"] }).default("USER"),
})

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

export const articleViews = sqliteTable("articleViews", {
  articleSlug: text("articleSlug", { length: 255 }).notNull().primaryKey(),
  views: integer("views", { mode: "number" }).default(0),
})

export const articleLikes = sqliteTable("articleLikes", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => ulid()),
  userId: text("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  commentId: text("commentId", { length: 255 }).references(
    () => articleComments.id,
    { onDelete: "cascade" }
  ),
  articleSlug: text("articleSlug", { length: 255 }).notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
})
export const articleComments = sqliteTable("articleComments", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => ulid()),
  articleSlug: text("articleSlug", { length: 255 }).notNull(),
  userId: text("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  isEdited: integer("isEdited").default(0),
  replyingTo: text("replyingTo"),
  body: text("body"),
  parentId: text("parentId", { length: 255 }).references(
    (): AnySQLiteColumn => articleComments.id,
    { onDelete: "cascade" }
  ),
  resolved: integer("resolved", { mode: "boolean" }).default(false),
})

export const usersRelations = relations(users, ({ many }) => ({
  author: many(articleComments, {
    relationName: "author",
  }),
  liker: many(articleLikes, {
    relationName: "liker",
  }),
}))

export const likesRelations = relations(articleLikes, ({ one }) => ({
  liker: one(users, {
    fields: [articleLikes.userId],
    references: [users.id],
    relationName: "liker",
  }),
  likes: one(articleComments, {
    fields: [articleLikes.commentId],
    references: [articleComments.id],
  }),
}))

export const commentsRelations = relations(
  articleComments,
  ({ one, many }) => ({
    author: one(users, {
      fields: [articleComments.userId],
      references: [users.id],
      relationName: "author",
    }),
    likes: many(articleLikes),
    replyTo: one(articleComments, {
      fields: [articleComments.parentId],
      references: [articleComments.id],
      relationName: "replies",
    }),
    replies: many(articleComments, {
      relationName: "replies",
    }),
  })
)
