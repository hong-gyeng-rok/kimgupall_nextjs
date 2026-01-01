import TitleLayout from "../layout/titleLayout";
import MainBg from "../layout/mainBg";

export default function TitleView() {
  return (
    <header data-testid="TitleView">
      <MainBg>
        <TitleLayout />
      </MainBg>
    </header>
  );
}
