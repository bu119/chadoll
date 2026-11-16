"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { photoShape } from "@/components/ui/Photo";
import type { GalleryScene, Photo, SceneId } from "@/lib/gallery";

const roundButton =
  "absolute flex h-14 w-14 items-center justify-center rounded-full bg-paper text-3xl text-ink transition-colors hover:bg-butter";

/** 휴대폰에서는 장면마다 이만큼만 먼저 보여주고, 나머지는 "더 보기"로 펼친다. */
const MOBILE_VISIBLE = 5;

type Layout = {
  /** 데스크톱 격자 */
  grid: string;
  heading: string;
  /** 첫 번째(가장 큰) 사진 */
  lead: string;
  /** 나머지 사진. i는 장면 안에서의 순서(1부터) */
  item: (i: number) => string;
};

const RATIO = "aspect-[3/4]";
/** 격자 두 줄을 차지하는 큰 사진은 높이를 줄에 맞춘다. */
const TALL = "aspect-[3/4] md:aspect-auto md:h-full";

// 사진을 놓는 방식 몇 가지. 이웃한 장면끼리 다른 방식을 쓴다.
// 큰 사진 왼쪽, 작은 사진들이 옆과 아래를 채운다. (사진 5장 또는 9장)
const leadLeft: Layout = {
  grid: "md:grid-cols-4",
  heading: "md:col-span-full",
  lead: `md:col-span-2 md:row-span-2 ${TALL}`,
  item: () => RATIO,
};
// 세 장을 나란히, 가운데만 살짝 내려서.
const trio: Layout = {
  grid: "md:grid-cols-3 md:gap-6",
  heading: "md:col-span-full",
  lead: `md:col-span-1 ${RATIO}`,
  item: (i) => `${RATIO} ${i === 1 ? "md:mt-12" : ""}`,
};

const layouts: Record<SceneId, Layout> = {
  forest: trio,
  // 큰 사진 왼쪽, 글은 오른쪽 위, 작은 사진 석 장은 오른쪽 아래.
  winter: {
    grid: "md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-5",
    heading: "md:col-span-6 md:col-start-7 md:row-start-1",
    lead: `md:col-span-6 md:col-start-1 md:row-span-2 md:row-start-1 ${RATIO}`,
    item: () => `md:col-span-2 md:row-start-2 md:self-end ${RATIO}`,
  },
  // 넉 장을 한 줄로, 하나 걸러 하나씩 내려서.
  sunny: {
    grid: "md:grid-cols-4 md:gap-5",
    heading: "md:col-span-full",
    lead: `md:col-span-1 ${RATIO}`,
    item: (i) => `${RATIO} ${i % 2 === 1 ? "md:mt-10" : ""}`,
  },
  walk: { ...leadLeft, grid: "md:grid-cols-4 lg:grid-cols-6" },
  // 큰 사진 오른쪽, 글과 작은 사진 넉 장은 왼쪽.
  picnic: {
    grid: "md:grid-cols-4 md:gap-5",
    heading: "md:col-span-2 md:pb-4",
    lead: `md:col-span-2 md:col-start-3 md:row-span-3 md:row-start-1 ${TALL}`,
    item: () => RATIO,
  },
  // 큰 사진 오른쪽, 작은 사진 여섯 장이 왼쪽 두 줄.
  cafe: {
    grid: "md:grid-cols-5",
    heading: "md:col-span-full",
    lead: `md:col-span-2 md:col-start-4 md:row-span-2 md:row-start-2 ${TALL}`,
    item: () => RATIO,
  },
  // 글 옆에 세 장을 엇갈려 놓는다.
  rain: {
    grid: "md:grid-cols-12 md:gap-6",
    heading: "md:col-span-3 md:self-center",
    lead: `md:col-span-3 ${RATIO}`,
    item: (i) => `md:col-span-3 ${RATIO} ${i === 1 ? "md:mt-16" : "md:mt-6"}`,
  },
  friends: leadLeft,
};

export function Gallery({ scenes }: { scenes: GalleryScene[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<SceneId[]>([]);

  const photos = scenes.flatMap((scene) => scene.photos);
  const current = index === null ? null : photos[index];

  const open = (photo: Photo) => {
    setIndex(photos.indexOf(photo));
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const move = (step: number) =>
    setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length));

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  };

  return (
    <>
      <div className="space-y-20 sm:space-y-28">
        {scenes.map((scene) => {
          const layout = layouts[scene.id];
          const isExpanded = expanded.includes(scene.id);
          const hiddenCount = Math.max(0, scene.photos.length - MOBILE_VISIBLE);

          return (
            <div key={scene.id} className={`grid grid-cols-2 gap-3 sm:gap-4 ${layout.grid}`}>
              <div className={`col-span-2 mb-2 md:mb-0 ${layout.heading}`}>
                <h3 className="font-hand text-5xl leading-none text-ink sm:text-6xl">{scene.title}</h3>
                <p className="mt-2 max-w-sm break-keep text-ink-soft">{scene.note}</p>
              </div>

              {scene.photos.map((photo, i) => {
                const collapsed = i >= MOBILE_VISIBLE && !isExpanded;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => open(photo)}
                    aria-label={`${photo.alt} 사진 크게 보기`}
                    className={`relative w-full cursor-zoom-in ${photoShape} ${
                      i === 0 ? `col-span-2 ${layout.lead}` : layout.item(i)
                    } ${collapsed ? "hidden md:block" : "block"}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={i === 0 ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 20vw, 50vw"}
                      className="object-cover"
                    />
                  </button>
                );
              })}

              {hiddenCount > 0 && !isExpanded ? (
                <button
                  type="button"
                  onClick={() => setExpanded((ids) => [...ids, scene.id])}
                  className="col-span-2 min-h-12 text-lg text-ink underline decoration-butter decoration-[3px] underline-offset-[6px] md:hidden"
                >
                  {scene.title} 사진 {hiddenCount}장 더 보기
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="사진 크게 보기"
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/90"
      >
        {current ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="relative min-h-0 w-full max-w-3xl flex-1" onClick={close}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="break-keep text-center text-lg text-paper">
              {current.alt}{" "}
              <span className="text-page">
                ({(index ?? 0) + 1}/{photos.length})
              </span>
            </p>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="이전 사진"
              className={`${roundButton} left-3 top-1/2 -translate-y-1/2 sm:left-6`}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="다음 사진"
              className={`${roundButton} right-3 top-1/2 -translate-y-1/2 sm:right-6`}
            >
              ›
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className={`${roundButton} right-3 top-3 sm:right-6 sm:top-6`}
            >
              ×
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
