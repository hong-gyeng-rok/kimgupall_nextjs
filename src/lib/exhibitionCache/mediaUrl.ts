import type { ExhibitionMedia } from "@/types/media";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

export const resolveMediaUrl = (media?: ExhibitionMedia | null) =>
  media?.localUrl ?? getPublicMediaUrl(media?.publicUrl);

export const resolvePosterUrl = (media?: ExhibitionMedia | null) =>
  media?.localPosterUrl ?? getPublicMediaUrl(media?.posterUrl);

export const resolveCollectionThumbnailUrl = (
  collection?: ExhibitionMedia["collection"],
) => collection?.localThumbnailUrl ?? getPublicMediaUrl(collection?.thumbnailUrl);
