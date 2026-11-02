import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";
import { formatHours, formatShortDay, type VeganEvent } from "@/lib/events";

export function FeaturedEventCard({ event }: { event: VeganEvent }) {
  return (
    <Link
      href={event.href}
      className="group flex gap-4 rounded-2xl bg-event p-3 text-event-foreground shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none sm:gap-5 sm:p-4"
    >
      <Image
        src={event.poster}
        alt=""
        placeholder="blur"
        sizes="(min-width: 640px) 128px, 96px"
        className="aspect-4/5 w-24 shrink-0 rounded-lg object-cover sm:w-32"
      />
      <div className="flex min-w-0 flex-col justify-center gap-1.5">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-event-accent uppercase sm:text-sm">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          <time dateTime={event.startsAt.toISOString()}>
            {formatShortDay(event)} · {formatHours(event)}
          </time>
        </p>
        <h2 className="text-lg leading-tight font-bold text-balance sm:text-xl">
          {event.title}
        </h2>
        <p className="flex items-center gap-1.5 text-sm opacity-90">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {event.place}
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-event-accent">
          Voir l’affiche
          <ChevronRight
            className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
