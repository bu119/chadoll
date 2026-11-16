"use client";

import { useTodayValue } from "@/components/home/useTodayValue";
import { getAge } from "@/lib/date";

/** 차돌이 나이(숫자). serverAge는 서버에서 미리 계산한 값이다. */
export function AgeText({ serverAge }: { serverAge: number }) {
  const age = useTodayValue(getAge, serverAge);
  return <>{age}</>;
}
