import { motion } from "framer-motion";
import type { AlbumCard } from "@/types/album";
import { AlbumCardImage, AlbumCardLink } from "./albumCardShared";

type AlbumStackedCardProps = {
  card: AlbumCard;
  index: number;
};

export function AlbumStackedCard({ card, index }: AlbumStackedCardProps) {
  const isInstagram = card.isExternal;

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ scale: 1, opacity: 1 }}
      className="
        relative flex flex-col items-center justify-center bg-white/20 backdrop-blur-xl border border-white/30 group
        h-full w-full
        md:h-[65vh] md:max-h-[600px] md:w-87.5 md:rounded-3xl md:shadow-2xl md:p-6 md:justify-start transition-all duration-300
      "
    >
      <p className="text-black text-2xl md:text-xl font-bold mb-4 md:mb-6 drop-shadow-md md:drop-shadow-none z-10 transition-opacity duration-300">
        {card.title}
      </p>

      <div
        className={`relative flex-1 w-full h-fit overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ${!isInstagram ? "group-hover:ring-2 group-hover:ring-black/50" : ""}`}
      >
        <AlbumCardImage card={card} index={index} />

        {!isInstagram && (
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-20 pointer-events-none">
            <span className="text-xs font-bold">VIEW {card.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );

  return <AlbumCardLink card={card}>{cardContent}</AlbumCardLink>;
}
