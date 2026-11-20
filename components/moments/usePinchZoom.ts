"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

type Point = { x: number; y: number };
type View = { scale: number; x: number; y: number };

const ORIGIN: View = { scale: 1, x: 0, y: 0 };
const MAX_SCALE = 4;
/** 두 번 톡톡 눌렀을 때 배율 */
const TAP_SCALE = 2.5;
/** 이보다 작게 오므리면 1배로 맞춘다. */
const SNAP_SCALE = 1.05;
/** 두 번째 탭을 "두 번 톡톡"으로 보는 시간·거리 */
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_DISTANCE = 30;
/** 이만큼 안 움직이고 뗐으면 탭으로 본다. */
const TAP_MOVE = 10;

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const middle = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Gesture = {
  /** 손동작을 시작할 때의 확대 상태 */
  view: View;
  /** 시작할 때 손가락 위치(두 손가락이면 가운데) */
  point: Point;
  /** 두 손가락 사이 거리 (한 손가락이면 0) */
  spread: number;
  /** 사진 영역의 가운데 */
  center: Point;
};

/**
 * 사진 크게 보기에서 사진만 확대·이동한다. (브라우저 화면 확대 대신)
 * - 두 손가락 벌리기·오므리기: 손가락 사이를 중심으로 1~4배
 * - 두 번 톡톡(마우스는 더블클릭): 1배 ↔ 2.5배
 * - 확대 중 한 손가락으로 끌기: 사진 이동 (사진 가장자리 밖으로는 안 나간다)
 * - 1배에서 한 손가락으로 밀면 onSwipe 로 넘긴다. 확대 중에는 넘기지 않는다.
 *
 * aspect: 사진의 가로/세로. object-contain 으로 실제 보이는 크기를 구하는 데 쓴다.
 */
export function usePinchZoom({ aspect, onSwipe }: { aspect: number; onSwipe: (dx: number, dy: number) => void }) {
  const [view, setView] = useState<View>(ORIGIN);
  const [moving, setMoving] = useState(false);
  /** 사진을 감싼(확대되는) 요소 */
  const contentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<View>(ORIGIN);
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<Gesture | null>(null);
  /** 이번 손동작에 손가락이 두 개 이상 닿았는지 */
  const pinched = useRef(false);
  const downAt = useRef<Point | null>(null);
  const lastTap = useRef<{ time: number; point: Point } | null>(null);

  /** 사진이 영역 밖으로 빠지지 않게 이동 거리를 자른다. */
  const fit = (next: View): View => {
    const box = contentRef.current;
    if (!box || next.scale <= 1) return ORIGIN;
    const width = box.offsetWidth;
    const height = box.offsetHeight;
    const shownWidth = Math.min(width, height * aspect);
    const shownHeight = shownWidth / aspect;
    const maxX = Math.max(0, (next.scale * shownWidth - width) / 2);
    const maxY = Math.max(0, (next.scale * shownHeight - height) / 2);
    return { scale: next.scale, x: clampNumber(next.x, -maxX, maxX), y: clampNumber(next.y, -maxY, maxY) };
  };

  const apply = (next: View) => {
    viewRef.current = next;
    setView(next);
  };

  const startGesture = (center: Point) => {
    const points = [...pointers.current.values()];
    const [a, b] = points;
    gesture.current =
      points.length >= 2 && a && b
        ? { view: viewRef.current, point: middle(a, b), spread: distance(a, b), center }
        : { view: viewRef.current, point: a ?? center, spread: 0, center };
  };

  const centerOf = (event: PointerEvent<HTMLElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = { x: event.clientX, y: event.clientY };
    pointers.current.set(event.pointerId, point);
    if (pointers.current.size === 1) {
      pinched.current = false;
      downAt.current = point;
    } else {
      pinched.current = true;
    }
    setMoving(true);
    startGesture(centerOf(event));
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const start = gesture.current;
    if (!start) return;
    const [a, b] = [...pointers.current.values()];

    if (a && b && start.spread > 0) {
      // 두 손가락: 처음 손가락 사이에 있던 지점이 계속 손가락 사이에 오게 확대한다.
      const now = middle(a, b);
      const scale = clampNumber((start.view.scale * distance(a, b)) / start.spread, 1, MAX_SCALE);
      const ratio = scale / start.view.scale;
      apply(
        fit({
          scale,
          x: now.x - start.center.x - ratio * (start.point.x - start.center.x - start.view.x),
          y: now.y - start.center.y - ratio * (start.point.y - start.center.y - start.view.y),
        }),
      );
    } else if (a && start.view.scale > 1) {
      // 한 손가락: 확대돼 있을 때만 사진을 옮긴다.
      apply(fit({ ...start.view, x: start.view.x + a.x - start.point.x, y: start.view.y + a.y - start.point.y }));
    }
  };

  const toggleAt = (point: Point, center: Point) => {
    if (viewRef.current.scale > 1) {
      apply(ORIGIN);
      return;
    }
    // 누른 곳이 그 자리에 머물도록 키운다.
    apply(
      fit({
        scale: TAP_SCALE,
        x: (1 - TAP_SCALE) * (point.x - center.x),
        y: (1 - TAP_SCALE) * (point.y - center.y),
      }),
    );
  };

  const onPointerEnd = (event: PointerEvent<HTMLElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.delete(event.pointerId);
    const center = centerOf(event);

    if (pointers.current.size > 0) {
      // 두 손가락 중 하나를 뗐으면 남은 손가락으로 이어서 옮긴다.
      startGesture(center);
      return;
    }

    setMoving(false);
    const start = gesture.current;
    gesture.current = null;
    if (viewRef.current.scale < SNAP_SCALE) apply(ORIGIN);
    if (pinched.current || !start || !downAt.current) return;

    const point = { x: event.clientX, y: event.clientY };
    const dx = point.x - downAt.current.x;
    const dy = point.y - downAt.current.y;

    if (Math.hypot(dx, dy) < TAP_MOVE) {
      const last = lastTap.current;
      if (last && event.timeStamp - last.time < DOUBLE_TAP_MS && distance(last.point, point) < DOUBLE_TAP_DISTANCE) {
        lastTap.current = null;
        toggleAt(point, center);
      } else {
        lastTap.current = { time: event.timeStamp, point };
      }
      return;
    }
    if (start.view.scale === 1) onSwipe(dx, dy);
  };

  /** 다른 사진으로 넘기거나 창을 닫을 때 1배로 되돌린다. */
  const reset = () => {
    pointers.current.clear();
    gesture.current = null;
    lastTap.current = null;
    setMoving(false);
    apply(ORIGIN);
  };

  const style: CSSProperties = {
    transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
  };

  return {
    contentRef,
    style,
    /** 손을 뗀 뒤(톡톡·되돌리기)에만 부드럽게 움직인다. */
    animate: !moving,
    isZoomed: view.scale > 1,
    reset,
    handlers: { onPointerDown, onPointerMove, onPointerUp: onPointerEnd, onPointerCancel: onPointerEnd },
  };
}
