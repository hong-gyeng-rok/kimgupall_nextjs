import InternalLink from "../internalLink";
import { Link } from "../../../types/links";

const navLinks = [
  {
    id: 1,
    title: "작품소개",
    url: "/intro",
  },
  {
    id: 2,
    title: "작업과정",
    url: "/drawingCourse",
  },
  {
    id: 3,
    title: "앨범",
    url: "/album",
  },
];

export default function TitleNav() {
  return (
    <article className="sticky top-0 flex flex-raw gap-10 ml-6  z-30">
      {navLinks.map((link) => (
        <Nav key={link.id} link={link} />
      ))}
    </article>
  );
}

function Nav({ link }: { link: Link }) {
  return (
    <InternalLink
      className="text-black text-3xl p-2 px-4 hover:bg-black hover:text-white hover:rounded-xl hover:animate-bounce"
      href={link.url}
    >
      {link.title}
    </InternalLink>
  );
}
