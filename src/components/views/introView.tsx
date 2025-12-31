import IntroLayout from "../layout/introLayout";
import MainBg from "../layout/mainBg";

export default function IntroView() {
  return (
    <section data-testid="IntroView" className="snap-none">
      <MainBg>
        <IntroLayout />
      </MainBg>
    </section>
  );
}
