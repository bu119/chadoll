import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-5 py-24 text-center">
      <p className="text-6xl">🐾</p>
      <h1 className="mt-6 font-display text-3xl text-brown-600 sm:text-4xl">
        앗, 차돌이가 이 페이지를 물고 갔나 봐요
      </h1>
      <p className="mt-4 break-keep text-xl text-brown-800/85">
        찾으시는 페이지가 없어요. 처음 화면에서 다시 차돌이를 만나 보세요 🐶
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-brown-600 px-7 text-xl text-cream-50 shadow-soft transition hover:bg-brown-800"
      >
        차돌이네로 돌아가기
      </Link>
    </section>
  );
}
