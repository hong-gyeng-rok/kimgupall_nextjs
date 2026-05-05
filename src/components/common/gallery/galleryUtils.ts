const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

export const getGalleryImageUrl = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${STORAGE_BASE_URL}${path}`;
};

export const galleryBreakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  800: 1,
  640: 1,
};
