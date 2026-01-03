"use client";

import { useEffect, useState } from "react";
import Album from "../common/album/album";

export default function AlbumLayout() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드 렌더링 확인 및 스켈레톤 표시 시간 확보
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center overflow-hidden gap-10 px-20">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-none w-87.5 h-[65vh] max-h-[600px] bg-gray-100 rounded-3xl animate-pulse flex flex-col p-6"
          >
            <div className="w-3/4 h-6 bg-gray-200 rounded mb-6" />
            <div className="flex-1 w-full bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div data-testid="AlbumLayout">
      <Album />
    </div>
  );
}
