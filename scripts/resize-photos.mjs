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

const source = (n) => path.join(SRC_DIR, `차돌이 (${n}).jpg`);

// 파일 이름 → photos/ 의 원본 번호. lib/gallery.ts 가 이 파일 이름을 쓴다.
// 새 사진은 맨 뒤에 이어 붙이고, 이미 있는 이름의 번호는 바꾸지 않는다.
const PHOTOS = {
  // 표지
  main: 68,
  // 산책길
  "gallery-01": 11,
  "gallery-02": 13,
  "gallery-03": 6,
  "gallery-04": 18,
  "gallery-05": 2,
  "gallery-11": 29,
  "gallery-12": 23,
  "gallery-13": 34,
  "gallery-14": 38,
  "gallery-15": 57,
  // 비 오는 날
  "gallery-06": 4,
  "gallery-07": 22,
  "gallery-16": 17,
  // 소풍
  "gallery-17": 54,
  "gallery-18": 53,
  "gallery-31": 44,
  "gallery-20": 48,
  "gallery-21": 47,
  // 카페
  "gallery-08": 21,
  "gallery-09": 25,
  "gallery-10": 27,
  "gallery-22": 35,
  "gallery-23": 37,
  "gallery-24": 41,
  "gallery-30": 50,
  // 숲길
  "gallery-42": 74,
  "gallery-43": { n: 75, position: "left" },
  "gallery-44": { n: 76, position: "left" },
  // 햇살 좋은 날
  "gallery-38": 70,
  "gallery-39": 71,
  "gallery-40": 72,
  "gallery-41": 73,
  // 겨울
  "gallery-32": 62,
  "gallery-33": 63,
  "gallery-35": 65,
  "gallery-37": 67,
  // 친구들과 (보호자 동의를 받은 사진만)
  "gallery-34": 64,
  "gallery-36": 66,
  "gallery-25": 39,
  "gallery-26": 49,
  "gallery-27": 46,
  // 프로필, 타임라인
  "gallery-28": 59,
  "gallery-29": 55,
};

// 공유 미리보기는 표지 사진에서 잘라 쓴다.
const OG = { n: PHOTOS.main, top: 250 };
// 탭 아이콘은 차돌이 그림(69번, 정사각형)에서 그림 부분만 잘라 쓴다.
const ICON = { n: 69, left: 158, top: 112, size: 810 };

// 가로 사진은 세로(3:4)로 자른다. position 으로 남길 쪽을 정한다.
const fitted = (n, position = "centre") =>
  sharp(source(n)).rotate().resize(WIDTH, HEIGHT, { fit: "cover", position }); // rotate: EXIF 방향 보정

async function resize(name, entry) {
  const { n, position } = typeof entry === "number" ? { n: entry } : entry;
  const out = path.join(OUT_DIR, `${name}.jpg`);
  await fitted(n, position).jpeg({ quality: QUALITY, mozjpeg: true }).toFile(out);
  const { size } = await stat(out);
  console.log(`${name}.jpg  ← 차돌이 (${n}).jpg  ${(size / 1024).toFixed(0)}KB`);
}

await mkdir(OUT_DIR, { recursive: true });
for (const [name, n] of Object.entries(PHOTOS)) {
  await resize(name, n);
}

await sharp(await fitted(OG.n).toBuffer())
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
