import {
  Leaf,
  Utensils,
  Facebook,
  Instagram,
  CandyCane,
  Globe,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type LinkGroup = {
  theme: string;
  links: LinkItem[];
};

const groupedLinks: LinkGroup[] = [
  {
    theme: "Guides pour trouver des restaurants",
    links: [
      {
        label: "Happy Cow",
        href: "https://www.happycow.net/europe/france/toulouse/",
        icon: Utensils,
      },
      {
        label: "Trip Advisor",
        href: "https://www.tripadvisor.fr/Restaurants-g187175-zfz10697-Toulouse_Haute_Garonne_Occitanie.html",
        icon: Utensils,
      },
    ],
  },
  {
    theme: "Les marchés et événements",
    links: [
      {
        label: "Marché de Noël Ethique et Végane de Toulouse 2025 (6 décembre)",
        href: "/marche-de-noel-ethique-et-vegane-de-toulouse-2025",
        icon: CandyCane,
      },
      {
        label: "Mini Marché Vegan Toulouse",
        href: "https://www.facebook.com/MarcheVeganToulouse",
        icon: Facebook,
      },
      {
        label: "Mini Marché Vegan Toulouse",
        href: "https://www.instagram.com/mini_marche_vegan_toulouse",
        icon: Instagram,
      },
    ],
  },
  {
    theme: "Communautés & Groupes en ligne",
    links: [
      {
        label: "J'agis pour les animaux Toulouse",
        href: "https://www.facebook.com/jagispourlesanimauxtoulouse",
        icon: Facebook,
      },
      {
        label: "J'agis pour les animaux Toulouse",
        href: "https://www.instagram.com/jagispourlesanimaux_toulouse",
        icon: Instagram,
      },
      {
        label: "Vegan Toulouse 31 (Facebook)",
        href: "https://www.facebook.com/groups/1793040727635339",
        icon: Facebook,
      },
      {
        label: "Véganes de Toulouse et alentours (Facebook)",
        href: "https://www.facebook.com/groups/493152377456050",
        icon: Facebook,
      },
      {
        label: "Toulouse Veggies et Vegans (Facebook)",
        href: "https://www.facebook.com/groups/1923430637917820",
        icon: Facebook,
      },
    ],
  },
  {
    theme: "Les associations, agir localement",
    links: [
      {
        label: "L214",
        href: "https://www.l214.com/agir/agir-localement-pour-les-animaux/",
        icon: Globe,
      },
      {
        label: "AVF (Association Végétarienne de France) Toulouse",
        href: "https://www.avftoulouse.fr/page/3522315-accueil",
        icon: Globe,
      },
      {
        label: "One Voice",
        href: "https://one-voice.fr/devenir-militant/",
        icon: Globe,
      },
      {
        label: "PAZ",
        href: "https://www.instagram.com/associationpaz/",
        icon: Globe,
      },
      {
        label: "Food Not Bombs Toulouse",
        href: "https://www.instagram.com/foodnotbombs.toulouse",
        icon: Globe,
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              Toulouse vegan
            </h1>
          </div>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-balance mb-8 text-center mt-8">
          Trouver les initiatives, événements et lieux{" "}
          <span className="text-primary">végans</span> de{" "}
          <span className="text-primary">Toulouse</span> et ses alentours.
        </h2>
        <div className="w-full max-w-md flex flex-col gap-8">
          {groupedLinks.map((group) => (
            <div key={group.theme}>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                {group.theme}
              </h3>
              <div className="flex flex-col gap-4">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className="flex items-center gap-3 px-6 py-4 rounded-lg border bg-card hover:bg-primary/10 transition font-semibold text-lg"
                  >
                    <link.icon className="h-5 w-5 text-primary" size={30} />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t py-8 px-4 mt-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 justify-center">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-semibold">
              © {new Date().getFullYear()} | Toulouse vegan
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
