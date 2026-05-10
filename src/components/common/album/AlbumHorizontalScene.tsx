import { motion, useTransform, type MotionValue } from "framer-motion";
import type { AlbumCard } from "@/types/album";
import {
  ALBUM_SKELETON_CARD_COUNT,
  AlbumSkeleton,
} from "./albumSkeleton";
import { AlbumHorizontalCard } from "./AlbumHorizontalCard";
import {
  ALBUM_DESKTOP_CARD_WIDTH_REM,
  ALBUM_HORIZONTAL_TRACK_GAP_CLASS,
  ALBUM_HORIZONTAL_TRACK_GAP_REM,
} from "./albumLayout";

const HORIZONTAL_CARD_CENTER_OFFSET_REM = ALBUM_DESKTOP_CARD_WIDTH_REM / 2;

type AlbumHorizontalSceneProps = {
  cards: AlbumCard[];
  isLoading: boolean;
  scrollYProgress: MotionValue<number>;
};

function getHorizontalTrackXRange(itemCount: number) {
  const stepCount = Math.max(itemCount, 1);
  const cardStepRem =
    ALBUM_DESKTOP_CARD_WIDTH_REM + ALBUM_HORIZONTAL_TRACK_GAP_REM;
  const travelRem = (stepCount - 1) * cardStepRem;
  const firstCardX = `calc(50vw - ${HORIZONTAL_CARD_CENTER_OFFSET_REM}rem)`;
  const lastCardX = `calc(50vw - ${HORIZONTAL_CARD_CENTER_OFFSET_REM + travelRem}rem)`;

  return [firstCardX, lastCardX];
}

export function AlbumHorizontalScene({
  cards,
  isLoading,
  scrollYProgress,
}: AlbumHorizontalSceneProps) {
  const itemCount = isLoading ? ALBUM_SKELETON_CARD_COUNT : cards.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    getHorizontalTrackXRange(itemCount),
  );

  return (
    <motion.div
      style={{ x }}
      className={`flex flex-row ${ALBUM_HORIZONTAL_TRACK_GAP_CLASS} items-center`}
    >
      {isLoading ? (
        <AlbumSkeleton layoutMode="horizontal" />
      ) : (
        cards.map((card, index) => (
          <div key={card.id}>
            <AlbumHorizontalCard
              card={card}
              index={index}
              total={cards.length}
              scrollYProgress={scrollYProgress}
            />
          </div>
        ))
      )}
    </motion.div>
  );
}
