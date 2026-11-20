import { toIcs } from "@/lib/calendar";
import { marcheDeNoel as event } from "@/lib/events";

export const dynamic = "force-static";

/** The event as a calendar file, for Apple Calendar, Outlook and other agenda apps. */
export function GET() {
  return new Response(toIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      // `inline` lets iOS offer « Ajouter au calendrier » straight away; desktop browsers download it.
      "Content-Disposition": 'inline; filename="marche-de-noel-vegane-toulouse-2026.ics"',
      // The event page is the one to index, not this file.
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
