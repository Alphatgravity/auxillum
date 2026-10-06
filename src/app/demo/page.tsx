import type { Metadata } from "next";
import { IconCheck } from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { DemoForm } from "@/components/forms/demo-form";
import { CopilotPreview } from "@/components/sections/copilot-preview";
import { CTASection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Démo",
  description:
    "Réservez une démo de 15 minutes d'Auxillum sur un vrai dossier anonymisé.",
};

const benefits = [
  "15 minutes, sur un vrai dossier anonymisé",
  "Check-list, documents et rédaction en direct",
  "Vos questions sur l'intégration à votre logiciel",
  "Aucun engagement, 100 % gratuit",
];

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Démo"
        title={
          <>
            Voyez Auxillum <span className="text-gradient-brand">en action</span>
          </>
        }
        subtitle="Auxillum s'ouvre à côté de votre logiciel : vous lui parlez, il remplit le dossier. Vous n'avez plus qu'à vérifier."
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <CopilotPreview />
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Une démo pensée pour{" "}
                <span className="text-gradient-brand">votre métier</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Nous connaissons le quotidien des conseillers funéraires. La démo
                montre concrètement comment Auxillum s&apos;intègre à votre façon
                de travailler.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <IconCheck className="size-4" />
                    </span>
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal direction="right">
            <DemoForm />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
