import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { formatDay, formatHours, type VeganEvent } from "@/lib/events";

export function EventBand({ event }: { event: VeganEvent }) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[1fr_220px]">
      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-event-accent uppercase">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-event-accent" />
          Événement
        </p>
        <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
          {event.title}
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-semibold">
          <li className="flex items-center gap-2">
            <CalendarDays className="size-5 shrink-0 text-event-accent" aria-hidden="true" />
            <time dateTime={event.startsAt.toISOString()} className="first-letter:uppercase">
              {formatDay(event)} · {formatHours(event)}
            </time>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-5 shrink-0 text-event-accent" aria-hidden="true" />
            {event.place}
          </li>
          {event.isFree ? (
            <li className="flex items-center gap-2">
              <Ticket className="size-5 shrink-0 text-event-accent" aria-hidden="true" />
              Entrée gratuite
            </li>
          ) : null}
        </ul>
        <div>
          <Link
            href={event.href}
            className="inline-flex min-h-12 items-center rounded-lg bg-accent px-6 text-lg font-bold text-accent-foreground transition-colors hover:bg-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-event-accent"
          >
            Voir le programme
          </Link>
        </div>
      </div>
      <Link
        href={event.href}
        aria-label={`Affiche : ${event.title}`}
        className="hidden justify-self-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-event-accent md:block"
      >
        <Image
          src={event.poster}
          alt=""
          placeholder="blur"
          sizes="220px"
          className="aspect-4/5 w-[220px] rotate-2 rounded-lg object-cover shadow-xl transition-transform duration-200 hover:rotate-0 motion-reduce:transition-none"
        />
      </Link>
    </div>
  );
}
