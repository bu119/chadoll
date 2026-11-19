import type { TraitId } from "@/lib/site";

/**
 * 사진 주제. 차돌이가 좋아하는 것을 기준으로 나눈다. 한 사진이 여러 주제에 들 수 있다.
 * 계절은 장면 이름(봄·여름 바다·가을·겨울)으로 보이므로 주제로 두지 않는다.
 */
export type Tag = "walks" | "trips" | "cafe" | "friends" | "faces";

export type TagInfo = {
  id: Tag;
  /** 화면에 보이는 한글 이름 */
  label: string;
  /** 영문 이름 (작은 라벨용) */
  en: string;
};

const tags: TagInfo[] = [
  { id: "walks", label: "산책", en: "WALKS" },
  { id: "trips", label: "나들이", en: "DAY TRIPS" },
  { id: "cafe", label: "카페", en: "CAFE" },
  { id: "friends", label: "친구들", en: "FRIENDS" },
  { id: "faces", label: "얼굴", en: "PORTRAITS" },
];

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** 장면의 주제 말고 이 사진에만 더 붙는 주제 */
  tags?: Tag[];
};

export type SceneId =
  | "autumn"
  | "spring"
  | "sea"
  | "closeup"
  | "walk"
  | "forest"
  | "sunny"
  | "winter"
  | "picnic"
  | "cafe"
  | "rain"
  | "friends";

/** 크게 보기에서 쓰는 사진: 어느 장면의 사진인지 함께 담는다. */
export type MomentPhoto = Photo & { scene: string };

/** 사진첩의 한 장면. 첫 번째 사진을 가장 크게 보여준다. */
export type GalleryScene = {
  id: SceneId;
  title: string;
  note: string;
  /** 장면 안 사진 모두에 붙는 주제 */
  tags: Tag[];
  photos: Photo[];
};

const size = { width: 1200, height: 1600 };

/** 파일 이름은 scripts/resize-photos.mjs 의 표와 같아야 한다. */
function photo(file: string, alt: string, extraTags?: Tag[]): Photo {
  return { src: `/images/home/${file}.jpg`, alt, ...size, ...(extraTags ? { tags: extraTags } : {}) };
}

/** 표지 사진 */
export const heroPhoto: Photo = photo("main", "복슬복슬한 털을 뽐내며 정면을 보고 활짝 웃는 차돌이");

/** 프로필 옆에 두는 사진 */
export const profilePhoto: Photo = photo("gallery-50", "단풍 든 공원 잔디밭에서 정면을 보며 활짝 웃는 차돌이");

/** "차돌이는요" 소개 네 칸의 사진 */
export const traitPhotos: Record<TraitId, Photo> = {
  adventure: photo("gallery-51", "낙엽 진 보도를 걷다가 뒤돌아보는 차돌이"),
  cafe: photo("gallery-52", "카페 테이블 앞 아이스커피 뒤에서 웃는 차돌이"),
  cat: photo("gallery-56", "카페 의자 방석에 고양이처럼 엎드린 차돌이"),
  smart: photo("gallery-53", "잔디밭에서 이쪽으로 신나게 달려오는 차돌이"),
};
/** 타임라인 "지금" 옆에 두는 사진 */
export const nowPhoto: Photo = photo(
  "gallery-40",
  "햇살 드는 테라스에서 혀로 코를 핥는 차돌이",
);
/** 푸터의 인사 사진 */
export const farewellPhoto: Photo = photo("gallery-05", "노란 낙엽이 떨어진 길에서 뒤돌아보는 차돌이");

const scenes: GalleryScene[] = [
  {
    id: "forest",
    tags: ["walks"],
    title: "숲길",
    note: "나무 냄새 맡으며 걷는 날은 표정부터 달라요.",
    photos: [
      photo("gallery-44", "숲속에서 정면을 보며 웃는 차돌이"),
      photo("gallery-42", "숲길에서 먼 곳을 바라보는 차돌이 옆얼굴"),
      photo("gallery-43", "숲속 평상 위에서 활짝 웃는 차돌이"),
    ],
  },
  {
    id: "spring",
    tags: ["walks"],
    title: "봄",
    note: "연둣빛 잔디 위에서는 발걸음이 가벼워요.",
    photos: [
      photo("gallery-62", "햇살 드는 초록 잔디밭 돌길 위에 선 차돌이"),
      photo("gallery-63", "초록 잔디에 앉아 노란 하네스를 하고 하늘을 올려다보는 차돌이"),
      photo("gallery-64", "나무가 우거진 공원 잔디밭에 얌전히 앉은 차돌이"),
      photo("gallery-65", "노란 하네스에 손수건을 두르고 옆을 바라보는 차돌이"),
      photo("gallery-66", "구름 낀 하늘 아래 잔디밭에서 웃는 차돌이"),
    ],
  },
  {
    id: "autumn",
    tags: ["walks"],
    title: "가을",
    note: "낙엽 밟는 소리를 제일 좋아해요.",
    photos: [
      photo("gallery-03", "알록달록한 단풍을 배경으로 잔디밭에 서 있는 차돌이"),
      photo("gallery-48", "단풍 든 공원에서 활짝 웃으며 서 있는 차돌이"),
      photo("gallery-49", "단풍 든 공원 잔디밭에서 뒤돌아보는 차돌이"),
      photo("gallery-04", "가로수길에서 혀를 내밀고 웃는 차돌이"),
      photo("gallery-02", "단풍나무 아래 잔디밭에서 고개를 갸웃하는 차돌이"),
      photo("gallery-54", "잔디밭을 가로질러 달려오는 차돌이"),
      photo("gallery-78", "빨갛게 물든 단풍나무 아래 낙엽 길에 선 차돌이"),
      photo("gallery-79", "주황빛 단풍잎이 수북이 쌓인 곳에 들어간 차돌이"),
    ],
  },
  {
    id: "winter",
    tags: [],
    title: "겨울",
    note: "리본도 털모자도 차돌이가 하면 다 어울려요.",
    photos: [
      photo("gallery-37", "크리스마스트리 앞 하얀 러그에 앉은 차돌이", ["faces"]),
      photo("gallery-33", "초록 리본을 달고 초록 옷을 입은 채 웃는 차돌이", ["faces"]),
      photo("gallery-32", "초록 리본을 양쪽에 달고 웃는 차돌이 옆얼굴", ["faces"]),
      photo("gallery-35", "분홍 털모자를 쓰고 잔디밭에 서 있는 차돌이", ["walks"]),
    ],
  },
  {
    id: "sunny",
    tags: ["cafe"],
    title: "햇살 좋은 날",
    note: "볕 좋은 자리는 누구보다 잘 찾아요.",
    photos: [
      photo("gallery-38", "햇살 드는 나무 데크 위에 서서 올려다보는 차돌이"),
      photo("gallery-39", "테라스 의자에 놓인 겉옷 옆에 앉은 차돌이"),
      photo("gallery-41", "햇살에 눈을 감고 혀를 내민 차돌이"),
    ],
  },
  {
    id: "sea",
    tags: ["trips"],
    title: "여름 바다",
    note: "파도 앞에서도 의젓해요.",
    photos: [
      photo("gallery-67", "파도가 밀려오는 모래사장에 선 차돌이"),
      photo("gallery-68", "파란 파라솔 아래에서 물안경을 쓰고 눈을 감은 차돌이"),
    ],
  },
  {
    id: "walk",
    tags: ["walks"],
    title: "산책길",
    note: "매일 걷는 길도 차돌이랑 걸으면 새로워요.",
    photos: [
      photo("gallery-13", "햇살 드는 푸른 풀밭에 서서 옆을 바라보는 차돌이"),
      photo("gallery-14", "초록 공원에서 분홍 하네스를 하고 뒤돌아보는 차돌이"),
      photo("gallery-01", "공원 돌길을 따라 씩씩하게 걸어오는 차돌이"),
      photo("gallery-15", "주황색 조끼를 입고 보도블록 위에서 올려다보는 차돌이"),
      photo("gallery-12", "햇살이 드는 잔디밭에서 산책 중인 차돌이"),
      photo("gallery-11", "넓은 잔디밭을 신나게 달려오는 차돌이"),
      photo("gallery-80", "나무 데크 길에서 활짝 웃으며 다가오는 차돌이"),
    ],
  },
  {
    id: "picnic",
    tags: ["trips"],
    title: "소풍",
    note: "돗자리만 펴면 웃음이 나요.",
    photos: [
      photo("gallery-21", "소풍 나온 잔디밭에서 친구들 사이에 서 있는 차돌이", ["friends"]),
      photo("gallery-17", "민트색 돗자리에 앉아 눈을 감고 활짝 웃는 차돌이"),
      photo("gallery-31", "해 질 녘 공원에서 분홍 하네스를 하고 옆을 바라보는 차돌이"),
      photo("gallery-20", "체크무늬 돗자리 위에 서서 활짝 웃는 차돌이"),
      photo("gallery-18", "풀밭에 편 돗자리 위에 엎드려 쉬는 차돌이"),
      photo("gallery-76", "꽃무늬 돗자리 위에서 옆을 바라보며 웃는 차돌이"),
      photo("gallery-77", "체크무늬 돗자리에 앉아 활짝 웃는 차돌이"),
    ],
  },
  {
    id: "cafe",
    tags: ["cafe"],
    title: "카페",
    note: "얌전히 앉아 기다리는 건 차돌이 특기예요.",
    photos: [
      photo("gallery-08", "카페 바닥에서 혀를 내밀고 신난 차돌이"),
      photo("gallery-22", "카페 문 앞 방석에 앉아 올려다보는 차돌이"),
      photo("gallery-09", "카페 테이블 앞에 앉아 활짝 웃는 차돌이"),
      photo("gallery-30", "카페 둥근 러그 위에서 웃으며 서 있는 차돌이"),
      photo("gallery-28", "깃 달린 옷을 입고 카페 의자 방석에 앉은 차돌이"),
      photo("gallery-23", "카페에서 쓰다듬을 받으며 웃는 차돌이"),
      photo("gallery-10", "카페에서 아이스커피 뒤로 얌전히 앉아 바라보는 차돌이"),
      photo("gallery-57", "털을 짧게 다듬고 분홍 하네스를 한 채 카페 러그 위에 선 차돌이"),
      photo("gallery-74", "카페 소파 자리에서 고개를 내밀고 웃는 차돌이"),
      photo("gallery-75", "빵이 담긴 접시 앞 의자에 앉아 웃는 차돌이"),
    ],
  },
  {
    id: "rain",
    tags: ["walks"],
    title: "비 오는 날",
    note: "우비만 입으면 비 오는 날 산책도 문제없어요.",
    photos: [
      photo("gallery-45", "우비를 입고 회색 보도 위를 걷다 돌아보는 차돌이"),
      photo("gallery-46", "우비를 입고 젖은 보도블록 위에서 올려다보는 차돌이"),
      photo("gallery-47", "비 오는 날 빨간 무늬 우비를 입고 산책하는 차돌이"),
    ],
  },
  {
    id: "friends",
    tags: ["friends"],
    title: "친구들과",
    note: "조용히, 천천히 다가오는 친구가 좋아요.",
    photos: [
      photo("gallery-34", "유모차에 하얀 친구와 나란히 탄 차돌이"),
      photo("gallery-25", "탁자 옆에서 친구들과 함께 고개를 내민 차돌이"),
      photo("gallery-26", "돗자리 위에서 친구들과 어울리는 차돌이"),
      photo("gallery-27", "잔디밭에서 친구와 나란히 선 차돌이"),
      photo("gallery-55", "탁자 밑에서 친구들과 나란히 올려다보는 차돌이"),
      photo("gallery-60", "소나무 아래에서 초록 옷을 맞춰 입은 친구와 나란히 앉은 차돌이"),
      photo("gallery-59", "햇살 드는 흙길에서 친구 둘과 나란히 선 차돌이"),
      photo("gallery-58", "카페 의자 위에서 노란 패딩을 입은 친구와 함께 창밖을 보는 차돌이", ["cafe"]),
      photo("gallery-61", "잔디밭에서 푸들 친구와 나란히 앉은 차돌이"),
    ],
  },
  {
    id: "closeup",
    tags: ["faces"],
    title: "가까이서",
    note: "가까이 보면 더 복슬복슬해요.",
    photos: [
      photo("gallery-69", "반짝이는 배경 앞 하얀 털 방석에 앉아 웃는 차돌이"),
      photo("gallery-70", "단풍잎 장식 사이에서 고개를 갸웃하며 웃는 차돌이"),
      photo("gallery-71", "혀를 내밀고 활짝 웃는 차돌이 얼굴"),
      photo("gallery-72", "초록 나무를 배경으로 옆을 바라보는 차돌이 얼굴"),
      photo("gallery-73", "햇살 아래 복슬복슬한 털로 앉아 웃는 차돌이"),
    ],
  },
];

export function getTags(): TagInfo[] {
  return tags;
}

export function isTag(value: string): value is Tag {
  return tags.some((tag) => tag.id === value);
}

/** 사진 한 장의 주제: 장면의 주제 + 사진에만 붙은 주제 */
function getPhotoTags(scene: GalleryScene, item: Photo): Tag[] {
  return [...scene.tags, ...(item.tags ?? [])];
}

/** 사진첩 장면. 주제를 주면 그 주제의 사진만 남긴다. */
export function getMoments(tag?: Tag): GalleryScene[] {
  if (!tag) return scenes;
  return scenes
    .map((scene) => ({
      ...scene,
      photos: scene.photos.filter((item) => getPhotoTags(scene, item).includes(tag)),
    }))
    .filter((scene) => scene.photos.length > 0);
}

/** 첫 화면에 먼저 보여주는 사진. 장면마다 하나씩, 이 순서대로 놓는다. */
const featuredFiles = [
  "gallery-44", // 숲길
  "gallery-41", // 햇살 좋은 날
  "gallery-34", // 친구들과
  "gallery-03", // 가을
  "gallery-17", // 소풍
  "gallery-09", // 카페
  "gallery-47", // 비 오는 날
];

/** 장면들을 크게 보기 순서대로 한 줄로 편다. */
export function toMomentPhotos(list: GalleryScene[]): MomentPhoto[] {
  return list.flatMap((scene) => scene.photos.map((item) => ({ ...item, scene: scene.title })));
}

export function getFeaturedPhotos(): MomentPhoto[] {
  const all = toMomentPhotos(scenes);
  return featuredFiles.map((file) => {
    const found = all.find((item) => item.src === `/images/home/${file}.jpg`);
    if (!found) throw new Error(`사진첩에 없는 대표 사진: ${file}`);
    return found;
  });
}
