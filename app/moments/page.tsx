import { MomentsView } from "@/components/moments/MomentsView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "차돌이 사진첩",
  description: "아기 때부터 사계절 산책, 소풍, 카페까지. 포메라니안 차돌이의 일상을 사진으로 모았어요.",
  path: "/moments",
});

export default function MomentsPage() {
  return <MomentsView />;
}
