const DEFAULT_STORAGE_BASE_URL =
  "https://storage.googleapis.com/kimgupall_images";

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? DEFAULT_STORAGE_BASE_URL
).replace(/\/$/, "");

export const getPublicMediaUrl = (path?: string | null) => {
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${STORAGE_BASE_URL}${path}`;
};
