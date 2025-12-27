//내부 페이지 이동하는 버튼 컴포넌트

import React from "react";
import Link from "next/link";
import { InternalLinkProps } from "../../types/internalLink";

export default function InternalLink({
  href, //string
  children, //ReactNode
  className, // string?
  style, //CSSProperties
  onClick,
  ariaLabel,
}: InternalLinkProps) {
  return (
    <Link
      data-testid="InternalBtn"
      href={href}
      className={className}
      style={style}
      onClick={onClick}
      target="_self"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
