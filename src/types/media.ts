export interface ExhibitionCollection {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  localThumbnailUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  location: string | null;
  orderIndex: number;
}

export interface ExhibitionMedia {
  id: string;
  collectionId: string | null;
  type: string;
  location: string;
  publicUrl: string;
  localUrl?: string | null;
  storagePath: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  profileMarkdown: string | null;
  motifTitle: string | null;
  motifMarkdown: string | null;
  altText: string | null;
  width: number | null;
  height: number | null;
  posterUrl: string | null;
  localPosterUrl?: string | null;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
  collection: ExhibitionCollection | null;
}
