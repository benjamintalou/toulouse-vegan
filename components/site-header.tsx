import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import pig from "@/public/pig.png";
import { formatShortDay, getUpcomingEvents } from "@/lib/events";
import { groups } from "@/lib/links";
import { siteName } from "@/lib/site";

export function SiteHeader() {
  const [nextEvent] = getUpcomingEvents();

  return (
    <header className="sticky top-0 z-20 border-b bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 sm:min-h-[4.5rem] md:gap-x-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Image src={pig} alt="" width={40} height={40} className="rounded-lg" />
          <span className="font-display text-xl text-primary sm:text-2xl">{siteName}</span>
        </Link>

        <nav aria-label="Sections" className="order-last w-full md:order-none md:w-auto md:flex-1">
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:gap-5 md:px-0">
            {nextEvent ? (
              <li>
                <a href="/#evenements" className="block min-h-10 content-center px-1 font-bold hover:text-primary">
                  Événements
                </a>
              </li>
            ) : null}
            {groups.map((group) => (
              <li key={group.id}>
                <a
                  href={`/#${group.id}`}
                  className="block min-h-10 content-center px-1 font-bold whitespace-nowrap hover:text-primary"
                >
                  {group.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {nextEvent ? (
          <Link
            href={nextEvent.href}
            className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-3 font-bold sm:px-4 text-accent-foreground transition-colors hover:bg-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">{nextEvent.shortTitle} · </span>
            {formatShortDay(nextEvent)}
          </Link>
        ) : null}
      </div>
    </header>
  );
}
