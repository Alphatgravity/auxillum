import type { Metadata } from "next";
import {
  IconMail,
  IconMapPin,
  IconPhone,
  IconClock,
} from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'équipe Auxillum. Une question, une démo, une envie de devenir agence pilote ? Nous vous répondons rapidement.",
};

const infos = [
  { icon: IconMail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { icon: IconPhone, label: "Téléphone", value: site.phone, href: `tel:${site.phone}` },
  { icon: IconMapPin, label: "Adresse", value: site.address },
  { icon: IconClock, label: "Horaires", value: "Lun — Ven, 9h à 18h" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Parlons de votre <span className="text-gradient-brand">agence</span>
          </>
        }
        subtitle="Une question sur Auxillum, une démo ou le programme pilote ? Nous vous répondons rapidement."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-heading text-2xl font-semibold">
                  Nos coordonnées
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Écrivez-nous ou passez nous voir. Nous répondons généralement
                  en moins de 24 heures ouvrées.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {infos.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex h-full items-start gap-4 rounded-2xl glass-panel p-5 transition-colors hover:border-brand/40">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{info.label}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={info.label} href={info.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={info.label}>{content}</div>
                  );
                })}
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl glass-panel">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 rounded-full glass-panel/80 px-4 py-2 text-sm backdrop-blur">
                    <IconMapPin className="size-4 text-brand" />
                    {site.address}
                  </div>
                </div>
                <div className="absolute -bottom-10 left-1/2 size-40 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
