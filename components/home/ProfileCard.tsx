import type { ReactNode } from "react";
import { AgeText } from "@/components/home/AgeText";
import { Photo } from "@/components/ui/Photo";
import { profilePhoto, traitPhotos } from "@/lib/gallery";
import { getTodaySnapshot } from "@/lib/today";
import { chadol, getTraits, type Trait } from "@/lib/site";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-line py-4">
      <dt className="shrink-0 text-base text-ink-soft">{label}</dt>
      <dd className="break-keep text-right text-xl text-ink">{children}</dd>
    </div>
  );
}

/** 사진 한 장과 짧은 소개 한 줄 */
function TraitItem({ trait }: { trait: Trait }) {
  return (
    <li className="grid grid-cols-[2fr_3fr] items-center gap-5 sm:gap-7">
      <Photo photo={traitPhotos[trait.id]} sizes="(min-width: 768px) 20vw, 40vw" />
      <div>
        <h3 className="break-keep font-hand text-4xl leading-tight text-ink sm:text-5xl">{trait.title}</h3>
        <p className="mt-2 break-keep text-lg text-ink sm:text-xl">{trait.text}</p>
      </div>
    </li>
  );
}

export async function ProfileCard() {
  const { age } = await getTodaySnapshot();

  return (
    <section id="profile" aria-labelledby="profile-title" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="md:col-span-7">
            <h2 id="profile-title" className="font-hand text-6xl leading-none text-ink sm:text-7xl">
              차돌이는요
            </h2>
            <p className="mt-6 break-keep text-2xl leading-relaxed text-ink">{chadol.personality}</p>
            <p className="mt-3 max-w-xl break-keep text-xl text-ink">{chadol.temper}</p>
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
            caption="안녕하세요, 김차돌이에요."
            className="mx-auto w-full max-w-sm md:col-span-5 md:mt-10 md:max-w-none"
          />
        </div>

        <ul className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-2 md:gap-x-12 md:gap-y-14">
          {getTraits().map((trait) => (
            <TraitItem key={trait.id} trait={trait} />
          ))}
        </ul>
      </div>
    </section>
  );
}
