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
      <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
        {/* 세로선은 리드줄 색 */}
        <ol className="border-l-[3px] border-butter md:col-span-7">
          {items.map((item) => (
            <li key={item.id} className="relative pb-12 pl-7 last:pb-0 sm:pl-10">
              {item.current ? (
                <span aria-hidden="true" className="absolute -left-[9.5px] top-1 h-4 w-4 rounded-full bg-fur" />
              ) : null}
              <p className="text-base leading-none text-ink-soft">{item.when}</p>
              <h3 className="mt-2 font-hand text-5xl leading-none text-ink sm:text-6xl">{item.title}</h3>
              <p className="mt-3 max-w-lg break-keep text-xl text-ink">
                {item.current ? (
                  <>
                    어느덧 <AgeText serverAge={age} />살!{" "}
                  </>
                ) : null}
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <Photo
          photo={nowPhoto}
          sizes="(min-width: 768px) 36vw, 384px"
          caption="간식 생각에 입맛 다시는 중"
          className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none md:self-end"
        />
      </div>
    </Section>
  );
}
