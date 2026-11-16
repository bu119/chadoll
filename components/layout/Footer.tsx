import { SocialLinks } from "@/components/layout/SocialLinks";
import { getTodaySnapshot } from "@/lib/today";
import { site } from "@/lib/site";

export async function Footer() {
  const { year } = await getTodaySnapshot();

  return (
    <footer className="border-t border-beige-200 bg-cream-100 px-5 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <p className="font-display text-2xl text-brown-600">차돌이 보러 또 놀러 오세요 🐶</p>
        <SocialLinks className="justify-center" />
        <p className="break-keep text-base text-brown-800/70">
          © {year} {site.name}. 차돌이 사진은 허락 없이 가져가지 말아 주세요.
        </p>
      </div>
    </footer>
  );
}
