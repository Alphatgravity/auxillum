"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconCheck, IconSparkles } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/data";

function Price({ value }: { value: number | null }) {
  return (
    <div className="relative flex h-11 items-end">
      <span
        className={cn(
          "block font-heading font-bold tracking-tight tabular-nums",
          value === null ? "text-4xl" : "text-5xl",
        )}
      >
        {value === null ? "Sur devis" : `${value}€`}
      </span>
    </div>
  );
}

export function PricingTable() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <div key={plan.name} className="relative flex">
            {/* Halo conique rotatif — SIBLING de la carte (pas enfant) : le
                transform du survol (whileHover y) transforme la carte en
                contexte d'empilement, ce qui faisait « sauter » le halo à
                l'intérieur de la carte. En sibling, l'aura reste stable. */}
            {plan.featured && (
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 -z-10 opacity-70"
              >
                <div className="animate-spin-slow absolute inset-0 rounded-[2.2rem] bg-[conic-gradient(from_0deg,var(--brand),var(--brand-3),var(--brand-2),var(--brand))] blur-2xl" />
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={cn(
                "group/plan relative flex w-full flex-col rounded-3xl p-8",
                plan.featured
                  ? "glass-panel ring-1 ring-brand/40"
                  : "glass-panel",
              )}
            >
            {plan.featured && (
              <motion.div
                initial={{ y: -6, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="btn-brand absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-lg"
              >
                <IconSparkles className="size-3.5" />
                Recommandé
              </motion.div>
            )}

            <h3 className="font-heading text-xl font-semibold">{plan.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {plan.description}
            </p>

            <div className="mt-6 flex items-end gap-1.5">
              <Price value={plan.price} />
              {plan.price !== null && (
                <span className="mb-1 text-sm text-muted-foreground">
                  HT /mois
                </span>
              )}
            </div>
            <p className="mt-1 h-4 text-xs text-brand">
              {plan.price !== null ? "Par agence · sans engagement" : "Adapté à la taille de votre réseau"}
            </p>

            <Button
              render={
                <Link href={plan.href} />
              }
              className={cn("mt-6 h-11", plan.featured ? "btn-brand" : "")}
              variant={plan.featured ? "default" : "outline"}
            >
              {plan.cta}
            </Button>

            <ul className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ring-1",
                      plan.featured
                        ? "bg-brand/20 text-brand ring-brand/30"
                        : "bg-secondary text-foreground ring-border",
                    )}
                  >
                    <IconCheck className="size-3.5" />
                  </span>
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
            </motion.div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Mise en service : 300 € HT par agence — paramétrage, import de vos
        modèles et formation d&apos;une heure.
      </p>
    </div>
  );
}
