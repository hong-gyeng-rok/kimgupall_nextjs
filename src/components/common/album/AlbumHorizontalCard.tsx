import { motion } from "framer-motion";
import type { AlbumCard } from "@/types/album";
import { AlbumCardImage, AlbumCardLink } from "./albumCardShared";
import { ALBUM_DESKTOP_CARD_FRAME_CLASS } from "./albumLayout";

type AlbumHorizontalCardProps = {
  card: AlbumCard;
  index: number;
};

export function AlbumHorizontalCard({
  card,
  index,
}: AlbumHorizontalCardProps) {
  const isInstagram = card.isExternal;

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative flex flex-col items-center justify-center bg-white/20 backdrop-blur-xl border border-white/30 group
        h-full w-full
        ${ALBUM_DESKTOP_CARD_FRAME_CLASS}
        md:justify-start transition-all duration-300 hover:-translate-y-1 hover:bg-white/30
      `}
    >
      <p
        className={`text-black text-2xl md:text-base lg:text-lg font-bold mb-4 md:mb-3 drop-shadow-md md:drop-shadow-none z-10 transition-opacity duration-300 ${!isInstagram ? "md:group-hover:opacity-0" : ""}`}
      >
        {card.title}
      </p>

      <div
        className={`relative flex-1 min-h-0 w-full overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ${!isInstagram ? "group-hover:ring-2 group-hover:ring-black/50" : ""}`}
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
