import type { ReactNode } from "react";
import { AgeText } from "@/components/home/AgeText";
import { Kicker } from "@/components/ui/Kicker";
import { Photo } from "@/components/ui/Photo";
import { profilePhoto } from "@/lib/gallery";
import { getTodaySnapshot } from "@/lib/today";
import { chadol } from "@/lib/site";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-4 sm:grid-cols-[8rem_1fr]">
      <dt className="text-base leading-7 text-brown">{label}</dt>
      <dd className="break-keep text-xl text-cocoa">{children}</dd>
    </div>
  );
}

/** 소개 페이지 첫머리: 성격 소개와 프로필 */
export async function Profile() {
  const { age } = await getTodaySnapshot();

  return (
    <section aria-labelledby="profile-title" className="px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <Kicker className="mb-4">ABOUT</Kicker>
          <h1 id="profile-title" className="text-4xl font-bold tracking-[-0.02em] text-cocoa sm:text-5xl">
            차돌이는요
          </h1>
          <p className="mt-8 break-keep text-2xl font-medium leading-relaxed text-cocoa">{chadol.personality}</p>
          <p className="mt-4 max-w-xl break-keep text-xl text-cocoa">{chadol.temper}</p>

          <dl className="mt-12 border-b border-line">
            <Row label="이름">{chadol.fullName}</Row>
            <Row label="견종">{chadol.breed}</Row>
            <Row label="나이">
              <AgeText serverAge={age} />살{" "}
              <span className="text-base text-brown">
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
          preload
          sizes="(min-width: 768px) 40vw, 100vw"
          caption="안녕하세요, 김차돌이에요."
          className="md:col-span-5 md:col-start-8"
        />
      </div>
    </section>
  );
}
