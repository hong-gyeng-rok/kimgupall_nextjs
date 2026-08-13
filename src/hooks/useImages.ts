import { useQuery } from "@tanstack/react-query";
import type { ExhibitionMedia } from "@/types/media";
import { fetchRemoteMedia } from "@/lib/exhibitionCache/fetchRemoteMedia";
import { loadCachedExhibition } from "@/lib/exhibitionCache/storage";
import { isNativeExhibitionApp } from "@/lib/exhibitionCache/platform";

export type MediaType = ExhibitionMedia;

// API 호출 함수
const fetchImages = async (): Promise<MediaType[]> => {
  if (isNativeExhibitionApp()) {
    const cache = await loadCachedExhibition();
    if (!cache) {
      throw new Error("기기에 저장된 전시 데이터가 없습니다.");
    }
    return cache.media;
  }

  return fetchRemoteMedia();
};

export const useImages = <T = MediaType[]>(
  select?: (data: MediaType[]) => T,
) => {
  return useQuery<MediaType[], Error, T>({
    queryKey: ["images"],
    queryFn: fetchImages,
    select,
  });
};

// --- 편의용 훅 ---

// 갤러리 이미지 (INTRO 제외) + 선택적 컬렉션 필터링
export const useGalleryImages = (collectionSlug?: string | null) => {
  return useImages((data) => {
    // 1. 기본적으로 GALLERY 위치의 이미지만 필터링
    const galleryImages = data.filter((img) => img.location === "GALLERY");

    // 2. 컬렉션 슬러그가 있다면 추가 필터링
    if (collectionSlug) {
      return galleryImages.filter(
        (img) =>
          img.collection?.slug === collectionSlug ||
          img.collection?.slug === `gallery-${collectionSlug}`,
      );
    }

    // 3. 슬러그가 없으면 전체 갤러리 이미지 반환
    return galleryImages;
  });
};

// 인트로(배너) 이미지
export const useIntroImages = () => {
  return useImages((data) => data.filter((img) => img.location === "INTRO"));
};

// 특정 컬렉션 이미지 (slug 기준)
export const useCollectionImages = (slug: string) => {
  return useImages((data) =>
    data.filter((img) => img.collection?.slug === slug),
  );
};
