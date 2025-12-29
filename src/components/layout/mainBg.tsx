"use client";

import { ReactNode } from "react";
import { useIntroImages, MediaType } from "@/hooks/useImages";

interface MainBgProps {
  children: ReactNode;
}

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

export default function MainBg({ children }: MainBgProps) {
  const { data: medias, isLoading, isError, error } = useIntroImages();

  //전체 데이터 중 mainPatten 2 데이터만 추출함
  const targetMedia = medias?.find(
    (media) => media.title === "mainPatten 2" && media.type === "IMAGE",
  );

  const bgImgSrc = targetMedia?.publicUrl
    ? `${STORAGE_BASE_URL}${targetMedia.publicUrl}`
    : undefined;

  if (isLoading) {
    return (
      <div className="min-w-screen min-h-screen p-8 bg-none text-black flex items-center justify-center">
        <p>이미지 불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-8 bg-black text-white flex items-center justify-center">
        <p>에러 발생: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-white ">
      {bgImgSrc && (
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${bgImgSrc})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto", // 원본 사이즈 유지
          }}
        />
      )}
      <div data-testid="MainBg" className="relative w-full h-full z-10">
        {children}
      </div>
    </div>
  );
}
