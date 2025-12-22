import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";

// Load environment variables manually
// Load .env.local first so it takes precedence (if dotenv respects first-wins, which it does)
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("POSTGRES_URL"),
  },
});