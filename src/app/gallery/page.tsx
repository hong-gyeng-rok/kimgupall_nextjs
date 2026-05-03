import { Suspense } from "react";
import GalleryView from "@/components/views/gallery";

export default function GalleryPage() {
  return (
    <main data-testid="GalleryPage">
      <Suspense fallback={null}>
        <GalleryView isShow={true} />
      </Suspense>
    </main>
  );
}
