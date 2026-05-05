import { Suspense } from "react";
import GalleryView from "@/components/views/gallery";
import PageShell from "@/components/layout/PageShell";
import GalleryContextProvider from "@/contexts/GalleryContextProvider";
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
    <GalleryContextProvider slug={slug}>
      <PageShell testId="GalleryPage" bgImgSrc={bgImgSrc}>
        <Suspense fallback={null}>
          <GalleryView isShow={true} />
        </Suspense>
      </PageShell>
    </GalleryContextProvider>
  );
}
