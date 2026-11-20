import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MomentsView } from "@/components/moments/MomentsView";
import { getSceneGroups, isGroupId } from "@/lib/gallery";
import { pageMetadata } from "@/lib/metadata";

// 주제마다 페이지를 미리 만들어 둔다.
export function generateStaticParams() {
  return getSceneGroups().map((group) => ({ group: group.id }));
}

export async function generateMetadata({ params }: PageProps<"/moments/[group]">): Promise<Metadata> {
  const { group } = await params;
  const info = getSceneGroups().find((item) => item.id === group);
  if (!info) return {};
  return pageMetadata({
    title: `${info.title} 사진`,
    description: `차돌이 사진첩에서 '${info.title}' 사진만 모아 봤어요.`,
    path: `/moments/${info.id}`,
  });
}

export default async function MomentsGroupPage({ params }: PageProps<"/moments/[group]">) {
  const { group } = await params;
  if (!isGroupId(group)) notFound();
  return <MomentsView group={group} />;
}
