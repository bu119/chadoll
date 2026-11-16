import Link from "next/link";
import { getNavItems, site } from "@/lib/site";

export function Header() {
  const items = getNavItems();

  return (
    <header className="sticky top-0 z-40 border-b border-beige-200 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="font-display text-2xl text-brown-600">
          🐾 {site.name}
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-lg text-brown-800 transition hover:bg-beige-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
