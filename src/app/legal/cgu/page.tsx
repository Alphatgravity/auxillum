import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "CGU / CGV",
  description: "Conditions générales d'utilisation et de vente d'Auxillum.",
};

export default function CguPage() {
  return (
    <LegalLayout
      title="Conditions générales"
      updatedAt="20 juillet 2026"
      sections={[
        {
          heading: "1. Objet",
          body: [
            `Les présentes conditions générales régissent l'utilisation du service ${site.name}, assistant d'intelligence artificielle destiné aux opérateurs funéraires habilités.`,
          ],
        },
        {
          heading: "2. Abonnement et programme pilote",
          body: [
            "Le service est proposé sous forme d'abonnement mensuel par agence, sans engagement de durée, avec des frais de mise en service. Les agences retenues pour le programme pilote bénéficient de 3 mois offerts, à l'issue desquels elles peuvent souscrire une offre payante.",
          ],
        },
        {
          heading: "3. Tarifs et paiement",
          body: [
            "Les tarifs en vigueur sont indiqués sur la page Tarifs. Le paiement s'effectue par carte bancaire via un prestataire de paiement sécurisé. Les abonnements sont reconduits tacitement.",
          ],
        },
        {
          heading: "4. Résiliation",
          body: [
            "L'utilisateur peut résilier son abonnement à tout moment depuis son espace client. La résiliation prend effet à la fin de la période en cours, sans remboursement au prorata.",
          ],
        },
        {
          heading: "5. Disponibilité du service",
          body: [
            "L'éditeur s'engage à fournir ses meilleurs efforts pour assurer une disponibilité du service de 99,9 %. Des interruptions pour maintenance peuvent néanmoins survenir.",
          ],
        },
        {
          heading: "6. Droit applicable",
          body: [
            "Les présentes conditions sont soumises au droit français. Tout litige relève de la compétence des tribunaux français.",
          ],
        },
      ]}
    />
  );
}
