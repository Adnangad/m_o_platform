import {text, pgTable, boolean, uuid, timestamp} from "drizzle-orm/pg-core";

export const users = pgTable("account_users", {
    id: uuid("id").primaryKey().notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow().notNull(),
})