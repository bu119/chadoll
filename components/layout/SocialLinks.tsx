import { SocialIcon } from "@/components/ui/SocialIcon";
import { getSocialLinks } from "@/lib/site";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`차돌이 ${link.label} (새 탭에서 열림)`}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-beige-200 bg-white px-5 text-lg text-brown-600 shadow-soft transition hover:-translate-y-0.5 hover:border-maple-500 hover:text-maple-500"
          >
            <SocialIcon kind={link.kind} />
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
