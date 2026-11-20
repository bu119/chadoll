import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { pageMetadata } from "@/lib/metadata";
import { getSiteUrl, site } from "@/lib/site";
// 한글 본문: Pretendard. 쓰인 글자 묶음만 내려받도록 나뉜 파일을 직접 호스팅한다.
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

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
  themeColor: "#f8f5ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-lg leading-[1.75]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
