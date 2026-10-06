import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/aceternity/meteors";
import { Reveal } from "@/components/motion/reveal";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-background px-6 py-16 text-center md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <Meteors number={16} />
          <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
              Plus de temps pour{" "}
              <span className="text-gradient-brand">les familles</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Nous accueillons 5 agences pilotes : 3 mois offerts en échange de
              vos retours. Démo de 15 minutes sur un vrai dossier anonymisé.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={<Link href="/signup" />}
                size="lg"
                className="group btn-brand h-12 px-7"
              >
                Devenir agence pilote
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                render={<Link href="/demo" />}
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                Demander une démo
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
