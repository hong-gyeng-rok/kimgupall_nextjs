import { getPublicMediaUrl } from "@/lib/mediaUrl";


export const getGalleryImageUrl = (path: string) => {
  return getPublicMediaUrl(path) ?? "";
};

export const galleryBreakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  800: 1,
  640: 1,
};
