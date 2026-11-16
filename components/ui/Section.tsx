import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 id={`${id}-title`} className="break-keep font-hand text-6xl leading-none text-ink sm:text-7xl">
          {title}
        </h2>
        {description ? <p className="mt-3 max-w-2xl break-keep text-ink-soft">{description}</p> : null}
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
