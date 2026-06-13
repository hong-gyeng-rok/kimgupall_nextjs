import type { AlbumCard } from "@/types/album";

export const getCollectionIndexHref = (card: AlbumCard) =>
  card.slug !== "slug" ? `/gallery?collection=${card.slug}` : "/gallery";
