"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

type Item = {
  quote: string;
  name: string;
  title: string;
};

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    containerRef.current.style.setProperty(
      "--marquee-direction",
      direction === "left" ? "forwards" : "reverse",
    );
    const duration =
      speed === "fast" ? "25s" : speed === "normal" ? "40s" : "70s";
    containerRef.current.style.setProperty("--marquee-duration", duration);
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden mask-fade-x",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animationDirection:
            direction === "left" ? "normal" : "reverse",
        }}
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="relative w-[340px] max-w-full shrink-0 rounded-2xl glass-panel px-8 py-6 md:w-[420px]"
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-relaxed text-foreground/90">
                “{item.quote}”
              </span>
              <div className="relative z-20 mt-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-sm font-semibold text-brand-foreground">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.title}
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
