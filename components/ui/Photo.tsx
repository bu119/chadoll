import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/gallery";

/** 사진 모양: 테두리·그림자 없이 모서리만 살짝 둥글게. 사진첩의 버튼도 같이 쓴다. */
export const photoShape = "overflow-hidden rounded-md";

type PhotoProps = {
  photo: PhotoData;
  sizes: string;
  /** 사진 밑에 붙는 펜글씨 메모 */
  caption?: string;
  /** 첫 화면에 보이는 사진만 true */
  preload?: boolean;
  /** 너비·위치 */
  className?: string;
};

export function Photo({ photo, sizes, caption, preload = false, className = "" }: PhotoProps) {
  return (
    <figure className={className}>
      <div className={`relative aspect-[3/4] ${photoShape}`}>
        <Image src={photo.src} alt={photo.alt} fill preload={preload} sizes={sizes} className="object-cover" />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-hand text-4xl leading-tight text-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
