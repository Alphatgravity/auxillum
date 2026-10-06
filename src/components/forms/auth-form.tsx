"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconLoader2, IconBrandGoogle, IconBrandApple } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // À brancher sur votre backend d'authentification
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <motion.div
      className="mx-auto w-full max-w-sm"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={staggerItem}
        className="font-heading text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {isSignup ? "Créez votre compte" : "Bon retour parmi nous"}
      </motion.h1>
      <motion.p variants={staggerItem} className="mt-2 text-sm text-muted-foreground">
        {isSignup
          ? "Programme pilote : 3 mois offerts, sans carte bancaire."
          : "Connectez-vous pour accéder à votre espace Auxillum."}
      </motion.p>

      <div className="mt-8 flex flex-col gap-3">
        <motion.div variants={staggerItem} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.985 }}>
          <Button variant="outline" className="h-11 w-full gap-2" type="button">
            <IconBrandGoogle className="size-4" />
            Continuer avec Google
          </Button>
        </motion.div>
        <motion.div variants={staggerItem} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.985 }}>
          <Button variant="outline" className="h-11 w-full gap-2" type="button">
            <IconBrandApple className="size-[18px]" />
            Continuer avec Apple
          </Button>
        </motion.div>
      </div>

      <motion.div variants={staggerItem} className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou par e-mail</span>
        <span className="h-px flex-1 bg-border" />
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignup && (
          <motion.div variants={staggerItem} className="flex flex-col gap-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" name="name" placeholder="Camille Laurent" required />
          </motion.div>
        )}
        <motion.div variants={staggerItem} className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="contact@votre-agence.fr"
            required
          />
        </motion.div>
        <motion.div variants={staggerItem} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            {!isSignup && (
              <Link
                href="/login"
                className="text-xs text-brand hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </motion.div>
        <motion.div variants={staggerItem} whileTap={{ scale: 0.99 }}>
          <Button
            type="submit"
            disabled={loading}
            className="mt-2 h-11 w-full btn-brand"
          >
            {loading ? (
              <IconLoader2 className="size-4 animate-spin" />
            ) : isSignup ? (
              "Rejoindre le programme pilote"
            ) : (
              "Se connecter"
            )}
          </Button>
        </motion.div>
      </form>

      <motion.p
        variants={staggerItem}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        {isSignup ? "Déjà un compte ? " : "Pas encore de compte ? "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-brand hover:underline"
        >
          {isSignup ? "Se connecter" : "Créer un compte"}
        </Link>
      </motion.p>
    </motion.div>
  );
}
