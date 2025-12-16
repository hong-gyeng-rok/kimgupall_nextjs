// app/page.tsx
import Image from "next/image";
import { prisma } from "@/lib/prisma"; // 1번에서 만든 파일 import

// GCP 버킷 기본 주소 (환경 변수로 관리)
// 끝에 붙은 슬래시(/)가 있다면 제거하여 중복 방지
const STORAGE_BASE_URL = (process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? "").replace(/\/$/, "");

// 이 컴포넌트는 서버에서 동작합니다 (async 필수)
export default async function Home() {
  // 1. DB에서 모든 이미지 가져오기 (최신순 정렬)
  const images = await prisma.image.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">My Gallery</h1>

      {/* 2. 그리드 레이아웃 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group aspect-square bg-gray-900 rounded-lg overflow-hidden"
          >
            {/* Next.js 이미지 컴포넌트 */}
            <Image
              src={`${STORAGE_BASE_URL}/${image.publicUrl}`}
              alt={image.title || "작품 이미지"}
              fill // 부모 div(aspect-square)를 가득 채움
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* 호버 시 제목 표시 (선택사항) */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-bold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 데이터가 없을 때 안내 */}
      {images.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          등록된 이미지가 없습니다.
        </div>
      )}
    </main>
  );
}
