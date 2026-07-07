const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ??
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL ??
  ""
).replace(/\/$/, "");

export const getPublicMediaUrl = (path?: string | null) => {
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (STORAGE_BASE_URL) {
    return `${STORAGE_BASE_URL}/${path.replace(/^\/+/, "")}`;
  }

  return path.startsWith("/") ? path : `/${path}`;
};
