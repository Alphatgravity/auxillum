"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { asset } from "@/lib/asset";

// -----------------------------------------------------------------------------
// Film produit fondu dans le hero, sans cadre ni effet de scroll.
// - Le fond du film (#00182b) est quasi celui du site : ses bords sont estompés
//   par un masque, il n'y a donc aucune cassure avec le hero.
// - Halo pêche / cuivre derrière pour la profondeur ; les objets en verre du
//   hero passent devant lui au premier plan.
// - Lecture auto (muette) uniquement quand il est visible, pause sinon.
// - prefers-reduced-motion : pas de lecture auto, bouton lecture visible.
// -----------------------------------------------------------------------------

const FEATHER =
  "[mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent),linear-gradient(to_bottom,transparent,black_12%,black_86%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]";

export function HeroFilm() {
  const reduce = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto mt-6 w-full max-w-6xl pb-12"
    >
      {/* Halo pêche / cuivre très doux derrière le film */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] top-[10%] bottom-[18%] -z-10 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,201,163,0.16),rgba(139,58,26,0.16)_50%,transparent_75%)] blur-3xl"
      />

      <div className="group relative">
        <div className={FEATHER}>
          <video
            ref={videoRef}
            className="block aspect-video w-full bg-[#001c2f]"
            poster={asset("/video/auxillum-film-poster.jpg")}
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Film de présentation : un conseiller demande à Auxillum de créer un dossier, Auxillum le remplit automatiquement."
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source
              src={asset("/video/auxillum-film-720.mp4")}
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src={asset("/video/auxillum-film.mp4")} type="video/mp4" />
          </video>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Mettre le film en pause" : "Lire le film"}
          className={`btn-glass absolute right-[9%] bottom-[14%] flex size-10 items-center justify-center rounded-full text-foreground transition-opacity duration-300 ${
            playing
              ? "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              : "opacity-100"
          }`}
        >
          {playing ? (
            <IconPlayerPauseFilled className="size-4" />
          ) : (
            <IconPlayerPlayFilled className="size-4 translate-x-px" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
