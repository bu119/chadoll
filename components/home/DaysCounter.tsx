"use client";

import { useTodayValue } from "@/components/home/useTodayValue";
import { LeashLine } from "@/components/ui/LeashLine";
import { getDaysTogether } from "@/lib/date";

export function DaysCounter({ serverDays }: { serverDays: number }) {
  const days = useTodayValue(getDaysTogether, serverDays);

  return (
    <section aria-label="차돌이와 함께한 날" className="bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl md:grid md:grid-cols-12 md:items-end md:gap-8">
        {/* 리드줄 선은 "4,502일" 너비에 딱 맞춘다. */}
        <div className="w-fit md:col-span-7">
          <p className="text-xl font-semibold text-cocoa sm:text-2xl">차돌이와 함께한 지</p>
          <p className="mt-1 leading-none text-cocoa">
            <span className="font-serif text-[clamp(6rem,24vw,11rem)] font-medium lining-nums tabular-nums leading-[0.95] tracking-[-0.01em]">
              {days.toLocaleString("ko-KR")}
            </span>
            <span className="ml-2 text-3xl font-semibold sm:text-4xl">일</span>
          </p>
          <LeashLine className="mt-2 w-full text-leash" />
        </div>
        <p className="mt-6 max-w-sm break-keep text-lg text-cocoa md:col-span-5 md:mt-0 md:pb-6">
          2014년 7월 24일부터 하루도 빠짐없이 행복 적립 중이에요.
        </p>
      </div>
    </section>
  );
}
