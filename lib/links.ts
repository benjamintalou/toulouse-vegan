import type { ComponentType } from "react";
import { CandyCane, Globe, Utensils, type LucideProps } from "lucide-react";
import { Facebook, Instagram } from "@/components/brand-icons";

export type LinkItem = {
  label: string;
  /** Secondary line: tells apart entries sharing a label (Facebook vs Instagram…). */
  platform: string;
  href: string;
  icon: ComponentType<LucideProps>;
};

export type LinkGroup = {
  id: string;
  theme: string;
  links: LinkItem[];
};

export const groupedLinks: LinkGroup[] = [
  {
    id: "restaurants",
    theme: "Guides pour trouver des restaurants",
    links: [
      {
        label: "Happy Cow",
        platform: "Site web",
        href: "https://www.happycow.net/europe/france/toulouse/?filters=vegan-vegfriendly",
        icon: Utensils,
      },
      {
        label: "Trip Advisor",
        platform: "Site web",
        href: "https://www.tripadvisor.fr/Restaurants-g187175-zfz10697-Toulouse_Haute_Garonne_Occitanie.html",
        icon: Utensils,
      },
      {
        label: "Manger vegan à Toulouse",
        platform: "Instagram",
        href: "https://www.instagram.com/mangervegan_toulouse",
        icon: Instagram,
      },
    ],
  },
  {
    id: "evenements",
    theme: "Marchés et événements",
    links: [
      {
        label: "Marché de Noël Éthique et Végane 2026",
        platform: "Samedi 12 décembre · Place Saint-Pierre",
        href: "/marche-de-noel-ethique-et-vegane-de-toulouse-2026",
        icon: CandyCane,
      },
      {
        label: "Mini Marché Vegan Toulouse",
        platform: "Facebook",
        href: "https://www.facebook.com/MarcheVeganToulouse",
        icon: Facebook,
      },
      {
        label: "Mini Marché Vegan Toulouse",
        platform: "Instagram",
        href: "https://www.instagram.com/mini_marche_vegan_toulouse",
        icon: Instagram,
      },
    ],
  },
  {
    id: "communautes",
    theme: "Communautés et groupes en ligne",
    links: [
      {
        label: "J'agis pour les animaux Toulouse",
        platform: "Facebook",
        href: "https://www.facebook.com/jagispourlesanimauxtoulouse",
        icon: Facebook,
      },
      {
        label: "J'agis pour les animaux Toulouse",
        platform: "Instagram",
        href: "https://www.instagram.com/jagispourlesanimaux_toulouse",
        icon: Instagram,
      },
      {
        label: "Vegan Toulouse 31",
        platform: "Groupe Facebook",
        href: "https://www.facebook.com/groups/1793040727635339",
        icon: Facebook,
      },
      {
        label: "Véganes de Toulouse et alentours",
        platform: "Groupe Facebook",
        href: "https://www.facebook.com/groups/493152377456050",
        icon: Facebook,
      },
      {
        label: "Toulouse Veggies et Vegans",
        platform: "Groupe Facebook",
        href: "https://www.facebook.com/groups/1923430637917820",
        icon: Facebook,
      },
    ],
  },
  {
    id: "associations",
    theme: "Associations pour agir localement",
    links: [
      {
        label: "L214",
        platform: "Site web",
        href: "https://www.l214.com/agir/agir-localement-pour-les-animaux/",
        icon: Globe,
      },
      {
        label: "AVF (Association Végétarienne de France)",
        platform: "Site web",
        href: "https://www.avftoulouse.fr/page/3522315-accueil",
        icon: Globe,
      },
      {
        label: "One Voice",
        platform: "Site web",
        href: "https://one-voice.fr/devenir-militant/",
        icon: Globe,
      },
      {
        label: "PAZ",
        platform: "Instagram",
        href: "https://www.instagram.com/associationpaz/",
        icon: Instagram,
      },
      {
        label: "Anonymous for the Voiceless Toulouse",
        platform: "Groupe Facebook",
        href: "https://www.facebook.com/groups/510019202696519/",
        icon: Facebook,
      },
      {
        label: "Food Not Bombs Toulouse",
        platform: "Instagram",
        href: "https://www.instagram.com/foodnotbombs.toulouse",
        icon: Instagram,
      },
    ],
  },
];
