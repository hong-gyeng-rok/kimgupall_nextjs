import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/queryProvider";
import localFont from "next/font/local";
import { getSitePreviewImageUrl } from "@/lib/media";
import { Analytics } from "@vercel/analytics/next";

const chosunGosu = localFont({
  src: "./fonts/ChosunCentennial.ttf",
  display: "swap",
  variable: "--font-goosu",
});

const chungjuKimSaeng = localFont({
  src: "./fonts/ChungjuKimSaeng.ttf",
  display: "swap",
  variable: "--font-kimsaeng",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteMetadata = {
  title: "kimgupall | 일러스트 작가 포트폴리오",
  description:
    "일러스트 작가 kimgupall의 다양한 작품과 프로젝트를 소개하는 포트폴리오 사이트입니다.",
};

export async function generateMetadata(): Promise<Metadata> {
  const previewImageUrl = await getSitePreviewImageUrl();
  const previewImages = previewImageUrl
    ? [
      {
        url: previewImageUrl,
        width: 1200,
        height: 630,
        alt: "kimgupall 작품 미리보기",
      },
    ]
    : [];

  return {
    metadataBase: new URL("https://kimgupall-nextjs.vercel.app"),
    title: siteMetadata.title,
    description: siteMetadata.description,
    keywords: ["일러스트", "작가", "포트폴리오", "kimgupall", "그림", "갤러리"],
    authors: [{ name: "홍경록" }],
    openGraph: {
      title: siteMetadata.title,
      description: siteMetadata.description,
      url: "https://kimgupall-nextjs.vercel.app/",
      siteName: "kimgupall",
      locale: "ko_KR",
      type: "website",
      images: previewImages,
    },
    twitter: {
      card: "summary_large_image",
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: previewImages.map((image) => image.url),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chosunGosu.variable} ${chungjuKimSaeng.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
