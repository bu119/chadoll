import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/gallery";

/** 사진 모양: 테두리·그림자 없이 모서리만 아주 살짝 둥글게. 사진첩의 버튼도 같이 쓴다. */
export const photoShape = "overflow-hidden rounded-[3px] bg-cream";

/** 원본(3:4)을 기준으로 배치에 맞춰 자르는 비율. wide 는 푸터 사진에만 쓴다(데스크톱에서는 옆 글 높이에 맞춘다). */
export type PhotoRatio = "3/4" | "4/5" | "1/1" | "wide";

export const ratioClass: Record<PhotoRatio, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  wide: "aspect-[3/2] md:aspect-auto md:h-full",
};

type PhotoProps = {
  photo: PhotoData;
  sizes: string;
  ratio?: PhotoRatio;
  /** 사진 밑에 붙는 짧은 메모 */
  caption?: string;
  /** 첫 화면에 보이는 사진만 true */
  preload?: boolean;
  /** 너비·위치 */
  className?: string;
};

export function Photo({ photo, sizes, ratio = "3/4", caption, preload = false, className = "" }: PhotoProps) {
  return (
    <figure className={className}>
      <div className={`relative ${ratioClass[ratio]} ${photoShape}`}>
        <Image src={photo.src} alt={photo.alt} fill preload={preload} sizes={sizes} className="object-cover" />
      </div>
      {caption ? <figcaption className="mt-3 break-keep text-base text-brown">{caption}</figcaption> : null}
    </figure>
  );
}
