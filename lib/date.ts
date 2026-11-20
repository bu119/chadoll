import { chadol } from "@/lib/site";

type YearMonthDay = { year: number; month: number; day: number };

const seoulFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** 방문자가 어디에 있든 한국 날짜를 기준으로 계산한다. */
export function getSeoulDate(now: Date): YearMonthDay {
  const [year, month, day] = seoulFormatter.format(now).split("-").map(Number);
  return { year, month, day };
}

function parseDate(value: string): YearMonthDay {
  const [year, month, day] = value.split("-").map(Number);
  return { year, month, day };
}

function toDayNumber({ year, month, day }: YearMonthDay): number {
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

/** 어느 해·달의 차돌이 만 나이. 태어난 날을 몰라서 태어난 달의 1일을 생일로 본다. */
function ageIn(year: number, month: number): number {
  const birth = chadol.birth;
  const hadBirthdayThisYear = month >= birth.month;
  return year - birth.year - (hadBirthdayThisYear ? 0 : 1);
}

/** 차돌이 만 나이 (오늘 기준) */
export function getAge(now: Date = new Date()): number {
  const today = getSeoulDate(now);
  return ageIn(today.year, today.month);
}

export type TakenDate = {
  year: number;
  month: number;
  /** 그때 만 나이 */
  age: number;
  /** 태어난 달부터 지난 달 수 (1살 전 사진에 "생후 N개월"로 쓴다) */
  months: number;
};

/** 사진 찍은 달("2021-11")과 그때 차돌이 나이 */
export function getTakenDate(taken: string): TakenDate {
  const [year, month] = taken.split("-").map(Number);
  const months = (year - chadol.birth.year) * 12 + (month - chadol.birth.month);
  return { year, month, age: ageIn(year, month), months };
}

/** 함께한 일수. 우리 집에 온 날을 1일째로 센다. */
export function getDaysTogether(now: Date = new Date()): number {
  const today = toDayNumber(getSeoulDate(now));
  const start = toDayNumber(parseDate(chadol.adoptedOn));
  return today - start + 1;
}
