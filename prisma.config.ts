import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL or DATABASE_URL_UNPOOLED must be set for Prisma.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx ts-node --project src/seed/tsconfig.json src/seed/seed-database.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
