import type { Metadata } from "next";
import { IconTargetArrow, IconHeartHandshake, IconBolt } from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { AnimatedTooltip } from "@/components/aceternity/animated-tooltip";
import { StatsSection } from "@/components/sections/stats";
import { CTASection } from "@/components/sections/cta";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Auxillum est né d'une conviction : chaque heure rendue à un conseiller funéraire est une heure de plus pour les familles.",
};

const values = [
  {
    icon: IconTargetArrow,
    title: "L'humain valide toujours",
    description:
      "L'IA propose, le conseiller décide. Aucun document ne part sans votre relecture.",
  },
  {
    icon: IconHeartHandshake,
    title: "La confiance avant tout",
    description:
      "Hébergement en UE, cloisonnement par agence, journal de chaque action de l'IA. La cause du décès n'est jamais stockée.",
  },
  {
    icon: IconBolt,
    title: "Un ton juste",
    description:
      "Sobre et respectueux, toujours. Auxillum ne pousse jamais d'option payante auprès des familles.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title={
          <>
            Rendre du temps{" "}
            <span className="text-gradient-brand">à ceux qui accompagnent</span>
          </>
        }
        subtitle="Notre mission : alléger la charge administrative des conseillers funéraires, pour qu'ils se consacrent davantage aux familles."
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <StaggerContainer className="prose-invert space-y-6 text-lg text-muted-foreground">
            <StaggerItem>
              <p>
                Auxillum est né d&apos;un constat simple : un conseiller
                funéraire passe une grande partie de chaque dossier à ressaisir
                les mêmes informations, remplir des formulaires et relancer —
                le tout dans un délai légal de six jours.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                Nous construisons, avec des professionnels du secteur,{" "}
                <span className="font-medium text-foreground">
                  un copilote qui connaît vraiment le métier
                </span>{" "}
                : le dossier en cours, les démarches mairie et préfecture, le
                devis modèle et le ton juste.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                Nous commençons avec cinq agences pilotes indépendantes, pour
                mesurer le temps réellement gagné. Et ce n&apos;est que le
                début.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <StatsSection />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Nos valeurs
            </h2>
          </Reveal>
          <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand-2/10 text-brand ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              L&apos;équipe Auxillum
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Une équipe resserrée, entourée de professionnels du funéraire.
            </p>
          </Reveal>
          <div className="mt-12 flex items-center justify-center">
            <AnimatedTooltip items={team} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
