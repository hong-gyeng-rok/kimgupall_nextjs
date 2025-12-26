import InternalLink from "./internalLink";
import { Link } from "../../types/links";

const navLinks = [
  {
    id: 1,
    title: "홈",
    url: "/",
  },
];

export default function GoToHomeBtn() {
  return (
    <article className="sticky top-0 z-30 bg-white">
      {navLinks.map((link) => (
        <Nav key={link.id} link={link} />
      ))}
    </article>
  );
}

function Nav({ link }: { link: Link }) {
  return (
    <InternalLink
      className="text-black text-3xl ml-10 p-2 px-10 hover:bg-black hover:text-white hover:rounded-xl hover:animate-bounce"
      href={link.url}
    >
      {link.title}
    </InternalLink>
  );
}
