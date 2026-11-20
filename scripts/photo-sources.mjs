// 사진 파일 이름 ↔ photos/ 원본 번호 표.
// resize-photos.mjs(사진 줄이기)와 photo-dates.mjs(촬영일 읽기)가 같이 쓴다.
import path from "node:path";

export const SRC_DIR = "photos";

/** 원본 번호 → photos/ 의 원본 파일 경로 */
export const source = (n) => path.join(SRC_DIR, `김차돌 (${n}).jpg`);

/** 표의 한 줄(숫자 또는 { n, ... })에서 원본 번호만 꺼낸다. */
export const sourceNumber = (entry) => (typeof entry === "number" ? entry : entry.n);

// 파일 이름 → photos/ 의 원본 번호. lib/gallery.ts 가 이 파일 이름을 쓴다.
// 새 사진은 맨 뒤에 이어 붙이고, 이미 있는 이름의 번호는 바꾸지 않는다.
export const PHOTOS = {
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
