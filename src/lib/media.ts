import { prisma } from "@/lib/prisma";

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

const toPublicImageUrl = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${STORAGE_BASE_URL}${path}`;
};

export async function getGlobalBackgroundImageUrl() {
  const background = await prisma.media.findFirst({
    where: {
      location: "BACKGROUND",
      type: "IMAGE",
    },
    orderBy: {
      orderIndex: "desc",
    },
  });

  if (background?.publicUrl) {
    return toPublicImageUrl(background.publicUrl);
  }

  const legacyIntroBackground = await prisma.media.findFirst({
    where: {
      location: "INTRO",
      type: "IMAGE",
    },
    orderBy: {
      orderIndex: "desc",
    },
  });

  return legacyIntroBackground?.publicUrl
    ? toPublicImageUrl(legacyIntroBackground.publicUrl)
    : null;
}
