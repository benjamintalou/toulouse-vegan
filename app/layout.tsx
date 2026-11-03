import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Script from "next/script";
import { Lilita_One, Source_Sans_3 } from "next/font/google";
import pig from "@/public/pig.png";
import { SiteHeader } from "@/components/site-header";
import { ContactLinks } from "@/components/contact-links";
import { contactOrganization } from "@/lib/links";
import { JsonLd } from "@/lib/json-ld";
import { absoluteUrl, siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    type: "website",
    locale: "fr_FR",
    siteName,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "lifestyle",
};

export const viewport: Viewport = {
  themeColor: "#236b35",
};

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita",
  display: "swap",
});

const organizationId = absoluteUrl("/#organization");

const siteJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: siteUrl.href,
  name: siteName,
  description: siteDescription,
  inLanguage: "fr-FR",
  publisher: { "@id": organizationId },
};

const organizationJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "Organization",
  "@id": organizationId,
  name: siteName,
  url: siteUrl.href,
  logo: absoluteUrl(pig.src),
  description:
    "Annuaire des initiatives, événements, lieux et associations véganes de Toulouse et ses alentours.",
  areaServed: {
    "@type": "City",
    name: "Toulouse",
    address: { "@type": "PostalAddress", addressLocality: "Toulouse", addressCountry: "FR" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sourceSans.variable} ${lilita.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <JsonLd data={siteJsonLd} />
        <JsonLd data={organizationJsonLd} />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <footer className="bg-event text-event-foreground">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
            <section id="contact" aria-labelledby="contact-title" className="flex flex-col gap-3">
              <h2 id="contact-title" className="font-display text-2xl">
                Nous contacter
              </h2>
              <p className="max-w-xl text-pretty">
                Une question, un lien à ajouter, un événement à annoncer ? Écrivez à{" "}
                <strong>{contactOrganization.name}</strong>.
              </p>
              <ContactLinks organization={contactOrganization} />
            </section>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-event-foreground/15 pt-6">
              <p className="flex items-center gap-2.5 font-bold">
                <span className="grid size-8 place-items-center rounded-md bg-accent">
                  <Image src={pig} alt="" width={24} height={24} />
                </span>
                ©{" "}
                {new Date().getFullYear()} · {siteName}
              </p>
              <p className="text-sm opacity-85">
                Initiatives, événements et lieux végans de Toulouse
              </p>
            </div>
          </div>
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
