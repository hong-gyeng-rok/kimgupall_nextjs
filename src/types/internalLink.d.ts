import { ReactNode, CSSProperties, MouseEventHandler } from "react"; // CSSProperties import

export interface InternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
  ariaLabel?: string;
}
