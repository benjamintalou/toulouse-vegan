import { CalendarPlus, Link2 } from "lucide-react";
import { Facebook, Instagram } from "@/components/brand-icons";
import { CopyLinkButton } from "@/components/copy-link-button";
import { googleCalendarUrl, icsHref } from "@/lib/calendar";
import { formatDay, formatHours, type VeganEvent } from "@/lib/events";
import { absoluteUrl } from "@/lib/site";

// Quiet text links: these are follow-ups to reading the programme, not the page's main content.
const linkClass =
  "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const iconClass = "size-4 shrink-0";

const withParams = (base: string, params: Record<string, string>) =>
  `${base}?${new URLSearchParams(params)}`;

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5">
      <h2 className="w-full text-sm font-bold text-muted-foreground lg:w-40">{label}</h2>
      {children}
    </div>
  );
}

const newTab = { target: "_blank", rel: "noopener noreferrer" };
const newTabHint = <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>;

/** « Ajouter à mon agenda » and « Partager », shown under the event description. */
export function EventActions({ event }: { event: VeganEvent }) {
  const url = absoluteUrl(event.href);
  const text = `${event.title} : ${formatDay(event)}, ${formatHours(event)}, ${event.place}.${event.isFree ? " Entrée gratuite !" : ""}`;

  return (
    <div className="flex flex-col gap-2 lg:gap-0">
      <Row label="Ajouter à mon agenda">
        <a href={googleCalendarUrl(event)} {...newTab} className={linkClass}>
          <CalendarPlus className={iconClass} aria-hidden="true" />
          Google Agenda
          {newTabHint}
        </a>
        <a href={icsHref(event)} className={linkClass}>
          <CalendarPlus className={iconClass} aria-hidden="true" />
          Apple, Outlook
          <span className="sr-only"> et autres agendas (fichier .ics)</span>
        </a>
      </Row>
      <Row label="Partager l’événement">
        <a
          href={withParams("https://www.facebook.com/sharer/sharer.php", { u: url })}
          {...newTab}
          className={linkClass}
        >
          <Facebook className={iconClass} aria-hidden="true" />
          Facebook
          {newTabHint}
        </a>
        <CopyLinkButton
          url={url}
          label="Instagram"
          copiedLabel="Lien copié, à coller dans Instagram"
          share={{ title: event.title, text }}
          className={linkClass}
        >
          <Instagram className={iconClass} aria-hidden="true" />
        </CopyLinkButton>
        <CopyLinkButton
          url={url}
          label="Copier le lien"
          copiedLabel="Lien copié !"
          className={linkClass}
        >
          <Link2 className={iconClass} aria-hidden="true" />
        </CopyLinkButton>
      </Row>
    </div>
  );
}
