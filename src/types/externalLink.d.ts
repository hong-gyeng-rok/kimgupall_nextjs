import { ReactNode, CSSProperties } from "react"; // CSSProperties import

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
