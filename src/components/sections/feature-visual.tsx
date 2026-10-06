"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

// -----------------------------------------------------------------------------
// Mini-visuels animés pour les cartes de la section Fonctionnalités (bento).
// Chaque variante remplit l'en-tête de la carte (absolute inset-0), reste dans
// la palette marine/pêche/crème et s'anime en boucle. prefers-reduced-motion → figé.
// -----------------------------------------------------------------------------

export type FeatureVisualVariant =
  | "flame"
  | "document"
  | "chart"
  | "radar"
  | "pipeline"
  | "calendar";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-gradient-to-br from-secondary/60 to-transparent">
      <div className="absolute inset-0 bg-dot opacity-40" />
      <div className="absolute -right-6 -bottom-6 size-24 rounded-full bg-brand/10 blur-2xl" />
      {children}
    </div>
  );
}

// Objet en verre flottant (reprend les rendus Blender → touche « 3D »).
function GlassVisual({ src, still }: { src: string; still: boolean }) {
  return (
    <Frame>
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2"
        style={{ x: "-50%", y: "-50%" }}
        animate={still ? {} : { translateY: ["-54%", "-46%", "-54%"], rotate: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-brand/25 blur-2xl" />
        <Image
          src={src}
          alt=""
          width={88}
          height={88}
          className="drop-shadow-[0_10px_24px_rgba(255,201,163,0.3)]"
        />
      </motion.div>
      {!still &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute size-1.5 rounded-full bg-brand-2"
            style={{ left: `${25 + i * 22}%`, top: "60%" }}
            animate={{ y: [0, -18, 0], opacity: [0, 0.9, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
    </Frame>
  );
}

// Onde vocale : barres qui « respirent ».
function ChartVisual({ still }: { still: boolean }) {
  const bars = [40, 68, 52, 84, 60];
  return (
    <Frame>
      <div className="absolute inset-x-6 bottom-6 flex items-end gap-2.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-brand/40 to-brand-2"
            style={{ height: `${h}%` }}
            initial={false}
            animate={
              still
                ? { scaleY: 1 }
                : { scaleY: [0.55, 1, 0.72, 1], opacity: [0.7, 1, 0.85, 1] }
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </Frame>
  );
}

// Ondes concentriques (veille bienveillante / pouls).
function RadarVisual({ still }: { still: boolean }) {
  return (
    <Frame>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="size-3 rounded-full bg-brand shadow-[0_0_12px_var(--brand)]" />
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-brand/50"
            animate={
              still
                ? { scale: 3, opacity: 0.15 }
                : { scale: [1, 7], opacity: [0.6, 0] }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </Frame>
  );
}

// Étapes d'une démarche qui se remplissent.
function PipelineVisual({ still }: { still: boolean }) {
  const rows = [82, 60, 40];
  return (
    <Frame>
      <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col gap-3">
        {rows.map((w, i) => (
          <div key={i} className="h-2.5 overflow-hidden rounded-full bg-secondary/70">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
              initial={false}
              animate={still ? { width: `${w}%` } : { width: ["8%", `${w}%`] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.25,
                ease: "easeInOut",
              }}
            />
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Agenda : une case qui se déplace dans une grille.
function CalendarVisual({ still }: { still: boolean }) {
  return (
    <Frame>
      <div className="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-cols-4 gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="size-5 rounded-md border border-border/70 bg-background/40"
          />
        ))}
        <motion.div
          className="absolute size-5 rounded-md bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_12px_var(--brand)]"
          animate={
            still
              ? { x: 28, y: 28 }
              : { x: [0, 56, 56, 28, 0], y: [0, 0, 56, 28, 0] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </Frame>
  );
}

export function FeatureVisual({ variant }: { variant: FeatureVisualVariant }) {
  const still = useReducedMotion() ?? false;
  switch (variant) {
    case "flame":
      return <GlassVisual src={asset("/objets/flamme.png")} still={still} />;
    case "document":
      return <GlassVisual src={asset("/objets/document.png")} still={still} />;
    case "chart":
      return <ChartVisual still={still} />;
    case "radar":
      return <RadarVisual still={still} />;
    case "pipeline":
      return <PipelineVisual still={still} />;
    case "calendar":
      return <CalendarVisual still={still} />;
  }
}
