import type { ComponentType } from "react";
import {
  BookOpen,
  HandHeart,
  ShoppingBasket,
  Smartphone,
  Store,
  Users,
  Utensils,
  type LucideProps,
} from "lucide-react";
import { withUtmSource } from "@/lib/site";

export type Platform = "facebook" | "facebook-group" | "instagram" | "web";

export type Organization = {
  name: string;
  description: string;
  /** Postal address of a physical place, shown on the card with a map link. */
  address?: string;
  /** Overrides the group icon when the organization is of a different kind. */
  icon?: ComponentType<LucideProps>;
  links: { platform: Platform; href: string }[];
};

export type OrganizationGroup = {
  id: string;
  /** Short name used in the navigation, e.g. « Restaurants ». */
  nav: string;
  /** Small label shown above the section title, e.g. « Se régaler ». */
  label: string;
  theme: string;
  icon: ComponentType<LucideProps>;
  organizations: Organization[];
};

/** Every outgoing link carries `utm_source` so partners can see traffic coming from the site. */
const tagOutgoingLinks = (organization: Organization): Organization => ({
  ...organization,
  links: organization.links.map((link) => ({
    ...link,
    href: withUtmSource(link.href),
  })),
});

/** The collective behind the site; also the contact point in the footer. */
export const contactOrganization: Organization = tagOutgoingLinks({
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
});

const rawGroups: OrganizationGroup[] = [
  {
    id: "restaurants",
    nav: "Restaurants",
    label: "Se régaler",
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
    nav: "Marchés",
    label: "Sortir",
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
    nav: "Communautés",
    label: "Se retrouver",
    theme: "Communautés et groupes en ligne",
    icon: Users,
    organizations: [
      contactOrganization,
      {
        name: "Apéro Vegan Toulouse",
        description: "Apéros véganes pour se rencontrer autour d'un verre",
        links: [
          {
            platform: "instagram",
            href: "https://www.instagram.com/aperovegantoulouse",
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
    nav: "Associations",
    label: "Agir",
    theme: "Associations pour agir localement",
    icon: HandHeart,
    organizations: [
      {
        name: "L214",
        description:
          "Association qui défend les animaux utilisés comme ressources alimentaires et encourage l'alimentation végétale",
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
  {
    id: "bons-plans",
    nav: "Bons plans",
    label: "Bons plans",
    theme: "Au quotidien",
    icon: Smartphone,
    organizations: [
      {
        name: "Le cri de la carotte",
        description: "L'épicerie végane de Toulouse !",
        address: "304 avenue de Muret, 31300 Toulouse",
        icon: ShoppingBasket,
        links: [
          {
            platform: "facebook",
            href: "https://www.facebook.com/lecridelacarotte31/",
          },
          {
            platform: "instagram",
            href: "https://www.instagram.com/le_cri_de_la_carotte/",
          },
        ],
      },
      {
        name: "321 Vegan : L’appli mobile qui aide les vegans 🌱",
        description:
          "Scannez des codes-barres, vérifiez les additifs et les marques de cosmétiques",
        links: [
          {
            platform: "web",
            href: "https://321vegan.fr/",
          },
        ],
      },
      {
        name: "Vegan Pratique",
        description:
          "Recettes, nutrition et conseils pour vivre vegan au quotidien",
        icon: BookOpen,
        links: [{ platform: "web", href: "https://vegan-pratique.fr/" }],
      },
    ],
  },
];

export const groups: OrganizationGroup[] = rawGroups.map((group) => ({
  ...group,
  organizations: group.organizations.map(tagOutgoingLinks),
}));
