import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { db } from "./lib/db.js";
import { users } from "./lib/schema.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the Senzo API");
});

// Routes
app.use("/api/v1/auth", authRouter);

// Start server
app.listen(process.env.PORT, async () => {
  console.log(`Senzo API is running on port ${process.env.PORT}`);
  try {
    const user = await db.select().from(users).limit(1);
    console.log(user);
    console.log("✅ Database connection established.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
});
export default app;
