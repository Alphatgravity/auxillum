"use client";

import { cn } from "@/lib/utils";
import React from "react";

type AuroraBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  showRadialGradient?: boolean;
};

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-background text-foreground transition-colors",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <div
          className={cn(
            `pointer-events-none absolute -inset-[10px] opacity-40 blur-[10px] will-change-transform`,
            `[--aurora:repeating-linear-gradient(100deg,var(--brand)_10%,var(--brand-2)_15%,var(--brand-3)_20%,var(--brand-2)_25%,var(--brand)_30%)]`,
            `[--dark-gradient:repeating-linear-gradient(100deg,var(--background)_0%,var(--background)_7%,transparent_10%,transparent_12%,var(--background)_16%)]`,
            `[background-image:var(--dark-gradient),var(--aurora)]`,
            `[background-size:300%,_200%] [background-position:50%_50%,50%_50%]`,
            `after:absolute after:inset-0 after:animate-aurora after:[background-image:var(--dark-gradient),var(--aurora)]`,
            `after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
          )}
        />
      </div>
      {children}
    </div>
  );
}
