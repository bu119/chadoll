import { MomentsView } from "@/components/moments/MomentsView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "차돌이 사진첩",
  description: "숲길, 카페, 소풍, 비 오는 날까지. 포메라니안 차돌이의 일상을 사진으로 모았어요.",
  path: "/moments",
});

export default function MomentsPage() {
  return <MomentsView />;
}
