import type { ReactNode } from "react";
import type { AlbumCard } from "@/types/album";
import FallbackImage from "../fallbackImage";
import InternalLink from "../internalLink";

const ALBUM_IMAGE_SIZES = "(max-width: 767px) calc(100vw - 2rem), 384px";

export function AlbumCardImage({
  card,
  index,
}: {
  card: AlbumCard;
  index: number;
}) {
  return (
    <FallbackImage
      src={card.url}
      alt={card.alt}
      fill
      className="object-contain"
      sizes={ALBUM_IMAGE_SIZES}
      priority={index === 0}
      quality={card.isExternal ? 85 : 60}
      placeholder="empty"
    />
  );
}

export function AlbumCardLink({
  card,
  children,
}: {
  card: AlbumCard;
  children: ReactNode;
}) {
  if (card.isExternal) return children;

  const href = card.slug ? `/gallery?collection=${card.slug}` : "/gallery";

  return (
    <InternalLink href={href} className="w-fit h-fit block flex justify-center">
      {children}
    </InternalLink>
  );
}
