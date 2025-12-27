import GoToHomeBtn from "@/components/common/goToHomeBtn";
import IntroView from "@/components/views/introView";
import MainBg from "@/components/layout/mainBg";

export default function IntroPage() {
  return (
    <main data-testid="IntroPage">
      <MainBg>
        <GoToHomeBtn />
        <IntroView />
      </MainBg>
    </main>
  );
}
