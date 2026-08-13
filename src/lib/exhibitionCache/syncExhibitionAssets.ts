import { fetchRemoteMedia } from "./fetchRemoteMedia";
import { saveExhibitionCache } from "./storage";
import type { ExhibitionSyncProgress } from "./types";

export async function syncExhibitionAssets(
  onProgress: (progress: ExhibitionSyncProgress) => void,
) {
  onProgress({ completed: 0, total: 0, label: "전시 데이터 확인 중" });
  const media = await fetchRemoteMedia();
  return saveExhibitionCache(media, onProgress);
}
