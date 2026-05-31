import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const BUCKET_PUBLIC_BASE_URL =
  "https://storage.googleapis.com/kimgupall_images";
const COLLECTION_SLUG = "gallery-yacha";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL is not set.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const yachaMedia = [
  {
    fileName: "9930_yacha_pride.jpg",
    title: "yacha pride",
    altText: "7대 죄악 야차도 교만",
    description: "7대 죄악\n야차도\n죄목: 교만",
    width: 3240,
    height: 4050,
    orderIndex: 9930,
  },
  {
    fileName: "9940_yacha_greed.jpg",
    title: "yacha greed",
    altText: "7대 죄악 야차도 탐욕",
    description: "7대 죄악\n야차도\n죄목: 탐욕",
    width: 3240,
    height: 4050,
    orderIndex: 9940,
  },
  {
    fileName: "9950_yacha_lust.jpg",
    title: "yacha lust",
    altText: "7대 죄악 야차도 색욕",
    description: "7대 죄악\n야차도\n죄목: 색욕",
    width: 3240,
    height: 4050,
    orderIndex: 9950,
  },
  {
    fileName: "9960_yacha_gluttony.jpg",
    title: "yacha gluttony",
    altText: "7대 죄악 야차도 폭식",
    description: "7대 죄악\n야차도\n죄목: 폭식",
    width: 3240,
    height: 4050,
    orderIndex: 9960,
  },
  {
    fileName: "9970_yacha_envy.jpg",
    title: "yacha envy",
    altText: "7대 죄악 야차도 질투",
    description: "7대 죄악\n야차도\n죄목: 질투",
    width: 3240,
    height: 4050,
    orderIndex: 9970,
  },
  {
    fileName: "9980_yacha_sloth.jpg",
    title: "yacha sloth",
    altText: "7대 죄악 야차도 나태",
    description: "7대 죄악\n야차도\n죄목: 나태",
    width: 3240,
    height: 4050,
    orderIndex: 9980,
  },
  {
    fileName: "9990_yacha_wrath.jpg",
    title: "yacha wrath",
    altText: "7대 죄악 야차도 분노",
    description: "7대 죄악\n야차도\n죄목: 분노",
    width: 13502,
    height: 16875,
    orderIndex: 9990,
  },
];

async function main() {
  const collection = await prisma.collection.findUnique({
    where: { slug: COLLECTION_SLUG },
  });

  if (!collection) {
    throw new Error(`Collection not found: ${COLLECTION_SLUG}`);
  }

  await prisma.$transaction(async (tx) => {
    const deleted = await tx.media.deleteMany({
      where: { collectionId: collection.id },
    });

    await tx.media.createMany({
      data: yachaMedia.map((media) => {
        const storagePath = `/gallery/yacha/${media.fileName}`;

        return {
          collectionId: collection.id,
          type: "IMAGE",
          location: "GALLERY",
          publicUrl: `${BUCKET_PUBLIC_BASE_URL}${storagePath}`,
          storagePath,
          title: media.title,
          description: media.description,
          altText: media.altText,
          width: media.width,
          height: media.height,
          posterUrl: null,
          orderIndex: media.orderIndex,
        };
      }),
    });

    await tx.collection.update({
      where: { id: collection.id },
      data: {
        thumbnailUrl: `${BUCKET_PUBLIC_BASE_URL}/gallery/yacha/9990_yacha_wrath.jpg`,
      },
    });

    console.log(
      `Replaced ${deleted.count} media items in ${COLLECTION_SLUG} with ${yachaMedia.length} new items.`,
    );
  });
}

main()
  .catch((error) => {
    console.error("Failed to update yacha media:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
