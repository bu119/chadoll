import Image from "next/image";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { heroPhoto } from "@/lib/gallery";
import { chadol, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="px-5 pb-14 pt-8 sm:pb-20 sm:pt-14">
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="fade-up relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] border-4 border-white shadow-soft">
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            preload
            sizes="(min-width: 768px) 448px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="fade-up text-center md:text-left">
          <p className="text-xl text-maple-600">안녕하세요, {chadol.name}예요! 🐶</p>
          <h1 className="mt-3 break-keep font-display text-4xl leading-snug text-brown-600 sm:text-5xl sm:leading-snug">
            {site.tagline}
          </h1>
          <p className="mt-5 break-keep text-xl text-brown-800/85">
            인형처럼 폭신폭신한 {chadol.breed}, 차돌이네 집에 오신 걸 환영해요.
          </p>
          <SocialLinks className="mt-7 justify-center md:justify-start" />
        </div>
      </div>
    </section>
  );
}
