"use client";

import React, { useState } from "react";
import Masonry from "react-masonry-css"; // react-masonry-css에서 임포트
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive"; // 모바일. PC 판독 플러그인
import { motion, AnimatePresence } from "framer-motion";
import { useGalleryImages, MediaType } from "../../../hooks/useImages";
import FallbackImage from "../fallbackImage";
import GallerySkeleton from "./gallerySkeleton";

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

//Modal.setAppElement("#root"); // 또는 앱의 최상위 DOM ID
export default function GalleryContents() {
  const {
    data: images,
    isLoading,
    isError,
    error,
    refetch,
  } = useGalleryImages();
  const isMobile = useMediaQuery({ maxWidth: 767 }); //모바일 조건 적용
  const [selectedImage, setSelectedImage] = useState<MediaType | null>(null);

  // 반응형 컬럼 개수 설정
  const breakpointColumnsObj = {
    default: 4, // 기본값 (가장 큰 화면)
    1280: 3, // 1280px 이하
    1024: 2, // 1024px 이하
    800: 1, // 768px 이하
    640: 1, // 640px 이하
  };

  // 로딩 스켈레톤 UI
  if (isLoading) {
    return <GallerySkeleton breakpointCols={breakpointColumnsObj} />;
  }

  // 에러 UI
  if (isError) {
    return (
      <div className="min-h-[50vh] w-full flex flex-col items-center justify-center gap-6 p-8 bg-gray-50 rounded-xl">
        <div className="text-center space-y-2">
          <p className="text-xl font-bold text-gray-800">
            앗! 갤러리를 불러오지 못했어요.
          </p>
          <p className="text-gray-500 text-sm">
            네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요.
          </p>
          <p className="text-red-400 text-xs bg-red-50 p-2 rounded">
            Error: {error?.message}
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="font-mono px-8 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg active:scale-95"
        >
          RETRY
        </button>
      </div>
    );
  }

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
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={image.id}
                className="rounded-lg shadow-lg mb-4 transition-all duration-300 hover:scale-105 hover:z-50 hover:shadow-2xl relative block w-full group"
                onClick={() => setSelectedImage(image)}
                aria-label={`${image.title || "작품"} 크게 보기`}
              >
                <FallbackImage
                  src={`${STORAGE_BASE_URL}${image.publicUrl}`}
                  alt={image.title || "작품 이미지"}
                  // DB에 저장된 치수 사용 (없을 경우 기본값)
                  width={300}
                  height={400}
                  // 초기 8장만 우선 로딩(LCP 최적화), 나머지는 Lazy Loading
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  placeholder="empty"
                  loading="lazy"
                  className="w-full h-auto object-cover rounded-lg bg-gray-100"
                />
                {/* 호버 시 살짝 어두워지는 효과 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
              </motion.button>
            ))}
          </Masonry>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full min-h-[40vh] text-gray-400 gap-4"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </motion.div>
            <p className="font-mono text-lg tracking-widest text-gray-500">
              NO ARTWORKS FOUND
            </p>
          </motion.div>
        )}
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {selectedImage && !isMobile && (
          <Modal
            ariaHideApp={false}
            isOpen={selectedImage !== null}
            onRequestClose={() => setSelectedImage(null)}
            className="w-screen h-screen flex flex-col items-center justify-center focus:outline-none gap-8"
            overlayClassName="fixed inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in"
          >
            <ModalContent
              selectedImage={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </article>
  );
}

// 모달 내부 컨텐츠 분리 (로딩 상태 관리 용이성)
function ModalContent({
  selectedImage,
  onClose,
}: {
  selectedImage: MediaType;
  onClose: () => void;
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-[90vw] max-h-[80vh] min-w-[300px] min-h-[400px] flex items-center justify-center"
      >
        {/* 로딩 스피너 */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          </div>
        )}

        <FallbackImage
          src={`${STORAGE_BASE_URL}${selectedImage.publicUrl}`}
          alt={selectedImage.title || "작품 이미지"}
          width={1200}
          height={1000}
          priority={true}
          onLoad={() => setIsImageLoading(false)}
          className={`w-auto h-auto max-h-[80vh] object-contain shadow-2xl rounded-lg transition-opacity duration-300 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-mono bg-white text-black border border-black px-10 py-3 rounded-full text-xl font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-xl"
        onClick={onClose}
      >
        CLOSE
      </motion.button>
    </>
  );
}
