import { SocialIcon } from "@/components/ui/SocialIcon";
import { getSocialLinks } from "@/lib/site";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-x-7 gap-y-1 ${className}`}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`차돌이 ${link.label} (새 탭에서 열림)`}
            className="group inline-flex min-h-12 items-center gap-2 text-lg text-ink"
          >
            <SocialIcon kind={link.kind} className="h-5 w-5 text-ink-soft" />
            <span className="underline decoration-butter decoration-[3px] underline-offset-[6px] transition-colors group-hover:decoration-fur">
              {link.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
