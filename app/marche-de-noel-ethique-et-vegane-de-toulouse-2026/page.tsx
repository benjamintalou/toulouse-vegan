import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { AddToCalendar } from "@/components/add-to-calendar";
import { Emphasis } from "@/components/emphasis";
import {
  formatDay,
  formatHours,
  marcheDeNoel as event,
  plainText,
} from "@/lib/events";
import { JsonLd } from "@/lib/json-ld";
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
  { icon: CalendarDays, label: formatDay(event), dateTime: event.startsAt.toISOString() },
  { icon: Clock, label: formatHours(event) },
  { icon: MapPin, label: event.place },
  ...(event.isFree ? [{ icon: Ticket, label: "Entrée gratuite" }] : []),
];

export default function MarcheDeNoelPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
      <JsonLd data={eventJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Retour à l’accueil
      </Link>

      <div className="mt-6 grid items-start gap-8 md:grid-cols-[1fr_minmax(0,480px)]">
        <div className="rounded-xl bg-card p-6 shadow-card md:sticky md:top-24">
          <h1 className="font-display text-3xl text-balance sm:text-4xl">
            {event.title}
          </h1>
          <ul className="mt-6 flex flex-col gap-3">
            {details.map(({ icon: Icon, label, dateTime }) => (
              <li
                key={label}
                className="flex items-center gap-3 font-semibold"
              >
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

          <div className="mt-6 border-t border-foreground/10 pt-6">
            <AddToCalendar event={event} />
          </div>

          <p className="mt-6 text-pretty">
            <Emphasis text={event.intro} className="font-bold text-primary" />
          </p>
          <h2 className="font-display mt-6 text-xl">Au programme</h2>
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
        </div>

        <Image
          src={event.poster}
          alt={posterAlt}
          placeholder="blur"
          preload
          sizes="(min-width: 768px) 480px, 100vw"
          className="h-auto w-full rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}
