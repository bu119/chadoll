import Link from "next/link";
import { PhotoViewer } from "@/components/moments/PhotoViewer";
import { SceneSpreads } from "@/components/moments/SceneSpreads";
import { Kicker } from "@/components/ui/Kicker";
import { getMoments, getSceneGroups, toMomentPhotos, type GroupId } from "@/lib/gallery";

const chip = "inline-flex min-h-12 items-center rounded-[3px] border px-5 text-lg transition-colors";

/** 사진첩 페이지 본문. group 이 있으면 그 주제의 장면만 보여준다. */
export function MomentsView({ group }: { group?: GroupId }) {
  const scenes = getMoments(group);
  const photos = toMomentPhotos(scenes);
  const groups = getSceneGroups();
  const countOf = (id?: GroupId) => toMomentPhotos(getMoments(id)).length;
  const filters = [{ href: "/moments", label: "전체", count: countOf(), current: !group }].concat(
    groups.map((item) => ({
      href: `/moments/${item.id}`,
      label: item.title,
      count: countOf(item.id),
      current: item.id === group,
    })),
  );

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
                    filter.current ? "border-cocoa bg-cocoa text-ivory" : "border-line text-cocoa hover:border-golden"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`ml-2 font-serif text-xl lining-nums ${filter.current ? "text-ivory" : "text-brown"}`}
                  >
                    <span className="sr-only"> </span>
                    {filter.count}
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

        {/* 고른 주제의 장면으로 바로 가기. 장면이 하나뿐이면 두지 않는다. */}
        {scenes.length > 1 ? (
          <nav aria-label="장면 바로가기" className="mt-2">
            <ul className="-ml-3 flex flex-wrap">
              {scenes.map((scene) => (
                <li key={scene.id}>
                  <a
                    href={`#${scene.id}`}
                    className="inline-flex min-h-12 items-center px-3 text-lg text-brown decoration-golden decoration-2 underline-offset-[7px] hover:text-cocoa hover:underline"
                  >
                    {scene.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="mt-12 sm:mt-16">
          <PhotoViewer photos={photos}>
            <SceneSpreads scenes={scenes} />
          </PhotoViewer>
        </div>
      </div>
    </div>
  );
}
