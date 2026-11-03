import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import pig from "@/public/pig.png";
import { formatShortDay, getUpcomingEvents } from "@/lib/events";
import { groups } from "@/lib/links";
import { siteName } from "@/lib/site";

export function SiteHeader() {
  const [nextEvent] = getUpcomingEvents();
  const items = [
    ...(nextEvent ? [{ href: "/#evenements", label: "Événements" }] : []),
    ...groups.map((group) => ({ href: `/#${group.id}`, label: group.nav })),
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 sm:min-h-[4.5rem] lg:gap-x-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Image src={pig} alt="" width={40} height={40} className="rounded-lg" />
          <span className="font-display text-xl text-primary xl:text-2xl">{siteName}</span>
        </Link>

        <nav aria-label="Sections" className="hidden flex-1 lg:block">
          <ul className="flex gap-2.5">
            {items.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block min-h-10 content-center px-1 font-bold whitespace-nowrap hover:text-primary"
                >
                  {label}
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
            {nextEvent.shortTitle}
            <span className="hidden xl:inline"> · {formatShortDay(nextEvent)}</span>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
