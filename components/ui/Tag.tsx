import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-beige-200 px-4 py-1.5 text-lg text-brown-800">
      {children}
    </span>
  );
}
