import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { formatDay, formatHours, marcheDeNoel as event } from "@/lib/events";
import { JsonLd } from "@/lib/json-ld";
import { absoluteUrl } from "@/lib/site";

const day = formatDay(event);
const description = `${day[0].toUpperCase()}${day.slice(1)}, ${formatHours(event)}, ${event.place}. Entrée gratuite : cadeaux éthiques, restauration 100 % végane, artisanat, associations, animations.`;
const programme = event.highlights
  .map((item) => item[0].toLowerCase() + item.slice(1))
  .join(" ; ");
const longDescription = `${event.intro} Au programme : ${programme}. ${event.outro}`;
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
    images: [
      {
        url: event.poster.src,
        width: event.poster.width,
        height: event.poster.height,
        alt: posterAlt,
      },
    ],
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

const details = [
  { icon: CalendarDays, label: formatDay(event) },
  { icon: Clock, label: formatHours(event) },
  { icon: MapPin, label: event.place },
  ...(event.isFree ? [{ icon: Ticket, label: "Entrée gratuite" }] : []),
];

export default function MarcheDeNoelPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
      <JsonLd data={eventJsonLd} />
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Retour à l’accueil
      </Link>

      <div className="mt-6 grid items-start gap-8 md:grid-cols-[1fr_minmax(0,480px)]">
        <div className="rounded-lg border bg-card/85 p-6 backdrop-blur-sm md:sticky md:top-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            {event.title}
          </h1>
          <ul className="mt-6 flex flex-col gap-3">
            {details.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 font-semibold"
              >
                <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="first-letter:uppercase">{label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-balance">{event.intro}</p>
          <h2 className="mt-6 text-lg font-bold">Au programme</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {event.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-balance">{event.outro}</p>
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
