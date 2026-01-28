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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://kimgupall98.com' // 실제 배포될 도메인
      : 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ko-KR': '/ko-KR'
    },
  },
  title: "kimgupall98",
  description:
    "일러스트 작가 kimgupall의 다양한 작품과 프로젝트를 소개하는 포트폴리오 사이트입니다.",
  keywords: ["일러스트", "작가", "포트폴리오", "kimgupall", "그림", "갤러리"],
  authors: [{ name: "홍경록" }],
  openGraph: {
    title: "kimgupall | 일러스트 작가 포트폴리오",
    description:
      "일러스트 작가 kimgupall의 다양한 작품과 프로젝트를 소개하는 포트폴리오 사이트입니다.",
    url: "https://kimgupall98.com",
    siteName: "kimgupall",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/sampleImages/yacha.jpg", // 공유 시 보여질 대표 이미지 (public 폴더 기준)
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
    images: ["/sampleImages/yacha.jpg"],
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
