import Link from "next/link";

/** 다른 페이지로 이어지는 글자 링크. 밑줄은 글자에만 긋고 화살표에는 긋지 않는다. */
export function MoreLink({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-cocoa ${className}`}
    >
      <span className="underline decoration-golden decoration-2 underline-offset-[7px] group-hover:decoration-cocoa">
        {children}
      </span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
