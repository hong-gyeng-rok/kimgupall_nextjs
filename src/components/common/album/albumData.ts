import type { MediaType } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";
import type { AlbumCard, OrderedAlbumCard } from "@/types/album";

const toGalleryQuerySlug = (collectionSlug: string) =>
  collectionSlug.replace(/^gallery-/, "");

export const buildAlbumCards = (medias: MediaType[] = []): AlbumCard[] => {
  const collections = new Map<string, NonNullable<MediaType["collection"]>>();
  const collectionPreviewImages = new Map<
    string,
    NonNullable<AlbumCard["previewImages"]>
  >();

  medias.forEach((media) => {
    if (
      media.collection &&
      (media.collection.location === "GALLERY" || media.location === "GALLERY")
    ) {
      collections.set(media.collection.slug, media.collection);

      const previewUrl = getPublicMediaUrl(media.publicUrl);
      if (!previewUrl || media.type !== "IMAGE") return;

      const previewImages = collectionPreviewImages.get(media.collection.slug) ?? [];
      if (previewImages.length >= 3) return;

      previewImages.push({
        url: previewUrl,
        alt: media.altText ?? media.title ?? media.collection.title,
      });
      collectionPreviewImages.set(media.collection.slug, previewImages);
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
        previewImages: [
          { url: thumbnailUrl, alt: collection.title },
          ...(collectionPreviewImages.get(collection.slug) ?? []),
        ].slice(0, 3),
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
      previewImages: [
        {
          url: getPublicMediaUrl(instagramImage.publicUrl) ?? "",
          alt: instagramImage.altText ?? instagramImage.title ?? "INSTAGRAM QR",
        },
      ],
    }
    : null;

  return [...collectionCards, instagramCard].filter(
    (card): card is AlbumCard => Boolean(card?.url),
  );
};
