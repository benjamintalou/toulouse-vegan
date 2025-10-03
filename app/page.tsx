import { Utensils, Facebook, Instagram, CandyCane, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
        href: "https://www.happycow.net/europe/france/toulouse/?filters=vegan-vegfriendly",
        icon: Utensils,
      },
      {
        label: "Trip Advisor",
        href: "https://www.tripadvisor.fr/Restaurants-g187175-zfz10697-Toulouse_Haute_Garonne_Occitanie.html",
        icon: Utensils,
      },
      {
        label: "Manger vegan à Toulouse",
        href: "https://www.instagram.com/mangervegan_toulouse",
        icon: Instagram,
      },
    ],
  },
  {
    theme: "Marchés et événements",
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
    theme: "Communautés et groupes en ligne",
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
        label: "Vegan Toulouse 31",
        href: "https://www.facebook.com/groups/1793040727635339",
        icon: Facebook,
      },
      {
        label: "Véganes de Toulouse et alentours",
        href: "https://www.facebook.com/groups/493152377456050",
        icon: Facebook,
      },
      {
        label: "Toulouse Veggies et Vegans",
        href: "https://www.facebook.com/groups/1923430637917820",
        icon: Facebook,
      },
    ],
  },
  {
    theme: "Associations pour agir localement",
    links: [
      {
        label: "L214",
        href: "https://www.l214.com/agir/agir-localement-pour-les-animaux/",
        icon: Globe,
      },
      {
        label: "AVF (Association Végétarienne de France)",
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
        label: "Anonymous for the Voiceless Toulouse",
        href: "https://www.facebook.com/groups/510019202696519/",
        icon: Facebook,
      },
      {
        label: "Food Not Bombs Toulouse",
        href: "https://www.instagram.com/foodnotbombs.toulouse",
        icon: Instagram,
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <div
        className="fixed inset-0 -z-10 w-full h-full"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "opacity(0.5)",
        }}
      />
      <header className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-foreground">Toulouse vegan</h1>
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
              <h3 className="text-xl font-bold mb-3 text-black">
                {group.theme}
              </h3>
              <div className="flex flex-col gap-4">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className="flex items-center gap-3 px-6 py-4 rounded-lg border bg-card/70 hover:bg-primary/10 transition font-semibold text-lg"
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

      <footer className="border-t py-8 px-4 mt-8 backdrop-blur-sm bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 justify-center">
            <Image src="/pig.png" alt="Pig" width={24} height={24} />
            <span className="font-semibold">
              © {new Date().getFullYear()} | Toulouse vegan
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
