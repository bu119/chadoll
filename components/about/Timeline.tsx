import { Photo, type PhotoRatio } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { getTakenDate } from "@/lib/date";
import { getGrowthPhotos, type GrowthPhoto } from "@/lib/gallery";

/**
 * 해마다 한 장(같은 해라도 나이가 다르면 따로), 아기 때부터 지금까지 자라 온 모습. 나이는 사진 찍은 달로 계산한다.
 * 휴대폰: 처음·마지막은 두 칸 크게, 사이는 두 장씩 엇갈려 놓는다.
 * 데스크톱: 처음 사진 옆에 작은 사진 네 장(2×2), 아래 줄에 작은 사진 두 장과 마지막(지금) 사진.
 */
type Place = { item: string; ratio: PhotoRatio; sizes: string };

const big = "(min-width: 768px) 46vw, 100vw";
const small = "(min-width: 768px) 22vw, 46vw";

function placeOf(index: number, count: number): Place {
  // 아기 사진은 귀가 사진 맨 위에 닿아 있어서 원본 비율(3:4) 그대로 둔다.
  if (index === 0) return { item: "col-span-2 md:row-span-2", ratio: "3/4", sizes: big };
  // 가운데 사진이 넷씩 딱 나뉘면(모두 10장, 14장 …) 아기 사진과 마주 보게 "지금" 사진도
  // 두 줄 높이로 오른쪽 아래에 놓는다. 데스크톱은 빈칸 없이, 휴대폰은 두 장씩 짝이 맞는다.
  if ((count - 2) % 4 === 0) {
    if (index === count - 1) {
      // 마지막 사진은 순서상 맨 뒤라서, 데스크톱에서는 마지막 두 줄의 오른쪽 칸에 직접 놓는다.
      const rowStart: Record<number, string> = { 10: "md:row-start-3", 14: "md:row-start-5" };
      return { item: `col-span-2 md:col-start-3 md:row-span-2 ${rowStart[count] ?? ""}`, ratio: "3/4", sizes: big };
    }
    return { item: index % 2 === 0 ? "mt-12 md:mt-0" : "", ratio: "3/4", sizes: small };
  }
  if (index === count - 1) return { item: "col-span-2 md:self-end", ratio: "1/1", sizes: big };
  // 휴대폰에서는 둘씩 짝지은 오른쪽 사진을, 데스크톱 아래 줄에서는 두 번째 사진을 내려 엇갈리게 한다.
  const right = index % 2 === 0 ? "mt-12" : "";
  const lastRow = index >= 5 ? (index % 2 === 0 ? "md:mt-16" : "md:mt-0") : "md:mt-0";
  return { item: `${right} ${lastRow}`, ratio: "3/4", sizes: small };
}

function Num({ children }: { children: number }) {
  return <span className="font-serif lining-nums">{children}</span>;
}

/** "생후 3개월" · "2살" · "지금 · 12살" */
function AgeLabel({ taken, now }: { taken: string; now: boolean }) {
  const { age, months } = getTakenDate(taken);
  if (age < 1) {
    return (
      <>
        생후 <Num>{months}</Num>개월
      </>
    );
  }
  return (
    <>
      {now ? "지금 · " : null}
      <Num>{age}</Num>살
    </>
  );
}

function GrowthItem({ photo, place, now }: { photo: GrowthPhoto; place: Place; now: boolean }) {
  return (
    <li className={place.item}>
      <Photo photo={photo} ratio={place.ratio} sizes={place.sizes} />
      <p className="mt-3 text-lg font-semibold leading-snug text-cocoa">
        <Num>{getTakenDate(photo.taken).year}</Num>
        <span className="text-brown"> · </span>
        <AgeLabel taken={photo.taken} now={now} />
      </p>
      <p className="mt-1 break-keep text-base text-brown">{photo.note}</p>
    </li>
  );
}

/** 설명 문장용 나이: "생후 3개월" · "12살" */
function ageText(taken: string): string {
  const { age, months } = getTakenDate(taken);
  return age < 1 ? `생후 ${months}개월` : `${age}살`;
}

export function Timeline() {
  const photos = getGrowthPhotos();
  const first = ageText(photos[0].taken);
  const last = ageText(photos[photos.length - 1].taken);

  return (
    <Section
      id="timeline"
      title="솜뭉치에서 신사로"
      description={`${first} 작은 솜뭉치가 ${last} 의젓한 신사가 되기까지, 자라 온 모습을 한 장씩 모았어요.`}
    >
      <ol className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-8 md:gap-y-12">
        {photos.map((photo, index) => (
          <GrowthItem
            key={photo.id}
            photo={photo}
            place={placeOf(index, photos.length)}
            now={index === photos.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}
