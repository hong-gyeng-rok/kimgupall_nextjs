import React from "react";
import ExternalLink from "../externalLink";
import InternalLink from "../internalLink";
import { Link } from "../../../types/links";

const allLinks = [
  // --- 'default' 스타일을 갖는 링크들 ---
  {
    id: 1,
    title: "Instagram",
    bgColor: "#0025D9",
    url: "https://www.instagram.com/kimgupall_98",
    styleVariant: "default", // 스타일 변형을 지정
    path: "url",
  },
  // {
  //   id: 2,
  //   title: "Market",
  //   bgColor: "#166EFF",
  //   url: "https://naver.me/53lmTjmx",
  //   styleVariant: "default",
  //   path: "url",
  // },
  {
    id: 3,
    title: "NoteFolio",
    bgColor: "#3A84FF",
    url: "https://notefolio.net/kimgupall98",
    styleVariant: "default",
    path: "url",
  },
  {
    id: 4,
    title: "Pinterest",
    bgColor: "#98BEFF",
    url: "https://kr.pinterest.com/kimgupall98/",
    styleVariant: "default",
    path: "url",
  },

  // --- 'subtle' 스타일을 갖는 링크들 ---
  {
    id: 5,
    title: "Subs",
    url: "http://pf.kakao.com/_QGyxnn",
    styleVariant: "subtle", // 'Subs'는 외부 링크이지만, 디자인은 'subtle'
    path: "url",
  },
  {
    id: 6,
    title: "Gallery",
    url: "gallery", // 내부 페이지 경로
    styleVariant: "subtle",
    path: "path",
  },
  // {
  //   id: 7,
  //   title: "About",
  //   url: "#", // 내부 페이지 경로
  //   styleVariant: "subtle",
  //   path: "path",
  // },
];

function Links() {
  // 'styleVariant'에 따라 링크들을 두 그룹으로 나눔
  const defaultStyleLinks = allLinks.filter(
    (link) => link.styleVariant === "default",
  );
  const subtleStyleLinks = allLinks.filter(
    (link) => link.styleVariant === "subtle",
  );

  return (
    <article className="flex flex-col gap-y-6">
      {/* 'default' 스타일 링크 렌더링 */}
      {defaultStyleLinks.map((link) => (
        <StyledLink key={link.id} link={link} />
      ))}

      {/* 'subtle' 스타일 링크 렌더링 */}
      <div className="flex flex-row justify-around">
        {subtleStyleLinks.map((link) => (
          <StyledLink key={link.id} link={link} />
        ))}
      </div>
    </article>
  );
}

function StyledLink({ link }: { link: Link }) {
  const isDefualtStyle = link.styleVariant === "default";
  const style = isDefualtStyle ? { backgroundColor: link.bgColor } : {}; //dafaultStyle 링크의 경우 독립된 backgroundColor 필요해 변수로 할당
  const className = isDefualtStyle
    ? "block w-xs h-auto p-2 rounded-md shadow-xl/40 text-center" //bar 스타일 디자인 (dafaultStyle 링크 디자인)
    : "text-stone-950 p-1 px-4 shadow-xl/40 rounded "; //button 스타일 디자인 (subtleStyle 링크 디자인)

  if (link.path === "url") {
    return (
      <ExternalLink href={link.url} style={style} className={className}>
        {link.title}
      </ExternalLink>
    );
  }
  return (
    <InternalLink href={link.url} style={style} className={className}>
      {link.title}
    </InternalLink>
  );
}

export default React.memo(Links);
