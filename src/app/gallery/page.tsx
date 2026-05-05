import GalleryContents from "@/components/common/gallery/galleryContents";
import GoToHomeBtn from "@/components/common/goToHomeBtn";
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
        className="flex flex-col items-center bg-none shadow-xl/50 rounded w-full h-screen"
      >
        <article className="w-full mx-auto px-4" data-testid="GalleryLayout">
          <GalleryContents collectionSlug={slug} />
          <GoToHomeBtn />
        </article>
      </section>
    </PageShell>
  );
}
