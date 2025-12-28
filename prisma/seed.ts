import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString = process.env.POSTGRES_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DATA_FILE = path.join(process.cwd(), "gallery_data.json");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function main() {
  console.log("🚀 DB Migration & Seeding started...");

  // 1. Clean up existing data
  // Note: Order matters due to foreign key constraints
  await prisma.like.deleteMany();
  await prisma.media.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Existing data cleared.");

  // 2. Create Admin User
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      passwordHash: "temp_password", // TODO: Use real hashing in production
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log("👤 Admin user created (admin@example.com)");

  // 3. Read Data
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(
      `Data file not found at ${DATA_FILE}. Please run extract-metadata.js first.`,
    );
  }
  const rawData = fs.readFileSync(DATA_FILE, "utf-8");
  const data = JSON.parse(rawData);

  console.log(
    `📦 Processing ${data.collections.length} collections and ${data.media.length} media items...`,
  );

  // 4. Create Collections
  for (const col of data.collections) {
    await prisma.collection.create({
      data: {
        id: col.id,
        slug: col.slug,
        title: col.title,
        description: col.description,
        thumbnailUrl: col.thumbnailUrl,
        createdAt: col.createdAt,
        updatedAt: col.updatedAt,
      },
    });
  }
  console.log(`✅ ${data.collections.length} Collections created.`);

  // 5. Create Media
  let successCount = 0;
  for (const media of data.media) {
    let width = media.width;
    let height = media.height;

    // Try to calculate dimensions if missing and it's an image
    if (!width || !height) {
      if (media.type === "IMAGE") {
        // publicUrl starts with /, e.g., /temp_assets/...
        // construct full path: /path/to/project/public/temp_assets/...
        // remove leading slash from publicUrl to join correctly
        const relativePath = media.publicUrl.startsWith("/")
          ? media.publicUrl.slice(1)
          : media.publicUrl;
        const filePath = path.join(PUBLIC_DIR, relativePath);

        try {
          if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            const dims = sizeOf(buffer);
            width = dims.width;
            height = dims.height;
          } else {
            console.warn(`⚠️  File not found: ${filePath}`);
          }
        } catch (err) {
          console.warn(
            `⚠️  Could not read dimensions for ${media.publicUrl}:`,
            err,
          );
        }
      }
    }

    await prisma.media.create({
      data: {
        id: media.id,
        collectionId: media.collectionId,
        type: media.type,
        location: media.location,
        publicUrl: media.publicUrl,
        storagePath: media.storagePath,
        title: media.title,
        description: media.description,
        altText: media.altText,
        width: width,
        height: height,
        posterUrl: media.posterUrl,
        orderIndex: media.orderIndex,
        createdAt: media.createdAt,
        updatedAt: media.updatedAt,
      },
    });
    successCount++;
  }
  console.log(`✅ ${successCount} Media items created.`);

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

