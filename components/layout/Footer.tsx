import { SocialLinks } from "@/components/layout/SocialLinks";
import { Photo } from "@/components/ui/Photo";
import { farewellPhoto } from "@/lib/gallery";
import { getTodaySnapshot } from "@/lib/today";
import { site } from "@/lib/site";

export async function Footer() {
  const { year } = await getTodaySnapshot();

  return (
    <footer className="bg-page px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:gap-12">
        <Photo photo={farewellPhoto} sizes="176px" className="w-36 shrink-0 -rotate-2 sm:w-44" />
        <div>
          <p className="break-keep font-hand text-6xl leading-none text-ink sm:text-7xl">
            차돌이 보러 또 놀러 오세요
          </p>
          <SocialLinks className="mt-5" />
          <p className="mt-6 break-keep text-base text-ink-soft">
            © {year} {site.name}. 차돌이 사진은 허락 없이 가져가지 말아 주세요.
          </p>
        </div>
      </div>
    </footer>
  );
}
