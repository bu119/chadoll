import type { ReactNode } from "react";
import { AgeText } from "@/components/home/AgeText";
import { Photo } from "@/components/ui/Photo";
import { profilePhoto } from "@/lib/gallery";
import { getTodaySnapshot } from "@/lib/today";
import { chadol } from "@/lib/site";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-line py-4">
      <dt className="shrink-0 text-base text-ink-soft">{label}</dt>
      <dd className="break-keep text-right text-xl text-ink">{children}</dd>
    </div>
  );
}

export async function ProfileCard() {
  const { age } = await getTodaySnapshot();

  return (
    <section id="profile" aria-labelledby="profile-title" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
        <div className="md:col-span-7">
          <h2 id="profile-title" className="font-hand text-6xl leading-none text-ink sm:text-7xl">
            차돌이는요
          </h2>
          <p className="mt-6 break-keep text-2xl leading-relaxed text-ink">{chadol.personality}</p>
          <div className="mt-5 max-w-xl space-y-3">
            {chadol.story.map((line) => (
              <p key={line} className="break-keep text-xl text-ink">
                {line}
              </p>
            ))}
          </div>
          <dl className="mt-10 gap-x-12 border-b border-line sm:grid sm:grid-cols-2 sm:border-b-0">
            <Row label="이름">{chadol.fullName}</Row>
            <Row label="견종">{chadol.breed}</Row>
            <Row label="나이">
              <AgeText serverAge={age} />살{" "}
              <span className="text-base text-ink-soft">
                ({chadol.birth.year}년 {chadol.birth.month}월생)
              </span>
            </Row>
            <Row label="별명">{chadol.nicknames.join(", ")}</Row>
            <Row label="좋아하는 것">{chadol.likes.join(", ")}</Row>
            <Row label="싫어하는 것">{chadol.dislikes.join(", ")}</Row>
          </dl>
        </div>

        <Photo
          photo={profilePhoto}
          sizes="(min-width: 768px) 36vw, 384px"
          caption="카페에서 쉬는 게 제일 좋아요."
          className="mx-auto w-full max-w-sm md:col-span-5 md:mt-10 md:max-w-none"
        />
      </div>
    </section>
  );
}
