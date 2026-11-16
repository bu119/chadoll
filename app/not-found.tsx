import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="break-keep font-hand text-6xl leading-tight text-ink sm:text-7xl">
          앗, 차돌이가 이 페이지를 물고 갔나 봐요
        </h1>
        <p className="mt-4 break-keep text-xl text-ink">
          찾으시는 페이지가 없어요. 처음 화면에서 다시 차돌이를 만나 보세요 🐶
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center text-xl text-ink underline decoration-butter decoration-[3px] underline-offset-[6px] hover:decoration-fur"
        >
          차돌이네로 돌아가기
        </Link>
      </div>
    </section>
  );
}
