import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import background from "@/public/background.png";
import pig from "@/public/pig.png";
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
  themeColor: "#6FCF97",
};

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
    "Annuaire indépendant des initiatives, événements, lieux et associations véganes de Toulouse et ses alentours.",
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
    <html lang="fr" className={GeistSans.variable}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <JsonLd data={siteJsonLd} />
        <JsonLd data={organizationJsonLd} />
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
            {new Date().getFullYear()} · {siteName}
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
