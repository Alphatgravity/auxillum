import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des données d'Auxillum.",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      updatedAt="20 juillet 2026"
      sections={[
        {
          heading: "1. Responsable du traitement",
          body: [
            `${site.name} SAS est responsable du traitement des données personnelles collectées via le site et l'application. Pour toute question : ${site.email}.`,
          ],
        },
        {
          heading: "2. Données collectées",
          body: [
            "Nous collectons les données que vous nous fournissez (nom, e-mail, téléphone, informations d'agence) ainsi que des données d'usage à des fins d'amélioration du service.",
          ],
        },
        {
          heading: "3. Finalités",
          body: [
            "Les données sont utilisées pour la fourniture du service, la gestion de votre compte, le support client, et, avec votre consentement, l'envoi d'informations commerciales.",
          ],
        },
        {
          heading: "4. Conformité RGPD",
          body: [
            "Conformément au Règlement Général sur la Protection des Données, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition sur vos données.",
            `Pour exercer ces droits, contactez-nous à ${site.email}.`,
          ],
        },
        {
          heading: "5. Hébergement et sécurité",
          body: [
            "Vos données sont hébergées au sein de l'Union européenne et chiffrées. Nous mettons en œuvre des mesures techniques et organisationnelles pour en assurer la sécurité.",
          ],
        },
        {
          heading: "6. Cookies",
          body: [
            "Le site utilise des cookies strictement nécessaires à son fonctionnement ainsi que, sous réserve de votre consentement, des cookies de mesure d'audience.",
          ],
        },
      ]}
    />
  );
}
