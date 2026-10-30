import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
  delay?: number;
};

export function Section({ title, children, delay = 0 }: SectionProps) {
  return (
    <section
      className="animate-rise mt-14"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="px-5 text-lg font-medium tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
