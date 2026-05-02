import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const databaseUrl = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("POSTGRES_URL or DATABASE_URL must be set for Prisma.");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
