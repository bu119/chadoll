import photoDates from "@/content/photo-dates.json";
import type { TraitId } from "@/lib/site";

/** 사진 찍은 달. scripts/photo-dates.mjs 가 원본에서 읽어 만들고, 없는 것은 손으로 채운다. */
const takenDates: Record<string, string | null> = photoDates;

export type Photo = {
  /** 파일 이름 (예: gallery-44). 크게 보기 주소의 ?photo= 값으로 쓴다. */
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
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
  | "lake"
  | "friends";

/** 크게 보기에서 쓰는 사진: 어느 장면의 사진인지 함께 담는다. */
export type MomentPhoto = Photo & { scene: string };

/** 사진첩의 한 장면. 첫 번째 사진을 가장 크게 보여준다. */
export type GalleryScene = {
  id: SceneId;
  title: string;
  note: string;
  photos: Photo[];
};

const size = { width: 1200, height: 1600 };

/** 파일 이름은 scripts/resize-photos.mjs 의 표와 같아야 한다. */
function photo(file: string, alt: string): Photo {
  const taken = takenDates[file];
  return {
    id: file,
    src: `/images/home/${file}.jpg`,
    alt,
    ...size,
    ...(taken ? { taken } : {}),
  };
}

/** 표지 사진 */
export const heroPhoto: Photo = photo("main", "복슬복슬한 털을 뽐내며 정면을 보고 활짝 웃는 차돌이");

/** 프로필 옆에 두는 사진 */
export const profilePhoto: Photo = photo("gallery-50", "단풍 든 공원 잔디밭에서 정면을 보며 활짝 웃는 차돌이");

/** 첫 화면 짧은 소개 옆 사진. 소개 페이지 첫머리(profilePhoto)와 겹치지 않게 다른 사진을 쓴다. */
export const aboutPreviewPhoto: Photo = photo("gallery-120", "혀를 살짝 내밀고 활짝 웃는 차돌이 얼굴");

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
    title: "아기 차돌",
    note: "손바닥만 하던 때부터 늘 웃는 얼굴이었어요.",
    photos: [
      photo("gallery-82", "알록달록한 담요 위에서 혀를 내밀고 활짝 웃는 아기 차돌이"),
      photo("gallery-84", "손 아래에서 고개를 갸웃하며 올려다보는 아기 차돌이"),
      photo("gallery-98", "마룻바닥에 엎드려 손바닥에 얼굴을 묻은 아기 차돌이"),
      photo("gallery-112", "마룻바닥에 엎드려 손가락에 코를 대는 아기 차돌이"),
      photo("gallery-83", "마룻바닥에 얌전히 앉아 아래를 내려다보는 아기 차돌이"),
      photo("gallery-85", "하얀 바닥에 앉아 이쪽을 보는 솜뭉치 같은 아기 차돌이"),
      photo("gallery-121", "종이 상자 밖으로 얼굴을 내민 아기 차돌이"),
      photo("gallery-81", "까만 눈으로 이쪽을 가만히 바라보는 어린 차돌이 얼굴"),
      photo("gallery-122", "벌러덩 누워 보호자 손을 꼭 잡은 아기 차돌이"),
      photo("gallery-123", "얼룩말 무늬 담요 앞에서 올려다보는 어린 차돌이"),
      photo("gallery-124", "하얀 털옷을 입고 귀를 쫑긋 세운 어린 차돌이"),
    ],
  },
  {
    id: "spring",
    title: "봄",
    note: "연둣빛 잔디 위에서는 발걸음이 가벼워요.",
    photos: [
      photo("gallery-62", "햇살 드는 초록 잔디밭 돌길 위에 선 차돌이"),
      photo("gallery-127", "벚꽃잎 길에서 무릎 앞으로 다가와 활짝 웃는 차돌이"),
      photo("gallery-125", "벚꽃잎이 떨어진 보도블록에 앉아 입을 벌리고 웃는 차돌이"),
      photo("gallery-126", "벚꽃잎 깔린 길에 앉아 올려다보며 웃는 차돌이"),
      photo("gallery-64", "나무가 우거진 공원 잔디밭에 얌전히 앉은 차돌이"),
      photo("gallery-65", "노란 하네스에 손수건을 두르고 옆을 바라보는 차돌이"),
      photo("gallery-71", "혀를 내밀고 활짝 웃는 차돌이 얼굴"),
      photo("gallery-72", "초록 나무를 배경으로 옆을 바라보는 차돌이 얼굴"),
      photo("gallery-63", "초록 잔디에 앉아 노란 하네스를 하고 하늘을 올려다보는 차돌이"),
    ],
  },
  {
    id: "sea",
    title: "여름",
    note: "뜨거운 햇살 아래서도, 파도 앞에서도 의젓해요.",
    photos: [
      photo("gallery-67", "파도가 밀려오는 모래사장에 선 차돌이"),
      photo("gallery-128", "빨간 하네스를 하고 파도 치는 모래사장을 걸어가는 차돌이"),
      photo("gallery-92", "빨간 하네스를 하고 모래사장에 앉아 바다 쪽을 보는 차돌이"),
      photo("gallery-93", "빨간 하네스를 하고 모래사장에 서서 바다를 바라보는 차돌이"),
      photo("gallery-94", "빨간 하네스를 하고 흙길에서 혀를 내밀며 올려다보는 차돌이"),
      photo("gallery-66", "구름 낀 하늘 아래 잔디밭에서 웃는 차돌이"),
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
    title: "가을",
    note: "낙엽 밟는 소리를 제일 좋아해요.",
    photos: [
      photo("gallery-03", "알록달록한 단풍을 배경으로 잔디밭에 서 있는 차돌이"),
      photo("gallery-44", "숲속에서 정면을 보며 웃는 차돌이"),
      photo("gallery-42", "숲길에서 먼 곳을 바라보는 차돌이 옆얼굴"),
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
    title: "겨울",
    note: "리본도 털모자도 차돌이가 하면 다 어울려요.",
    photos: [
      photo("gallery-33", "초록 리본을 달고 초록 옷을 입은 채 웃는 차돌이"),
      photo("gallery-129", "파란 패딩을 입고 보호자 손에 앞발을 올린 차돌이"),
      photo("gallery-130", "마른 잔디 돌길에 앉아 활짝 웃는 차돌이"),
      photo("gallery-131", "돌길 위에서 혀를 내밀고 올려다보는 차돌이 얼굴"),
      photo("gallery-37", "크리스마스트리 앞 하얀 러그에 앉은 차돌이"),
      photo("gallery-95", "크리스마스트리 앞 하얀 털 러그에 엎드려 활짝 웃는 차돌이"),
      photo("gallery-96", "크리스마스트리 옆 하얀 털 러그에 앉아 옆을 바라보는 차돌이"),
      photo("gallery-35", "분홍 털모자를 쓰고 잔디밭에 서 있는 차돌이"),
      photo("gallery-132", "햇살 드는 마른 잔디밭에 서서 옆을 바라보는 차돌이"),
      photo("gallery-133", "흙길에서 혀로 코를 핥으며 서 있는 차돌이"),
      photo("gallery-32", "초록 리본을 양쪽에 달고 웃는 차돌이 옆얼굴"),
    ],
  },
  {
    id: "walk",
    title: "산책길",
    note: "매일 걷는 길도 차돌이랑 걸으면 새로워요.",
    photos: [
      photo("gallery-13", "햇살 드는 푸른 풀밭에 서서 옆을 바라보는 차돌이"),
      photo("gallery-134", "아파트 단지 산책길을 신나게 달려오는 차돌이"),
      photo("gallery-135", "보도블록 위를 혀를 내밀고 달려오는 차돌이"),
      photo("gallery-136", "햇살 아래 보도블록을 달려오는 차돌이"),
      photo("gallery-137", "나무 옆 흙길에서 활짝 웃는 차돌이"),
      photo("gallery-138", "보도블록 위에서 꼬리를 세우고 뒤돌아 웃는 차돌이"),
      photo("gallery-139", "복슬복슬한 꼬리를 세우고 고개를 돌려 웃는 차돌이"),
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
    id: "lake",
    title: "호숫가",
    note: "물가 데크를 걸으면 바람이 시원해요.",
    photos: [
      photo("gallery-140", "호숫가 데크 난간 앞에서 혀를 내밀고 웃는 차돌이"),
      photo("gallery-141", "호숫가 데크에서 눈을 감고 바람을 맞는 차돌이"),
      photo("gallery-142", "호숫가 데크에서 꼬리를 세우고 올려다보며 웃는 차돌이"),
      photo("gallery-143", "호수가 보이는 데크 난간 앞에서 웃는 차돌이"),
    ],
  },
  {
    id: "rain",
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
    title: "소풍",
    note: "돗자리만 펴면 웃음이 나요.",
    photos: [
      photo("gallery-21", "소풍 나온 잔디밭에서 친구들 사이에 서 있는 차돌이"),
      photo("gallery-77", "체크무늬 돗자리에 앉아 활짝 웃는 차돌이"),
      photo("gallery-102", "민트색 테두리 담요를 두르고 하늘을 올려다보는 차돌이"),
      photo("gallery-76", "꽃무늬 돗자리 위에서 옆을 바라보며 웃는 차돌이"),
      photo("gallery-17", "민트색 돗자리에 앉아 눈을 감고 활짝 웃는 차돌이"),
      photo("gallery-20", "체크무늬 돗자리 위에 서서 활짝 웃는 차돌이"),
      photo("gallery-26", "소풍 돗자리 위에서 고개를 들어 올려다보는 차돌이"),
      photo("gallery-18", "풀밭에 편 돗자리 위에 엎드려 쉬는 차돌이"),
      photo("gallery-27", "체크무늬 돗자리 옆 잔디밭을 걸어오며 웃는 차돌이"),
      photo("gallery-117", "보라색 하트 무늬 돗자리에 엎드려 옆을 바라보는 차돌이"),
    ],
  },
  {
    id: "cafe",
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
    id: "snack",
    title: "간식 사냥꾼",
    note: "간식 앞에서는 누구보다 진지해요.",
    photos: [
      photo("gallery-104", "'차돌' 이름표 하네스를 하고 뼈 간식을 꼭 문 차돌이"),
      photo("gallery-86", "담요 위에 엎드려 뼈 간식을 앞에 둔 어린 차돌이"),
      photo("gallery-89", "뼈 간식을 물고 옆을 바라보는 차돌이"),
      photo("gallery-90", "뼈 간식을 입에 물고 정면을 보는 차돌이"),
      photo("gallery-15", "주황 조끼를 입고 산책하다 뼈 간식을 물고 올려다보는 차돌이"),
    ],
  },
  {
    id: "friends",
    title: "친구들",
    note: "같이 걸으면 산책이 두 배로 즐거워요.",
    photos: [
      photo("gallery-34", "유모차에 하얀 친구 토리와 나란히 탄 차돌이"),
      photo("gallery-61", "잔디밭에서 호두와 나란히 앉은 차돌이"),
      photo("gallery-60", "소나무 아래에서 초록 옷을 맞춰 입은 소담이와 나란히 앉은 차돌이"),
      photo("gallery-59", "햇살 드는 흙길에서 소담이, 호두와 나란히 선 차돌이"),
      photo("gallery-58", "카페 의자 위에서 노란 패딩을 입은 호두와 함께 창밖을 보는 차돌이"),
      photo("gallery-25", "탁자 옆에서 토리, 소담이와 함께 고개를 내민 차돌이"),
    ],
  },
  {
    id: "closeup",
    title: "더 가까이",
    note: "가까이 보면 더 복슬복슬해요.",
    photos: [
      photo("gallery-69", "반짝이는 배경 앞 하얀 털 방석에 앉아 웃는 차돌이"),
      photo("gallery-88", "흙바닥 위에서 입을 벌리고 올려다보는 차돌이 얼굴"),
      photo("gallery-87", "땡땡이 가방 밖으로 얼굴만 내밀고 조는 차돌이"),
      photo("gallery-145", "꽃무늬 이불 위에서 분홍 헤어롤을 앞발로 잡고 씹는 차돌이"),
      photo("gallery-144", "하늘색 나비넥타이를 하고 벤치에 앉아 웃는 차돌이"),
      photo("gallery-146", "하늘색 담요 위에서 햇살을 받으며 조는 차돌이"),
      photo("gallery-43", "숲속 평상 위에서 활짝 웃는 차돌이"),
      photo("gallery-120", "혀를 살짝 내밀고 활짝 웃는 차돌이 얼굴"),
      photo("gallery-73", "햇살 아래 복슬복슬한 털로 앉아 웃는 차돌이"),
      photo("gallery-111", "노란 하네스를 하고 앞발을 베고 곤히 자는 차돌이"),
      photo("gallery-70", "단풍잎 장식 사이에서 고개를 갸웃하며 웃는 차돌이"),
      photo("gallery-118", "체크무늬 포대기 밖으로 얼굴만 내밀고 꾸벅꾸벅 조는 차돌이"),
      photo("gallery-119", "보호자 품의 포대기 안에서 눈을 반쯤 감고 조는 차돌이"),
      photo("gallery-116", "반짝이는 하늘색 배경 앞에 앉아 옆을 보며 웃는 차돌이"),
      photo("gallery-115", "창가 소파의 가방 위에 엎드려 활짝 웃는 차돌이"),
      photo("gallery-110", "동그란 안경을 쓰고 의자에 앉은 선비 차돌이"),
      photo("gallery-105", "분홍 꽃벽 앞에서 노란 하네스를 하고 정면을 보는 차돌이"),
      photo("gallery-101", "식탁 의자에 앉아 고개를 갸우뚱하며 올려다보는 차돌이"),
    ],
  },
];

/**
 * 사진첩 주제. 장면을 묶고, 주제 버튼에 이 순서대로 보이며 장면도 이 순서대로 놓는다.
 * 사진은 장면 하나에, 장면은 주제 하나에만 속한다. 장면이 하나뿐인 주제는 장면 이름을 주제 이름과 같게 한다.
 * id 는 주제별 페이지 주소(/moments/[id])로 쓴다.
 */
const sceneGroups = [
  { id: "baby", title: "아기 차돌", scenes: ["puppy"] },
  { id: "seasons", title: "사계절", scenes: ["spring", "sea", "autumn", "winter"] },
  { id: "walks", title: "산책", scenes: ["walk", "lake", "rain"] },
  { id: "picnic", title: "소풍", scenes: ["picnic"] },
  { id: "cafe", title: "카페", scenes: ["cafe"] },
  { id: "snack", title: "간식 사냥꾼", scenes: ["snack"] },
  { id: "friends", title: "친구들", scenes: ["friends"] },
  { id: "closeup", title: "더 가까이", scenes: ["closeup"] },
] as const satisfies readonly { id: string; title: string; scenes: readonly SceneId[] }[];

export type GroupId = (typeof sceneGroups)[number]["id"];

export type SceneGroup = { id: GroupId; title: string; scenes: GalleryScene[] };

function findScene(id: SceneId): GalleryScene {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`없는 장면: ${id}`);
  return scene;
}

export function getSceneGroups(): SceneGroup[] {
  return sceneGroups.map((group) => ({ id: group.id, title: group.title, scenes: group.scenes.map(findScene) }));
}

export function isGroupId(value: string): value is GroupId {
  return sceneGroups.some((group) => group.id === value);
}

/** 사진첩 장면. 주제를 주면 그 주제의 장면만 돌려준다. */
export function getMoments(group?: GroupId): GalleryScene[] {
  if (!group) return scenes;
  return getSceneGroups().find((item) => item.id === group)?.scenes ?? [];
}

/** 첫 화면에 먼저 보여주는 사진. 장면마다 하나씩, 이 순서대로 놓는다. */
const featuredFiles = [
  "gallery-44", // 가을 (2021 숲길)
  "gallery-41", // 카페 (테라스)
  "gallery-34", // 친구들
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
 * ABOUT "솜뭉치에서 신사로": 해마다 한 장, 오래된 순서로 놓는다. 같은 해라도 나이가 다르면 한 장씩 더 둘 수 있다.
 * 찍은 날(content/photo-dates.json)이 있는 사진만 쓸 수 있고, 나이는 찍은 달로 계산한다.
 * 사진을 바꾸려면 file 만 바꾸면 된다. note 가 없으면 장면 이름을 보여준다.
 */
const growthFiles: { file: string; note?: string }[] = [
  { file: "gallery-82", note: "우리 집에 온 해" }, // 2014-07 생후 3개월
  { file: "gallery-135", note: "처음 맞는 봄 산책" }, // 2015-03 생후 11개월
  { file: "gallery-87", note: "가방 속 낮잠" }, // 2016-03 1살
  { file: "gallery-94", note: "공원 산책" }, // 2016-08 2살
  { file: "gallery-129", note: "손! 하는 겨울 산책" }, // 2017-01 2살
  { file: "gallery-144", note: "나비넥타이 신사" }, // 2017-06 3살
  { file: "gallery-146", note: "햇살 아래 낮잠" }, // 2018-10 4살
  { file: "gallery-97", note: "나무 데크 산책길" }, // 2021-02 6살
  { file: "gallery-43", note: "숲길 산책" }, // 2021-11 7살
  { file: "gallery-64", note: "봄 잔디밭에서" }, // 2022-05
  { file: "gallery-37", note: "크리스마스트리 앞에서" }, // 2023-11
  { file: "gallery-32", note: "초록 리본 단 날" }, // 2024-12
  { file: "gallery-79", note: "단풍잎 더미 속으로" }, // 2025-11
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
