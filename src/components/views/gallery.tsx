import GalleryContainer from "../layout/galleryContainer";
import { IsShow } from "../../types/common";
import MainBg from "../layout/mainBg";

export default function GalleryView({ isShow = true }: IsShow) {
  return (
    <MainBg>
      <section className="flex flex-col items-center bg-none shadow-xl/50 rounded p-4 w-full h-screen">
        <GalleryContainer isShow={isShow} />
      </section>
    </MainBg>
  );
}
