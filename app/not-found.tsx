import { MoreLink } from "@/components/ui/MoreLink";

export default function NotFound() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-serif text-2xl font-semibold tracking-[0.2em] text-brown">404</p>
        <h1 className="mt-4 break-keep text-4xl font-bold leading-tight tracking-[-0.02em] text-cocoa sm:text-5xl">
          앗, 차돌이가 이 페이지를 물고 갔나 봐요
        </h1>
        <p className="mt-4 break-keep text-xl text-cocoa">
          찾으시는 페이지가 없어요. 처음 화면에서 다시 차돌이를 만나 보세요 🐶
        </p>
        <MoreLink href="/" className="mt-8">
          처음 화면으로 돌아가기
        </MoreLink>
      </div>
    </section>
  );
}
