import { SocialLinks } from "@/components/layout/SocialLinks";
import { LeashLine } from "@/components/ui/LeashLine";
import { Photo } from "@/components/ui/Photo";
import { heroPhoto } from "@/lib/gallery";
import { chadol, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="px-5 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <Photo photo={heroPhoto} preload sizes="(min-width: 768px) 45vw, 100vw" />

        <div>
          <h1 className="font-hand text-ink">
            <span className="block break-keep text-5xl leading-tight sm:text-6xl sm:leading-tight">
              {site.tagline},
            </span>
            {/* 리드줄 선은 이름 너비에 딱 맞춘다. */}
            <span className="inline-block">
              <span className="block text-[clamp(7rem,17vw,12rem)] leading-[0.9]">{chadol.fullName}</span>
              <LeashLine className="block w-full text-butter" />
            </span>
          </h1>
          <p className="mt-6 max-w-md break-keep text-xl text-ink">
            간식과 산책을 사랑하는 {chadol.breedName}이에요. 차돌이의 하루를 천천히 구경하고 가세요.
          </p>
          <SocialLinks className="mt-5" />
        </div>
      </div>
    </section>
  );
}
