import GalleryContents from "@/components/common/gallery/galleryContents";
import GalleryFooterNav from "@/components/common/gallery/GalleryFooterNav";
import PageShell from "@/components/layout/PageShell";

export const dynamic = "force-dynamic";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const slug =
    resolvedSearchParams?.collection &&
      typeof resolvedSearchParams.collection === "string"
      ? resolvedSearchParams.collection
      : undefined;

  return (
    <PageShell testId="GalleryPage" >
      <section
        data-testid="GalleryView"
        className="flex h-svh w-full flex-col items-center overflow-hidden border border-white/20 p-6 shadow-inner backdrop-blur-xs"
      >
        <GalleryContents collectionSlug={slug}>
          <GalleryFooterNav />
        </GalleryContents>
      </section>
    </PageShell>
  );
}
