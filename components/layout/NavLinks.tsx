"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/site";

/** 지금 보고 있는 메뉴에 밑줄을 긋기 위해 주소를 읽는 부분만 클라이언트로 둔다. */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav aria-label="주요 메뉴" className="-mx-2 border-t border-line md:mx-0 md:border-t-0">
      <ul className="flex items-center justify-around md:justify-start">
        {items.map((item) => {
          const current = isCurrent(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                aria-label={`${item.label} ${item.hint}`}
                className="group flex min-h-12 flex-col items-center justify-center px-2 sm:px-3"
              >
                <span
                  className={`font-serif text-[0.95rem] font-semibold leading-none tracking-[0.1em] text-cocoa sm:text-base ${
                    current ? "underline decoration-golden decoration-2 underline-offset-[6px]" : "group-hover:underline group-hover:decoration-line group-hover:decoration-2 group-hover:underline-offset-[6px]"
                  }`}
                >
                  {item.label}
                </span>
                {/* 한글 이름은 휴대폰에서만 보인다. (어르신 방문자 배려, 데스크톱은 영문만 깔끔하게) */}
                <span className="mt-1.5 text-xs leading-none text-brown md:hidden">{item.hint}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
