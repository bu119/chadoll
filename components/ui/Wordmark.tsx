import { site } from "@/lib/site";

/** CHADOLL 글자 로고. 크기는 className 의 text-* 로 정한다. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif font-semibold uppercase leading-none tracking-[0.12em] ${className}`}>
      {site.name}
    </span>
  );
}
