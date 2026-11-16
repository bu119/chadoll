import type { ReactNode } from "react";
import { AgeText } from "@/components/home/AgeText";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { getTodaySnapshot } from "@/lib/today";
import { chadol } from "@/lib/site";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-beige-200 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-4">
      <dt className="font-display text-xl text-brown-600">{label}</dt>
      <dd className="break-keep text-xl text-brown-800">{children}</dd>
    </div>
  );
}

export async function ProfileCard() {
  const { age } = await getTodaySnapshot();

  return (
    <Section id="profile" title="차돌이 프로필 📋" tone="tinted">
      <Card className="mx-auto max-w-2xl">
        <dl>
          <Row label="이름">{chadol.name}</Row>
          <Row label="견종">{chadol.breed}</Row>
          <Row label="나이">
            <AgeText serverAge={age} />살{" "}
            <span className="text-lg text-brown-800/70">
              ({chadol.birth.year}년 {chadol.birth.month}월생)
            </span>
          </Row>
          <Row label="별명">
            <span className="flex flex-wrap gap-2">
              {chadol.nicknames.map((nickname) => (
                <Tag key={nickname}>{nickname}</Tag>
              ))}
            </span>
          </Row>
          <Row label="성격">{chadol.personality}</Row>
          <Row label="좋아하는 것">
            <span className="flex flex-wrap gap-2">
              {chadol.likes.map((like) => (
                <Tag key={like}>{like}</Tag>
              ))}
            </span>
          </Row>
        </dl>
      </Card>
    </Section>
  );
}
