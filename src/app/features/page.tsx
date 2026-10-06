import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CTASection } from "@/components/sections/cta";
import { features } from "@/lib/data";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Découvrez toutes les fonctionnalités d'Auxillum : assistant réglementaire, check-lists de démarches, rédaction assistée, documents pré-remplis, assistant familles.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fonctionnalités"
        title={
          <>
            Un copilote <span className="text-gradient-brand">complet</span>{" "}
            pour votre agence
          </>
        }
        subtitle="De l'entretien avec la famille au devis conforme, Auxillum prend en charge ce qui vous éloigne de l'essentiel."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title}>
                  <div className="group h-full rounded-2xl glass-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand-2/10 text-brand ring-1 ring-brand/20 transition-transform group-hover:scale-105">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <HowItWorks />
      <CTASection />
    </>
  );
}
