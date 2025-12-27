import GalleryLayout from "../layout/galleryLayout";
import { IsShow } from "../../types/common";
import MainBg from "../layout/mainBg";

export default function GalleryView({ isShow = true }: IsShow) {
  return (
    <MainBg>
      <section
        data-testid="GalleryView"
        className="flex flex-col items-center bg-none shadow-xl/50 rounded p-4 w-full h-screen"
      >
        <GalleryLayout isShow={isShow} />
      </section>
    </MainBg>
  );
}
