import type { ReactNode } from "react";
import { Kicker } from "@/components/ui/Kicker";

type SectionProps = {
  id: string;
  /** 제목 위 작은 영문 라벨 (메뉴 이름과 같은 단어) */
  kicker?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, kicker, title, description, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {kicker ? <Kicker className="mb-4">{kicker}</Kicker> : null}
        <h2
          id={`${id}-title`}
          className="break-keep text-3xl font-bold leading-tight tracking-[-0.02em] text-cocoa sm:text-4xl"
        >
          {title}
        </h2>
        {description ? <p className="mt-3 max-w-2xl break-keep text-brown">{description}</p> : null}
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
