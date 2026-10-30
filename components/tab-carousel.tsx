"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type Tab = { key: string; label: string; content: ReactNode };

type TabCarouselProps = {
  tabs: Tab[];
  initialKey?: string;
  delay?: number;
};

export function TabCarousel({ tabs, initialKey, delay = 0 }: TabCarouselProps) {
  const id = useId();
  const scroller = useRef<HTMLDivElement>(null);
  const initialIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === initialKey),
  );
  const [active, setActive] = useState(initialIndex);

  // Open on the requested tab without animating the jump.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = initialIndex * el.clientWidth;
  }, [initialIndex]);

  function select(index: number) {
    const el = scroller.current;
    if (!el) return;
    setActive(index);
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }

  function onScroll() {
    const el = scroller.current;
    if (!el || !el.clientWidth) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    select((active + step + tabs.length) % tabs.length);
  }

  return (
    <section
      className="animate-rise mt-14"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        role="tablist"
        aria-label="Sections"
        onKeyDown={onKeyDown}
        className="relative ml-3 inline-grid rounded-full bg-card p-1 ring-1 ring-foreground/[0.04] sm:ml-4"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, 7rem)` }}
      >
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 rounded-full bg-background shadow-sm ring-1 ring-foreground/[0.06] transition-transform duration-300 ease-out"
          style={{
            width: "7rem",
            transform: `translateX(${active * 100}%)`,
          }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            id={`${id}-tab-${tab.key}`}
            role="tab"
            type="button"
            aria-selected={active === index}
            aria-controls={`${id}-panel-${tab.key}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            className={`relative z-10 rounded-full px-4 py-1.5 text-base transition-colors ${
              active === index ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="-my-2 mt-3 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab, index) => (
          <div
            key={tab.key}
            id={`${id}-panel-${tab.key}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${tab.key}`}
            inert={active !== index}
            className="w-full shrink-0 snap-start self-start px-px"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </section>
  );
}
