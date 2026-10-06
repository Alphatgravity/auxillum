import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Auxillum.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      title="Mentions légales"
      updatedAt="20 juillet 2026"
      sections={[
        {
          heading: "1. Éditeur du site",
          body: [
            `Le site ${site.name} est édité par ${site.name} SAS, société au capital de 10 000 €, immatriculée au RCS de Paris sous le numéro XXX XXX XXX.`,
            `Siège social : ${site.address}. Adresse e-mail : ${site.email}. Téléphone : ${site.phone}.`,
          ],
        },
        {
          heading: "2. Directeur de la publication",
          body: [
            "Le directeur de la publication est le représentant légal de la société.",
          ],
        },
        {
          heading: "3. Hébergement",
          body: [
            "Le site est hébergé par un prestataire situé dans l'Union européenne. Les coordonnées de l'hébergeur sont disponibles sur demande.",
          ],
        },
        {
          heading: "4. Propriété intellectuelle",
          body: [
            `L'ensemble des contenus présents sur le site ${site.name} (textes, images, logos, code) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de l'éditeur.`,
            "Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.",
          ],
        },
        {
          heading: "5. Responsabilité",
          body: [
            "L'éditeur s'efforce d'assurer l'exactitude des informations diffusées mais ne saurait être tenu responsable des erreurs ou omissions, ni de l'utilisation qui pourrait en être faite.",
          ],
        },
      ]}
    />
  );
}
