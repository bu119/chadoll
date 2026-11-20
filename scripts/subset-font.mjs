// SUIT Variable 에서 쓰는 글자만 남겨 app/fonts/SUIT-Variable.woff2 를 작게 만든다.
// 실행: node scripts/subset-font.mjs
//
// 남기는 글자
// - 자주 쓰는 한글 2,350자 (KS X 1001)
// - 한글 자모(ㅋㅋ, ㅎㅎ 같은 글), 영문·숫자, 자주 쓰는 문장부호와 기호
// - 지금 사이트 글(app·components·content·lib)에 쓰인 글자 중 위에 없는 글자
// 빠진 글자는 시스템 글꼴(맑은 고딕, 애플 SD 고딕)로 보인다.
//
// 굵기는 사이트에서 쓰는 400–700 만 남긴다(본문 400, 소제목 600, 제목 700, 보조 500).
// SUIT 한글은 부품을 나눠 쓰는 구조라 글자 수를 줄여도 크기가 별로 줄지 않고,
// 굵기 범위를 줄일 때 크게 준다. (610KB 기준: 2,350자만 479KB, 2,350자 + 400–700 은 약 240KB)
// 굵기 범위를 바꾸면 app/layout.tsx 의 SUIT weight 도 같이 바꾼다.
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import subsetFont from "subset-font";

// 원본은 공식 저장소에서 받는다. (OFL-1.1, app/fonts/SUIT-LICENSE.txt)
const SOURCE_URL = "https://raw.githubusercontent.com/sun-typeface/SUIT/main/fonts/variable/woff2/SUIT-Variable.woff2";
const OUT = path.join("app", "fonts", "SUIT-Variable.woff2");
const SCAN_DIRS = ["app", "components", "content", "lib"];
const WEIGHT = { min: 400, max: 700 };

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join("");

/** KS X 1001 한글 2,350자: EUC-KR 의 0xB0A1–0xC8FE */
function ksx1001Hangul() {
  const decoder = new TextDecoder("euc-kr");
  let text = "";
  for (let lead = 0xb0; lead <= 0xc8; lead++) {
    for (let trail = 0xa1; trail <= 0xfe; trail++) {
      text += decoder.decode(Uint8Array.from([lead, trail]));
    }
  }
  return text;
}

const BASE =
  ksx1001Hangul() +
  range(0x3131, 0x318e) + // 한글 자모
  range(0x20, 0x7e) + // 영문·숫자·기본 기호
  range(0xa0, 0xff) + // ©, ·, × 같은 라틴 기호
  range(0x2010, 0x2027) + // – — ‘ ’ “ ” … 등
  range(0x2030, 0x203a) + // ‰ ′ ″ ‹ ›
  range(0x2190, 0x2193) + // ← ↑ → ↓
  range(0x3000, 0x3011) + // 「」『』【】 같은 괄호
  "〜№™★☆♡♥♪→"; // 〜 № ™ ★ ☆ ♡ ♥ ♪

async function* sourceFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(file);
    else if (/\.(tsx?|json|md)$/.test(entry.name)) yield file;
  }
}

/** 사이트 글에 쓰였지만 BASE 에 없는 글자 (이모지 제외: 이모지는 시스템 글꼴로 보인다) */
async function extraChars() {
  const extra = new Set();
  for (const dir of SCAN_DIRS) {
    for await (const file of sourceFiles(dir)) {
      for (const char of await readFile(file, "utf8")) {
        if (/[\p{Script=Hangul}\p{P}\p{S}]/u.test(char) && !/\p{Extended_Pictographic}/u.test(char) && !BASE.includes(char)) {
          extra.add(char);
        }
      }
    }
  }
  return [...extra].join("");
}

const response = await fetch(SOURCE_URL);
if (!response.ok) throw new Error(`원본을 받지 못했어요: ${response.status}`);
const source = Buffer.from(await response.arrayBuffer());

const extra = await extraChars();
const subset = await subsetFont(source, BASE + extra, { targetFormat: "woff2", variationAxes: { wght: WEIGHT } });
await writeFile(OUT, subset);

const { size } = await stat(OUT);
console.log(`${OUT}  ${(source.length / 1024).toFixed(0)}KB → ${(size / 1024).toFixed(0)}KB`);
console.log(extra ? `사이트 글에서 더한 글자: ${extra}` : "사이트 글에서 더한 글자: 없음");
