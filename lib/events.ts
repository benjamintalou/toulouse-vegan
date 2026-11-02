import type { StaticImageData } from "next/image";
import afficheNoel from "@/public/affiche-noel.jpg";

export type VeganEvent = {
  title: string;
  href: string;
  startsAt: Date;
  endsAt: Date;
  place: string;
  poster: StaticImageData;
};

export const marcheDeNoel: VeganEvent = {
  title: "Marché de Noël Éthique et Végane de Toulouse 2026",
  href: "/marche-de-noel-ethique-et-vegane-de-toulouse-2026",
  startsAt: new Date("2026-12-12T10:00:00+01:00"),
  endsAt: new Date("2026-12-12T18:00:00+01:00"),
  place: "Place Saint-Pierre, Toulouse",
  poster: afficheNoel,
};

export const events: VeganEvent[] = [marcheDeNoel];

const timeZone = "Europe/Paris";

const dayFormat = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone,
});
const shortDayFormat = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone,
});
const hourFormat = new Intl.DateTimeFormat("fr-FR", {
  hour: "numeric",
  timeZone,
});

const hour = (date: Date) => hourFormat.format(date).replace(/\s/g, "");

/** « samedi 12 décembre 2026 » */
export const formatDay = (event: VeganEvent) => dayFormat.format(event.startsAt);

/** « sam. 12 déc. » */
export const formatShortDay = (event: VeganEvent) =>
  shortDayFormat.format(event.startsAt);

/** « 10h–18h » */
export const formatHours = (event: VeganEvent) =>
  `${hour(event.startsAt)}–${hour(event.endsAt)}`;

export const getUpcomingEvents = (now = new Date()) =>
  events.filter((event) => event.endsAt > now);
