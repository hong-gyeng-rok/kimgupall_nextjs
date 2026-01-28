"use client";

import { createContext, useContext } from "react";

interface GalleryContextType {
  slug?: string;
}

const GalleryContext = createContext<GalleryContextType>({ slug: undefined });

export const useGalleryContext = () => useContext(GalleryContext);

export default GalleryContext;
