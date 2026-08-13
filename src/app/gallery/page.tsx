import PageShell from "@/components/layout/PageShell";
import GalleryRouteContents from "@/components/common/gallery/GalleryRouteContents";

export default function GalleryPage() {
  return (
    <PageShell testId="GalleryPage">
      <GalleryRouteContents />
    </PageShell>
  );
}
