// photos/ 원본을 리사이즈해서 public/images/home/ 에 저장한다.
// 실행: node scripts/resize-photos.mjs
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { PHOTOS, source } from "./photo-sources.mjs";

const OUT_DIR = path.join("public", "images", "home");
const WIDTH = 1200;
const HEIGHT = 1600;
const QUALITY = 80;

// 공유 미리보기는 표지 사진에서 잘라 쓴다.
const OG = { n: PHOTOS.main, top: 250 };
// 푸터 사진은 가로 원본에서 차돌이 위주로 3:2로 잘라 쓴다. (left·top·width: 원본 대비 비율)
const FAREWELL = { n: 92, left: 0.2, top: 0.13, width: 0.5625 };
const FAREWELL_SIZE = { width: 1800, height: 1200 };
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

{
  const meta = await sharp(source(FAREWELL.n)).metadata();
  const turned = (meta.orientation ?? 1) >= 5; // 옆으로 누운 원본은 가로·세로가 바뀐다
  const width = turned ? meta.height : meta.width;
  const height = turned ? meta.width : meta.height;
  const cropWidth = Math.round(width * FAREWELL.width);
  await sharp(source(FAREWELL.n))
    .rotate()
    .extract({
      left: Math.round(width * FAREWELL.left),
      top: Math.round(height * FAREWELL.top),
      width: cropWidth,
      height: Math.round((cropWidth * FAREWELL_SIZE.height) / FAREWELL_SIZE.width),
    })
    .resize(FAREWELL_SIZE.width, FAREWELL_SIZE.height)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(path.join(OUT_DIR, "farewell.jpg"));
  console.log(`farewell.jpg  ← 김차돌 (${FAREWELL.n}).jpg  (${FAREWELL_SIZE.width}×${FAREWELL_SIZE.height})`);
}

await sharp(source(ICON.n))
  .extract({ left: ICON.left, top: ICON.top, width: ICON.size, height: ICON.size })
  .resize(256, 256)
  .png()
  .toFile(path.join("app", "icon.png"));
console.log("app/icon.png  (256×256)");
