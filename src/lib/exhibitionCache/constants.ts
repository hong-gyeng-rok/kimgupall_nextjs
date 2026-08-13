export const EXHIBITION_API_URL =
  process.env.NEXT_PUBLIC_EXHIBITION_API_URL ??
  "https://kimgupall-nextjs.vercel.app/api/images";
export const EXHIBITION_WEB_ORIGIN = new URL(EXHIBITION_API_URL).origin;
export const EXHIBITION_CACHE_IMAGE_WIDTH = 1536;
export const EXHIBITION_CACHE_IMAGE_QUALITY = 75;

export const CACHE_ROOT = "exhibition-cache";
export const CURRENT_CACHE_DIR = `${CACHE_ROOT}/current`;
export const STAGING_CACHE_DIR = `${CACHE_ROOT}/staging`;
export const BACKUP_CACHE_DIR = `${CACHE_ROOT}/backup`;
export const CACHE_MANIFEST_FILE = "manifest.json";
export const CACHE_MEDIA_FILE = "media.json";
