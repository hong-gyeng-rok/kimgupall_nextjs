import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/queryProvider";
import localFont from "next/font/local";

const chosunGoosu = localFont({
  src: "./fonts/ChosunCentennial.ttf",
  display: "swap",
  variable: "--font-goosu",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");
const previewImageUrl = `${STORAGE_BASE_URL}/gallery/yacha/9990.yacha_force.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL("https://kimgupall-nextjs.vercel.app"),
  title: "kimgupall | 일러스트 작가 포트폴리오",
  description:
    "일러스트 작가 kimgupall의 다양한 작품과 프로젝트를 소개하는 포트폴리오 사이트입니다.",
  keywords: ["일러스트", "작가", "포트폴리오", "kimgupall", "그림", "갤러리"],
  authors: [{ name: "홍경록" }],
  openGraph: {
    title: "kimgupall | 일러스트 작가 포트폴리오",
    description:
      "일러스트 작가 kimgupall의 다양한 작품과 프로젝트를 소개하는 포트폴리오 사이트입니다.",
    url: "https://kimgupall-nextjs.vercel.app/",
    siteName: "kimgupall",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: previewImageUrl,
        width: 1200,
        height: 630,
        alt: "kimgupall 작품 미리보기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "kimgupall | 일러스트 작가 포트폴리오",
    description:
      "일러스트 작가 kimgupall의 다양한 작품과 프로젝트를 소개하는 포트폴리오 사이트입니다.",
    images: [previewImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${chosunGoosu.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
