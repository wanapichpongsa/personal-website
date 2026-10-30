type CompanyBadgeProps = {
  name: string;
  className?: string;
};

export function CompanyBadge({ name, className = "" }: CompanyBadgeProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold shadow-sm ring-1 ring-black/5 ${className}`}
    >
      {name.charAt(0)}
    </span>
  );
}
