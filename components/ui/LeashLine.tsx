/** 차돌이의 노란 리드줄을 닮은 손그림 선. 사이트의 표식이라 표지와 함께한 날 두 곳에만 쓴다. 색은 text-leash. */
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
