import { PageHeader } from "@/components/layout/page-header";

export type LegalSection = { heading: string; body: string[] };

export function LegalLayout({
  title,
  updatedAt,
  sections,
}: {
  title: string;
  updatedAt: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow="Légal" title={title} />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {updatedAt}
          </p>
          <div className="mt-6 rounded-lg border border-border bg-card/50 p-4 text-sm text-muted-foreground">
            ⚠️ Ce texte est un modèle générique fourni à titre indicatif. Faites-le
            valider par un professionnel du droit avant publication.
          </div>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-heading text-xl font-semibold">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-muted-foreground">
                  {section.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
