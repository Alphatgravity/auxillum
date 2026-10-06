import { Reveal } from "@/components/motion/reveal";

// Engagements de conformité (pas de faux logos clients avant les pilotes).
const partners = [
  "Hébergement UE",
  "RGPD",
  "AI Act · art. 50",
  "Devis modèle 2025",
  "Zéro rétention IA",
];

export function LogosStrip() {
  return (
    <section className="border-y border-border/60 bg-card/30 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-sm text-muted-foreground">
            Conforme dès la conception
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {partners.map((partner, i) => (
            <Reveal key={partner} delay={i * 0.05}>
              <span className="font-heading text-lg font-semibold text-muted-foreground/70 grayscale transition hover:text-foreground md:text-xl">
                {partner}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
