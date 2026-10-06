"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { asset } from "@/lib/asset";

// -----------------------------------------------------------------------------
// Film produit posé dans le hero, sans effet de scroll.
// - Cadre en verre (même matière que le bouton « Voir la démo ») : liseré clair,
//   flou d'arrière-plan, reflet supérieur, ombre portée profonde.
// - Lecture auto (muette) uniquement quand il est visible, pause sinon.
// - prefers-reduced-motion : pas de lecture auto, bouton lecture visible.
// -----------------------------------------------------------------------------

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
      className="relative z-10 mx-auto mt-14 w-full max-w-5xl px-4 pb-24 sm:px-6"
    >
      {/* Halo pêche / cuivre très doux derrière le cadre */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-10 bottom-28 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(255,201,163,0.18),rgba(139,58,26,0.14)_50%,transparent_75%)] blur-3xl"
      />

      {/* Cadre en verre */}
      <div className="group relative rounded-[1.75rem] border border-input bg-input/25 p-2 shadow-[inset_0_1px_0_0_rgba(255,242,220,0.12),0_40px_90px_-30px_rgba(0,0,0,0.8),0_18px_40px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-2.5">
        <div className="relative overflow-hidden rounded-[1.25rem] ring-1 ring-black/30">
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
          className={`btn-glass absolute right-6 bottom-6 flex size-10 items-center justify-center rounded-full text-foreground transition-opacity duration-300 ${
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
