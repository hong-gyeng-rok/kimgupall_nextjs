"use client";

import { motion } from "framer-motion";

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        {/* 심플한 로딩 인디케이터 */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        <p className="font-sans text-sm tracking-[0.2em] animate-pulse">
          LOADING
        </p>
      </div>
    </motion.div>
  );
}
