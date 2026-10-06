export const site = {
  name: "Auxillum",
  tagline: "Le copilote IA des pompes funèbres",
  description:
    "Auxillum est l'assistant IA branché sur votre logiciel funéraire : check-lists de démarches, documents pré-remplis, rédaction assistée. Moins de paperasse, plus de temps pour les familles.",
  url: "https://auxillum.fr",
  email: "bonjour@auxillum.fr",
  phone: "+33 1 84 80 00 00",
  address: "12 rue de la République, 75011 Paris",
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: "Fonctionnalités", href: "/features" },
  { label: "Tarifs", href: "/pricing" },
  { label: "Démo", href: "/demo" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Produit",
    items: [
      { label: "Fonctionnalités", href: "/features" },
      { label: "Tarifs", href: "/pricing" },
      { label: "Démo", href: "/demo" },
      { label: "Connexion", href: "/login" },
    ],
  },
  {
    title: "Entreprise",
    items: [
      { label: "À propos", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/about" },
      { label: "Carrières", href: "/about" },
    ],
  },
  {
    title: "Légal",
    items: [
      { label: "Mentions légales", href: "/legal/mentions-legales" },
      { label: "Confidentialité", href: "/legal/confidentialite" },
      { label: "CGU / CGV", href: "/legal/cgu" },
    ],
  },
];
