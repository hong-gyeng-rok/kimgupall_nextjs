"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

interface IntroContextProps {
  scrollYProgress: MotionValue<number>;
}

export default function IntroContext({ scrollYProgress }: IntroContextProps) {
  // 각 문단의 투명도 조절
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  // 살짝 아래에서 올라오는 효과 추가
  const y1 = useTransform(scrollYProgress, [0.1, 0.25], [20, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.45], [20, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.65], [20, 0]);
  const y4 = useTransform(scrollYProgress, [0.7, 0.85], [20, 0]);

  return (
    <div className="w-full text-black font-medium text-lg md:text-xl lg:text-2xl gap-8 flex flex-col font-chosunGoosu">
      <motion.p style={{ opacity: opacity1, y: y1 }}>
        본 일러스트레이션 시리즈는 동양 설화 속 귀신이자 수호신인 야차(Yacha)를
        매개로 하여, 인간의 본성을 관통하는 7대 죄악(The Seven Deadly Sins)을
        시각화한 프로젝트입니다.
      </motion.p>
      <motion.p style={{ opacity: opacity2, y: y2 }}>
        작가는 고전적인 야차의 형상에 멈추지 않고, 이들을 21세기의 현대 도시로
        소환했습니다. 색욕, 폭식, 탐욕, 나태, 분노, 시기, 교만이라는 7가지
        원죄는 각기 다른 개성을 지닌 어반 스트릿(Urban Street) 스타일의 캐릭터로
        재탄생했습니다.
      </motion.p>
      <motion.p style={{ opacity: opacity3, y: y3 }}>
        전통적인 도깨비의 뿔과 오방색, 동양적 문양은 가죽 재킷, 택티컬 기어,
        네온 사인 등 현대적 오브제와 충돌하고 융합하며 독창적인 오리엔탈
        사이버펑크 분위기를 자아냅니다.
      </motion.p>
      <motion.p style={{ opacity: opacity4, y: y4 }}>
        이 시리즈는 과거의 두려움의 대상이었던 야차를 통해, 현대인이 품고 있는
        욕망의 민낯을 감각적이고 힙(Hip)한 비주얼로 풀어낸 현대판
        야차도(夜叉圖)입니다.
      </motion.p>
    </div>
  );
}
