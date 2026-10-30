import { Card } from "./card";
import { CompanyBadge } from "./company-badge";
import type { Experience } from "./data";

export function ExperienceCard({
  role,
  company,
  years,
  bullets,
  badgeClass,
}: Experience) {
  return (
    <Card as="article" interactive>
      <div className="flex items-start justify-between gap-4">
        <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg">
          <span>{role} at</span>
          <span className="inline-flex items-center gap-2">
            <CompanyBadge name={company} className={badgeClass} />
            {company}
          </span>
        </h3>
        <span className="shrink-0 pt-0.5 text-muted tabular-nums">{years}</span>
      </div>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-lg leading-snug text-muted marker:text-muted/60">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </Card>
  );
}
