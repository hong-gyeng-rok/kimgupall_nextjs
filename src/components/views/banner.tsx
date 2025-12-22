import BannerImg from "../common/banner/bannerImg";
import Links from "../common/banner/links";

export default function Banner() {
  return (
    <section className="flex flex-col items-center justify-center bg-white shadow-xl/40 p-4 rounded-md gap-y-6 min-[350px]:h-fit md:h-auto">
      <BannerImg />
      <Links />
    </section>
  );
}
