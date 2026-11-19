import Link from "next/link";
import { PhotoViewer } from "@/components/moments/PhotoViewer";
import { SceneSpreads } from "@/components/moments/SceneSpreads";
import { Kicker } from "@/components/ui/Kicker";
import { getMoments, getTags, isTag, toMomentPhotos, type Tag } from "@/lib/gallery";

const chip =
  "inline-flex min-h-12 items-center rounded-[3px] border px-5 text-lg transition-colors";

/** 사진첩 페이지 본문. tag 가 있으면 그 주제의 사진만 보여준다. */
export function MomentsView({ tag }: { tag?: Tag }) {
  const scenes = getMoments(tag);
  const photos = toMomentPhotos(scenes);
  const filters = [{ href: "/moments", label: "전체", current: !tag }].concat(
    getTags().map((info) => ({ href: `/moments/${info.id}`, label: info.label, current: info.id === tag })),
  );
  // 주제 버튼에 붙이는 사진 수
  const countOf = (href: string) => {
    const id = href.split("/")[2];
    return toMomentPhotos(getMoments(id && isTag(id) ? id : undefined)).length;
  };

  return (
    <div className="px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <Kicker className="mb-4">MOMENTS</Kicker>
        <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-cocoa sm:text-5xl">차돌이 사진첩</h1>
        <p className="mt-3 max-w-2xl break-keep text-brown">
          사진을 누르면 크게 볼 수 있어요. 주제를 고르면 그 사진만 모아 볼 수 있어요.
        </p>

        <nav aria-label="사진 주제" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <li key={filter.href}>
                <Link
                  href={filter.href}
                  scroll={false}
                  aria-current={filter.current ? "page" : undefined}
                  className={`${chip} ${
                    filter.current
                      ? "border-cocoa bg-cocoa text-ivory"
                      : "border-line text-cocoa hover:border-golden"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`ml-2 font-serif text-xl lining-nums ${filter.current ? "text-ivory" : "text-brown"}`}
                  >
                    <span className="sr-only"> </span>
                    {countOf(filter.href)}
                    <span className="sr-only">장</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-4 text-base text-brown" aria-live="polite">
          사진 {photos.length}장
        </p>

        <div className="mt-12 sm:mt-16">
          <PhotoViewer photos={photos}>
            <SceneSpreads scenes={scenes} />
          </PhotoViewer>
        </div>
      </div>
    </div>
  );
}
