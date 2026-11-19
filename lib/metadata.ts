import type { Metadata } from "next";
import { site } from "@/lib/site";

const ogImage = {
  url: site.ogImage,
  width: 1200,
  height: 630,
  alt: "복슬복슬한 털을 뽐내며 정면을 보고 활짝 웃는 포메라니안 차돌이",
};

/**
 * 페이지 메타데이터. openGraph 는 부모 값을 통째로 덮어쓰기 때문에
 * 페이지마다 공유 이미지까지 함께 넣어 준다.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** 없으면 사이트 기본 제목을 쓴다. */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title;
  return {
    title: title ?? { absolute: site.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [site.ogImage],
    },
  };
}
