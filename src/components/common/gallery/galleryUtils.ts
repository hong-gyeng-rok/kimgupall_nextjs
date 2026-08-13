import type { MediaType } from "@/hooks/useImages";
import { resolveMediaUrl } from "@/lib/exhibitionCache/mediaUrl";

export const getGalleryImageUrl = (media: MediaType) =>
  resolveMediaUrl(media) ?? "";

export const galleryBreakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  800: 1,
  640: 1,
};
