import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  FeatureVisual,
  type FeatureVisualVariant,
} from "@/components/sections/feature-visual";
import { features } from "@/lib/data";

const spans = [
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-1",
];

// Un visuel animé par carte (les objets en verre sur les grandes cartes).
const visuals: FeatureVisualVariant[] = [
  "flame",
  "pipeline",
  "chart",
  "document",
  "radar",
  "calendar",
];

export function FeaturesBento() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Fonctionnalités"
          title="Tout le dossier, préparé avec vous"
          subtitle="Pas un chatbot générique : un copilote qui connaît le dossier en cours, les démarches et le ton juste face à une famille endeuillée."
        />
        <div className="mt-14">
          <BentoGrid>
            {features.slice(0, 6).map((feature, i) => {
              const Icon = feature.icon;
              return (
                <BentoGridItem
                  key={feature.title}
                  index={i}
                  className={spans[i]}
                  title={feature.title}
                  description={feature.description}
                  icon={
                    <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand-2/10 text-brand ring-1 ring-brand/20">
                      <Icon className="size-5" />
                    </div>
                  }
                  header={
                    <div className="relative h-full min-h-24 flex-1">
                      <FeatureVisual variant={visuals[i]} />
                    </div>
                  }
                />
              );
            })}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
