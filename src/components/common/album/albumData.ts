import type { MediaType } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";
import type { AlbumCard, OrderedAlbumCard } from "@/types/album";

const toGalleryQuerySlug = (collectionSlug: string) =>
  collectionSlug.replace(/^gallery-/, "");

export const buildAlbumCards = (medias: MediaType[] = []): AlbumCard[] => {
  const collections = new Map<string, NonNullable<MediaType["collection"]>>();

  medias.forEach((media) => {
    if (
      media.collection &&
      (media.collection.location === "GALLERY" || media.location === "GALLERY")
    ) {
      collections.set(media.collection.slug, media.collection);
    }
  });

  const collectionCards = [...collections.values()]
    .reduce<OrderedAlbumCard[]>((cards, collection) => {
      const thumbnailUrl = getPublicMediaUrl(collection.thumbnailUrl);

      if (!thumbnailUrl || collection.location !== "GALLERY") return cards;

      cards.push({
        id: collection.id,
        url: thumbnailUrl,
        title: collection.title,
        alt: collection.title,
        slug: toGalleryQuerySlug(collection.slug),
        order: collection.orderIndex,
      });

      return cards;
    }, [])
    .sort((a, b) => a.order - b.order);

  const instagramImage = medias.find(
    (media) => media.location === "ALBUM" && media.type === "IMAGE",
  );
  const instagramCard: AlbumCard | null = instagramImage
    ? {
        id: instagramImage.id,
        url: getPublicMediaUrl(instagramImage.publicUrl) ?? "",
        title: "INSTAGRAM",
        alt: instagramImage.altText ?? instagramImage.title ?? "INSTAGRAM QR",
        slug: null,
        isExternal: true,
      }
    : null;

  return [...collectionCards, instagramCard].filter(
    (card): card is AlbumCard => Boolean(card?.url),
  );
};
