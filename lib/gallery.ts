export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SceneId = "walk" | "rain" | "picnic" | "cafe" | "friends";

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
  return { src: `/images/home/${file}.jpg`, alt, ...size };
}

/** 표지에 겹쳐 놓는 사진 세 장. 계절이 섞이도록 골랐다. */
export const heroPhotos = {
  main: photo("hero", "해 질 녘 공원에서 분홍 하네스를 하고 옆을 바라보는 차돌이"),
  spring: photo("hero-spring", "벚꽃이 핀 봄날 가방에 타고 나들이 가는 차돌이"),
  autumn: photo("hero-autumn", "단풍 든 공원 잔디밭에서 정면을 보며 활짝 웃는 차돌이"),
};

/** 프로필 옆에 두는 사진 */
export const profilePhoto: Photo = photo("gallery-28", "깃 달린 옷을 입고 카페 의자 방석에 앉은 차돌이");
/** 타임라인 "지금" 옆에 두는 사진 */
export const nowPhoto: Photo = photo(
  "gallery-29",
  "간식을 든 손 앞에서 기대에 찬 얼굴로 서 있는 차돌이",
);
/** 푸터의 인사 사진 */
export const farewellPhoto: Photo = photo("gallery-05", "노란 낙엽이 떨어진 길에서 뒤돌아보는 차돌이");

const scenes: GalleryScene[] = [
  {
    id: "walk",
    title: "산책길",
    note: "처음 가 보는 길일수록 발걸음이 씩씩해져요.",
    photos: [
      photo("gallery-11", "넓은 잔디밭을 신나게 달려오는 차돌이"),
      photo("gallery-13", "햇살 드는 푸른 풀밭에 서서 옆을 바라보는 차돌이"),
      photo("gallery-14", "초록 공원에서 분홍 하네스를 하고 뒤돌아보는 차돌이"),
      photo("gallery-01", "공원 돌길을 따라 씩씩하게 걸어오는 차돌이"),
      photo("gallery-15", "주황색 조끼를 입고 보도블록 위에서 올려다보는 차돌이"),
      photo("gallery-04", "가로수길에서 혀를 내밀고 웃는 차돌이"),
      photo("gallery-02", "단풍나무 아래 잔디밭에서 고개를 갸웃하는 차돌이"),
      photo("gallery-03", "알록달록한 단풍을 배경으로 잔디밭에 서 있는 차돌이"),
      photo("gallery-12", "햇살이 드는 잔디밭에서 산책 중인 차돌이"),
    ],
  },
  {
    id: "rain",
    title: "비 오는 날",
    note: "우비만 입으면 비 오는 날 산책도 문제없어요.",
    photos: [
      photo("gallery-16", "우비를 입고 회색 보도 위를 걷다 돌아보는 차돌이"),
      photo("gallery-07", "우비를 입고 젖은 보도블록 위에서 올려다보는 차돌이"),
      photo("gallery-06", "비 오는 날 빨간 무늬 우비를 입고 산책하는 차돌이"),
    ],
  },
  {
    id: "picnic",
    title: "소풍",
    note: "돗자리만 펴면 웃음이 나요.",
    photos: [
      photo("gallery-17", "민트색 돗자리에 앉아 눈을 감고 활짝 웃는 차돌이"),
      photo("gallery-20", "체크무늬 돗자리 위에 서서 활짝 웃는 차돌이"),
      photo("gallery-18", "풀밭에 편 돗자리 위에 엎드려 쉬는 차돌이"),
      photo("gallery-21", "소풍 나온 잔디밭에서 친구들 사이에 서 있는 차돌이"),
      photo("gallery-19", "보라색 돗자리 위에 엎드려 있는 차돌이"),
    ],
  },
  {
    id: "cafe",
    title: "카페",
    note: "얌전히 앉아 기다리는 건 차돌이 특기예요.",
    photos: [
      photo("gallery-09", "카페 테이블 앞에 앉아 활짝 웃는 차돌이"),
      photo("gallery-22", "카페 문 앞 방석에 앉아 올려다보는 차돌이"),
      photo("gallery-08", "카페 바닥에서 혀를 내밀고 신난 차돌이"),
      photo("gallery-23", "카페에서 쓰다듬을 받으며 웃는 차돌이"),
      photo("gallery-10", "카페에서 아이스커피 뒤로 얌전히 앉아 바라보는 차돌이"),
      photo("gallery-30", "카페 둥근 러그 위에서 웃으며 서 있는 차돌이"),
      photo("gallery-24", "털을 짧게 다듬고 카페 바닥에 서 있는 차돌이"),
    ],
  },
  {
    id: "friends",
    title: "친구들과",
    note: "조용히, 천천히 다가오는 친구가 좋아요.",
    photos: [
      photo("gallery-25", "탁자 옆에서 친구들과 함께 고개를 내민 차돌이"),
      photo("gallery-26", "돗자리 위에서 친구들과 어울리는 차돌이"),
      photo("gallery-27", "잔디밭에서 친구와 나란히 선 차돌이"),
    ],
  },
];

export function getGalleryScenes(): GalleryScene[] {
  return scenes;
}

export function getGalleryPhotos(): Photo[] {
  return scenes.flatMap((scene) => scene.photos);
}
