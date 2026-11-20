import photoDates from "@/content/photo-dates.json";
import type { TraitId } from "@/lib/site";

/** 사진 찍은 달. scripts/photo-dates.mjs 가 원본에서 읽어 만들고, 없는 것은 손으로 채운다. */
const takenDates: Record<string, string | null> = photoDates;

/**
 * 사진 주제. 차돌이가 좋아하는 것을 기준으로 나눈다. 한 사진이 여러 주제에 들 수 있다.
 * 계절은 장면 이름(봄·여름·가을·겨울)으로 보이므로 주제로 두지 않는다.
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
  /** 파일 이름 (예: gallery-44). 크게 보기 주소의 ?photo= 값으로 쓴다. */
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** 장면의 주제 말고 이 사진에만 더 붙는 주제 */
  tags?: Tag[];
  /** 찍은 달 (예: "2019-05"). 모르면 없다. */
  taken?: string;
};

export type SceneId =
  | "puppy"
  | "autumn"
  | "spring"
  | "sea"
  | "closeup"
  | "walk"
  | "snack"
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
  const taken = takenDates[file];
  return {
    id: file,
    src: `/images/home/${file}.jpg`,
    alt,
    ...size,
    ...(extraTags ? { tags: extraTags } : {}),
    ...(taken ? { taken } : {}),
  };
}

/** 표지 사진 */
export const heroPhoto: Photo = photo("main", "복슬복슬한 털을 뽐내며 정면을 보고 활짝 웃는 차돌이");

/** 프로필 옆에 두는 사진 */
export const profilePhoto: Photo = photo("gallery-50", "단풍 든 공원 잔디밭에서 정면을 보며 활짝 웃는 차돌이");

/** "차돌이는요" 소개 다섯 칸의 사진 */
export const traitPhotos: Record<TraitId, Photo> = {
  snack: photo("gallery-104", "'차돌' 이름표 하네스를 하고 뼈 간식을 꼭 문 차돌이"),
  adventure: photo("gallery-51", "낙엽 진 보도를 걷다가 뒤돌아보는 차돌이"),
  cafe: photo("gallery-52", "카페 테이블 앞 아이스커피 뒤에서 웃는 차돌이"),
  cat: photo("gallery-56", "카페 의자 방석에 고양이처럼 엎드린 차돌이"),
  smart: photo("gallery-101", "식탁 의자에 앉아 고개를 갸우뚱하며 올려다보는 차돌이"),
};
/** 푸터의 인사 사진. 가로(3:2)로 따로 만든 사진이다. (scripts/resize-photos.mjs 의 FAREWELL) */
export const farewellPhoto: Photo = {
  id: "farewell",
  src: "/images/home/farewell.jpg",
  alt: "햇살 아래 포대기에 얼굴만 내밀고 꾸벅꾸벅 조는 차돌이",
  width: 1800,
  height: 1200,
};

const scenes: GalleryScene[] = [
  {
    id: "puppy",
    tags: ["faces"],
    title: "어릴 적",
    note: "손바닥만 하던 때부터 늘 웃는 얼굴이었어요.",
    photos: [
      // 생후 3개월(우리 집에 온 무렵) 사진을 먼저, 8개월 사진은 그다음에
      photo("gallery-82", "알록달록한 가방 안에서 혀를 내밀고 활짝 웃는 아기 차돌이"),
      photo("gallery-84", "손 아래에서 고개를 갸웃하며 올려다보는 아기 차돌이"),
      photo("gallery-98", "마룻바닥에 엎드려 손바닥에 얼굴을 묻은 아기 차돌이"),
      photo("gallery-112", "마룻바닥에 엎드려 손가락에 코를 대는 아기 차돌이"),
      photo("gallery-83", "마룻바닥에 얌전히 앉아 아래를 내려다보는 아기 차돌이"),
      photo("gallery-85", "하얀 바닥에 앉아 이쪽을 보는 솜뭉치 같은 아기 차돌이"),
      photo("gallery-81", "까만 눈으로 이쪽을 가만히 바라보는 어린 차돌이 얼굴"),
      photo("gallery-87", "땡땡이 가방 밖으로 얼굴만 내밀고 조는 차돌이"),
    ],
  },
  {
    id: "spring",
    tags: ["walks"],
    title: "봄",
    note: "연둣빛 잔디 위에서는 발걸음이 가벼워요.",
    photos: [
      photo("gallery-62", "햇살 드는 초록 잔디밭 돌길 위에 선 차돌이"),
      photo("gallery-64", "나무가 우거진 공원 잔디밭에 얌전히 앉은 차돌이"),
      photo("gallery-65", "노란 하네스에 손수건을 두르고 옆을 바라보는 차돌이"),
      photo("gallery-71", "혀를 내밀고 활짝 웃는 차돌이 얼굴", ["faces"]),
      photo("gallery-72", "초록 나무를 배경으로 옆을 바라보는 차돌이 얼굴", ["faces"]),
      photo("gallery-63", "초록 잔디에 앉아 노란 하네스를 하고 하늘을 올려다보는 차돌이"),
    ],
  },
  {
    id: "sea",
    tags: ["trips"],
    title: "여름",
    note: "뜨거운 햇살 아래서도, 파도 앞에서도 의젓해요.",
    photos: [
      photo("gallery-67", "파도가 밀려오는 모래사장에 선 차돌이"),
      photo("gallery-92", "빨간 하네스를 하고 모래사장에 앉아 바다 쪽을 보는 차돌이"),
      photo("gallery-93", "빨간 하네스를 하고 모래사장에 서서 바다를 바라보는 차돌이"),
      photo("gallery-94", "빨간 하네스를 하고 흙길에서 혀를 내밀며 올려다보는 차돌이", ["walks"]),
      photo("gallery-66", "구름 낀 하늘 아래 잔디밭에서 웃는 차돌이", ["walks"]),
      photo("gallery-68", "파란 파라솔 아래에서 물안경을 쓰고 눈을 감은 차돌이"),
      photo("gallery-106", "품에 안겨 바다 쪽을 바라보는 차돌이 옆얼굴"),
      photo("gallery-108", "노란 구명조끼를 입고 바다에 떠서 이쪽을 보는 차돌이"),
      photo("gallery-107", "노란 구명조끼를 입고 바다에서 헤엄치는 차돌이"),
      photo("gallery-109", "바닷가 평상에 엎드려 앞발에 얼굴을 묻고 자는 차돌이"),
      photo("gallery-99", "노란 구명조끼 위로 얼굴을 내민 차돌이"),
      photo("gallery-100", "분홍 수건을 두르고 바다 쪽을 바라보는 차돌이"),
      photo("gallery-31", "해 질 녘 공원에서 분홍 하네스를 하고 옆을 바라보는 차돌이"),
    ],
  },
  {
    id: "autumn",
    tags: ["walks"],
    title: "가을",
    note: "낙엽 밟는 소리를 제일 좋아해요.",
    photos: [
      photo("gallery-03", "알록달록한 단풍을 배경으로 잔디밭에 서 있는 차돌이"),
      photo("gallery-44", "숲속에서 정면을 보며 웃는 차돌이"),
      photo("gallery-42", "숲길에서 먼 곳을 바라보는 차돌이 옆얼굴"),
      photo("gallery-43", "숲속 평상 위에서 활짝 웃는 차돌이"),
      photo("gallery-79", "주황빛 단풍잎이 수북이 쌓인 곳에 들어간 차돌이"),
      photo("gallery-04", "가로수길에서 혀를 내밀고 웃는 차돌이"),
      photo("gallery-54", "잔디밭을 가로질러 달려오는 차돌이"),
      photo("gallery-53", "잔디밭에서 이쪽으로 신나게 달려오는 차돌이"),
      photo("gallery-48", "단풍 든 공원에서 활짝 웃으며 서 있는 차돌이"),
      photo("gallery-49", "단풍 든 공원 잔디밭에서 뒤돌아보는 차돌이"),
      photo("gallery-02", "단풍나무 아래 잔디밭에서 고개를 갸웃하는 차돌이"),
      photo("gallery-78", "빨갛게 물든 단풍나무 아래 낙엽 길에 선 차돌이"),
      photo("gallery-05", "노란 낙엽이 떨어진 길에서 뒤돌아보는 차돌이"),
    ],
  },
  {
    id: "winter",
    tags: [],
    title: "겨울",
    note: "리본도 털모자도 차돌이가 하면 다 어울려요.",
    photos: [
      photo("gallery-37", "크리스마스트리 앞 하얀 러그에 앉은 차돌이", ["faces"]),
      photo("gallery-95", "크리스마스트리 앞 하얀 털 러그에 엎드려 활짝 웃는 차돌이", ["faces"]),
      photo("gallery-96", "크리스마스트리 옆 하얀 털 러그에 앉아 옆을 바라보는 차돌이", ["faces"]),
      photo("gallery-35", "분홍 털모자를 쓰고 잔디밭에 서 있는 차돌이", ["walks"]),
      photo("gallery-33", "초록 리본을 달고 초록 옷을 입은 채 웃는 차돌이", ["faces"]),
      photo("gallery-32", "초록 리본을 양쪽에 달고 웃는 차돌이 옆얼굴", ["faces"]),
    ],
  },
  {
    id: "snack",
    tags: ["faces"],
    title: "간식 사냥꾼",
    note: "간식 앞에서는 누구보다 진지해요.",
    photos: [
      photo("gallery-104", "'차돌' 이름표 하네스를 하고 뼈 간식을 꼭 문 차돌이"),
      photo("gallery-86", "담요 위에 엎드려 뼈 간식을 앞에 둔 어린 차돌이"),
      photo("gallery-89", "뼈 간식을 물고 옆을 바라보는 차돌이"),
      photo("gallery-90", "뼈 간식을 입에 물고 정면을 보는 차돌이"),
      photo("gallery-15", "주황 조끼를 입고 산책하다 뼈 간식을 물고 올려다보는 차돌이", ["walks"]),
    ],
  },
  {
    id: "walk",
    tags: ["walks"],
    title: "산책길",
    note: "매일 걷는 길도 차돌이랑 걸으면 새로워요.",
    photos: [
      photo("gallery-13", "햇살 드는 푸른 풀밭에 서서 옆을 바라보는 차돌이"),
      photo("gallery-80", "나무 데크 길에서 활짝 웃으며 다가오는 차돌이"),
      photo("gallery-97", "나무 데크 위에서 혀를 내밀고 활짝 웃는 차돌이"),
      photo("gallery-113", "마른 잔디 돌길에서 혀를 내밀고 옆을 보는 차돌이"),
      photo("gallery-114", "노을빛 흙길에 앉아 활짝 웃는 차돌이"),
      photo("gallery-14", "초록 공원에서 분홍 하네스를 하고 뒤돌아보는 차돌이"),
      photo("gallery-12", "햇살이 드는 잔디밭에서 산책 중인 차돌이"),
      photo("gallery-11", "넓은 잔디밭을 신나게 달려오는 차돌이"),
      photo("gallery-01", "공원 돌길을 따라 씩씩하게 걸어오는 차돌이"),
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
    id: "picnic",
    tags: ["trips"],
    title: "소풍",
    note: "돗자리만 펴면 웃음이 나요.",
    photos: [
      photo("gallery-21", "소풍 나온 잔디밭에서 친구들 사이에 서 있는 차돌이", ["friends"]),
      photo("gallery-77", "체크무늬 돗자리에 앉아 활짝 웃는 차돌이"),
      photo("gallery-102", "민트색 테두리 담요를 두르고 하늘을 올려다보는 차돌이"),
      photo("gallery-76", "꽃무늬 돗자리 위에서 옆을 바라보며 웃는 차돌이"),
      photo("gallery-17", "민트색 돗자리에 앉아 눈을 감고 활짝 웃는 차돌이"),
      photo("gallery-20", "체크무늬 돗자리 위에 서서 활짝 웃는 차돌이"),
      photo("gallery-18", "풀밭에 편 돗자리 위에 엎드려 쉬는 차돌이"),
    ],
  },
  {
    id: "cafe",
    tags: ["cafe"],
    title: "카페",
    note: "얌전히 앉아 기다리는 건 차돌이 특기예요.",
    photos: [
      photo("gallery-08", "카페 바닥에서 혀를 내밀고 신난 차돌이"),
      photo("gallery-91", "카페 테라스에서 바람에 귀가 날리며 옆을 보는 차돌이"),
      photo("gallery-38", "햇살 드는 나무 데크 위에 서서 올려다보는 차돌이"),
      photo("gallery-39", "테라스 의자에 놓인 겉옷 옆에 앉은 차돌이"),
      photo("gallery-40", "햇살 드는 테라스에서 혀로 코를 핥는 차돌이"),
      photo("gallery-41", "햇살에 눈을 감고 혀를 내민 차돌이"),
      photo("gallery-103", "카페 의자 등받이에 턱을 괴고 꾸벅꾸벅 조는 차돌이"),
      photo("gallery-75", "빵이 담긴 접시 앞 의자에 앉아 웃는 차돌이"),
      photo("gallery-74", "카페 소파 자리에서 고개를 내밀고 웃는 차돌이"),
      photo("gallery-28", "깃 달린 옷을 입고 카페 의자 방석에 앉은 차돌이"),
      photo("gallery-30", "카페 둥근 러그 위에서 웃으며 서 있는 차돌이"),
      photo("gallery-57", "털을 짧게 다듬고 분홍 하네스를 한 채 카페 러그 위에 선 차돌이"),
      photo("gallery-22", "카페 문 앞 방석에 앉아 올려다보는 차돌이"),
      photo("gallery-23", "카페에서 쓰다듬을 받으며 웃는 차돌이"),
      photo("gallery-09", "카페 테이블 앞에 앉아 활짝 웃는 차돌이"),
      photo("gallery-10", "카페에서 아이스커피 뒤로 얌전히 앉아 바라보는 차돌이"),
    ],
  },
  {
    id: "friends",
    tags: ["friends"],
    title: "친구들과",
    note: "조용히, 천천히 다가오는 친구가 좋아요.",
    photos: [
      photo("gallery-34", "유모차에 하얀 친구 토리와 나란히 탄 차돌이"),
      photo("gallery-61", "잔디밭에서 호두와 나란히 앉은 차돌이"),
      photo("gallery-60", "소나무 아래에서 초록 옷을 맞춰 입은 소담이와 나란히 앉은 차돌이"),
      photo("gallery-59", "햇살 드는 흙길에서 소담이, 호두와 나란히 선 차돌이"),
      photo("gallery-58", "카페 의자 위에서 노란 패딩을 입은 호두와 함께 창밖을 보는 차돌이", ["cafe"]),
      photo("gallery-26", "돗자리 위에서 친구들과 어울리는 차돌이"),
      photo("gallery-27", "잔디밭에서 친구와 나란히 선 차돌이"),
      photo("gallery-25", "탁자 옆에서 토리, 소담이와 함께 고개를 내민 차돌이"),
    ],
  },
  {
    id: "closeup",
    tags: ["faces"],
    title: "가까이서",
    note: "가까이 보면 더 복슬복슬해요.",
    photos: [
      photo("gallery-69", "반짝이는 배경 앞 하얀 털 방석에 앉아 웃는 차돌이"),
      photo("gallery-88", "흙바닥 위에서 입을 벌리고 올려다보는 차돌이 얼굴"),
      photo("gallery-73", "햇살 아래 복슬복슬한 털로 앉아 웃는 차돌이"),
      photo("gallery-111", "노란 하네스를 하고 앞발을 베고 곤히 자는 차돌이"),
      photo("gallery-70", "단풍잎 장식 사이에서 고개를 갸웃하며 웃는 차돌이"),
      photo("gallery-116", "반짝이는 하늘색 배경 앞에 앉아 옆을 보며 웃는 차돌이"),
      photo("gallery-115", "창가 소파의 가방 위에 엎드려 활짝 웃는 차돌이"),
      photo("gallery-110", "동그란 안경을 쓰고 의자에 앉은 선비 차돌이"),
      photo("gallery-105", "분홍 꽃벽 앞에서 노란 하네스를 하고 정면을 보는 차돌이"),
      photo("gallery-101", "식탁 의자에 앉아 고개를 갸우뚱하며 올려다보는 차돌이"),
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

/**
 * ABOUT "솜뭉치에서 신사로": 해마다 한 장, 오래된 순서로 놓는다.
 * 찍은 날(content/photo-dates.json)이 있는 사진만 쓸 수 있고, 나이는 찍은 달로 계산한다.
 * 사진을 바꾸려면 file 만 바꾸면 된다. note 가 없으면 장면 이름을 보여준다.
 */
const growthFiles: { file: string; note?: string }[] = [
  { file: "gallery-82", note: "우리 집에 온 해" }, // 2014-07 생후 3개월
  { file: "gallery-92" }, // 2016-08 여름
  { file: "gallery-42", note: "숲길" }, // 2021-11 (사진첩에서는 가을 장면)
  { file: "gallery-64" }, // 2022-05 봄
  { file: "gallery-37" }, // 2023-11 겨울
  { file: "gallery-32" }, // 2024-12 겨울
  { file: "gallery-79" }, // 2025-11 가을
  { file: "gallery-53", note: "오늘도 간식 사냥 중" }, // 2026-10 지금
];

export type GrowthPhoto = MomentPhoto & { taken: string; note: string };

export function getGrowthPhotos(): GrowthPhoto[] {
  const all = toMomentPhotos(scenes);
  return growthFiles.map(({ file, note }) => {
    const found = all.find((item) => item.id === file);
    if (!found) throw new Error(`사진첩에 없는 걸어온 길 사진: ${file}`);
    if (!found.taken) throw new Error(`찍은 날이 없는 걸어온 길 사진: ${file}`);
    return { ...found, taken: found.taken, note: note ?? found.scene };
  });
}

export function getFeaturedPhotos(): MomentPhoto[] {
  const all = toMomentPhotos(scenes);
  return featuredFiles.map((file) => {
    const found = all.find((item) => item.id === file);
    if (!found) throw new Error(`사진첩에 없는 대표 사진: ${file}`);
    return found;
  });
}
