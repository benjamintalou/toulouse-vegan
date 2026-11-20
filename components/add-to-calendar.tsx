import { CalendarPlus } from "lucide-react";
import { googleCalendarUrl, icsHref } from "@/lib/calendar";
import type { VeganEvent } from "@/lib/events";

const buttonClass =
  "inline-flex min-h-10 items-center gap-2 rounded-full border-2 border-primary bg-card px-4 text-sm font-bold text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function AddToCalendar({ event }: { event: VeganEvent }) {
  return (
    <div>
      <p className="flex items-center gap-3 font-semibold">
        <CalendarPlus className="size-5 shrink-0 text-primary" aria-hidden="true" />
        Ajouter à mon agenda
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        <li>
          <a
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            Google Agenda
            <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
          </a>
        </li>
        <li>
          <a href={icsHref(event)} className={buttonClass}>
            Apple, Outlook
            <span className="sr-only"> et autres agendas</span>
            <span aria-hidden="true">(.ics)</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
