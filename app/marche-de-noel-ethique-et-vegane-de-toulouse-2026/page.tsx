import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Ticket } from "lucide-react";
import { Emphasis } from "@/components/emphasis";
import { EventActions } from "@/components/event-actions";
import {
  formatDay,
  formatHours,
  marcheDeNoel as event,
  plainText,
} from "@/lib/events";
import { JsonLd } from "@/lib/json-ld";
import { contactOrganization } from "@/lib/links";
import { absoluteUrl, siteName } from "@/lib/site";

const day = formatDay(event);
const description = `${day[0].toUpperCase()}${day.slice(1)}, ${formatHours(event)}, ${event.place}. Entrée gratuite : cadeaux éthiques, restauration 100 % végane, artisanat, associations, animations.`;
const programme = event.highlights
  .map((item) => item[0].toLowerCase() + item.slice(1))
  .join(" ; ");
const longDescription = plainText(
  `${event.intro} Au programme : ${programme}. ${event.outro} ${event.slogan}`,
);
const posterAlt = "Affiche du Marché de Noël Éthique et Vegan 2026";

export const metadata: Metadata = {
  title: event.title,
  description,
  alternates: { canonical: event.href },
  openGraph: {
    title: event.title,
    description,
    url: event.href,
    type: "website",
    // A page's `openGraph` replaces the layout's, so the site-wide fields are repeated.
    locale: "fr_FR",
    siteName,
  },
};

// Profile URLs without the `utm_source` tag the site adds to outgoing links.
const organizerProfiles = contactOrganization.links.map(({ href }) => {
  const url = new URL(href);
  return url.origin + url.pathname;
});

const eventJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "Event",
  name: event.title,
  description: longDescription,
  url: absoluteUrl(event.href),
  image: [absoluteUrl(event.poster.src)],
  startDate: event.startsAt.toISOString(),
  endDate: event.endsAt.toISOString(),
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  inLanguage: "fr-FR",
  isAccessibleForFree: event.isFree,
  organizer: {
    "@type": "Organization",
    name: contactOrganization.name,
    description: contactOrganization.description,
    url: organizerProfiles[0],
    sameAs: organizerProfiles,
  },
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: absoluteUrl(event.href),
  },
  location: {
    "@type": "Place",
    name: event.location.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: event.location.name,
      postalCode: event.location.postalCode,
      addressLocality: event.location.city,
      addressCountry: "FR",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: siteName, item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: event.title, item: absoluteUrl(event.href) },
  ],
};

const details = [
  {
    icon: CalendarDays,
    label: `${formatDay(event)} · ${formatHours(event)}`,
    dateTime: event.startsAt.toISOString(),
  },
  { icon: MapPin, label: event.place },
  ...(event.isFree ? [{ icon: Ticket, label: "Entrée gratuite" }] : []),
];

export default function MarcheDeNoelPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <JsonLd data={eventJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Retour à l’accueil
      </Link>

      {/* Same header pattern as the home page sections: small label, display title. */}
      <header className="mt-4">
        <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
          Événement
        </p>
        <h1 className="font-display mt-1.5 text-3xl text-balance sm:text-4xl lg:text-5xl">
          {event.title}
        </h1>
      </header>

      <div className="mt-6 grid items-start gap-8 md:grid-cols-[1fr_minmax(0,320px)] lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-10">
        <div className="rounded-xl bg-card p-5 shadow-card sm:p-6">
          <ul className="mb-5 flex flex-col gap-2 border-b border-foreground/10 pb-5 font-semibold">
            {details.map(({ icon: Icon, label, dateTime }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                {dateTime ? (
                  <time dateTime={dateTime} className="first-letter:uppercase">
                    {label}
                  </time>
                ) : (
                  <span className="first-letter:uppercase">{label}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="text-pretty sm:text-lg">
            <Emphasis text={event.intro} className="font-bold text-primary" />
          </p>
          <h2 className="font-display mt-5 text-xl">Au programme</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {event.highlights.map((item, index) => (
              <li
                key={item}
                className={index === 0 ? "font-semibold text-primary" : undefined}
              >
                <Emphasis text={item} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-pretty">
            <Emphasis text={event.outro} className="font-bold text-primary" />
          </p>
          <p className="mt-4 text-lg font-bold text-balance text-primary">
            {event.slogan}
          </p>

          <div className="mt-6 border-t border-foreground/10 pt-4">
            <EventActions event={event} />
            <p className="mt-3 text-sm text-muted-foreground">
              Organisé par {contactOrganization.name} (L214)
            </p>
          </div>
        </div>

        <Image
          src={event.poster}
          alt={posterAlt}
          placeholder="blur"
          preload
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 320px, 384px"
          className="mx-auto h-auto w-full max-w-sm rounded-lg shadow-lg md:sticky md:top-24"
        />
      </div>
    </main>
  );
}
