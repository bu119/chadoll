"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Photo } from "@/lib/gallery";

const navButton =
  "absolute top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl text-brown-800 shadow-soft transition hover:bg-white";

export function Gallery({ photos }: { photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : photos[index];

  const open = (i: number) => {
    setIndex(i);
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
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`${photo.alt} 사진 크게 보기`}
              className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl shadow-soft"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="사진 크게 보기"
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-brown-800/90"
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
            <p className="break-keep text-center text-lg text-cream-50">
              {current.alt} <span className="text-cream-50/70">({(index ?? 0) + 1}/{photos.length})</span>
            </p>
            <button type="button" onClick={() => move(-1)} aria-label="이전 사진" className={`${navButton} left-3 sm:left-6`}>
              ‹
            </button>
            <button type="button" onClick={() => move(1)} aria-label="다음 사진" className={`${navButton} right-3 sm:right-6`}>
              ›
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="absolute right-3 top-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-3xl text-brown-800 shadow-soft transition hover:bg-white sm:right-6 sm:top-6"
            >
              ×
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
