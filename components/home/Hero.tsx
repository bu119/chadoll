import { SocialLinks } from "@/components/layout/SocialLinks";
import { LeashLine } from "@/components/ui/LeashLine";
import { Photo } from "@/components/ui/Photo";
import { heroPhotos } from "@/lib/gallery";
import { chadol, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="px-5 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-12 md:gap-8">
        {/* 앨범 첫 장: 사진 세 장을 겹쳐 놓는다. */}
        <div className="relative pb-[8%] md:col-span-7">
          <Photo
            photo={heroPhotos.main}
            preload
            sizes="(min-width: 768px) 38vw, 64vw"
            className="w-[66%] -rotate-1"
          />
          <Photo
            photo={heroPhotos.spring}
            preload
            sizes="(min-width: 768px) 21vw, 36vw"
            className="absolute right-0 top-[4%] w-[37%] rotate-2"
          />
          <Photo
            photo={heroPhotos.autumn}
            preload
            sizes="(min-width: 768px) 19vw, 32vw"
            className="absolute bottom-0 right-[6%] w-[33%] -rotate-2"
          />
        </div>

        <div className="md:col-span-5">
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
            인형처럼 폭신폭신한 {chadol.breed}, 차돌이네 집에 오신 걸 환영해요.
          </p>
          <SocialLinks className="mt-5" />
        </div>
      </div>
    </section>
  );
}
