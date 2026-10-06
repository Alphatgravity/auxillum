"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorderButton({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) {
  return React.createElement(
    Component,
    {
      className: cn(
        "relative h-12 w-full overflow-hidden bg-transparent p-[1px] text-sm",
        containerClassName,
      ),
      style: { borderRadius },
      ...otherProps,
    },
    <div
      key="border"
      className="absolute inset-0"
      style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
    >
      <MovingBorder duration={duration} rx="30%" ry="30%">
        <div
          className={cn(
            "size-20 bg-[radial-gradient(var(--brand)_40%,transparent_60%)] opacity-90",
            borderClassName,
          )}
        />
      </MovingBorder>
    </div>,
    <div
      key="content"
      className={cn(
        "relative flex h-full w-full items-center justify-center border border-border bg-card/80 px-6 py-1 font-medium text-foreground antialiased backdrop-blur-xl",
        className,
      )}
      style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
    >
      {children}
    </div>,
  );
}

function MovingBorder({
  children,
  duration = 3000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0,
  );
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
