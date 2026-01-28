import GalleryView from "@/components/views/gallery";
import GalleryContextProvider from "@/contexts/GalleryContextProvider";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const slug =
    searchParams?.collection && typeof searchParams.collection === "string"
      ? searchParams.collection
      : undefined;
  return (
    <GalleryContextProvider slug={slug}>
      <main date-testid="GalleryPage">
        <GalleryView isShow={true} />
      </main>
    </GalleryContextProvider>
  );
}
