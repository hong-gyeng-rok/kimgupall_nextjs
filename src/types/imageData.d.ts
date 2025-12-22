import { ReactNode } from "react"; // ReactNode를 임포트합니다.

export interface ImageItems {
  id: number;
  title?: string;
  url: string;
  description?: string;
  group?: string;
  urlConverted: string;
}

export interface AllImageData {
  [key: string | number]: ImageItems[];
}

export interface ImageDataProviderProps {
  children: ReactNode;
}
