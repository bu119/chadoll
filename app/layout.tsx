import type { Metadata, Viewport } from "next";
import { Gowun_Dodum, Jua } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

const gowun = Gowun_Dodum({
  variable: "--font-gowun",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jua = Jua({
  variable: "--font-jua",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "단풍 든 공원에서 활짝 웃는 포메라니안 차돌이",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#fffbf3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${gowun.variable} ${jua.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-lg">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
