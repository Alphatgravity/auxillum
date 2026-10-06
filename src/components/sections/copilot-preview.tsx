"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  IconArrowRight,
  IconCalendar,
  IconFileInvoice,
  IconFilePlus,
  IconFileText,
  IconFolder,
  IconHome,
  IconMail,
  IconMicrophone,
  IconPrinter,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { FlameMark } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Maquette de démo : le logiciel métier de l'agence (fictif) avec, à côté, la
// petite fenêtre Auxillum. Pas de tableau de bord : l'IA agit dans le logiciel.
// À l'apparition, les champs se remplissent un à un après la demande du
// conseiller. prefers-reduced-motion → état final directement.
// -----------------------------------------------------------------------------

type Field = { label: string; value?: string; wide?: boolean };

const identite: Field[] = [
  { label: "Civilité", value: "M." },
  { label: "Nom", value: "Lefèvre" },
  { label: "Prénom(s)", value: "Bernard" },
  { label: "Nom de naissance" },
  { label: "Date de naissance", value: "12/03/1942" },
  { label: "Lieu de naissance", value: "Saint-Étienne" },
];

const situation: Field[] = [
  { label: "Profession", value: "Professeur de mathématiques" },
  { label: "Situation familiale", value: "Veuf" },
  { label: "Dernier domicile", value: "8 rue Garibaldi, Lyon 6e", wide: true },
];

const sidebar = [
  {
    title: "Agence",
    items: [
      { label: "Accueil" },
      { label: "Dossiers en cours", count: 4 },
      { label: "Planning" },
      { label: "Funérarium" },
    ],
  },
  {
    title: "Dossiers ouverts",
    items: [
      { label: "LEFÈVRE Bernard", active: true },
      { label: "MARTIN Jeanne" },
      { label: "DUPONT Hélène" },
    ],
  },
];

const tabs = ["Défunt", "Famille", "Décès", "Obsèques", "Formalités", "Documents"];

const ease = [0.22, 1, 0.36, 1] as const;

// Le chat apparaît d'abord, puis les champs se remplissent.
const chat: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.45, delayChildren: 0.3 } },
};
const bubble: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};
const form: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.3 } },
};
const filled: Variants = {
  hidden: { backgroundColor: "#ffffff", borderColor: "#d9dee5" },
  show: {
    backgroundColor: "#fff1e4",
    borderColor: "#f2bf98",
    transition: { duration: 0.35 },
  },
};
const value: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

function FieldBox({ field }: { field: Field }) {
  const isFilled = !!field.value;
  return (
    <div className={cn("flex flex-col gap-1", field.wide && "col-span-2")}>
      <span className="text-[10px] text-[#5b6875]">{field.label}</span>
      <motion.div
        variants={isFilled ? filled : undefined}
        className="flex h-7 items-center justify-between rounded-[3px] border border-[#d9dee5] bg-white px-2 text-[11px] text-[#1d2a36]"
      >
        {isFilled && (
          <>
            <motion.span variants={value} className="truncate">
              {field.value}
            </motion.span>
            <motion.span variants={value}>
              <FlameMark className="h-3 shrink-0 text-[#d9844f]" />
            </motion.span>
          </>
        )}
      </motion.div>
    </div>
  );
}

function Fieldset({ title, fields }: { title: string; fields: Field[] }) {
  return (
    <fieldset className="rounded-[4px] border border-[#dfe3e8] px-3 pt-1 pb-3">
      <legend className="px-1 text-[11px] font-semibold text-[#2a4e62]">
        {title}
      </legend>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3">
        {fields.map((f) => (
          <FieldBox key={f.label} field={f} />
        ))}
      </div>
    </fieldset>
  );
}

export function CopilotPreview() {
  const reduce = useReducedMotion() ?? false;
  const anim = reduce
    ? { initial: "show", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.35 } };

  return (
    <motion.div
      {...anim}
      className="overflow-hidden rounded-2xl border border-border bg-[#eef1f4] shadow-2xl shadow-black/40 lg:flex"
    >
      {/* ----------------------- Logiciel métier de l'agence ----------------------- */}
      <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fa]">
        {/* Barre de titre */}
        <div className="flex h-8 items-center gap-2 bg-[#2a4e62] px-3 text-[11px] text-white">
          <span className="flex size-4 items-center justify-center rounded-[3px] bg-white/90 text-[8px] font-bold text-[#2a4e62]">
            GO
          </span>
          <span className="font-semibold">Gestion Obsèques 7</span>
          <span className="hidden text-white/70 sm:inline">— Pompes Funèbres du Parc</span>
          <span className="ml-auto hidden rounded-sm border border-white/30 px-1.5 font-mono text-[9px] tracking-widest text-white/80 md:inline">
            LOGICIEL DE L&apos;AGENCE
          </span>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-4 border-b border-[#dfe3e8] bg-white px-3 py-1.5 text-[11px] text-[#33414d]">
          {["Fichier", "Dossiers", "Planning", "Stock", "Comptabilité", "Outils", "Aide"].map(
            (m, i) => (
              <span key={m} className={cn(i > 2 && "hidden sm:inline")}>
                {m}
              </span>
            ),
          )}
          <span className="ml-auto flex items-center gap-1 rounded-[3px] border border-[#f2bf98] bg-[#fff1e4] px-2 py-0.5 font-medium text-[#b8633a]">
            <FlameMark className="h-3" />
            Auxillum
          </span>
        </div>

        {/* Barre d'outils */}
        <div className="hidden items-end gap-5 border-b border-[#dfe3e8] bg-white px-4 py-2 text-[10px] text-[#33414d] sm:flex">
          {[
            { icon: IconFilePlus, label: "Nouveau" },
            { icon: IconSearch, label: "Rechercher" },
            { icon: IconCalendar, label: "Planning" },
            { icon: IconFileText, label: "Devis" },
            { icon: IconFileInvoice, label: "Facture" },
            { icon: IconMail, label: "Courrier" },
            { icon: IconPrinter, label: "Imprimer" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex flex-col items-center gap-0.5">
              <Icon className="size-4 text-[#2a4e62]" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Barre latérale */}
          <aside className="hidden w-40 shrink-0 border-r border-[#dfe3e8] bg-[#f1f3f6] py-3 md:block">
            {sidebar.map((group) => (
              <div key={group.title} className="mb-3">
                <p className="px-3 pb-1 text-[9px] font-semibold tracking-wider text-[#5b6875] uppercase">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 text-[11px] text-[#33414d]",
                      "active" in item && item.active && "bg-[#dde6ee] font-medium text-[#1d2a36]",
                    )}
                  >
                    {group.title === "Agence" ? (
                      <IconHome className="size-3 text-[#2a4e62]" />
                    ) : (
                      <IconFolder className="size-3 text-[#2a4e62]" />
                    )}
                    {item.label}
                    {"count" in item && (
                      <span className="ml-auto text-[10px] text-[#5b6875]">{item.count}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </aside>

          {/* Dossier */}
          <div className="min-w-0 flex-1 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-semibold text-[#1d2a36]">LEFÈVRE Bernard</span>
              <span className="font-mono text-[10px] text-[#5b6875]">Dossier 2026-0147</span>
              <span className="rounded-[3px] border border-[#cfd5dc] bg-white px-2 py-0.5 text-[10px] text-[#33414d]">
                En cours
              </span>
              <span className="ml-auto hidden text-[10px] text-[#5b6875] sm:inline">
                Conseiller : C. Morel
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {tabs.map((t, i) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[10px]",
                    i === 0
                      ? "border-[#2a4e62] bg-white font-medium text-[#1d2a36]"
                      : "border-[#cfd5dc] text-[#33414d]",
                    i > 3 && "hidden sm:inline",
                  )}
                >
                  {t}
                </span>
              ))}
            </div>

            <motion.div variants={form} className="mt-4 flex flex-col gap-3">
              <Fieldset title="Identité" fields={identite} />
              <Fieldset title="Situation" fields={situation} />
            </motion.div>
          </div>
        </div>

        {/* Barre d'état */}
        <div className="flex gap-4 border-t border-[#dfe3e8] bg-white px-3 py-1 text-[9px] text-[#5b6875]">
          <span>Utilisateur : C. Morel</span>
          <span className="hidden sm:inline">Agence : Lyon 4e</span>
          <span className="text-[#2f8a5b]">● Base connectée</span>
        </div>
      </div>

      {/* ----------------------------- Fenêtre Auxillum ---------------------------- */}
      <div className="flex w-full flex-col border-t border-[#ecd9c4] bg-[#fdf3e6] lg:w-80 lg:border-t-0 lg:border-l">
        <div className="flex items-start gap-2 px-4 pt-4">
          <FlameMark className="mt-0.5 h-6 text-[#d9844f]" />
          <div>
            <p className="font-heading text-base leading-none font-bold text-[#001c2f]">
              Auxillum
            </p>
            <p className="mt-1 text-[10px] text-[#5b6875]">
              <span className="text-[#2f8a5b]">●</span> Connecté à Gestion Obsèques 7
            </p>
          </div>
          <IconX className="ml-auto size-3.5 text-[#5b6875]" />
        </div>

        <div className="mx-4 mt-3 flex items-center gap-1.5 rounded-md bg-[#f6e6d2] px-2 py-1.5 text-[10px] text-[#33414d]">
          <FlameMark className="h-3 text-[#d9844f]" />
          Dossier actif : <span className="font-semibold">M. Bernard Lefèvre</span> · 2026-0147
        </div>

        <div className="mx-4 mt-3 grid grid-cols-4 rounded-md bg-[#f6e6d2] p-0.5 text-center text-[10px] text-[#33414d]">
          {["Discuter", "Dicter", "Vérifier", "Rédiger"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-[5px] py-1",
                i === 0 && "bg-white font-medium text-[#1d2a36] shadow-sm",
              )}
            >
              {t}
              {t === "Vérifier" && (
                <span className="ml-1 rounded-full bg-[#ffd9bd] px-1 text-[8px] text-[#b8633a]">
                  4
                </span>
              )}
            </span>
          ))}
        </div>

        <motion.div variants={chat} className="flex flex-1 flex-col gap-2.5 px-4 py-4 text-[11px] leading-relaxed">
          <motion.p
            variants={bubble}
            className="max-w-[92%] rounded-lg bg-white px-3 py-2 text-[#33414d] shadow-sm"
          >
            Bonjour. Dites-moi quoi faire, à l&apos;écrit ou au micro. Je peux agir
            dans tout le logiciel : dossiers, planning, devis, formalités…
          </motion.p>
          <motion.p
            variants={bubble}
            className="ml-auto max-w-[88%] rounded-lg bg-[#2a4e62] px-3 py-2 text-white"
          >
            Remplis le dossier Lefèvre avec la dictée de ce matin
          </motion.p>
          <motion.span
            variants={bubble}
            className="flex w-fit items-center gap-1 rounded-full border border-[#f2bf98] bg-[#fff1e4] px-2 py-0.5 text-[9px] text-[#b8633a]"
          >
            <FlameMark className="h-2.5" />
            26 champs remplis depuis la dictée
          </motion.span>
          <motion.p
            variants={bubble}
            className="max-w-[92%] rounded-lg bg-white px-3 py-2 text-[#33414d] shadow-sm"
          >
            C&apos;est fait pour le dossier Lefèvre (2026-0147). Vérifiez les champs
            marqués <FlameMark className="inline h-2.5 text-[#d9844f]" /> avant de les
            valider.
          </motion.p>
        </motion.div>

        <div className="flex items-center gap-2 border-t border-[#ecd9c4] px-3 py-3">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#ffc9a3] text-[#001c2f]">
            <IconMicrophone className="size-3.5" />
          </span>
          <span className="flex-1 rounded-full border border-[#e3cdb4] bg-white px-3 py-1.5 text-[10px] text-[#8a95a1]">
            Dites ou écrivez une instruction…
          </span>
          <span className="flex size-7 items-center justify-center rounded-full bg-[#2a4e62] text-white">
            <IconArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
