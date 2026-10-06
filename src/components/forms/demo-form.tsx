"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { staggerContainer, staggerItem } from "@/lib/motion";

const teamSizes = ["1 agence", "2 à 5 agences", "6 à 20 agences", "Réseau"];

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [size, setSize] = useState(teamSizes[1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <div className="relative rounded-3xl glass-panel p-6 sm:p-8">
      <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="flex size-16 items-center justify-center rounded-full bg-brand/15 text-brand">
              <IconCheck className="size-8" />
            </div>
            <h3 className="mt-5 font-heading text-xl font-semibold">
              Demande envoyée !
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Nous vous rappelons sous 24 h pour planifier votre démo de 15
              minutes.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <motion.h3
              variants={staggerItem}
              className="font-heading text-xl font-semibold"
            >
              Réservez votre démo gratuite
            </motion.h3>
            <motion.div variants={staggerItem} className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" name="name" placeholder="Claire Martin" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="06 12 34 56 78" />
              </div>
            </motion.div>
            <motion.div variants={staggerItem} className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail professionnel</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="contact@votre-agence.fr"
                required
              />
            </motion.div>
            <motion.div variants={staggerItem} className="flex flex-col gap-2">
              <Label>Taille de votre structure</Label>
              <div className="grid grid-cols-2 gap-2">
                {teamSizes.map((s) => (
                  <motion.button
                    type="button"
                    key={s}
                    onClick={() => setSize(s)}
                    whileTap={{ scale: 0.97 }}
                    className={
                      "rounded-lg border px-3 py-2 text-sm transition-colors " +
                      (size === s
                        ? "border-brand bg-brand/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-brand/40")
                    }
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            <motion.div variants={staggerItem} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                disabled={status === "loading"}
                className="h-11 w-full btn-brand"
              >
                {status === "loading" ? (
                  <>
                    <IconLoader2 className="size-4 animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  "Demander ma démo"
                )}
              </Button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
