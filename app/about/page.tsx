import { Profile } from "@/components/about/Profile";
import { Timeline } from "@/components/about/Timeline";
import { Traits } from "@/components/about/Traits";
import { MoreLink } from "@/components/ui/MoreLink";
import { pageMetadata } from "@/lib/metadata";
import { chadol } from "@/lib/site";

export const metadata = pageMetadata({
  title: "차돌이는요",
  description: `${chadol.personality} 갈색 포메라니안 김차돌을 소개해요.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Profile />
      <Traits />
      <Timeline />
      <div className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl border-t border-line pt-8">
          <MoreLink href="/moments">차돌이 사진 보러 가기</MoreLink>
        </div>
      </div>
    </>
  );
}
