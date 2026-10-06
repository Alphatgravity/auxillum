import {
  IconMessageChatbot,
  IconListCheck,
  IconFeather,
  IconFileText,
  IconPlugConnected,
  IconMessages,
  IconMicrophone,
  IconChartBar,
  IconShieldLock,
  type Icon,
} from "@tabler/icons-react";

export type Feature = {
  title: string;
  description: string;
  icon: Icon;
};

export const features: Feature[] = [
  {
    title: "Un assistant qui connaît le métier",
    description:
      "« Quels documents pour une crémation à Lyon avec transport depuis l'hôpital ? » Auxillum répond en citant ses sources réglementaires.",
    icon: IconMessageChatbot,
  },
  {
    title: "Check-list de démarches",
    description:
      "Pour chaque dossier, la liste des étapes — mairie, crématorium, culte — avec les échéances légales. Rien n'est oublié.",
    icon: IconListCheck,
  },
  {
    title: "Rédaction assistée",
    description:
      "Avis de décès, faire-part, texte de cérémonie : un premier jet au ton juste, à partir de quelques informations.",
    icon: IconFeather,
  },
  {
    title: "Documents pré-remplis",
    description:
      "Pouvoir, demande d'autorisation, devis au format modèle : les informations saisies une fois sont reprises partout.",
    icon: IconFileText,
  },
  {
    title: "Branché sur votre logiciel",
    description:
      "Auxillum lit et complète le dossier directement dans votre logiciel métier. Plus de ressaisie d'un écran à l'autre.",
    icon: IconPlugConnected,
  },
  {
    title: "Un accueil pour les familles, 24h/24",
    description:
      "Sur votre site, un assistant répond aux questions fréquentes, propose un rendez-vous et oriente vers un conseiller.",
    icon: IconMessages,
  },
  {
    title: "Résumé d'entretien",
    description:
      "L'entretien avec la famille est transcrit et transformé en fiche dossier, pour rester pleinement à son écoute.",
    icon: IconMicrophone,
  },
  {
    title: "Tableau de bord dirigeant",
    description:
      "Temps gagné, dossiers en retard, échéances à venir : une vue claire sur l'activité de vos agences.",
    icon: IconChartBar,
  },
  {
    title: "Conforme dès la conception",
    description:
      "Hébergement en Union européenne, zéro rétention côté IA, devis modèle intégré. La cause du décès n'est jamais stockée.",
    icon: IconShieldLock,
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Ouvrez le dossier",
    description:
      "Depuis votre logiciel métier ou l'application Auxillum. Les informations du défunt et de la famille sont reprises automatiquement.",
  },
  {
    number: "02",
    title: "Auxillum prépare",
    description:
      "Check-list des démarches, documents pré-remplis, premiers textes : tout est prêt en quelques minutes.",
  },
  {
    number: "03",
    title: "Vous validez",
    description:
      "L'IA propose, le conseiller décide. Chaque document est relu et validé par vous avant tout envoi.",
  },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "2×", label: "Moins de temps par dossier" },
  { value: "6 jours", label: "Délai légal, suivi pour vous" },
  { value: "100 %", label: "Données hébergées en UE" },
  { value: "0", label: "Donnée médicale stockée" },
];

// Pas de faux témoignages avant les pilotes : on présente ce que chaque
// acteur du dossier attend, et ce qu'Auxillum lui apporte.
export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Boucler un dossier vite, et sans rien oublier.",
    name: "Conseiller funéraire",
    title: "Pré-remplissage, check-list, rédaction assistée",
  },
  {
    quote: "Gagner du temps sur chaque dossier et rester irréprochable sur la conformité.",
    name: "Dirigeant d'agence",
    title: "Temps gagné, traçabilité, moins d'erreurs",
  },
  {
    quote: "Des réponses claires, à toute heure, sans avoir à rappeler.",
    name: "Famille endeuillée",
    title: "Accueil sur le site, suivi des étapes",
  },
  {
    quote: "Moderniser notre logiciel sans tout développer nous-mêmes.",
    name: "Éditeur de logiciel funéraire",
    title: "Brique IA intégrable en marque blanche",
  },
  {
    quote: "Être opérationnel rapidement, sans des mois de formation.",
    name: "Nouveau conseiller",
    title: "Démarches expliquées, sources citées",
  },
  {
    quote: "Ne plus laisser une question sans réponse le soir ou le week-end.",
    name: "Agence indépendante",
    title: "Assistant familles disponible 24h/24",
  },
];

export type Plan = {
  name: string;
  /** Prix HT mensuel par agence — null = sur devis. */
  price: number | null;
  description: string;
  featured?: boolean;
  cta: string;
  href: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Essentiel",
    price: 99,
    description: "Pour gagner du temps dès le premier dossier.",
    cta: "Commencer",
    href: "/signup",
    features: [
      "Rédaction assistée (avis, faire-part, éloges)",
      "FAQ réglementaire avec sources",
      "Check-lists de démarches",
      "Hébergement en UE",
      "Sans engagement",
    ],
  },
  {
    name: "Pro",
    price: 199,
    description: "Pour l'agence qui veut en finir avec la ressaisie.",
    featured: true,
    cta: "Rejoindre le programme pilote",
    href: "/signup",
    features: [
      "Tout Essentiel, plus :",
      "Connexion au logiciel métier",
      "Pré-remplissage des documents",
      "Assistant familles sur votre site",
      "Support prioritaire",
    ],
  },
  {
    name: "Réseau",
    price: null,
    description: "Pour les groupements et réseaux multi-agences.",
    cta: "Nous contacter",
    href: "/contact",
    features: [
      "Multi-agences",
      "Tableau de bord dirigeant",
      "Ton et modèles personnalisés",
      "Authentification unique (SSO)",
      "Interlocuteur dédié",
    ],
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Auxillum remplace-t-il le conseiller ?",
    answer:
      "Non. L'IA propose, le conseiller valide. Auxillum prend en charge la saisie et la paperasse pour que vous puissiez consacrer plus de temps aux familles.",
  },
  {
    question: "Fonctionne-t-il avec mon logiciel métier ?",
    answer:
      "Auxillum fonctionne d'abord comme une application web autonome. La connexion aux logiciels métier se fait ensuite par intégration directe, extension de navigateur ou import/export de fichiers selon votre outil.",
  },
  {
    question: "Que deviennent les données des familles ?",
    answer:
      "Elles sont hébergées en Union européenne, chiffrées et cloisonnées par agence. Elles ne servent jamais à entraîner un modèle, et la cause du décès n'est jamais collectée.",
  },
  {
    question: "Les documents respectent-ils le devis modèle ?",
    answer:
      "Oui. Les modèles intégrés distinguent prestations obligatoires et optionnelles, conformément au devis modèle en vigueur depuis le 1er juillet 2025, avec un contrôle avant envoi.",
  },
  {
    question: "Les familles savent-elles qu'elles parlent à une IA ?",
    answer:
      "Toujours. L'assistant familles l'indique clairement et permet de joindre un conseiller à tout moment. Il ne propose jamais d'option payante.",
  },
  {
    question: "Y a-t-il un engagement ?",
    answer:
      "Aucun engagement de durée. Une mise en service de 300 € HT par agence couvre le paramétrage, l'import de vos modèles et une formation d'une heure.",
  },
];

export const team = [
  { id: 1, name: "La fondatrice", designation: "Vision & produit", initials: "F" },
  { id: 2, name: "Associé·e technique", designation: "Produit & sécurité", initials: "CT" },
  { id: 3, name: "Expert métier", designation: "Conseil funéraire", initials: "EM" },
];
