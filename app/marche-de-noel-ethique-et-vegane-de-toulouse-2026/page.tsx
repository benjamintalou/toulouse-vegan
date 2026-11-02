import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { formatDay, formatHours, marcheDeNoel as event } from "@/lib/events";

const day = formatDay(event);
const description = `${day[0].toUpperCase()}${day.slice(1)}, ${formatHours(event)}, ${event.place}.`;

export const metadata: Metadata = {
  title: event.title,
  description,
  openGraph: {
    title: event.title,
    description,
    images: [
      {
        url: event.poster.src,
        width: event.poster.width,
        height: event.poster.height,
      },
    ],
  },
};

const details = [
  { icon: CalendarDays, label: formatDay(event) },
  { icon: Clock, label: formatHours(event) },
  { icon: MapPin, label: event.place },
];

export default function MarcheDeNoelPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
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
        </div>

        <Image
          src={event.poster}
          alt="Affiche du Marché de Noël Éthique et Vegan 2026"
          placeholder="blur"
          preload
          sizes="(min-width: 768px) 480px, 100vw"
          className="h-auto w-full rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}
