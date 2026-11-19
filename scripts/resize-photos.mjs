// photos/ 원본을 리사이즈해서 public/images/home/ 에 저장한다.
// 실행: node scripts/resize-photos.mjs
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "photos";
const OUT_DIR = path.join("public", "images", "home");
const WIDTH = 1200;
const HEIGHT = 1600;
const QUALITY = 80;

const source = (n) => path.join(SRC_DIR, `김차돌 (${n}).jpg`);

// 파일 이름 → photos/ 의 원본 번호. lib/gallery.ts 가 이 파일 이름을 쓴다.
// 새 사진은 맨 뒤에 이어 붙이고, 이미 있는 이름의 번호는 바꾸지 않는다.
const PHOTOS = {
  // 표지
  main: 101,
  // 산책길
  "gallery-01": 13,
  "gallery-02": 15,
  "gallery-03": 8,
  "gallery-04": 20,
  "gallery-05": 4,
  "gallery-11": 31,
  "gallery-12": 25,
  "gallery-13": { n: 36, crop: { left: 0.2, top: 0.19, size: 0.7 } },
  "gallery-14": 40,
  "gallery-15": 56,
  // 비 오는 날
  // 차돌이가 작게 찍혀서 차돌이 중심으로 잘라 쓴다. (crop: 원본 대비 비율)
  "gallery-45": { n: 19, crop: { left: 0.27, top: 0.24, size: 0.62 } },
  "gallery-46": { n: 24, crop: { left: 0.25, top: 0.23, size: 0.62 } },
  "gallery-47": { n: 6, crop: { left: 0.25, top: 0.27, size: 0.62 } },
  // 소풍
  "gallery-17": 54,
  "gallery-18": 53,
  "gallery-31": 45,
  "gallery-20": 48,
  "gallery-21": { n: 47, crop: { left: 0.18, top: 0.085, size: 0.75 } },
  // 카페
  "gallery-08": { n: 23, crop: { left: 0.155, top: 0.205, size: 0.75 } },
  "gallery-09": 27,
  "gallery-10": 29,
  "gallery-22": 37,
  "gallery-23": 39,
  "gallery-30": 50,
  // 숲길
  "gallery-42": 122,
  "gallery-43": { n: 121, position: "left" },
  "gallery-44": { n: 120, position: "left" },
  // 햇살 좋은 날
  "gallery-38": 115,
  "gallery-39": 116,
  "gallery-40": 117,
  "gallery-41": 118,
  // 겨울
  "gallery-32": 74,
  "gallery-33": 75,
  "gallery-35": 90,
  "gallery-37": 2,
  // 친구들과 (보호자 동의를 받은 사진만)
  "gallery-34": 76,
  "gallery-25": 41,
  "gallery-26": 49,
  "gallery-27": 46,
  // 처음엔 프로필용이었고 지금은 사진첩(카페)에 있다.
  "gallery-28": 58,
  // 가을
  "gallery-48": { n: 3, crop: { left: 0.08, top: 0.2, size: 0.8 } },
  "gallery-49": { n: 9, crop: { left: 0.155, top: 0.2, size: 0.75 } }, // 위쪽 아파트는 잘라낸다
  "gallery-54": { n: 32, crop: { left: 0.29, top: 0.26, size: 0.42 } },
  // 프로필과 "차돌이는요" 소개 네 칸
  "gallery-50": 16,
  "gallery-51": 21,
  "gallery-52": 26,
  "gallery-53": { n: 30, crop: { left: 0.25, top: 0.26, size: 0.5 } },
  "gallery-56": 55,
  // 2026-11 새로 고른 사진
  "gallery-57": 43, // 카페 (원본이 지워진 gallery-24 대신)
  // 친구들과 (보호자 동의를 받은 사진만)
  "gallery-58": 62,
  "gallery-59": 69,
  "gallery-60": 72,
  "gallery-61": 89,
  // 봄
  "gallery-62": 82,
  "gallery-63": 85,
  "gallery-64": 105,
  "gallery-65": 112,
  "gallery-66": 81,
  // 여름 바다
  "gallery-67": 64,
  "gallery-68": 79,
  // 가까이서
  "gallery-69": 131,
  "gallery-70": 93,
  "gallery-71": 109,
  "gallery-72": 107,
  "gallery-73": 129,
  // 카페
  "gallery-74": 60,
  "gallery-75": 70,
  // 소풍
  "gallery-76": 66,
  "gallery-77": 94,
  // 가을
  "gallery-78": 133,
  "gallery-79": 63,
  // 산책길
  "gallery-80": 123,
};

// 공유 미리보기는 표지 사진에서 잘라 쓴다.
const OG = { n: PHOTOS.main, top: 250 };
// 탭 아이콘은 차돌이 그림(1번, 정사각형)에서 그림 부분만 잘라 쓴다.
const ICON = { n: 1, left: 158, top: 112, size: 810 };

// 가로 사진은 세로(3:4)로 자른다. position 으로 남길 쪽을 정한다.
const fitted = async (n, { position = "centre", crop } = {}) => {
  let image = sharp(source(n)).rotate(); // rotate: EXIF 방향 보정
  if (crop) {
    const meta = await sharp(source(n)).metadata();
    const turned = (meta.orientation ?? 1) >= 5; // 옆으로 누운 원본은 가로·세로가 바뀐다
    const width = turned ? meta.height : meta.width;
    const height = turned ? meta.width : meta.height;
    image = image.extract({
      left: Math.round(width * crop.left),
      top: Math.round(height * crop.top),
      width: Math.round(width * crop.size),
      height: Math.round(height * crop.size),
    });
  }
  return image.resize(WIDTH, HEIGHT, { fit: "cover", position });
};

async function resize(name, entry) {
  const { n, ...options } = typeof entry === "number" ? { n: entry } : entry;
  const out = path.join(OUT_DIR, `${name}.jpg`);
  await (await fitted(n, options)).jpeg({ quality: QUALITY, mozjpeg: true }).toFile(out);
  const { size } = await stat(out);
  console.log(`${name}.jpg  ← 김차돌 (${n}).jpg  ${(size / 1024).toFixed(0)}KB`);
}

await mkdir(OUT_DIR, { recursive: true });
for (const [name, n] of Object.entries(PHOTOS)) {
  await resize(name, n);
}

await sharp(await (await fitted(OG.n)).toBuffer())
  .extract({ left: 0, top: OG.top, width: 1200, height: 630 })
  .jpeg({ quality: QUALITY, mozjpeg: true })
  .toFile(path.join(OUT_DIR, "og.jpg"));
console.log("og.jpg  (1200×630)");

await sharp(source(ICON.n))
  .extract({ left: ICON.left, top: ICON.top, width: ICON.size, height: ICON.size })
  .resize(256, 256)
  .png()
  .toFile(path.join("app", "icon.png"));
console.log("app/icon.png  (256×256)");
