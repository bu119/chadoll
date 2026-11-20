import Link from "next/link";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Photo } from "@/components/ui/Photo";
import { Wordmark } from "@/components/ui/Wordmark";
import { farewellPhoto } from "@/lib/gallery";
import { getTodaySnapshot } from "@/lib/today";
import { getNavItems, site } from "@/lib/site";

export async function Footer() {
  const { year } = await getTodaySnapshot();
  const items = getNavItems();

  return (
    <footer className="bg-cream px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Photo
          photo={farewellPhoto}
          ratio="wide"
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="mb-10 sm:mb-14"
        />
        <div>
          <Wordmark className="text-4xl text-cocoa sm:text-5xl" />
          <p className="mt-3 font-serif text-xl italic text-brown">{site.subtitle}</p>
          <p className="mt-8 break-keep text-xl font-semibold text-cocoa">차돌이 보러 또 놀러 오세요</p>
          <SocialLinks className="mt-3" />
          {items.length > 1 ? (
            <nav aria-label="아래 메뉴" className="mt-6">
              <ul className="flex flex-wrap gap-x-6">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-12 items-center gap-2 font-serif text-base font-semibold tracking-[0.1em] text-cocoa hover:underline hover:underline-offset-[6px]"
                    >
                      {item.label}
                      <span className="font-sans text-sm font-normal tracking-normal text-brown">{item.hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <p className="mt-6 break-keep text-base text-brown">
            © {year} {site.name}. 차돌이 사진은 허락 없이 가져가지 말아 주세요.
          </p>
        </div>
      </div>
    </footer>
  );
}
