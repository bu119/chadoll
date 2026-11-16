import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/gallery";

/** 인화한 사진처럼 보이는 흰 테두리. 사진첩의 버튼도 같은 테두리를 쓴다. */
export const printFrame = "border-[6px] border-print bg-print ring-1 ring-line";

type PhotoProps = {
  photo: PhotoData;
  sizes: string;
  /** 사진 밑에 붙는 펜글씨 메모 */
  caption?: string;
  /** 첫 화면에 보이는 사진만 true */
  preload?: boolean;
  /** 너비·위치·기울기 */
  className?: string;
};

export function Photo({ photo, sizes, caption, preload = false, className = "" }: PhotoProps) {
  return (
    <figure className={className}>
      <div className={`relative aspect-[3/4] overflow-hidden ${printFrame}`}>
        <Image src={photo.src} alt={photo.alt} fill preload={preload} sizes={sizes} className="object-cover" />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-hand text-4xl leading-tight text-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
