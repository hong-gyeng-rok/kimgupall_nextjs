import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("POSTGRES_URL"),
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
