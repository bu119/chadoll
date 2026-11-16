/** 차돌이의 노란 리드줄을 닮은 손그림 선. 색은 text-* 클래스로 정한다. */
export function LeashLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`h-4 ${className}`}
    >
      <path
        d="M4 10C28 3 50 15 82 8s52-5 84 2 46 2 70-4"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
