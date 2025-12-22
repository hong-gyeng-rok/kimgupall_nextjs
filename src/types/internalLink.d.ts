import { ReactNode, CSSProperties } from "react"; // CSSProperties import

export interface InternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
