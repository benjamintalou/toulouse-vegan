import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import background from "@/public/background.png";
import pig from "@/public/pig.png";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Toulouse vegan - Actions et Initiatives Véganes à Toulouse et dans ses alentours",
    template: "%s | Toulouse vegan",
  },
  description:
    "Découvrez les actions, événements, restaurants et initiatives véganes à Toulouse. Rejoignez la communauté végane toulousaine pour un mode de vie éthique et durable.",
  keywords: [
    "véganisme",
    "Toulouse",
    "restaurants vegans",
    "événements vegans",
    "initiatives véganes",
    "communauté végane",
    "alimentation végétale",
    "vegan friendly",
    "associations véganes",
    "recettes vegans",
    "produits vegans",
    "mode de vie vegans",
    "alternatives végétales",
    "protection animale",
    "écologie",
    "santé vegans",
    "guide vegans Toulouse",
  ],
  openGraph: {
    title:
      "Toulouse vegan - Actions et Initiatives Véganes à Toulouse et ses alentours",
    description:
      "Découvrez les actions, événements, restaurants et initiatives véganes à Toulouse.",
    type: "website",
    locale: "fr_FR",
    siteName: "Toulouse vegan",
  },
};

export const viewport: Viewport = {
  themeColor: "#6FCF97",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={GeistSans.variable}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <Image
          src={background}
          alt=""
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="fixed! -z-10 object-cover opacity-50"
        />
        <div className="flex-1">{children}</div>
        <footer className="border-t bg-card/60 px-4 py-6 backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold">
            <Image src={pig} alt="" width={24} height={24} />©{" "}
            {new Date().getFullYear()} · Toulouse vegan
          </p>
        </footer>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="9d1cdab0-f044-43d1-9b27-7b04c93a4618"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
