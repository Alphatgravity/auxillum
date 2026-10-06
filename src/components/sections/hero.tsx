"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconPlayerPlay,
  IconShieldCheck,
  IconMapPin,
  IconUserCheck,
} from "@tabler/icons-react";
import { Spotlight } from "@/components/aceternity/spotlight";
import { HeroObjects } from "@/components/sections/hero-objects";
import { HeroFilm } from "@/components/sections/hero-film";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-clip pt-24">
      {/* Backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="var(--brand)" />
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]" />
      {/* Lueur cuivrée, en écho au dégradé de la planche de marque */}
      <div className="pointer-events-none absolute top-[28rem] -right-32 size-[36rem] rounded-full bg-[#8b3a1a]/25 blur-[150px]" />

      {/* Objets en verre Auxillum orbitant sur toute la hauteur du hero */}
      <HeroObjects />

      <div className="relative z-30 flex flex-col items-center pt-6">
        {/* Vignette pour la lisibilité du texte par-dessus la 3D */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[38rem] w-[52rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-background/45 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm backdrop-blur-md transition-colors hover:border-brand/50"
            >
              <span className="flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-xs font-semibold text-brand">
                Pilote
              </span>
              <span className="text-muted-foreground">
                5 agences pilotes · 3 mois offerts
              </span>
              <IconArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl"
          >
            Moins de paperasse, plus de temps pour{" "}
            <span className="text-gradient-brand">les familles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg"
          >
            Auxillum est le copilote IA des pompes funèbres. Branché sur votre
            logiciel métier, il prépare vos dossiers obsèques en deux fois moins de
            temps, sans erreur réglementaire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button
              render={<Link href="/signup" />}
              size="lg"
              className="group btn-brand h-12 px-7"
            >
              Rejoindre le programme pilote
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              render={<Link href="/demo" />}
              size="lg"
              variant="outline"
              className="h-12 gap-2 px-7 backdrop-blur-md"
            >
              <IconPlayerPlay className="size-4" />
              Voir la démo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          >
            {[
              { icon: IconUserCheck, label: "L'IA propose, vous validez" },
              { icon: IconShieldCheck, label: "Devis modèle 2025 intégré" },
              { icon: IconMapPin, label: "Hébergé en Union européenne" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon className="size-4 text-brand" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Film produit en 3D, qui rétrécit au scroll */}
      <HeroFilm />

    </section>
  );
}
