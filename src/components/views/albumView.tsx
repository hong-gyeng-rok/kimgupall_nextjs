import AlbumLayout from "../layout/albumLayout";
import MainBg from "../layout/mainBg";

export default function AlbumView() {
  return (
    <section data-testid="AlbumView">
      <MainBg>
        <AlbumLayout />
      </MainBg>
    </section>
  );
}
