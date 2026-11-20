import { AboutPreview } from "@/components/home/AboutPreview";
import { DaysCounter } from "@/components/home/DaysCounter";
import { FeaturedMoments } from "@/components/home/FeaturedMoments";
import { Hero } from "@/components/home/Hero";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { getTodaySnapshot } from "@/lib/today";

export const metadata = pageMetadata({ description: site.description, path: "/" });

export default async function HomePage() {
  const { daysTogether } = await getTodaySnapshot();

  return (
    <>
      <Hero />
      <AboutPreview />
      <DaysCounter serverDays={daysTogether} />
      <FeaturedMoments />
    </>
  );
}
