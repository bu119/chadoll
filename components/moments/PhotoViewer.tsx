"use client";

import Image from "next/image";
import {
  createContext,
  use,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { photoShape } from "@/components/ui/Photo";
import type { MomentPhoto } from "@/lib/gallery";

const ViewerContext = createContext<((src: string) => void) | null>(null);

const VIEWER_SIZES = "(min-width: 768px) 768px, 100vw";
/** 이만큼 옆으로 밀면 다음 사진으로 넘긴다. */
const SWIPE_DISTANCE = 50;

const barButton =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-3xl leading-none text-ivory transition-colors hover:bg-ivory hover:text-cocoa";

/**
 * 사진을 크게 보는 창. 안쪽의 PhotoButton 을 누르면 열린다.
 * 넘기기는 photos 순서를 따른다. (주제를 고르면 고른 사진 안에서만 넘어간다.)
 */
export function PhotoViewer({ photos, children }: { photos: MomentPhoto[]; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const current = index === null ? null : photos[index];
  const at = (step: number) => (index === null ? null : photos[(index + step + photos.length) % photos.length]);

  const open = (src: string) => {
    const found = photos.findIndex((item) => item.src === src);
    if (found === -1) return;
    setIndex(found);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const move = (step: number) =>
    setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length));

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  };

  // 휴대폰에서 옆으로 밀어 넘기기
  const onPointerDown = (event: PointerEvent) => {
    swipe.current = { x: event.clientX, y: event.clientY, moved: false };
  };
  const onPointerUp = (event: PointerEvent) => {
    const start = swipe.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      start.moved = true;
      move(dx < 0 ? 1 : -1);
    }
  };
  // 밀어서 넘긴 뒤 따라오는 클릭으로 창이 닫히지 않게 한다.
  const onPhotoAreaClick = () => {
    if (swipe.current?.moved) return;
    close();
  };

  const prev = at(-1);
  const next = at(1);

  return (
    <ViewerContext value={open}>
      {children}

      <dialog
        ref={dialogRef}
        aria-label="사진 크게 보기"
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa p-0 text-ivory backdrop:bg-cocoa"
      >
        {current ? (
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between px-3 pt-3 sm:px-6 sm:pt-5">
              <p className="pl-2 font-serif text-xl lining-nums tabular-nums">
                {(index ?? 0) + 1} / {photos.length}
              </p>
              <button type="button" onClick={close} aria-label="닫기" className={barButton}>
                ×
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1 touch-pan-y px-3 py-3 sm:px-8"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onClick={onPhotoAreaClick}
            >
              {loadedSrc !== current.src ? (
                <p className="absolute inset-0 flex items-center justify-center text-base text-cream">
                  사진을 불러오는 중이에요
                </p>
              ) : null}
              <div className="relative mx-auto h-full w-full max-w-3xl">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes={VIEWER_SIZES}
                  onLoad={() => setLoadedSrc(current.src)}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 pb-4 sm:gap-6 sm:px-6 sm:pb-6">
              <button type="button" onClick={() => move(-1)} aria-label="이전 사진" className={barButton}>
                ‹
              </button>
              <p className="min-w-0 flex-1 break-keep text-center text-base leading-snug sm:text-lg">
                <span className="block text-sm text-cream">{current.scene}</span>
                {current.alt}
              </p>
              <button type="button" onClick={() => move(1)} aria-label="다음 사진" className={barButton}>
                ›
              </button>
            </div>

            {/* 앞뒤 사진을 미리 받아 두면 넘길 때 바로 보인다. */}
            {[prev, next].map((item) =>
              item && item.src !== current.src ? (
                <Image
                  key={`pre-${item.src}`}
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  sizes={VIEWER_SIZES}
                  loading="eager"
                  className="hidden"
                />
              ) : null,
            )}
          </div>
        ) : null}
      </dialog>
    </ViewerContext>
  );
}

type PhotoButtonProps = {
  photo: MomentPhoto;
  sizes: string;
  /** 비율·자리 (aspect-*, col-span-* 등) */
  className?: string;
};

/** 누르면 사진을 크게 보여주는 사진. PhotoViewer 안에서만 쓴다. */
export function PhotoButton({ photo, sizes, className = "" }: PhotoButtonProps) {
  const open = use(ViewerContext);
  return (
    <button
      type="button"
      onClick={() => open?.(photo.src)}
      aria-label={`${photo.alt} 사진 크게 보기`}
      className={`relative w-full cursor-zoom-in ${photoShape} ${className}`}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
    </button>
  );
}
