import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
