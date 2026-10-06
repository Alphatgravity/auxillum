"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulation d'envoi — à brancher sur votre API / service e-mail
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <div className="relative rounded-3xl glass-panel p-6 sm:p-8">
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
              Message envoyé !
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Merci de nous avoir contactés. Notre équipe vous répondra dans les
              plus brefs délais.
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
            <motion.div variants={staggerItem} className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" name="firstName" placeholder="Claire" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" name="lastName" placeholder="Martin" required />
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
              <Label htmlFor="company">Agence</Label>
              <Input id="company" name="company" placeholder="Nom de votre agence" />
            </motion.div>
            <motion.div variants={staggerItem} className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Comment pouvons-nous vous aider ?"
                required
              />
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
                  "Envoyer le message"
                )}
              </Button>
            </motion.div>
            <motion.p
              variants={staggerItem}
              className="text-center text-xs text-muted-foreground"
            >
              En envoyant ce formulaire, vous acceptez notre politique de
              confidentialité.
            </motion.p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
