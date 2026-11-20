import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";
import { pageMetadata } from "@/lib/metadata";
import { getSiteUrl, site } from "@/lib/site";
import "./globals.css";

// 한글 본문·제목: SUIT Variable (OFL-1.1, app/fonts/SUIT-LICENSE.txt)
// 자주 쓰는 한글 2,350자와 굵기 400–700 만 남긴 파일이다. 다시 만들기: node scripts/subset-font.mjs
const suit = localFont({
  src: "./fonts/SUIT-Variable.woff2",
  variable: "--font-suit",
  weight: "400 700",
  display: "swap",
});

// 영문 브랜드·라벨·숫자에만 쓰는 글꼴
const jost = Jost({
  variable: "--font-jost",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...pageMetadata({ description: site.description, path: "/" }),
  // 주소(canonical)는 페이지마다 따로 정한다.
  alternates: undefined,
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${suit.variable} ${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-lg leading-[1.75]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
