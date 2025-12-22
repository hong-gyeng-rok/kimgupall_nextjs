import { useQuery } from "@tanstack/react-query";

// 클라이언트에서 사용할 이미지 타입 정의
export interface ImageType {
  id: string;
  publicUrl: string;
  storagePath: string | null; // Prisma 모델 반영
  title: string | null;
  description: string | null; // Prisma 모델 반영
  group: string | null; // Prisma 모델 반영
  season: string | null; // Prisma 모델 반영
  createdAt: string;
  updatedAt: string;
}

// API 호출 함수
const fetchImages = async (): Promise<ImageType[]> => {
  const response = await fetch("/api/images");

  if (!response.ok) {
    throw new Error("이미지를 불러오는데 실패했습니다.");
  }

  return response.json();
};

// 커스텀 훅 (기본: 모든 이미지)
// select 옵션을 통해 가져온 전체 데이터 중 필요한 부분만 추출(filter)할 수 있습니다.
export const useImages = <T = ImageType[]>(
  select?: (data: ImageType[]) => T,
) => {
  return useQuery<ImageType[], Error, T>({
    queryKey: ["images"], // 'images'라는 키로 전체 데이터를 캐싱합니다.
    queryFn: fetchImages,
    select, // 컴포넌트에서 필요한 데이터만 골라내는 함수
  });
};

// 배너 이미지 전용 훅
export const useBannerImages = () => {
  return useImages((data) => data.filter((img) => img.season === "banner"));
};

// 특정 시즌 이미지 전용 훅 (예: useSeasonImages("25fw"))
export const useSeasonImages = () => {
  return useImages((data) => data.filter((img) => img.season !== "banner"));
};
