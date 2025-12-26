import Image from "next/image";
import yacha_font from "../../../../public/sampleImages/BG_DPI300.jpg";

export default function IntroTitle() {
  const introTitleImg = yacha_font;

  return (
    <div className="w-screen h-auto flex flex items-center justify-center">
      <Image
        src={introTitleImg}
        alt="yacha_font"
        width={1350}
        height={500}
        className="object-contain relative top-1/12"
      />
    </div>
  );
}
