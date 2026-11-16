import type { SocialKind } from "@/lib/site";

type SocialIconProps = {
  kind: SocialKind;
  className?: string;
};

export function SocialIcon({ kind, className = "h-6 w-6" }: SocialIconProps) {
  if (kind === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="4.5" fill="currentColor" />
        <path d="M10 9v6l5.2-3z" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
