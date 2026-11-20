import { plainText, type VeganEvent } from "@/lib/events";
import { absoluteUrl, siteUrl } from "@/lib/site";

/** Path of the `.ics` file served next to the event page. */
export const icsHref = (event: VeganEvent) => `${event.href}/agenda.ics`;

/** « 20261212T090000Z » — the UTC basic format shared by iCalendar and Google Calendar. */
const utcStamp = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const venue = ({ location }: VeganEvent) =>
  `${location.name}, ${location.postalCode} ${location.city}`;

const details = (event: VeganEvent) =>
  `${plainText(event.intro)}${event.isFree ? " Entrée gratuite." : ""}\n\n${absoluteUrl(event.href)}`;

/** Link that opens Google Calendar with the event pre-filled. */
export const googleCalendarUrl = (event: VeganEvent) => {
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", event.title);
  url.searchParams.set(
    "dates",
    `${utcStamp(event.startsAt)}/${utcStamp(event.endsAt)}`,
  );
  url.searchParams.set("details", details(event));
  url.searchParams.set("location", venue(event));
  return url.href;
};

const escapeText = (text: string) =>
  text
    .replace(/\\/g, "\\\\")
    .replace(/([;,])/g, "\\$1")
    .replace(/\r?\n/g, "\\n");

const encoder = new TextEncoder();

/** RFC 5545 caps lines at 75 octets; longer ones continue on a line starting with a space. */
const fold = (line: string) => {
  const parts: string[] = [];
  let current = "";
  let size = 0;
  for (const char of line) {
    const charSize = encoder.encode(char).length;
    if (size + charSize > 75) {
      parts.push(current);
      current = " ";
      size = 1;
    }
    current += char;
    size += charSize;
  }
  parts.push(current);
  return parts.join("\r\n");
};

/** The event as an iCalendar file, readable by Apple Calendar, Outlook, Thunderbird… */
export const toIcs = (event: VeganEvent, now = new Date()) =>
  [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${siteUrl.hostname}//Agenda//FR`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.href.replace(/^\//, "")}@${siteUrl.hostname}`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${utcStamp(event.startsAt)}`,
    `DTEND:${utcStamp(event.endsAt)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(details(event))}`,
    `LOCATION:${escapeText(venue(event))}`,
    `URL:${absoluteUrl(event.href)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .map(fold)
    .join("\r\n");
