//외부 링크로 연결되는 버튼 컴포넌트
import React from "react";
import { ExternalLinkProps } from "../../types/externalLink";
export default function ExternalLink({
  href, //string
  children, // ReactNode
  className, //string?
  style, //CSSProperties
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
}
