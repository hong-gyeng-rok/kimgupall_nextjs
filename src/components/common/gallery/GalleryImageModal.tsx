"use client";

import { AnimatePresence, motion } from "framer-motion";
import Modal from "react-modal";
import { useState } from "react";
import type { MediaType } from "@/hooks/useImages";
import { getGalleryImageUrl } from "@/components/common/gallery/galleryUtils";

interface GalleryImageModalProps {
  selectedImage: MediaType | null;
  onClose: () => void;
}

export default function GalleryImageModal({
  selectedImage,
  onClose,
}: GalleryImageModalProps) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <Modal
          ariaHideApp={false}
          isOpen={selectedImage !== null}
          onRequestClose={onClose}
          className="flex flex-col w-screen h-screen items-center justify-center focus:outline-none gap-8"
          overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md animate-fade-in"
        >
          <ModalContent selectedImage={selectedImage} onClose={onClose} />
        </Modal>
      )}
    </AnimatePresence>
  );
}

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
        className="flex relative max-w-[90vw] max-h-[80vh] min-w-75 min-h-0 items-center justify-center"
      >
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element -- Expanded view must use the original high-resolution file. */}
        <img
          src={getGalleryImageUrl(selectedImage.publicUrl)}
          alt={selectedImage.altText || selectedImage.title || "작품 이미지"}
          width={selectedImage.width ?? undefined}
          height={selectedImage.height ?? undefined}
          decoding="async"
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
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
