export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const size = { width: 1200, height: 1600 };

export const heroPhoto: Photo = {
  src: "/images/home/hero.jpg",
  alt: "단풍 든 공원 잔디밭에서 정면을 보며 활짝 웃는 차돌이",
  ...size,
};

const galleryPhotos: Photo[] = [
  { src: "/images/home/gallery-01.jpg", alt: "공원 돌길을 따라 씩씩하게 걸어오는 차돌이", ...size },
  { src: "/images/home/gallery-02.jpg", alt: "단풍나무 아래 잔디밭에서 고개를 갸웃하는 차돌이", ...size },
  { src: "/images/home/gallery-03.jpg", alt: "알록달록한 단풍을 배경으로 잔디밭에 서 있는 차돌이", ...size },
  { src: "/images/home/gallery-04.jpg", alt: "가로수길에서 혀를 내밀고 웃는 차돌이", ...size },
  { src: "/images/home/gallery-05.jpg", alt: "노란 낙엽이 떨어진 길에서 뒤돌아보는 차돌이", ...size },
  { src: "/images/home/gallery-06.jpg", alt: "비 오는 날 빨간 무늬 우비를 입고 산책하는 차돌이", ...size },
  { src: "/images/home/gallery-07.jpg", alt: "우비를 입고 젖은 보도블록 위에서 올려다보는 차돌이", ...size },
  { src: "/images/home/gallery-08.jpg", alt: "카페 바닥에서 혀를 내밀고 신난 차돌이", ...size },
  { src: "/images/home/gallery-09.jpg", alt: "카페 테이블 앞에 앉아 활짝 웃는 차돌이", ...size },
  { src: "/images/home/gallery-10.jpg", alt: "카페에서 아이스커피 뒤로 얌전히 앉아 바라보는 차돌이", ...size },
  { src: "/images/home/gallery-11.jpg", alt: "넓은 잔디밭을 신나게 달려오는 차돌이", ...size },
  { src: "/images/home/gallery-12.jpg", alt: "햇살이 드는 잔디밭에서 산책 중인 차돌이", ...size },
];

export function getGalleryPhotos(): Photo[] {
  return galleryPhotos;
}
