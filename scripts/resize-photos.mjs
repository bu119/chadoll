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

const HERO = 14;
// lib/gallery.ts 의 순서와 같아야 한다.
const GALLERY = [11, 13, 6, 18, 2, 4, 22, 21, 25, 27, 29, 23];

async function resize(n, name) {
  const out = path.join(OUT_DIR, name);
  await sharp(source(n))
    .rotate() // EXIF 방향 보정
    .resize(WIDTH, HEIGHT, { fit: "cover" })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(out);
  const { size } = await stat(out);
  console.log(`${name}  ← 차돌이 (${n}).jpg  ${(size / 1024).toFixed(0)}KB`);
}

async function makeOgImage() {
  const out = path.join(OUT_DIR, "og.jpg");
  const resized = await sharp(source(HERO)).rotate().resize(WIDTH, HEIGHT, { fit: "cover" }).toBuffer();
  await sharp(resized)
    .extract({ left: 0, top: 430, width: 1200, height: 630 })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(out);
  console.log("og.jpg  (1200×630)");
}

await mkdir(OUT_DIR, { recursive: true });
await resize(HERO, "hero.jpg");
for (const [i, n] of GALLERY.entries()) {
  await resize(n, `gallery-${String(i + 1).padStart(2, "0")}.jpg`);
}
await makeOgImage();

// 브라우저 탭 아이콘: Hero 사진에서 얼굴만 잘라 쓴다.
const face = await sharp(source(HERO)).rotate().resize(WIDTH, HEIGHT, { fit: "cover" }).toBuffer();
await sharp(face)
  .extract({ left: 250, top: 480, width: 560, height: 560 })
  .resize(256, 256)
  .png()
  .toFile(path.join("app", "icon.png"));
console.log("app/icon.png  (256×256)");
