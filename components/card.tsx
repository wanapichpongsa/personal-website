import type { ElementType, HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  interactive?: boolean;
};

export function Card({
  as: Component = "div",
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <Component
      className={[
        "rounded-3xl bg-card px-5 py-4 ring-1 ring-foreground/[0.04]",
        interactive
          ? "transition duration-200 hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-sm"
          : "",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
