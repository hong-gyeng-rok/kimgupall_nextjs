import GalleryView from "@/components/views/gallery";
import GalleryContextProvider from "@/contexts/GalleryContextProvider";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const slug =
    resolvedSearchParams?.collection && typeof resolvedSearchParams.collection === "string"
      ? resolvedSearchParams.collection
      : undefined;
  return (
    <GalleryContextProvider slug={slug}>
      <main date-testid="GalleryPage">
        <GalleryView isShow={true} />
      </main>
    </GalleryContextProvider>
  );
}
