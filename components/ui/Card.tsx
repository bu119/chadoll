import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl border border-beige-200 bg-white/80 p-6 shadow-soft sm:p-8 ${className}`}>
      {children}
    </div>
  );
}
