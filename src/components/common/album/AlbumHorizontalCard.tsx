import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { AlbumCard } from "@/types/album";
import { AlbumCardImage, AlbumCardLink } from "./albumCardShared";

type AlbumHorizontalCardProps = {
  card: AlbumCard;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

export function AlbumHorizontalCard({
  card,
  index,
  total,
  scrollYProgress,
}: AlbumHorizontalCardProps) {
  const isInstagram = card.isExternal;
  const position = total > 1 ? index / (total - 1) : 0;
  const range = 1 / total;
  const inputRange = [position - range, position, position + range];

  const scale = useTransform(scrollYProgress, inputRange, [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, inputRange, [0.3, 1, 0.3]);

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ scale, opacity }}
      className="
        relative flex flex-col items-center justify-center bg-white/20 backdrop-blur-xl border border-white/30 group
        h-full w-full
        md:h-[65vh] md:max-h-[600px] md:w-87.5 md:rounded-3xl md:shadow-2xl md:p-6 md:justify-start transition-all duration-300
      "
    >
      <p
        className={`text-black text-2xl md:text-xl font-bold mb-4 md:mb-6 drop-shadow-md md:drop-shadow-none z-10 transition-opacity duration-300 ${!isInstagram ? "md:group-hover:opacity-0" : ""}`}
      >
        {card.title}
      </p>

      <div
        className={`relative flex-1 w-full h-fit overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ${!isInstagram ? "group-hover:ring-2 group-hover:ring-black/50" : ""}`}
      >
        <AlbumCardImage card={card} index={index} />

        {!isInstagram && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 z-20">
            <p className="text-white text-2xl font-bold px-4 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {card.title}
            </p>
            <div className="flex items-center gap-2 px-6 py-2 border border-white/50 rounded-full text-white text-sm font-medium tracking-wider hover:bg-white hover:text-black transition-colors duration-300 translate-y-4 group-hover:translate-y-0 delay-75">
              <span>VIEW {card.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  return <AlbumCardLink card={card}>{cardContent}</AlbumCardLink>;
}
