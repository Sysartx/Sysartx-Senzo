import { timestamp, pgTable, text, pgEnum ,serial} from "drizzle-orm/pg-core";

export const RoleEnum = pgEnum("roles", ["user", "admin"]);

export const users = pgTable("user", {
  id: text("id").primaryKey().unique(),
  // id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: RoleEnum("roles").default("user"),
  created_at: timestamp("created_at", { mode: "date" }),
  updated_at: timestamp("updated_at", { mode: "date" }),
  last_login_at: timestamp("last_login_at", { mode: "date" }),
});
