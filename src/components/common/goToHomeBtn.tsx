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
    <nav
      id="GoToHomeBtnNav"
      className="fixed bottom-10 w-full z-30 bg-none flex justify-center items-center pb-safe h-0 "
    >
      {navLinks.map((link) => (
        <Nav key={link.id} link={link} />
      ))}
    </nav>
  );
}

function Nav({ link }: { link: Link }) {
  return (
    <InternalLink
      data-testid="GoToHomeBtn"
      className="text-black text-3xl ml-10 p-2 px-10 ring-2 rounded-full hover:bg-black hover:text-white hover:rounded-full hover:animate-bounce"
      href={link.url}
      ariaLabel={`${link.title}으로 이동`}
    >
      {link.title}
    </InternalLink>
  );
}
