"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { asset } from "@/lib/asset";

// -----------------------------------------------------------------------------
// Film produit intégré au hero, en 3D, piloté par le scroll.
// - Au départ : large (sans dépasser 920 px ni la hauteur de l'écran), incliné
//   vers l'arrière (rotateX) → il « sort » du hero. Bords fondus par masque :
//   aucun cadre ne coupe le hero.
// - En scrollant : il se redresse, se fige à l'écran (sticky) puis sa largeur
//   diminue progressivement jusqu'à ~55 % avant de libérer la page.
// - Lecture auto (muette) uniquement quand il est visible.
// - prefers-reduced-motion : ni 3D ni épinglage, lecture manuelle.
// -----------------------------------------------------------------------------

const FEATHER =
  "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent),linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// Hauteur de la scène de scroll (en vh) : à peine plus que l'écran, pour un
// effet bref — le film se redresse et rétrécit en un coup de molette.
const STAGE_VH = { mobile: 108, desktop: 115 } as const;

// Largeur de départ du film : jamais plus de 920 px, et toujours assez petit
// pour que sa hauteur tienne dans l'écran avec de la marge.
const FILM_WIDTH = "min(80vw, 920px, calc((100svh - 14rem) * 16 / 9))";

export function HeroFilm() {
  const reduce = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userPaused = useRef(false);

  // Lus par les transforms sans les recréer.
  const pinStart = useRef(100 / STAGE_VH.desktop);
  const endScale = useRef(0.55);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      const mobile = mql.matches;
      setIsMobile(mobile);
      pinStart.current = 100 / (mobile ? STAGE_VH.mobile : STAGE_VH.desktop);
      endScale.current = mobile ? 0.9 : 0.55;
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // 0 : le haut de la scène entre par le bas de l'écran
  // pinStart : la scène atteint le haut → le film est épinglé
  // 1 : fin de la scène → la page reprend
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, (v) => {
    const t = clamp01(v / pinStart.current);
    return 24 * (1 - easeInOut(t));
  });
  const scale = useTransform(scrollYProgress, (v) => {
    const ps = pinStart.current;
    const t = clamp01((v - ps) / ((1 - ps) * 0.85));
    return 1 - (1 - endScale.current) * easeInOut(t);
  });
  const glow = useTransform(scrollYProgress, (v) =>
    clamp01(v / pinStart.current),
  );

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

  const film = (
    <div className="group relative w-full">
      {/* Halo pêche / cuivre derrière le film : le fait « ressortir » */}
      <motion.div
        aria-hidden
        style={{ opacity: reduce ? 1 : glow }}
        className="pointer-events-none absolute inset-[-6%] -z-10 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,201,163,0.22),rgba(139,58,26,0.16)_45%,transparent_70%)] blur-3xl"
      />
      <div className={FEATHER}>
        <video
          ref={videoRef}
          className="block aspect-video w-full"
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
      {/* Ombre portée au sol : profondeur 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 h-16 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/60 blur-3xl"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mettre le film en pause" : "Lire le film"}
        className={`btn-glass absolute right-[8%] bottom-[10%] flex size-10 items-center justify-center rounded-full text-foreground transition-opacity duration-300 ${
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
  );

  if (reduce) {
    return (
      <div className="relative z-10 mx-auto mt-12 w-full max-w-4xl px-4">
        {film}
      </div>
    );
  }

  return (
    <div
      ref={stageRef}
      // La scène chevauche le bas du texte (marge négative = espace vide au-dessus
      // du film centré) : pointer-events-none pour laisser les boutons cliquables.
      className="pointer-events-none relative z-10"
      style={{
        height: `${isMobile ? STAGE_VH.mobile : STAGE_VH.desktop}vh`,
        marginTop: `calc(min(0px, (${FILM_WIDTH} * 0.5625 - 100svh) / 2) - 1rem)`,
      }}
    >
      <div className="sticky top-0 flex h-svh items-center justify-center [perspective:1400px]">
        <motion.div
          style={{ rotateX, scale, width: FILM_WIDTH, transformOrigin: "50% 100%" }}
          className="pointer-events-auto will-change-transform max-md:!w-[94vw]"
        >
          {film}
        </motion.div>
      </div>
    </div>
  );
}
