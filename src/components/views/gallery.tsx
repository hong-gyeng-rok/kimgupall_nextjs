import GalleryLayout from "../layout/galleryLayout";
import { IsShow } from "../../types/common";

export default function GalleryView({ isShow = true }: IsShow) {
  return (
    <section
      data-testid="GalleryView"
      className="flex flex-col items-center bg-none shadow-xl/50 rounded w-full h-screen"
    >
      <GalleryLayout isShow={isShow} />
    </section>
  );
}
