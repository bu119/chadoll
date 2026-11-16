import Link from "next/link";
import { getNavItems, site } from "@/lib/site";

export function Header() {
  const items = getNavItems();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center font-hand text-5xl leading-none text-ink">
          {site.name}
        </Link>
        {/* 갈 곳이 홈 하나뿐일 때는 메뉴를 보여주지 않는다. */}
        {items.length > 1 ? (
          <nav aria-label="주요 메뉴">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center px-3 text-lg text-ink underline-offset-8 hover:underline hover:decoration-butter hover:decoration-[3px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
