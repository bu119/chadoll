import { AgeText } from "@/components/home/AgeText";
import { Section } from "@/components/ui/Section";
import { getTodaySnapshot } from "@/lib/today";
import { getTimeline } from "@/lib/site";

export async function Timeline() {
  const { age } = await getTodaySnapshot();
  const items = getTimeline();

  return (
    <Section id="timeline" title="차돌이가 걸어온 길 🐾" tone="tinted">
      <ol className="mx-auto max-w-2xl">
        {items.map((item, index) => (
          <li key={item.id} className="relative pb-10 pl-10 last:pb-0">
            {index < items.length - 1 ? (
              <span aria-hidden="true" className="absolute left-[0.6875rem] top-3 h-full w-0.5 bg-beige-400" />
            ) : null}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-cream-100 ${
                item.current ? "bg-maple-500" : "bg-brown-600"
              }`}
            />
            <p className="text-lg text-maple-600">{item.when}</p>
            <h3 className="mt-1 font-display text-2xl text-brown-600">{item.title}</h3>
            <p className="mt-2 break-keep text-xl text-brown-800">
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
    </Section>
  );
}
