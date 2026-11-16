"use client";

import { useTodayValue } from "@/components/home/useTodayValue";
import { getDaysTogether } from "@/lib/date";

export function DaysCounter({ serverDays }: { serverDays: number }) {
  const days = useTodayValue(getDaysTogether, serverDays);

  return (
    <section aria-label="차돌이와 함께한 날" className="px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl rounded-3xl bg-brown-600 px-6 py-12 text-center text-cream-50 shadow-soft sm:py-16">
        <p className="font-display text-2xl sm:text-3xl">차돌이와 함께한 지</p>
        <p className="mt-3 font-display">
          <span className="text-6xl text-maple-300 sm:text-8xl">{days.toLocaleString("ko-KR")}</span>
          <span className="ml-2 text-3xl sm:text-4xl">일</span>
        </p>
        <p className="mt-5 text-lg text-cream-100">
          2014년 7월 24일부터 하루도 빠짐없이 행복 적립 중이에요 🐾
        </p>
      </div>
    </section>
  );
}
