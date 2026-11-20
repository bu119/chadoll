// photos/ 원본의 촬영일(EXIF DateTimeOriginal)을 읽어 content/photo-dates.json 에 적는다.
// 실행: node scripts/photo-dates.mjs
//
// - 값은 "YYYY-MM" (예: "2021-11"). lib/gallery.ts 가 읽는다.
// - 이미 값이 있는 사진은 덮어쓰지 않는다. 손으로 채운 날짜를 지키기 위해서다.
// - 원본에 날짜가 없으면 null 로 두고 목록을 보여준다. 그 null 을 손으로 채우면 된다.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { PHOTOS, source, sourceNumber } from "./photo-sources.mjs";

const OUT = path.join("content", "photo-dates.json");

const EXIF_IFD_POINTER = 0x8769;
const DATE_TIME_ORIGINAL = 0x9003;

/**
 * sharp 가 주는 EXIF 덩어리에서 DateTimeOriginal("2021:11:01 11:29:22")을 꺼낸다.
 * 라이브러리 없이 TIFF 구조(IFD0 → Exif IFD → 0x9003)만 따라간다.
 */
function readDateTimeOriginal(exif) {
  if (!exif || exif.length < 14) return null;
  const base = exif.toString("latin1", 0, 6) === "Exif\0\0" ? 6 : 0;
  const little = exif.toString("ascii", base, base + 2) === "II";
  const u16 = (at) => (little ? exif.readUInt16LE(base + at) : exif.readUInt16BE(base + at));
  const u32 = (at) => (little ? exif.readUInt32LE(base + at) : exif.readUInt32BE(base + at));
  // IFD 안에서 tag 칸의 위치를 찾는다. 한 칸은 12바이트.
  const findEntry = (ifd, tag) => {
    const count = u16(ifd);
    for (let i = 0; i < count; i += 1) {
      const entry = ifd + 2 + i * 12;
      if (u16(entry) === tag) return entry;
    }
    return null;
  };
  try {
    const pointer = findEntry(u32(4), EXIF_IFD_POINTER);
    if (pointer === null) return null;
    const entry = findEntry(u32(pointer + 8), DATE_TIME_ORIGINAL);
    if (entry === null) return null;
    const at = base + u32(entry + 8);
    return exif.toString("ascii", at, at + 19);
  } catch {
    return null; // 깨진 EXIF 는 날짜 없음으로 본다.
  }
}

/** "2021:11:01 11:29:22" → "2021-11" */
function toYearMonth(value) {
  const match = value?.match(/^(\d{4}):(\d{2}):\d{2}/);
  if (!match || match[1] === "0000") return null;
  return `${match[1]}-${match[2]}`;
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    return {};
  }
}

const existing = await readExisting();
const dates = {};
const missing = [];

for (const [name, entry] of Object.entries(PHOTOS)) {
  if (existing[name]) {
    dates[name] = existing[name];
    continue;
  }
  const n = sourceNumber(entry);
  const { exif } = await sharp(source(n)).metadata();
  dates[name] = toYearMonth(readDateTimeOriginal(exif));
  if (!dates[name]) missing.push(`${name}  ← 김차돌 (${n}).jpg`);
}

await writeFile(OUT, `${JSON.stringify(dates, null, 2)}\n`);
console.log(`${OUT}  사진 ${Object.keys(dates).length}장`);
if (missing.length > 0) {
  console.log(`\n원본에 촬영일이 없는 사진 ${missing.length}장 (JSON 의 null 을 "YYYY-MM" 으로 채워 주세요):`);
  for (const line of missing) console.log(`  ${line}`);
}
