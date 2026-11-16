import { DaysCounter } from "@/components/home/DaysCounter";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { ProfileCard } from "@/components/home/ProfileCard";
import { Timeline } from "@/components/home/Timeline";
import { Section } from "@/components/ui/Section";
import { getTodaySnapshot } from "@/lib/today";
import { getGalleryPhotos } from "@/lib/gallery";

export default async function HomePage() {
  const { daysTogether } = await getTodaySnapshot();

  return (
    <>
      <Hero />
      <ProfileCard />
      <DaysCounter serverDays={daysTogether} />
      <Section
        id="gallery"
        title="차돌이 사진첩 📸"
        description="사진을 누르면 크게 볼 수 있어요. 귀여움 주의! 🧡"
      >
        <Gallery photos={getGalleryPhotos()} />
      </Section>
      <Timeline />
    </>
  );
}
