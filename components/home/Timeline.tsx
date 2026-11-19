import { AgeText } from "@/components/home/AgeText";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { nowPhoto } from "@/lib/gallery";
import { getTodaySnapshot } from "@/lib/today";
import { getTimeline } from "@/lib/site";

export async function Timeline() {
  const { age } = await getTodaySnapshot();
  const items = getTimeline();

  return (
    <Section id="timeline" title="차돌이가 걸어온 길">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <ol className="border-b border-line md:col-span-7">
          {items.map((item) => (
            <li key={item.id} className="border-t border-line py-8 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-6">
              <p className="flex items-center gap-2 text-lg font-semibold leading-tight text-brown">
                {item.current ? <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-golden" /> : null}
                {item.when}
              </p>
              <div>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-cocoa sm:mt-0">{item.title}</h3>
                <p className="mt-2 max-w-lg break-keep text-lg text-cocoa">
                  {item.current ? (
                    <>
                      어느덧 <AgeText serverAge={age} />살!{" "}
                    </>
                  ) : null}
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Photo
          photo={nowPhoto}
          sizes="(min-width: 768px) 36vw, 100vw"
          ratio="4/5"
          caption="간식 생각에 입맛 다시는 중"
          className="md:col-span-4 md:col-start-9 md:self-end"
        />
      </div>
    </Section>
  );
}
