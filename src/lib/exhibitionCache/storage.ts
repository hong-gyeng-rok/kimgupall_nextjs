import { Capacitor } from "@capacitor/core";
import {
  Directory,
  Encoding,
  Filesystem,
} from "@capacitor/filesystem";
import { FileTransfer } from "@capacitor/file-transfer";
import type { ExhibitionMedia } from "@/types/media";
import { getPublicMediaUrl } from "@/lib/mediaUrl";
import {
  BACKUP_CACHE_DIR,
  CACHE_MANIFEST_FILE,
  CACHE_MEDIA_FILE,
  CACHE_ROOT,
  CURRENT_CACHE_DIR,
  EXHIBITION_CACHE_IMAGE_QUALITY,
  EXHIBITION_CACHE_IMAGE_WIDTH,
  EXHIBITION_WEB_ORIGIN,
  STAGING_CACHE_DIR,
} from "./constants";
import type {
  CachedAssetKind,
  ExhibitionCacheAsset,
  ExhibitionCacheManifest,
  ExhibitionCacheSnapshot,
  ExhibitionSyncProgress,
} from "./types";

const dataDirectory = Directory.Data;

const exists = async (path: string) => {
  try {
    await Filesystem.stat({ path, directory: dataDirectory });
    return true;
  } catch {
    return false;
  }
};

const removeDirectory = async (path: string) => {
  if (!(await exists(path))) return;
  await Filesystem.rmdir({ path, directory: dataDirectory, recursive: true });
};

const ensureDirectory = async (path: string) => {
  if (await exists(path)) return;
  await Filesystem.mkdir({
    path,
    directory: dataDirectory,
    recursive: true,
  });
};

const parseJsonFile = async <T>(path: string): Promise<T> => {
  const result = await Filesystem.readFile({
    path,
    directory: dataDirectory,
    encoding: Encoding.UTF8,
  });

  if (typeof result.data !== "string") {
    throw new Error("캐시 파일을 읽을 수 없습니다.");
  }

  return JSON.parse(result.data) as T;
};

const getExtension = (sourceUrl: string) => {
  try {
    const pathname = new URL(sourceUrl).pathname;
    const match = pathname.match(/\.([a-zA-Z0-9]{2,5})$/);
    return match ? `.${match[1].toLowerCase()}` : ".img";
  } catch {
    return ".img";
  }
};

const isVideoSource = (sourceUrl: string) => {
  try {
    return /\.(mp4|webm|mov|m4v)$/i.test(new URL(sourceUrl).pathname);
  } catch {
    return false;
  }
};

const getCacheDownloadUrl = (sourceUrl: string) => {
  try {
    const url = new URL(sourceUrl);
    if (url.hostname !== "storage.googleapis.com") return sourceUrl;

    const optimizedUrl = new URL("/_next/image", EXHIBITION_WEB_ORIGIN);
    optimizedUrl.searchParams.set("url", sourceUrl);
    optimizedUrl.searchParams.set("w", String(EXHIBITION_CACHE_IMAGE_WIDTH));
    optimizedUrl.searchParams.set("q", String(EXHIBITION_CACHE_IMAGE_QUALITY));
    return optimizedUrl.toString();
  } catch {
    return sourceUrl;
  }
};

const makeAsset = ({
  id,
  mediaId,
  collectionId,
  kind,
  source,
}: {
  id: string;
  mediaId: string;
  collectionId?: string;
  kind: CachedAssetKind;
  source: string;
}): ExhibitionCacheAsset | null => {
  const sourceUrl = getPublicMediaUrl(source);
  if (!sourceUrl || !/^https?:\/\//.test(sourceUrl)) return null;

  return {
    id,
    mediaId,
    collectionId,
    kind,
    sourceUrl: getCacheDownloadUrl(sourceUrl),
    localPath: `assets/${id}${getExtension(sourceUrl)}`,
  };
};

const collectAssets = (media: ExhibitionMedia[]) => {
  const assets: ExhibitionCacheAsset[] = [];
  const collectionIds = new Set<string>();

  for (const item of media) {
    if (item.type === "IMAGE") {
      const asset = makeAsset({
        id: `media-${item.id}`,
        mediaId: item.id,
        kind: "media",
        source: item.publicUrl,
      });
      if (asset) assets.push(asset);
    }

    if (item.posterUrl) {
      const poster = makeAsset({
        id: `poster-${item.id}`,
        mediaId: item.id,
        kind: "poster",
        source: item.posterUrl,
      });
      if (poster) assets.push(poster);
    }

    const collection = item.collection;
    if (
      collection?.thumbnailUrl &&
      !isVideoSource(getPublicMediaUrl(collection.thumbnailUrl) ?? "") &&
      !collectionIds.has(collection.id)
    ) {
      collectionIds.add(collection.id);
      const thumbnail = makeAsset({
        id: `collection-${collection.id}`,
        mediaId: item.id,
        collectionId: collection.id,
        kind: "collection-thumbnail",
        source: collection.thumbnailUrl,
      });
      if (thumbnail) assets.push(thumbnail);
    }
  }

  return assets;
};

const attachLocalUrls = async (
  media: ExhibitionMedia[],
  manifest: ExhibitionCacheManifest,
) => {
  const mediaUrls = new Map<string, string>();
  const posterUrls = new Map<string, string>();
  const collectionUrls = new Map<string, string>();

  await Promise.all(
    manifest.assets.map(async (asset) => {
      try {
        const stat = await Filesystem.stat({
          path: `${CURRENT_CACHE_DIR}/${asset.localPath}`,
          directory: dataDirectory,
        });
        if (stat.size <= 0) return;

        const result = await Filesystem.getUri({
          path: `${CURRENT_CACHE_DIR}/${asset.localPath}`,
          directory: dataDirectory,
        });
        const localUrl = Capacitor.convertFileSrc(result.uri);

        if (asset.kind === "media") mediaUrls.set(asset.mediaId, localUrl);
        if (asset.kind === "poster") posterUrls.set(asset.mediaId, localUrl);
        if (asset.kind === "collection-thumbnail" && asset.collectionId) {
          collectionUrls.set(asset.collectionId, localUrl);
        }
      } catch {
        // Missing assets fall back to their public URL without invalidating the
        // otherwise complete metadata cache.
      }
    }),
  );

  return media.map((item) => ({
    ...item,
    localUrl: mediaUrls.get(item.id) ?? null,
    localPosterUrl: posterUrls.get(item.id) ?? null,
    collection: item.collection
      ? {
          ...item.collection,
          localThumbnailUrl: collectionUrls.get(item.collection.id) ?? null,
        }
      : null,
  }));
};

export async function loadCachedExhibition(): Promise<ExhibitionCacheSnapshot | null> {
  try {
    const [manifest, media] = await Promise.all([
      parseJsonFile<ExhibitionCacheManifest>(
        `${CURRENT_CACHE_DIR}/${CACHE_MANIFEST_FILE}`,
      ),
      parseJsonFile<ExhibitionMedia[]>(`${CURRENT_CACHE_DIR}/${CACHE_MEDIA_FILE}`),
    ]);

    if (manifest.mediaCount !== media.length) {
      throw new Error("캐시 데이터 개수가 일치하지 않습니다.");
    }

    return {
      manifest,
      media: await attachLocalUrls(media, manifest),
    };
  } catch {
    return null;
  }
}

export async function saveExhibitionCache(
  media: ExhibitionMedia[],
  onProgress: (progress: ExhibitionSyncProgress) => void,
): Promise<ExhibitionCacheSnapshot> {
  const assets = collectAssets(media);
  const manifest: ExhibitionCacheManifest = {
    version: new Date().toISOString().replace(/[:.]/g, "-"),
    syncedAt: new Date().toISOString(),
    mediaCount: media.length,
    assets,
  };

  await ensureDirectory(CACHE_ROOT);
  await removeDirectory(STAGING_CACHE_DIR);
  await ensureDirectory(`${STAGING_CACHE_DIR}/assets`);

  try {
    for (let index = 0; index < assets.length; index += 1) {
      const asset = assets[index];
      onProgress({
        completed: index,
        total: assets.length,
        label: `이미지 ${index + 1} / ${assets.length}`,
      });

      const destination = await Filesystem.getUri({
        path: `${STAGING_CACHE_DIR}/${asset.localPath}`,
        directory: dataDirectory,
      });
      await FileTransfer.downloadFile({
        url: asset.sourceUrl,
        path: destination.uri,
        connectTimeout: 30_000,
        readTimeout: 120_000,
      });
    }

    await Promise.all([
      Filesystem.writeFile({
        path: `${STAGING_CACHE_DIR}/${CACHE_MANIFEST_FILE}`,
        directory: dataDirectory,
        encoding: Encoding.UTF8,
        data: JSON.stringify(manifest),
      }),
      Filesystem.writeFile({
        path: `${STAGING_CACHE_DIR}/${CACHE_MEDIA_FILE}`,
        directory: dataDirectory,
        encoding: Encoding.UTF8,
        data: JSON.stringify(media),
      }),
    ]);

    await removeDirectory(BACKUP_CACHE_DIR);
    if (await exists(CURRENT_CACHE_DIR)) {
      await Filesystem.rename({
        from: CURRENT_CACHE_DIR,
        to: BACKUP_CACHE_DIR,
        directory: dataDirectory,
      });
    }
    await Filesystem.rename({
      from: STAGING_CACHE_DIR,
      to: CURRENT_CACHE_DIR,
      directory: dataDirectory,
    });
    await removeDirectory(BACKUP_CACHE_DIR);

    onProgress({
      completed: assets.length,
      total: assets.length,
      label: "전시 데이터 준비 완료",
    });

    const snapshot = await loadCachedExhibition();
    if (!snapshot) throw new Error("저장된 캐시를 검증하지 못했습니다.");
    return snapshot;
  } catch (error) {
    await removeDirectory(STAGING_CACHE_DIR);
    if (!(await exists(CURRENT_CACHE_DIR)) && (await exists(BACKUP_CACHE_DIR))) {
      await Filesystem.rename({
        from: BACKUP_CACHE_DIR,
        to: CURRENT_CACHE_DIR,
        directory: dataDirectory,
      });
    }
    throw error;
  }
}
