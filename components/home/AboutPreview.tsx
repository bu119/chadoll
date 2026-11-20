import { Kicker } from "@/components/ui/Kicker";
import { MoreLink } from "@/components/ui/MoreLink";
import { Photo } from "@/components/ui/Photo";
import { aboutPreviewPhoto } from "@/lib/gallery";
import { chadol } from "@/lib/site";

/** 첫 화면의 짧은 소개. 자세한 내용은 /about 에 있다. */
export function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:items-center md:gap-8">
        <div className="md:col-span-6">
          <Kicker className="mb-4">ABOUT</Kicker>
          <h2 id="about-title" className="text-3xl font-bold tracking-[-0.02em] text-cocoa sm:text-4xl">
            차돌이는요
          </h2>
          <p className="mt-6 break-keep text-2xl font-medium leading-relaxed text-cocoa">{chadol.personality}</p>
          <MoreLink href="/about" className="mt-8">
            차돌이 더 알아보기
          </MoreLink>
        </div>
        <Photo
          photo={aboutPreviewPhoto}
          ratio="4/5"
          sizes="(min-width: 768px) 40vw, 100vw"
          className="md:col-span-5 md:col-start-8"
        />
      </div>
    </section>
  );
}
