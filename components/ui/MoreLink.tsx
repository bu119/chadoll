import Link from "next/link";

/** 다른 페이지로 이어지는 글자 링크. 밑줄은 글자에만 긋고 화살표에는 긋지 않는다. */
export function MoreLink({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-cocoa ${className}`}
    >
      <span className="underline decoration-golden decoration-2 underline-offset-[7px] transition-colors group-hover:decoration-cocoa">
        {children}
      </span>
      {/* 마우스를 올리면 화살표가 가는 쪽으로 살짝 밀린다. */}
      <span aria-hidden="true" className="transition-transform duration-200 motion-safe:group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
