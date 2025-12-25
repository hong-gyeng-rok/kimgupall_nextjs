"use client";

import React, { useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css"; // react-masonry-css에서 임포트
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive"; // 모바일. PC 판독 플러그인
import { useSeasonImages, ImageType } from "../../../hooks/useImages";

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

//Modal.setAppElement("#root"); // 또는 앱의 최상위 DOM ID
export default function GalleryContents() {
  const { data: images, isLoading, isError, error } = useSeasonImages();
  const isMobile = useMediaQuery({ maxWidth: 767 }); //모바일 조건 적용
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

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

  // 반응형 컬럼 개수 설정
  const breakpointColumnsObj = {
    default: 4, // 기본값 (가장 큰 화면)
    1280: 3, // 1280px 이하
    1024: 2, // 1024px 이하
    800: 1, // 768px 이하
    640: 1, // 640px 이하
  };

  return (
    <div>
      <div className=" min-[350px]:max-h-[85vh] md:max-h-[90vh] overflow-y-auto ">
        {images && images.length > 0 ? ( //filteredImages라는 값은 GalleryContainer 함수에서 받아옴, 이를 통해 특정 시즌 이미지만 출력되도록함
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex gap-4" // flex 컨테이너 클래스 이미지 열 갭
            columnClassName="my-masonry-grid_column gap-4 bg-clip-padding " // 각 컬럼에 적용될 클래스 (gap-4는 gutter 역할)
          >
            {images.map((image) => (
              <div
                key={image.id}
                className=" rounded shadow-xl mb-4 "
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={`${STORAGE_BASE_URL}/${image.publicUrl}`}
                  alt={image.title || "작품 이미지"}
                  width={600}
                  height={800}
                  priority={true}
                  placeholder="empty"
                  className="w-full  object-cover transition hover:-translate-y-1 hover:scale-110 hover:shadow-xl/70"
                />
              </div>
            ))}
          </Masonry>
        ) : (
          <p className="text-black">No images found for the selected season.</p>
        )}
      </div>
      {selectedImage && !isMobile && (
        <Modal
          isOpen={selectedImage !== null}
          onRequestClose={() => setSelectedImage(null)} // 4. 모달 닫기
          className="w-auto max-w-2xl flex flex-col items-center justify-center focus:outline-none gap-8"
          overlayClassName=" fixed inset-0 bg-white flex items-center justify-center"
        >
          <Image
            src={`${selectedImage.publicUrl}`} // 5. 선택된 이미지의 원본 URL 사용
            alt={"그림"}
            className="w-full h-full object-contain "
          />
          <button
            className="bg-white text-black ring-3 ring-black rounded-xl p-5 text-7xl w-3xl"
            onClick={() => setSelectedImage(null)}
          >
            나가기
          </button>
        </Modal>
      )}
    </div>
  );
}
