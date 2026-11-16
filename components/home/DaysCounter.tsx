"use client";

import { useTodayValue } from "@/components/home/useTodayValue";
import { LeashLine } from "@/components/ui/LeashLine";
import { getDaysTogether } from "@/lib/date";

export function DaysCounter({ serverDays }: { serverDays: number }) {
  const days = useTodayValue(getDaysTogether, serverDays);

  return (
    <section aria-label="차돌이와 함께한 날" className="bg-cocoa px-5 py-20 text-center text-paper sm:py-28">
      <p className="font-hand text-5xl leading-none sm:text-6xl">차돌이와 함께한 지</p>
      <p className="mt-2 font-hand leading-none">
        <span className="text-[clamp(8rem,28vw,15rem)] leading-[0.9]">{days.toLocaleString("ko-KR")}</span>
        <span className="ml-2 text-5xl sm:text-6xl">일</span>
      </p>
      <LeashLine className="mx-auto w-56 text-butter sm:w-80" />
      <p className="mx-auto mt-8 max-w-xl break-keep text-page">
        2014년 7월 24일부터 하루도 빠짐없이 행복 적립 중이에요.
      </p>
    </section>
  );
}
