import { Photo, type PhotoRatio } from "@/components/ui/Photo";
import { traitPhotos } from "@/lib/gallery";
import { getTraits, type Trait } from "@/lib/site";

/**
 * 차돌이의 다섯 가지 모습. 같은 모양 카드를 반복하지 않도록 자리마다 놓는 방식을 바꾼다.
 * 1: 큰 사진 + 글을 오른쪽 아래 / 2: 글을 왼쪽, 정사각형 사진 오른쪽 / 3·4: 두 장을 엇갈려서
 * 5: 1을 좌우로 뒤집어 글을 왼쪽 아래, 큰 사진을 오른쪽에
 */
type Place = { wrap: string; photo: string; text: string; ratio: PhotoRatio; sizes: string };

const places: Place[] = [
  {
    wrap: "md:col-span-full md:grid md:grid-cols-12 md:items-end md:gap-8",
    photo: "md:col-span-7",
    text: "mt-5 md:col-span-4 md:col-start-9 md:mt-0 md:pb-4",
    ratio: "4/5",
    sizes: "(min-width: 768px) 55vw, 100vw",
  },
  {
    wrap: "md:col-span-full md:grid md:grid-cols-12 md:items-center md:gap-8",
    photo: "md:order-2 md:col-span-5 md:col-start-7",
    text: "mt-5 md:order-1 md:col-span-4 md:col-start-2 md:mt-0",
    ratio: "1/1",
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
  {
    wrap: "grid grid-cols-[2fr_3fr] items-center gap-5 md:col-span-5 md:block",
    photo: "",
    text: "md:mt-5",
    ratio: "3/4",
    sizes: "(min-width: 768px) 40vw, 40vw",
  },
  {
    wrap: "grid grid-cols-[2fr_3fr] items-center gap-5 md:col-span-5 md:col-start-8 md:mt-28 md:block",
    photo: "",
    text: "md:mt-5",
    ratio: "3/4",
    sizes: "(min-width: 768px) 40vw, 40vw",
  },
  {
    wrap: "md:col-span-full md:grid md:grid-cols-12 md:items-end md:gap-8",
    photo: "md:order-2 md:col-span-6 md:col-start-7",
    text: "mt-5 md:order-1 md:col-span-4 md:col-start-2 md:mt-0 md:pb-4",
    ratio: "4/5",
    sizes: "(min-width: 768px) 48vw, 100vw",
  },
];

function TraitItem({ trait, place }: { trait: Trait; place: Place }) {
  return (
    <li className={place.wrap}>
      <Photo photo={traitPhotos[trait.id]} ratio={place.ratio} sizes={place.sizes} className={place.photo} />
      <div className={place.text}>
        <h2 className="break-keep text-2xl font-bold tracking-[-0.02em] text-cocoa sm:text-3xl">{trait.title}</h2>
        <p className="mt-2 break-keep text-lg text-cocoa sm:text-xl">{trait.text}</p>
      </div>
    </li>
  );
}

export function Traits() {
  return (
    <section aria-label="차돌이의 모습" className="px-5 pb-16 sm:px-8 sm:pb-24">
      <ul className="mx-auto max-w-6xl space-y-14 md:grid md:grid-cols-12 md:gap-x-8 md:gap-y-24 md:space-y-0">
        {getTraits().map((trait, i) => (
          <TraitItem key={trait.id} trait={trait} place={places[i] ?? places[2]} />
        ))}
      </ul>
    </section>
  );
}
