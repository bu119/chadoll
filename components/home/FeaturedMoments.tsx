import { PhotoButton, PhotoViewer } from "@/components/moments/PhotoViewer";
import { MoreLink } from "@/components/ui/MoreLink";
import { Section } from "@/components/ui/Section";
import { getFeaturedPhotos } from "@/lib/gallery";

/**
 * 첫 화면의 사진 펼침면: 큰 사진 하나와 그 옆 두 장, 아래로 넉 장.
 * 옆의 두 장은 큰 사진(4:5)의 높이를 반씩 나눠 갖는다.
 * 휴대폰은 큰 사진 하나 뒤에 두 장씩.
 */
const places = [
  "col-span-2 aspect-[4/5] md:col-span-7 md:row-span-2",
  "aspect-square md:col-span-5 md:aspect-auto md:h-full",
  "aspect-square md:col-span-5 md:aspect-auto md:h-full",
  "aspect-[3/4] md:col-span-3",
  "aspect-[3/4] md:col-span-3 md:mt-12",
  "aspect-[3/4] md:col-span-3",
  "aspect-[3/4] md:col-span-3 md:mt-12",
];

const sizes = [
  "(min-width: 768px) 55vw, 100vw",
  "(min-width: 768px) 40vw, 50vw",
  "(min-width: 768px) 40vw, 50vw",
];

export function FeaturedMoments() {
  const photos = getFeaturedPhotos();

  return (
    <Section id="moments" kicker="MOMENTS" title="차돌이 사진첩" description="사진을 누르면 크게 볼 수 있어요.">
      <PhotoViewer photos={photos}>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:gap-6">
          {photos.map((photo, i) => (
            <PhotoButton
              key={photo.src}
              photo={photo}
              sizes={sizes[i] ?? "(min-width: 768px) 25vw, 50vw"}
              className={places[i] ?? "aspect-square md:col-span-3"}
            />
          ))}
        </div>
      </PhotoViewer>
      <MoreLink href="/moments" className="mt-10 md:mt-16">
        사진 전체 보기
      </MoreLink>
    </Section>
  );
}
