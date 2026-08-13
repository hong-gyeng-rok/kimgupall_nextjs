import type { ExhibitionMedia } from "@/types/media";

export type CachedAssetKind = "media" | "poster" | "collection-thumbnail";

export interface ExhibitionCacheAsset {
  id: string;
  mediaId: string;
  collectionId?: string;
  kind: CachedAssetKind;
  sourceUrl: string;
  localPath: string;
}

export interface ExhibitionCacheManifest {
  version: string;
  syncedAt: string;
  mediaCount: number;
  assets: ExhibitionCacheAsset[];
}

export interface ExhibitionCacheSnapshot {
  manifest: ExhibitionCacheManifest;
  media: ExhibitionMedia[];
}

export interface ExhibitionSyncProgress {
  completed: number;
  total: number;
  label: string;
}
