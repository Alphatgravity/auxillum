import { Hero } from "@/components/sections/hero";
import { LogosStrip } from "@/components/sections/logos";
import { FeaturesBento } from "@/components/sections/features-bento";
import { HowItWorks } from "@/components/sections/how-it-works";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingTable } from "@/components/sections/pricing-table";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqSection } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <LogosStrip />
      <FeaturesBento />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
      <section className="py-20">
        <SectionHeading
          eyebrow="Tarifs"
          title="Un prix qui se rembourse en quelques heures"
          subtitle="Abonnement mensuel par agence, sans engagement. Deux à trois heures gagnées par mois suffisent à le rentabiliser."
        />
        <div className="mt-14">
          <PricingTable />
        </div>
      </section>
      <FaqSection />
      <CTASection />
    </>
  );
}
