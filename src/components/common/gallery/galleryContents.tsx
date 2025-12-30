"use client";

import React, { useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css"; // react-masonry-css에서 임포트
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive"; // 모바일. PC 판독 플러그인
import { useGalleryImages, MediaType } from "../../../hooks/useImages";

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

//Modal.setAppElement("#root"); // 또는 앱의 최상위 DOM ID
export default function GalleryContents() {
  const { data: images, isLoading, isError, error } = useGalleryImages();
  const isMobile = useMediaQuery({ maxWidth: 767 }); //모바일 조건 적용
  const [selectedImage, setSelectedImage] = useState<MediaType | null>(null);

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

  // 반응형 컬럼 개수 설정
  const breakpointColumnsObj = {
    default: 4, // 기본값 (가장 큰 화면)
    1280: 3, // 1280px 이하
    1024: 2, // 1024px 이하
    800: 1, // 768px 이하
    640: 1, // 640px 이하
  };

  return (
    <article
      data-testid="GalleryContents"
      className="w-full h-full flex justify-center"
    >
      <div className="w-full min-[350px]:max-h-[85vh] md:max-h-[90vh] overflow-y-auto p-6 no-scrollbar rounded-xl backdrop-blur-sm shadow-inner">
        {images && images.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex gap-4"
            columnClassName="my-masonry-grid_column gap-4 bg-clip-padding"
          >
            {images.map((image, index) => (
              <button
                key={image.id}
                className="rounded-lg shadow-lg mb-4 transition-all duration-300 hover:scale-110 hover:z-50 hover:shadow-2xl relative block w-full"
                onClick={() => setSelectedImage(image)}
                aria-label={`${image.title || "작품"} 크게 보기`}
              >
                <Image
                  src={`${STORAGE_BASE_URL}${image.publicUrl}`}
                  alt={image.title || "작품 이미지"}
                  // DB에 저장된 치수 사용 (없을 경우 기본값)
                  width={image.width ?? 300}
                  height={image.height ?? 400}
                  // 초기 8장만 우선 로딩(LCP 최적화), 나머지는 Lazy Loading
                  // 반응형 이미지 최적화: Masonry 컬럼 수에 맞춰 힌트 제공
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  placeholder="empty"
                  loading="lazy"
                  // h-auto: 원본 비율 유지하며 너비에 맞게 높이 자동 조절
                  className="w-full h-auto object-cover rounded-lg"
                />
              </button>
            ))}
          </Masonry>
        ) : (
          <p className="text-black">No images found for the selected season.</p>
        )}
      </div>
      {selectedImage && !isMobile && (
        <Modal
          ariaHideApp={false}
          isOpen={selectedImage !== null}
          onRequestClose={() => setSelectedImage(null)}
          className="w-screen h-screen flex flex-col items-center justify-center focus:outline-none gap-8"
          overlayClassName=" fixed inset-0 bg-white flex items-center justify-center z-30"
        >
          <Image
            src={`${STORAGE_BASE_URL}${selectedImage.publicUrl}`}
            alt={selectedImage.title || "작품 이미지"}
            // 모달에서는 원본 크기 또는 큰 해상도 사용
            width={selectedImage.width ?? 1920}
            height={selectedImage.height ?? 800}
            priority={true}
            className="w-full h-full max-h-200 object-contain"
          />
          <button
            className="bg-none text-black ring-3 ring-black rounded-xl p-5 text-7xl w-3xl font-sans"
            onClick={() => setSelectedImage(null)}
          >
            나가기
          </button>
        </Modal>
      )}
    </article>
  );
}
