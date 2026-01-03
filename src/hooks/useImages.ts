import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";

// Prisma가 생성한 타입을 사용하여 DB 스키마와 100% 일치시킴
// include: { collection: true } 옵션을 사용했으므로, 그에 맞는 타입을 가져옵니다.
export type MediaType = Prisma.MediaGetPayload<{
  include: { collection: true };
}>;

// API 호출 함수
const fetchImages = async (): Promise<MediaType[]> => {
  const response = await fetch("/api/images");

  if (!response.ok) {
    throw new Error("이미지를 불러오는데 실패했습니다.");
  }

  return response.json();
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
        (img) => img.collection?.slug === collectionSlug,
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
