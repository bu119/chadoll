import Link from "next/link";
import { NavLinks } from "@/components/layout/NavLinks";
import { Wordmark } from "@/components/ui/Wordmark";
import { getNavItems } from "@/lib/site";

export function Header() {
  const items = getNavItems();

  return (
    // 휴대폰: 로고 한 줄, 메뉴 한 줄 (메뉴 글자를 줄이지 않으려고 두 줄로 둔다. 화면을 덜 가리게 고정하지 않는다.)
    // 데스크톱: 한 줄, 위에 고정
    <header className="z-40 border-b border-line bg-ivory md:sticky md:top-0">
      <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-8 md:h-16 md:flex-row md:items-center md:justify-between md:gap-3">
        <Link href="/" aria-label="CHADOLL 처음 화면" className="flex min-h-14 shrink-0 items-center text-cocoa">
          <Wordmark className="text-2xl sm:text-[1.7rem]" />
        </Link>
        {/* 갈 곳이 홈 하나뿐일 때는 메뉴를 보여주지 않는다. */}
        {items.length > 1 ? <NavLinks items={items} /> : null}
      </div>
    </header>
  );
}
