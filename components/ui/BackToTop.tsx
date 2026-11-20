"use client";

import { useEffect, useState } from "react";

/**
 * 맨 위로 가는 단추. 화면 한 번 넘게 내렸을 때만 오른쪽 아래에 보인다.
 * 짧은 페이지에서는 저절로 보이지 않는다. 사진 크게 보기(dialog)가 열리면 그 아래로 가려진다.
 */
export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > window.innerHeight);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // 키보드로 누른 사람도 맨 앞에서 다시 시작하게 첫 링크(로고)로 옮긴다.
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      hidden={!shown}
      aria-label="맨 위로"
      title="맨 위로"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 flex size-12 items-center justify-center rounded-full border border-line bg-cream text-cocoa hover:border-golden"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
