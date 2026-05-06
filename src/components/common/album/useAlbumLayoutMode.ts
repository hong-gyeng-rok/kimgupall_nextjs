import { useEffect, useState } from "react";
import type { AlbumLayoutMode } from "@/types/album";

export function useAlbumLayoutMode(): AlbumLayoutMode {
  const [layoutMode, setLayoutMode] =
    useState<AlbumLayoutMode>("horizontal");

  useEffect(() => {
    const updateLayoutMode = () => {
      setLayoutMode(window.innerWidth < 768 ? "stacked" : "horizontal");
    };

    updateLayoutMode();
    window.addEventListener("resize", updateLayoutMode);

    return () => {
      window.removeEventListener("resize", updateLayoutMode);
    };
  }, []);

  return layoutMode;
}
