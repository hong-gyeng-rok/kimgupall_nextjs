import IntroLayout from "../layout/introLayout";
import MainBg from "../layout/mainBg";

export default function IntroView() {
  return (
    <section data-testid="IntroView">
      <MainBg>
        <IntroLayout />
      </MainBg>
    </section>
  );
}
