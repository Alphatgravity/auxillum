import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PricingTable } from "@/components/sections/pricing-table";
import { FaqSection } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Des offres simples par agence, sans engagement : Essentiel, Pro et Réseau.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tarifs"
        title={
          <>
            Un prix <span className="text-gradient-brand">juste</span> pour
            chaque agence
          </>
        }
        subtitle="Tarifs HT par agence et par mois. Sans engagement de durée, changez d'offre quand vous voulez."
      />
      <section className="py-20">
        <PricingTable />
      </section>
      <FaqSection />
      <CTASection />
    </>
  );
}
