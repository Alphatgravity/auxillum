"use client";

import { cn } from "@/lib/utils";

// Pseudo-aléatoire déterministe (même valeur côté serveur et client)
// pour éviter tout mismatch d'hydratation.
function seeded(i: number, salt: number) {
  const x = Math.sin((i + 1) * 999 + salt) * 10000;
  return x - Math.floor(x);
}

export function Meteors({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((_, idx) => {
        const left = Math.floor(seeded(idx, 1) * 100);
        const delay = (seeded(idx, 2) * 4).toFixed(2) + "s";
        const duration = Math.floor(seeded(idx, 3) * 6 + 4) + "s";
        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor pointer-events-none absolute top-0 left-1/2 size-0.5 rotate-[215deg] rounded-full bg-brand shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-brand before:to-transparent before:content-['']",
              className,
            )}
            style={{
              left: left + "%",
              animationDelay: delay,
              animationDuration: duration,
            }}
          />
        );
      })}
    </>
  );
}
