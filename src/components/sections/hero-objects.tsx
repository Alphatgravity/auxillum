"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTime,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { asset } from "@/lib/asset";

// -----------------------------------------------------------------------------
// Objets en verre dispersif Auxillum (rendus Blender : flamme, bulle, document,
// étincelle IA) orbitant derrière le titre du hero.
// - Orbite continue sur une ellipse plus large que le bloc titre (~40-60s/tour)
// - Profondeur : les objets "devant" (bas de l'ellipse) sont plus grands,
//   plus nettes et plus opaques ; celles "derrière" plus petites et floutées.
// - Parallaxe souris marquée, amplitude propre à chaque objet (ressort).
// - Fuite au survol : l'objet s'écarte du curseur, dans toutes les directions.
// - Derrière le texte (z), pointer-events:none, aucun layout shift.
// - prefers-reduced-motion : orbite figée + pas de parallaxe.
// - Mobile : 3 objets max, parallaxe désactivée.
// -----------------------------------------------------------------------------

const TWO_PI = Math.PI * 2;

type ObjectDef = {
  id: string;
  src: string;
  /** Taille de base en px (80-160). */
  size: number;
  /** Angle de départ sur l'ellipse (rad). */
  phase: number;
  /** Durée d'un tour en ms (~40-60s). */
  period: number;
  /** Amplitude de parallaxe en px (propre à chaque objet → profondeur). */
  parallax: number;
};

// Ordre = priorité d'affichage. Les 3 premières servent aussi au mobile.
// parallax = amplitude (px) de suivi de la souris — plus l'objet est
// grande/« proche », plus elle suit la souris (effet de profondeur).
const OBJECTS: ObjectDef[] = [
  { id: "flamme", src: asset("/objets/flamme.png"), size: 160, phase: 0.0, period: 52000, parallax: 52 },
  { id: "bulle", src: asset("/objets/bulle.png"), size: 128, phase: 2.094, period: 47000, parallax: 40 },
  { id: "document", src: asset("/objets/document.png"), size: 116, phase: 4.189, period: 55000, parallax: 30 },
  { id: "etincelle", src: asset("/objets/etincelle.png"), size: 120, phase: 1.10, period: 49000, parallax: 46 },
  { id: "flamme-bleue", src: asset("/objets/flamme-bleue.png"), size: 104, phase: 3.30, period: 58000, parallax: 24 },
];

// Intensité de la parallaxe souris (multiplie l'amplitude propre à chaque objet).
const PARALLAX_BOOST = 1.6;

// Fuite au survol : distance max (px) à laquelle un objet peut s'écarter, et
// délai minimal entre deux poussées pour laisser le ressort réagir.
const EVADE_MAX = 220;
const EVADE_COOLDOWN = 220;
// Retour progressif à sa place quand la souris ne le dérange plus.
const EVADE_RESET = 1800;

const noopSubscribe = () => () => {};

// Demi-hauteur de l'orbite : proportionnelle à la hauteur du hero entier.
const ryFor = (height: number, mobile: boolean) =>
  mobile ? clamp(height * 0.3, 150, 420) : clamp(height * 0.36, 180, 560);

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

type Ellipse = { rx: number; ry: number };

function GlassObject({
  def,
  index,
  count,
  time,
  px,
  py,
  ellipseRef,
  animate,
  evade,
}: {
  def: ObjectDef;
  index: number;
  count: number;
  time: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  ellipseRef: RefObject<Ellipse>;
  animate: boolean;
  evade: boolean;
}) {
  // Phase répartie régulièrement selon le nombre réel d'objets affichés.
  const phase = def.phase + (index / count) * TWO_PI * 0.15;

  const angleAt = (t: number) =>
    animate ? phase + (t / def.period) * TWO_PI : phase;

  // Profondeur 0..1 : 1 = devant (bas de l'ellipse, plus proche du spectateur).
  const depthAt = (t: number) => (Math.sin(angleAt(t)) + 1) / 2;

  // Résolution intrinsèque = taille au plus près (scale max) → objet net.
  const intrinsic = Math.round(def.size * 1.18);

  // Décalage de fuite (ressort vif) ajouté à l'orbite et à la parallaxe.
  const nodeRef = useRef<HTMLDivElement>(null);
  const evadeXRaw = useMotionValue(0);
  const evadeYRaw = useMotionValue(0);
  const evadeSpring = { stiffness: 140, damping: 15, mass: 0.6 } as const;
  const ex = useSpring(evadeXRaw, evadeSpring);
  const ey = useSpring(evadeYRaw, evadeSpring);

  const x = useTransform([time, px, ex], ([t, mx, e]: number[]) => {
    return (
      Math.cos(angleAt(t)) * ellipseRef.current.rx +
      mx * def.parallax * PARALLAX_BOOST +
      e
    );
  });
  const y = useTransform([time, py, ey], ([t, my, e]: number[]) => {
    return (
      Math.sin(angleAt(t)) * ellipseRef.current.ry +
      my * def.parallax * PARALLAX_BOOST * 0.75 +
      e
    );
  });

  // Quand la souris s'approche, l'objet est poussé à l'opposé (avec un angle
  // un peu aléatoire) : impossible de garder le curseur dessus.
  useEffect(() => {
    if (!evade) return;
    let lastPush = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    const onMove = (e: PointerEvent) => {
      const node = nodeRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const dx = r.left + r.width / 2 - e.clientX;
      const dy = r.top + r.height / 2 - e.clientY;
      const dist = Math.hypot(dx, dy);
      const radius = r.width * 0.55 + 50;
      const now = performance.now();
      if (dist > radius || now - lastPush < EVADE_COOLDOWN) return;
      lastPush = now;
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.6;
      const amount = 80 + 90 * (1 - dist / radius);
      evadeXRaw.set(
        clamp(evadeXRaw.get() + Math.cos(angle) * amount, -EVADE_MAX, EVADE_MAX),
      );
      evadeYRaw.set(
        clamp(evadeYRaw.get() + Math.sin(angle) * amount, -EVADE_MAX, EVADE_MAX),
      );
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        evadeXRaw.set(0);
        evadeYRaw.set(0);
      }, EVADE_RESET);
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      clearTimeout(resetTimer);
    };
  }, [evade, evadeXRaw, evadeYRaw]);
  const scale = useTransform(time, (t) => {
    const d = depthAt(t);
    return (0.82 + d * 0.36) / 1.18;
  });
  const opacity = useTransform(time, (t) => 0.55 + depthAt(t) * 0.45);
  const filter = useTransform(time, (t) => {
    const blur = (1 - depthAt(t)) * 2.6;
    return `drop-shadow(0 10px 26px rgba(255,201,163,0.18)) blur(${blur.toFixed(2)}px)`;
  });
  const rotate = useTransform(time, (t) =>
    animate ? Math.sin(angleAt(t) + phase) * 4 : 0,
  );
  const zIndex = useTransform(time, (t) => Math.round(depthAt(t) * 20));

  return (
    <motion.div
      aria-hidden
      className="absolute top-1/2 left-1/2"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex,
      }}
    >
      <motion.div ref={nodeRef} style={{ scale, opacity, filter, rotate }}>
        <Image
          src={def.src}
          alt=""
          width={intrinsic}
          height={intrinsic}
          sizes={`${intrinsic}px`}
          className="select-none"
          draggable={false}
          priority={index < 2}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroObjects() {
  const reduce = useReducedMotion();
  // Vrai uniquement côté navigateur (évite tout décalage d'hydratation).
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [isMobile, setIsMobile] = useState(false);

  // Rayons d'ellipse dans une ref → lus par les transforms sans les recréer.
  const ellipseRef = useRef<Ellipse>({ rx: 480, ry: 210 });
  // Hauteur réelle du hero (texte + film) : l'orbite couvre toute la section.
  const heightRef = useRef(0);
  const mobileRef = useRef(false);
  const observerRef = useRef<ResizeObserver | null>(null);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      heightRef.current = node.offsetHeight;
      ellipseRef.current = {
        ...ellipseRef.current,
        ry: ryFor(node.offsetHeight, mobileRef.current),
      };
    });
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  const time = useTime();
  const pxRaw = useMotionValue(0);
  const pyRaw = useMotionValue(0);
  const spring = { stiffness: 60, damping: 20, mass: 0.8 } as const;
  const px = useSpring(pxRaw, spring);
  const py = useSpring(pyRaw, spring);

  // Dimensionnement de l'ellipse (plus large que le bloc titre max-w-4xl).
  // Le breakpoint « mobile » suit matchMedia — même signal que le `md:` de
  // Tailwind — pour rester cohérent avec la mise en page CSS.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const compute = () => {
      const mobile = mql.matches;
      const vw = window.innerWidth;
      mobileRef.current = mobile;
      setIsMobile(mobile);
      ellipseRef.current = {
        rx: clamp(vw * (mobile ? 0.42 : 0.42), mobile ? 150 : 320, 620),
        ry: ryFor(heightRef.current || window.innerHeight, mobile),
      };
    };
    compute();
    mql.addEventListener("change", compute);
    window.addEventListener("resize", compute);
    return () => {
      mql.removeEventListener("change", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const animate = !reduce;
  const enableParallax = mounted && !reduce && !isMobile;

  // Parallaxe : position souris normalisée -1..1 (lissée par les ressorts).
  useEffect(() => {
    if (!enableParallax) {
      pxRaw.set(0);
      pyRaw.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      pxRaw.set((e.clientX / window.innerWidth - 0.5) * 2);
      pyRaw.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [enableParallax, pxRaw, pyRaw]);

  if (!mounted) return null;

  const count = isMobile ? 3 : OBJECTS.length;
  const objects = OBJECTS.slice(0, count);

  return (
    // Pas de contexte d'empilement (pas d'isolate) : le zIndex de chaque objet
    // le place devant le film (z-10) au premier plan, toujours sous le texte (z-30).
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {objects.map((def, i) => (
        // key inclut le mode → remontage propre si mobile/reduced change
        // (garantit un ordre de hooks stable dans chaque GlassObject).
        <GlassObject
          key={`${def.id}-${count}-${animate ? "a" : "s"}`}
          def={def}
          index={i}
          count={count}
          time={time}
          px={px}
          py={py}
          ellipseRef={ellipseRef}
          animate={animate}
          evade={enableParallax}
        />
      ))}
    </div>
  );
}
