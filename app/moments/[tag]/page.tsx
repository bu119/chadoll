import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MomentsView } from "@/components/moments/MomentsView";
import { getTags, isTag } from "@/lib/gallery";
import { pageMetadata } from "@/lib/metadata";

// 주제마다 페이지를 미리 만들어 둔다.
export function generateStaticParams() {
  return getTags().map((tag) => ({ tag: tag.id }));
}

export async function generateMetadata({ params }: PageProps<"/moments/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const info = getTags().find((item) => item.id === tag);
  if (!info) return {};
  return pageMetadata({
    title: `${info.label} 사진`,
    description: `차돌이 사진첩에서 '${info.label}' 사진만 모아 봤어요.`,
    path: `/moments/${info.id}`,
  });
}

export default async function MomentsTagPage({ params }: PageProps<"/moments/[tag]">) {
  const { tag } = await params;
  if (!isTag(tag)) notFound();
  return <MomentsView tag={tag} />;
}
