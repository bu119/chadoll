import { PhotoViewer } from "@/components/moments/PhotoViewer";
import { SceneSpreads } from "@/components/moments/SceneSpreads";
import { Kicker } from "@/components/ui/Kicker";
import { getMoments, getSceneGroups, toMomentPhotos, type GalleryScene } from "@/lib/gallery";

/** 장면으로 바로 가는 버튼. 장면 이름 옆에 사진 수를 붙인다. */
function SceneLink({ scene }: { scene: GalleryScene }) {
  return (
    <a
      href={`#${scene.id}`}
      className="inline-flex min-h-12 items-center rounded-[3px] border border-line px-5 text-lg text-cocoa transition-colors hover:border-golden"
    >
      {scene.title}
      <span className="ml-2 font-serif text-xl text-brown lining-nums">
        <span className="sr-only"> </span>
        {scene.photos.length}
        <span className="sr-only">장</span>
      </span>
    </a>
  );
}

/** 사진첩 페이지 본문 */
export function MomentsView() {
  const scenes = getMoments();
  const photos = toMomentPhotos(scenes);

  return (
    <div className="px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <Kicker className="mb-4">MOMENTS</Kicker>
        <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-cocoa sm:text-5xl">차돌이 사진첩</h1>
        <p className="mt-3 max-w-2xl break-keep text-brown">
          사진을 누르면 크게 볼 수 있어요. 이름을 누르면 그 장면으로 바로 가요.{" "}
          <span className="whitespace-nowrap">(사진 {photos.length}장)</span>
        </p>

        {/* 장면이 여러 개인 주제는 주제 이름 뒤에 장면 버튼을 묶고, 하나뿐이면 버튼 하나로 보인다. */}
        <nav aria-label="사진첩 바로가기" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {getSceneGroups().map((group) =>
              group.scenes.length === 1 ? (
                <li key={group.title}>
                  <SceneLink scene={group.scenes[0]} />
                </li>
              ) : (
                <li key={group.title} className="flex flex-wrap items-center gap-2">
                  <span className="pr-1 text-lg font-semibold text-brown">{group.title}</span>
                  <ul className="contents">
                    {group.scenes.map((scene) => (
                      <li key={scene.id}>
                        <SceneLink scene={scene} />
                      </li>
                    ))}
                  </ul>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="mt-12 sm:mt-16">
          <PhotoViewer photos={photos}>
            <SceneSpreads scenes={scenes} />
          </PhotoViewer>
        </div>
      </div>
    </div>
  );
}
