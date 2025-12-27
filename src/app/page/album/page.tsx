import GoToHomeBtn from "@/components/common/goToHomeBtn";
import AlbumView from "@/components/views/albumView";
import MainBg from "@/components/layout/mainBg";

export default function AlbumPage() {
  return (
    <main data-testid="AlbumPage">
      <MainBg>
        <GoToHomeBtn />
        <AlbumView />
      </MainBg>
    </main>
  );
}
