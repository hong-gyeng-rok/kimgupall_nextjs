import { motion, useTransform, type MotionValue } from "framer-motion";
import type { AlbumCard } from "@/types/album";
import { AlbumSkeleton } from "./albumSkeleton";
import { AlbumHorizontalCard } from "./AlbumHorizontalCard";

type AlbumHorizontalSceneProps = {
  cards: AlbumCard[];
  isLoading: boolean;
  scrollYProgress: MotionValue<number>;
};

export function AlbumHorizontalScene({
  cards,
  isLoading,
  scrollYProgress,
}: AlbumHorizontalSceneProps) {
  const x = useTransform(scrollYProgress, [0, 1], ["25%", "-60%"]);

  return (
    <motion.div
      style={{ x }}
      className="flex flex-row gap-40 items-center"
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
