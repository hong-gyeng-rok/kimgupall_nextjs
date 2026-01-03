"use client";

import { ReactNode, useEffect } from "react";
import { useIntroImages } from "@/hooks/useImages";
import Image from "next/image";

interface MainBgProps {
  children: ReactNode;
  onLoadComplete?: () => void;
}

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

export default function MainBg({ children, onLoadComplete }: MainBgProps) {
  const { data: medias, isLoading, isError } = useIntroImages();

  // 전체 데이터 중 mainPatten 2 데이터만 추출함
  const targetMedia = medias?.find(
    (media) => media.title === "mainPatten 2" && media.type === "IMAGE",
  );

  const bgImgSrc = targetMedia?.publicUrl
    ? `${STORAGE_BASE_URL}${targetMedia.publicUrl}`
    : undefined;

  // 에러 발생 시에는 로딩 완료로 처리하여 화면이 갇히지 않게 함
  useEffect(() => {
    if (isError && onLoadComplete) {
      onLoadComplete();
    }
  }, [isError, onLoadComplete]);

  // 데이터 로딩이 끝났는데 이미지가 없는 경우에도 완료 처리
  useEffect(() => {
    if (!isLoading && !bgImgSrc && onLoadComplete) {
      onLoadComplete();
    }
  }, [isLoading, bgImgSrc, onLoadComplete]);

  return (
    <div className="relative w-full h-full bg-white ">
      {/* 배경 이미지 프리로딩 및 감지용 (화면엔 안 보임) */}
      {bgImgSrc && (
        <>
          <Image
            src={bgImgSrc}
            alt="background-pattern"
            width={100}
            height={100}
            className="hidden"
            priority
            onLoad={() => {
              if (onLoadComplete) onLoadComplete();
            }}
            onError={() => {
              // 이미지 로드 실패 시에도 완료 처리
              if (onLoadComplete) onLoadComplete();
            }}
          />
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `url(${bgImgSrc})`,
              backgroundRepeat: "repeat",
              backgroundSize: "auto", // 원본 사이즈 유지
            }}
          />
        </>
      )}
      <div data-testid="MainBg" className="relative w-full h-full z-10">
        {children}
      </div>
    </div>
  );
}
