const PUBLIC_MEDIA_BASE_URL = (
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? ""
).replace(/\/$/, "");
const GCS_BUCKET_NAME =
  process.env.NEXT_PUBLIC_GCP_STORAGE_BUCKET ?? "kimgupall_images";

const toMediaProxyPath = (path: string) => {
  const normalizedPath = path.replace(/^\/+/, "");
  const encodedPath = normalizedPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/api/media/${encodedPath}`;
};

export const getPublicMediaUrl = (path?: string | null) => {
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const url = new URL(path);
      const [, bucketName, ...objectPath] = url.pathname.split("/");

      if (
        (url.hostname === "storage.googleapis.com" ||
          url.hostname === "storage.cloud.google.com") &&
        bucketName === GCS_BUCKET_NAME &&
        objectPath.length > 0
      ) {
        return toMediaProxyPath(objectPath.join("/"));
      }
    } catch {
      return path;
    }

    return path;
  }

  if (PUBLIC_MEDIA_BASE_URL) {
    return `${PUBLIC_MEDIA_BASE_URL}/${path.replace(/^\/+/, "")}`;
  }

  return toMediaProxyPath(path);
};
