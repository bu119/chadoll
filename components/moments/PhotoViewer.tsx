"use client";

import Image from "next/image";
import {
  createContext,
  use,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { photoShape } from "@/components/ui/Photo";
import { getTakenDate } from "@/lib/date";
import type { MomentPhoto } from "@/lib/gallery";

type OpenPhoto = (id: string, button: HTMLElement) => void;
const ViewerContext = createContext<OpenPhoto | null>(null);

const VIEWER_SIZES = "(min-width: 768px) 768px, 100vw";
/** 이만큼 옆으로 밀면 다음 사진으로 넘긴다. */
const SWIPE_DISTANCE = 50;
/** 주소에 붙는 이름: /moments?photo=gallery-44 */
const PARAM = "photo";

const barButton =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-3xl leading-none text-ivory transition-colors hover:bg-ivory hover:text-cocoa";

/** 지금 주소의 ?photo= 값 */
function photoInUrl(): string | null {
  return new URLSearchParams(window.location.search).get(PARAM);
}

/** 지금 주소에서 ?photo= 만 바꾼(id 가 없으면 지운) 주소 */
function urlWithPhoto(id: string | null): string {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set(PARAM, id);
  else url.searchParams.delete(PARAM);
  return `${url.pathname}${url.search}${url.hash}`;
}

/**
 * 사진을 크게 보는 창. 안쪽의 PhotoButton 을 누르면 열린다.
 * 넘기기는 photos 순서를 따른다. (주제를 고르면 고른 사진 안에서만 넘어간다.)
 *
 * 열 때 방문 기록을 한 칸 남겨서 휴대폰 뒤로가기가 창만 닫게 한다.
 * 어떻게 닫히든(×, Esc, 뒤로가기) 닫힌 뒤 그 한 칸을 정리하므로 기록이 쌓이지 않는다.
 */
export function PhotoViewer({ photos, children }: { photos: MomentPhoto[]; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  /** 닫은 뒤 포커스를 돌려줄 사진 버튼 */
  const opener = useRef<HTMLElement | null>(null);
  // 아래 effect 들은 처음 한 번만 걸어 두므로 photos 는 ref 로 본다.
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  });

  const current = index === null ? null : photos[index];
  const currentId = current?.id ?? null;
  const at = (step: number) => (index === null ? null : photos[(index + step + photos.length) % photos.length]);

  const show = (found: number) => {
    setIndex(found);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  };

  const open: OpenPhoto = (id, button) => {
    const found = photos.findIndex((item) => item.id === id);
    if (found === -1) return;
    opener.current = button;
    window.history.pushState({ [PARAM]: id }, "", urlWithPhoto(id));
    show(found);
  };
  const close = () => dialogRef.current?.close();
  const move = (step: number) =>
    setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length));

  // 링크(?photo=)로 들어오면 그 사진을 연 채로 시작한다.
  // 정적 생성을 지키려고 서버가 아니라 마운트 뒤 브라우저 주소에서 읽는다.
  useEffect(() => {
    const id = photoInUrl();
    if (!id) return;
    const found = photosRef.current.findIndex((item) => item.id === id);
    if (found === -1) {
      // 이 페이지(주제)에 없는 사진이면 열지 않고 주소에서 지운다.
      window.history.replaceState({}, "", urlWithPhoto(null));
      return;
    }
    const state: unknown = window.history.state;
    const alreadyPushed = typeof state === "object" && state !== null && PARAM in state;
    if (!alreadyPushed) {
      // 사진 없는 사진첩 칸을 하나 깔아 두어서 뒤로가기가 창만 닫게 한다.
      window.history.replaceState({}, "", urlWithPhoto(null));
      window.history.pushState({ [PARAM]: id }, "", urlWithPhoto(id));
    }
    const button = document.querySelector<HTMLElement>(`[data-photo-id="${CSS.escape(id)}"]`);
    opener.current = button;
    setIndex(found);
    dialogRef.current?.showModal();
  }, []);

  // 뒤로가기(·앞으로가기)를 따라 창을 닫거나 연다.
  useEffect(() => {
    const onPopState = () => {
      const id = photoInUrl();
      const found = id ? photosRef.current.findIndex((item) => item.id === id) : -1;
      if (found === -1) {
        dialogRef.current?.close();
        return;
      }
      setIndex(found);
      if (!dialogRef.current?.open) dialogRef.current?.showModal();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // 넘길 때는 기록을 늘리지 않고 주소만 바꾼다.
  useEffect(() => {
    if (!currentId || photoInUrl() === currentId) return;
    window.history.replaceState({ [PARAM]: currentId }, "", urlWithPhoto(currentId));
  }, [currentId]);

  const onClose = () => {
    setIndex(null);
    // ×·Esc 로 닫혔으면 열 때 남긴 한 칸이 그대로 있으니 정리한다.
    // 뒤로가기로 닫혔으면 이미 주소에 photo 가 없다.
    if (photoInUrl()) window.history.back();
    // 휴대폰에서 접혀 있는(보이지 않는) 사진이면 포커스를 옮기지 않는다.
    const button = opener.current;
    opener.current = null;
    if (button && button.offsetParent !== null) button.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  };

  // 휴대폰에서 옆으로 밀어 넘기기
  const onPointerDown = (event: PointerEvent) => {
    swipe.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
  };

  const prev = at(-1);
  const next = at(1);

  return (
    <ViewerContext value={open}>
      {children}

      <dialog
        ref={dialogRef}
        aria-label="사진 크게 보기"
        onClose={onClose}
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
                <span className="block text-sm text-cream">
                  {current.scene}
                  {current.taken ? <TakenText taken={current.taken} /> : null}
                </span>
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

/** 숫자는 영문 글꼴(lining-nums)로 */
function Num({ children }: { children: number }) {
  return <span className="font-serif text-base lining-nums">{children}</span>;
}

/** 장면 이름 뒤에 붙는 " · 2021년 11월 · 차돌이 7살" */
function TakenText({ taken }: { taken: string }) {
  const { year, month, age } = getTakenDate(taken);
  return (
    <>
      {" · "}
      <Num>{year}</Num>년 <Num>{month}</Num>월 · 차돌이 <Num>{age}</Num>살
    </>
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
      data-photo-id={photo.id}
      onClick={(event) => open?.(photo.id, event.currentTarget)}
      aria-label={`${photo.alt} 사진 크게 보기`}
      className={`relative w-full cursor-zoom-in ${photoShape} ${className}`}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
    </button>
  );
}
