import { prisma } from "@/lib/prisma";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

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
    return getPublicMediaUrl(background.publicUrl);
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
    ? getPublicMediaUrl(legacyIntroBackground.publicUrl)
    : null;
}

export async function getSitePreviewImageUrl() {
  const previewImage = await prisma.media.findFirst({
    where: {
      location: "GALLERY",
      type: "IMAGE",
    },
    orderBy: {
      orderIndex: "desc",
    },
  });

  return getPublicMediaUrl(previewImage?.publicUrl);
}
