import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";

export type MediaType = Prisma.MediaGetPayload<{
  include: { collection: true };
}>;

// API 호출 함수
const fetchImages = async ({
  location, //GCP Cloud Storage 내 이미지 경로
  slug, //이미지 분류(collection)
}: {
  location?: string;
  slug?: string;
}): Promise<MediaType[]> => {
  const params = new URLSearchParams();
  if (location) {
    params.set("location", location);
  }
  if (slug) {
    params.set("collection", slug);
  }
  const queryString = params.toString();
  const url = queryString ? `/api/images?${queryString}` : "/api/images";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("이미지를 불러오는데 실패했습니다.");
  }

  return response.json();
};

// --- 편의용 훅 ---

// 갤러리 이미지 (INTRO 제외)
export const useGalleryImages = (slug?: string) => {
  // slug가 있으면 slug만, 없으면 location: "GALLERY"를 파라미터로 사용
  const queryParams = slug ? { slug } : { location: "GALLERY" };

  return useQuery<MediaType[], Error>({
    // queryKey도 동적 파라미터에 맞춰서 설정
    queryKey: ["images", queryParams],
    queryFn: () => fetchImages(queryParams),
  });
};

// 인트로(배너) 이미지
export const useIntroImages = () => {
  return useQuery<MediaType[], Error>({
    queryKey: ["images", { location: "INTRO" }],
    queryFn: () => fetchImages({ location: "INTRO" }),
  });
};

// 특정 컬렉션 이미지 (slug 기준)
export const useCollectionImages = (slug: string) => {
  return useQuery<MediaType[], Error>({
    queryKey: ["images", { slug }],
    queryFn: () => fetchImages({ slug }),
  });
};
