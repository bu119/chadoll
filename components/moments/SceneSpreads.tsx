"use client";

import { useState } from "react";
import { PhotoButton } from "@/components/moments/PhotoViewer";
import type { GalleryScene, SceneId } from "@/lib/gallery";

/** 휴대폰에서는 장면마다 이만큼만 먼저 보여주고, 나머지는 "더 보기"로 펼친다. */
const MOBILE_VISIBLE = 5;

/**
 * 장면 하나를 잡지의 펼침면처럼 놓는 방식.
 * 휴대폰은 공통: 첫 사진은 크게(4:5), 나머지는 두 장씩 정사각형.
 * 데스크톱은 방식마다 사진 크기와 자리를 다르게 한다.
 */
type Spread = "lead" | "pair" | "text" | "strip" | "single";

// 이웃한 장면끼리 다른 방식을 쓴다.
const spreadOf: Record<SceneId, Spread> = {
  puppy: "text",
  forest: "lead",
  spring: "text",
  autumn: "pair",
  winter: "text",
  sunny: "lead",
  sea: "pair",
  walk: "text",
  picnic: "pair",
  cafe: "text",
  rain: "lead",
  friends: "pair",
  closeup: "lead",
};

/** 주제를 골라 사진 수가 줄면 그 수에 맞는 방식으로 바꾼다. */
function pickSpread(scene: GalleryScene): Spread {
  const n = scene.photos.length;
  if (n === 1) return "single";
  if (n === 2) return "pair";
  const spread = spreadOf[scene.id];
  if (spread === "strip" && n > 4) return "pair";
  return spread;
}

// 첫 사진 / 둘째 / 셋째 다음부터 줄지어 놓는 사진. 앞의 몇 장을 특별하게 놓는지는 방식마다 다르다.
const featuredCount: Record<Spread, number> = { lead: 3, pair: 2, text: 2, strip: 0, single: 1 };

const heading: Record<Spread, string> = {
  lead: "md:col-span-full",
  pair: "md:col-span-full",
  text: "md:col-span-3 md:self-end md:pb-2",
  strip: "md:col-span-full",
  single: "md:col-span-4 md:self-end md:pb-2",
};

const special: Record<Spread, string[]> = {
  // 큰 사진(4:5)이 왼쪽 두 줄을 차지하고, 오른쪽 두 장이 그 높이를 반씩 나눈다.
  lead: [
    "md:col-span-7 md:row-span-2",
    "aspect-square md:col-span-5 md:aspect-auto md:h-full",
    "aspect-square md:col-span-5 md:aspect-auto md:h-full",
  ],
  // 두 장을 엇갈려서
  pair: ["md:col-span-5 md:aspect-[3/4]", "md:col-span-5 md:col-start-8 md:mt-24 aspect-square md:aspect-[3/4]"],
  // 글 옆에 큰 사진 하나, 작은 사진 하나를 아래 맞춰서
  text: ["md:col-span-5 md:aspect-[4/5]", "md:col-span-4 md:self-end aspect-square md:aspect-[3/4]"],
  strip: [],
  // 한 장뿐이면 글 옆에 보통 크기로
  single: ["md:col-span-4 md:col-start-6 md:aspect-[3/4]"],
};

/** 줄지어 놓는 사진의 너비: 한 줄에 서너 장이 고르게 들어가게 */
function restSpan(count: number): string {
  if (count % 4 === 0) return "md:col-span-3";
  if (count % 3 === 0 || count < 4) return "md:col-span-4";
  return "md:col-span-3";
}

function itemClass(spread: Spread, i: number, restCount: number): string {
  if (i === 0) return `col-span-2 aspect-[4/5] ${special[spread][0] ?? ""}`;
  const fixed = special[spread][i];
  if (fixed) return fixed;
  // strip: 한 줄로 놓고 하나 걸러 하나씩 내린다.
  if (spread === "strip") return `aspect-square md:aspect-[3/4] ${restSpan(restCount)} ${i % 2 === 1 ? "md:mt-12" : ""}`;
  return `aspect-square ${restSpan(restCount)}`;
}

function sizesOf(spread: Spread, i: number): string {
  if (i === 0) return spread === "strip" ? "(min-width: 768px) 25vw, 100vw" : "(min-width: 768px) 55vw, 100vw";
  if (i < featuredCount[spread]) return "(min-width: 768px) 40vw, 50vw";
  return "(min-width: 768px) 25vw, 50vw";
}

/** 사진첩의 장면들. 사진을 누르면 PhotoViewer 가 크게 보여준다. */
export function SceneSpreads({ scenes }: { scenes: GalleryScene[] }) {
  const [expanded, setExpanded] = useState<SceneId[]>([]);

  return (
    <div className="space-y-20 sm:space-y-28">
      {scenes.map((scene) => {
        const spread = pickSpread(scene);
        // strip 은 첫 사진도 줄의 한 칸이다.
        const restCount = spread === "strip" ? scene.photos.length : scene.photos.length - featuredCount[spread];
        const isExpanded = expanded.includes(scene.id);
        const hiddenCount = Math.max(0, scene.photos.length - MOBILE_VISIBLE);

        return (
          <section
            key={scene.id}
            aria-labelledby={`scene-${scene.id}`}
            className="grid scroll-mt-24 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:gap-6"
          >
            <div className={`col-span-2 mb-2 md:mb-0 ${heading[spread]}`}>
              <h2 id={`scene-${scene.id}`} className="text-2xl font-bold tracking-[-0.02em] text-cocoa sm:text-3xl">
                {scene.title}
              </h2>
              <p className="mt-2 max-w-sm break-keep text-brown">{scene.note}</p>
            </div>

            {scene.photos.map((item, i) => {
              const collapsed = i >= MOBILE_VISIBLE && !isExpanded;
              const place =
                spread === "strip" && i === 0
                  ? `col-span-2 aspect-[4/5] md:aspect-[3/4] ${restSpan(restCount)}`
                  : itemClass(spread, i, restCount);
              return (
                <PhotoButton
                  key={item.src}
                  photo={{ ...item, scene: scene.title }}
                  sizes={sizesOf(spread, i)}
                  className={`${place} ${collapsed ? "hidden md:block" : ""}`}
                />
              );
            })}

            {hiddenCount > 0 && !isExpanded ? (
              <button
                type="button"
                onClick={() => setExpanded((ids) => [...ids, scene.id])}
                className="col-span-2 min-h-12 text-lg font-semibold text-cocoa underline decoration-golden decoration-2 underline-offset-[7px] md:hidden"
              >
                {scene.title} 사진 {hiddenCount}장 더 보기
              </button>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
