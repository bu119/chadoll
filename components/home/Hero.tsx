import { SocialLinks } from "@/components/layout/SocialLinks";
import { LeashLine } from "@/components/ui/LeashLine";
import { Photo } from "@/components/ui/Photo";
import { Wordmark } from "@/components/ui/Wordmark";
import { heroPhoto } from "@/lib/gallery";
import { chadol, site } from "@/lib/site";

/**
 * 휴대폰: 브랜드 → 사진 → 이름·소개 순서로 쌓는다.
 * 데스크톱: 사진을 왼쪽에 크게, 브랜드와 소개를 오른쪽 아래에 둔다.
 */
export function Hero() {
  return (
    <section className="px-5 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-12">
      <div className="mx-auto grid max-w-6xl gap-x-12 md:grid-cols-12 md:grid-rows-[1fr_auto] lg:gap-x-16">
        <div className="md:col-span-6 md:col-start-7 md:row-start-1 md:self-end">
          {/* 휴대폰은 바로 위 헤더에 로고가 있으니 서브타이틀만 둔다. 이름까지 첫 화면에 보이게 하려는 것. */}
          <Wordmark className="hidden text-[clamp(3.5rem,6.4vw,5.75rem)] text-cocoa md:block" />
          <p className="font-serif text-2xl italic text-brown md:mt-3">{site.subtitle}</p>
        </div>

        <Photo
          photo={heroPhoto}
          preload
          ratio="4/5"
          sizes="(min-width: 768px) 42vw, 100vw"
          className="mt-6 md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1 md:mt-0 md:[&>div]:aspect-[3/4]"
        />

        <div className="mt-8 md:col-span-6 md:col-start-7 md:row-start-2 md:mt-10">
          <h1 className="break-keep text-cocoa">
            <span className="block text-xl font-medium text-brown sm:text-2xl">{site.tagline},</span>
            {/* 리드줄 선은 이름 너비에 딱 맞춘다. */}
            <span className="mt-1 inline-block">
              <span className="block text-5xl font-bold tracking-[-0.03em] sm:text-6xl">{chadol.fullName}</span>
              {/* w-0 min-w-full: 선 자체 너비(213px)가 이름보다 넓어지지 않게. 열 때 한 번 그려진다. */}
              <LeashLine className="mt-1 w-0 min-w-full text-leash motion-safe:animate-leash-draw" />
            </span>
          </h1>
          <p className="mt-5 max-w-md break-keep text-xl text-cocoa">
            간식과 산책을 사랑하는 {chadol.breedName}이에요. 차돌이의 하루를 천천히 구경하고 가세요.
          </p>
          <SocialLinks className="mt-5" />
        </div>
      </div>
    </section>
  );
}
