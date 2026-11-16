import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  /** tinted: 배경을 살짝 진하게 해서 섹션을 구분한다. */
  tone?: "plain" | "tinted";
  children: ReactNode;
};

export function Section({ id, title, description, tone = "plain", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-20 px-5 py-14 sm:py-20 ${tone === "tinted" ? "bg-cream-100" : ""}`}
    >
      <div className="mx-auto max-w-5xl">
        <h2 id={`${id}-title`} className="text-center font-display text-3xl text-brown-600 sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-3 max-w-xl break-keep text-center text-lg text-brown-800/80">{description}</p>
        ) : null}
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}
