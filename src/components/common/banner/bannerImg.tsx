"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useIntroImages } from "../../../hooks/useImages";
import { resolveMediaUrl } from "@/lib/exhibitionCache/mediaUrl";

export default function BannerImg() {
  const { data: images, isLoading, isError, error } = useIntroImages();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setCount((prevCount: number) =>
          prevCount < (images?.length ?? 0) - 1 ? prevCount + 1 : 0,
        ),
      3000,
    );

    // 컴포넌트가 언마운트되거나, 의존성(count, allImageData)이 변경되기 전에이전 타이머를 정리
    return () => clearTimeout(timer);
  }, [count, images]);

  if (isLoading) {
    return (
      <main className="min-h-screen p-8 bg-black text-white flex items-center justify-center">
        <p>이미지 불러오는 중...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen p-8 bg-black text-white flex items-center justify-center">
        <p>에러 발생: {error?.message}</p>
      </main>
    );
  }

  return (
    <article
      data-testid="BannerImg"
      className=" w-full max-w-xs flex justify-center items-center"
    >
      {images && images.length > 0 ? (
        <figure className="rounded-lg p-2 shadow-xl/50">
          <Image
            src={resolveMediaUrl(images[count]) ?? ""}
            alt={images[count].title || "작품 이미지"}
            // DB에 저장된 치수 사용 (없을 경우 기본값)
            width={images[count].width ?? 300}
            height={images[count].height ?? 400}
            priority={true}
            placeholder="empty"
            // w-xs: Tailwind w-80 (320px) 등 특정 너비 제한
            className="w-full max-w-xs rounded object-cover h-auto"
          />
        </figure>
      ) : (
        <p className="h-150">표시할 배너 데이터가 없습니다.</p>
      )}
    </article>
  );
}
