import type { ComponentType } from "react";
import {
  HandHeart,
  Store,
  Users,
  Utensils,
  type LucideProps,
} from "lucide-react";

export type Platform = "facebook" | "facebook-group" | "instagram" | "web";

export type Organization = {
  name: string;
  description: string;
  links: { platform: Platform; href: string }[];
};

export type OrganizationGroup = {
  id: string;
  theme: string;
  icon: ComponentType<LucideProps>;
  organizations: Organization[];
};

export const groups: OrganizationGroup[] = [
  {
    id: "restaurants",
    theme: "Guides pour trouver des restaurants",
    icon: Utensils,
    organizations: [
      {
        name: "Happy Cow",
        description: "Restaurants vegan et vegan-friendly, avec avis",
        links: [
          {
            platform: "web",
            href: "https://www.happycow.net/europe/france/toulouse/?filters=vegan-vegfriendly",
          },
        ],
      },
      {
        name: "Trip Advisor",
        description: "Restaurants toulousains avec options véganes",
        links: [
          {
            platform: "web",
            href: "https://www.tripadvisor.fr/Restaurants-g187175-zfz10697-Toulouse_Haute_Garonne_Occitanie.html",
          },
        ],
      },
      {
        name: "Manger vegan à Toulouse",
        description: "Adresses véganes à Toulouse, en photos",
        links: [
          {
            platform: "instagram",
            href: "https://www.instagram.com/mangervegan_toulouse",
          },
        ],
      },
    ],
  },
  {
    id: "marches",
    theme: "Marchés et événements",
    icon: Store,
    organizations: [
      {
        name: "Mini Marché Vegan Toulouse",
        description: "Le mini marché vegan de Toulouse",
        links: [
          {
            platform: "facebook",
            href: "https://www.facebook.com/MarcheVeganToulouse",
          },
          {
            platform: "instagram",
            href: "https://www.instagram.com/mini_marche_vegan_toulouse",
          },
        ],
      },
    ],
  },
  {
    id: "communautes",
    theme: "Communautés et groupes en ligne",
    icon: Users,
    organizations: [
      {
        name: "J'agis pour les animaux Toulouse",
        description: "Groupe local d'action pour les animaux",
        links: [
          {
            platform: "facebook",
            href: "https://www.facebook.com/jagispourlesanimauxtoulouse",
          },
          {
            platform: "instagram",
            href: "https://www.instagram.com/jagispourlesanimaux_toulouse",
          },
        ],
      },
      {
        name: "Vegan Toulouse 31",
        description: "Groupe d'échange entre véganes toulousains",
        links: [
          {
            platform: "facebook-group",
            href: "https://www.facebook.com/groups/1793040727635339",
          },
        ],
      },
      {
        name: "Véganes de Toulouse et alentours",
        description: "Groupe d'échange entre véganes de la région",
        links: [
          {
            platform: "facebook-group",
            href: "https://www.facebook.com/groups/493152377456050",
          },
        ],
      },
      {
        name: "Toulouse Veggies et Vegans",
        description: "Groupe d'échange végétarien et vegan",
        links: [
          {
            platform: "facebook-group",
            href: "https://www.facebook.com/groups/1923430637917820",
          },
        ],
      },
    ],
  },
  {
    id: "associations",
    theme: "Associations pour agir localement",
    icon: HandHeart,
    organizations: [
      {
        name: "L214",
        description: "Association de défense des animaux d'élevage",
        links: [
          {
            platform: "web",
            href: "https://www.l214.com/agir/agir-localement-pour-les-animaux/",
          },
        ],
      },
      {
        name: "AVF Toulouse",
        description: "Association Végétarienne de France, antenne toulousaine",
        links: [
          {
            platform: "web",
            href: "https://www.avftoulouse.fr/page/3522315-accueil",
          },
        ],
      },
      {
        name: "One Voice",
        description: "Association de défense des animaux",
        links: [
          { platform: "web", href: "https://one-voice.fr/devenir-militant/" },
        ],
      },
      {
        name: "PAZ",
        description: "Paris Animaux Zoopolis, association antispéciste",
        links: [
          {
            platform: "instagram",
            href: "https://www.instagram.com/associationpaz/",
          },
        ],
      },
      {
        name: "Anonymous for the Voiceless Toulouse",
        description: "Actions de rue pour sensibiliser au véganisme",
        links: [
          {
            platform: "facebook-group",
            href: "https://www.facebook.com/groups/510019202696519/",
          },
        ],
      },
      {
        name: "Food Not Bombs Toulouse",
        description: "Distribution de repas vegan gratuits",
        links: [
          {
            platform: "instagram",
            href: "https://www.instagram.com/foodnotbombs.toulouse",
          },
        ],
      },
    ],
  },
];
