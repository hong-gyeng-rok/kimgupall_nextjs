"use client";

import { ReactNode } from "react";
import GalleryContext from "./GalleryContext";

export default function GalleryContextProvider({
  slug,
  children,
}: {
  slug?: string;
  children: ReactNode;
}) {
  return (
    <GalleryContext.Provider value={{ slug }}>
      {children}
    </GalleryContext.Provider>
  );
}
