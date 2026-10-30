import Link from "next/link";
import { Card } from "./card";

type WelcomeOptionProps = {
  href: string;
  label: string;
  hint: string;
};

export function WelcomeOption({ href, label, hint }: WelcomeOptionProps) {
  return (
    <Link href={href} className="block rounded-3xl">
      <Card interactive className="flex min-h-28 flex-col justify-between py-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-medium tracking-tight">{label}</h2>
          <span aria-hidden className="text-muted">
            →
          </span>
        </div>
        <p className="mt-3 text-lg leading-snug text-muted">{hint}</p>
      </Card>
    </Link>
  );
}
