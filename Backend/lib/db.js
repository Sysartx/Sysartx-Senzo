import dotenv from "dotenv";
dotenv.config();
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const DB_URL = process.env.DATABASE_URL;
const sql = neon(DB_URL);
export const db = drizzle(sql);
