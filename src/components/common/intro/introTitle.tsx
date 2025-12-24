import Image from "next/image";
import yacha_font from "../../../../public/sampleImages/yacha_font.png";

export default function IntroTitle() {
  const titleImg = yacha_font;

  return (
    <div className="w-screen flex justify-center itmes-center">
      <Image
        src={titleImg}
        alt="yacha_font"
        width={600}
        height={300}
        className="w-[800px] h-[400px]"
      />
    </div>
  );
}
