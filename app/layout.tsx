import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Suspense } from "react";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Toulouse vegan - Actions et Initiatives Véganes à Toulouse et dans ses alentours",
  description:
    "Découvrez les actions, événements, restaurants et initiatives véganes à Toulouse. Rejoignez la communauté végane toulousaine pour un mode de vie éthique et durable.",
  keywords:
    "véganisme, Toulouse, restaurants vegans, événements vegans, initiatives véganes, communauté végane, alimentation végétale, vegan friendly, associations véganes, recettes vegans, produits vegans, mode de vie vegans, alternatives végétales, protection animale, écologie, santé vegans, guide vegans Toulouse",
  openGraph: {
    title:
      "Toulouse vegan - Actions et Initiatives Véganes à Toulouse et ses alentours",
    description:
      "Découvrez les actions, événements, restaurants et initiatives véganes à Toulouse.",
    type: "website",
    locale: "fr_FR",
  },
  themeColor: "#6FCF97",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        cz-shortcut-listen="true"
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="9d1cdab0-f044-43d1-9b27-7b04c93a4618"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
