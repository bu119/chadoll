/** 섹션 제목 위에 붙는 작은 영문 라벨. 메뉴 이름과 같은 단어만 쓴다. */
export function Kicker({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={`font-serif text-lg font-semibold uppercase leading-none tracking-[0.2em] text-brown ${className}`}>
      {children}
    </p>
  );
}
