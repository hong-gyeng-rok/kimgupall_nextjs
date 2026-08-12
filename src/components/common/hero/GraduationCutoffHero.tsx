const heroImages = {
  mainLeft: "http://localhost:3845/assets/954b9d9d2520b490e885dcdc2c6d0ccff6a7a474.png",
  mainCenter: "http://localhost:3845/assets/7dff18d22c934a1ac3ae3e9b5be8718b748678ea.png",
  mainRight: "http://localhost:3845/assets/be7e7293b61b79e9502f88b46fea148a056d2432.png",
  bottomLeft: "http://localhost:3845/assets/1290439d48f0142fd6706164db757094e36a0241.png",
  bottomLeftCenter: "http://localhost:3845/assets/e323017dc1cd5f18b4d17f9f9d8c8c5e1b8bfc3b.png",
  bottomRightCenter: "http://localhost:3845/assets/86efaf8af11ff698dcd2ff1c0943a744ba6e7c64.png",
  bottomRight: "http://localhost:3845/assets/53fde47295c67f562ca8c25d11f938d9db26c398.png",
} as const;

type HeroImageTileProps = {
  src: string;
  className?: string;
  imageClassName?: string;
  imagePositionClassName?: string;
  label: string;
};

function HeroImageTile({
  src,
  className = "",
  imageClassName = "",
  imagePositionClassName = "bg-center",
  label,
}: HeroImageTileProps) {
  return (
    <figure
      aria-label={label}
      className={`relative overflow-hidden bg-black ${className}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-cover ${imagePositionClassName} ${imageClassName}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
    </figure>
  );
}

function GraduationWordmark() {
  return (
    <div className="relative h-[clamp(3.4rem,10.6vw,10.1rem)] w-[clamp(10.6rem,36.3vw,34.4rem)] font-black leading-none tracking-[-0.095em] text-black">
      <p className="absolute left-0 top-0 text-[clamp(2.2rem,6.9vw,6.6rem)]">
        GRADUATION
      </p>
      <p className="absolute left-0 top-[34%] text-[clamp(2.1rem,6.6vw,6.25rem)] text-[#e71316]">
        2026
      </p>
    </div>
  );
}

function VerticalTitle() {
  return (
    <div
      className="absolute right-[3.3%] top-[24.8%] hidden -translate-y-[1.04em] grid-cols-2 gap-[clamp(1.5rem,3.6vw,3.75rem)] text-center [font-family:var(--font-kimsaeng)] text-[clamp(4rem,6.35vw,6rem)] font-black leading-[1.04] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] md:grid"
      aria-label="칠죄종 야차도"
    >
      <p className="[writing-mode:vertical-rl]">七罪宗</p>
      <p className="translate-y-[1.04em] [writing-mode:vertical-rl]">夜車道</p>
    </div>
  );
}

export default function GraduationCutoffHero() {
  return (
    <section
      className="relative flex min-h-svh items-center overflow-hidden bg-[#fff7ee] px-4 py-[clamp(1rem,2vw,1.75rem)] text-black md:px-10"
      aria-labelledby="graduation-cutoff-hero-title"
    >
      <div className="relative mx-auto aspect-[1512/982] w-[min(100%,1512px,calc(153.97svh-clamp(3.08rem,6.16vw,5.39rem)))]">
        <header className="absolute left-[3.6%] top-[4.1%] z-20 flex w-[92.8%] items-start justify-between gap-6">
          <GraduationWordmark />
          <div className="pt-[clamp(2.25rem,7vw,6.4rem)] text-right font-black leading-none tracking-[-0.06em]">
            <p className="text-[clamp(0.7rem,1.05vw,1rem)]">김찬석</p>
            <p className="text-[clamp(1.25rem,1.6vw,1.5rem)]">KIMGUPALL</p>
          </div>
        </header>

        <div className="absolute left-[3.6%] top-[23.5%] h-[55.1%] w-[92.8%] overflow-hidden border border-black/10 md:h-[54.2%]">
          <div className="grid h-full grid-cols-1 md:grid-cols-3">
            <HeroImageTile
              src={heroImages.mainLeft}
              label="야차도 메인 좌측 작품"
              imageClassName="scale-[1.5] origin-top-left translate-x-[0.1%] translate-y-[0.1%]"
            />
            <HeroImageTile
              src={heroImages.mainCenter}
              label="야차도 메인 중앙 작품"
              imageClassName="scale-[1.39] origin-top translate-x-[-17%]"
            />
            <HeroImageTile
              src={heroImages.mainRight}
              label="야차도 메인 우측 작품"
              imageClassName="scale-[1.43] origin-top translate-x-[-21%]"
            />
          </div>

          <p
            id="graduation-cutoff-hero-title"
            className="absolute bottom-[3.5%] left-[0.6%] z-10 whitespace-nowrap [font-family:var(--font-geist-sans)] text-[clamp(3rem,8.95vw,8.5rem)] font-black leading-none tracking-[0.06em] text-transparent md:bottom-[4.2%]"
            style={{ WebkitTextStroke: "clamp(1.5px, 0.28vw, 4px) #fff7ee" }}
          >
            칠대죄악:야차도
          </p>

          <VerticalTitle />
        </div>

        <div className="absolute bottom-[4.5%] left-[3.6%] grid h-[16.4%] w-[92.8%] grid-cols-2 gap-[clamp(0.75rem,1.65vw,1.55rem)] md:grid-cols-[320fr_316fr_312fr_328fr]">
          <HeroImageTile
            src={heroImages.bottomLeft}
            label="야차도 하단 좌측 작품"
            imagePositionClassName="bg-left-top"
            imageClassName="origin-top-left scale-[1]"
          />
          <HeroImageTile
            src={heroImages.bottomLeftCenter}
            label="야차도 하단 좌중앙 작품"
            imagePositionClassName="bg-left-top"
            imageClassName="origin-top-left scale-[1]"
          />
          <HeroImageTile
            src={heroImages.bottomRightCenter}
            label="야차도 하단 우중앙 작품"
            imagePositionClassName="bg-left-top"
            imageClassName="origin-top-left scale-[1]"
          />
          <HeroImageTile
            src={heroImages.bottomRight}
            label="야차도 하단 우측 작품"
            imagePositionClassName="bg-left-top"
            imageClassName="origin-top-left scale-[1]"
          />
        </div>
      </div>
    </section>
  );
}
