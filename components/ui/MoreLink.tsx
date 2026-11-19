import Link from "next/link";

/** 다른 페이지로 이어지는 글자 링크 */
export function MoreLink({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-cocoa underline decoration-golden decoration-2 underline-offset-[7px] hover:decoration-cocoa ${className}`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
