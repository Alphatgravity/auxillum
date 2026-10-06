import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { steps } from "@/lib/data";

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Comment ça marche"
          title="L'IA propose, vous décidez"
          subtitle="Auxillum s'occupe de la saisie et des formulaires. Le regard, le conseil et la décision restent les vôtres."
        />
        <StaggerContainer className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute top-8 left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {steps.map((step) => (
            <StaggerItem key={step.number} className="relative">
              <div className="flex flex-col items-start">
                <div className="relative z-10 flex size-16 items-center justify-center rounded-2xl border border-brand/30 bg-card font-heading text-xl font-bold text-brand shadow-lg shadow-brand/10">
                  {step.number}
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
