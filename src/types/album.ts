import type { MotionValue } from "framer-motion";

export type AlbumCard = {
  id: string;
  url: string;
  title: string;
  alt: string;
  slug: string | null;
  isExternal?: boolean;
};

export type OrderedAlbumCard = AlbumCard & {
  order: number;
};

export type AlbumLayoutMode = "stacked" | "horizontal";

export type AlbumCardItemProps = {
  card: AlbumCard;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  layoutMode: AlbumLayoutMode;
};
