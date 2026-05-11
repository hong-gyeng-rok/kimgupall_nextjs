import GalleryContents from "@/components/common/gallery/galleryContents";
import GalleryFooterNav from "@/components/common/gallery/GalleryFooterNav";
import PageShell from "@/components/layout/PageShell";
import { getGlobalBackgroundImageUrl } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const bgImgSrc = await getGlobalBackgroundImageUrl();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const slug =
    resolvedSearchParams?.collection &&
    typeof resolvedSearchParams.collection === "string"
      ? resolvedSearchParams.collection
      : undefined;

  return (
    <PageShell testId="GalleryPage" bgImgSrc={bgImgSrc}>
      <section
        data-testid="GalleryView"
        className="flex min-h-svh w-full flex-col items-center rounded bg-none shadow-xl/50"
      >
        <GalleryContents collectionSlug={slug}>
          <GalleryFooterNav />
        </GalleryContents>
      </section>
    </PageShell>
  );
}
