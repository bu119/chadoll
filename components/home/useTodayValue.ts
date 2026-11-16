import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * 정적으로 만들어진 페이지는 빌드한 날의 값으로 굳는다.
 * 처음에는 서버가 계산한 값을 보여주고, 브라우저에서 오늘 날짜로 다시 계산한다.
 */
export function useTodayValue(compute: () => number, serverValue: number): number {
  return useSyncExternalStore(subscribe, compute, () => serverValue);
}
