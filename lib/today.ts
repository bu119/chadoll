import { cacheLife } from "next/cache";
import { getAge, getDaysTogether, getSeoulDate } from "@/lib/date";

export type TodaySnapshot = { age: number; daysTogether: number; year: number };

/**
 * 서버에서 쓰는 "오늘" 값. 페이지를 정적으로 만들되 한 시간마다 다시 계산한다.
 * (브라우저에서는 AgeText · DaysCounter가 방문한 순간의 날짜로 한 번 더 맞춘다.)
 */
export async function getTodaySnapshot(): Promise<TodaySnapshot> {
  "use cache";
  cacheLife("hours");
  const now = new Date();
  return { age: getAge(now), daysTogether: getDaysTogether(now), year: getSeoulDate(now).year };
}
