import type { StaticImageData } from "next/image";
import afficheNoel from "@/public/affiche-noel.jpg";

export type VeganEvent = {
  title: string;
  /** Short name for tight spots like the header button, e.g. « Marché de Noël ». */
  shortTitle: string;
  href: string;
  startsAt: Date;
  endsAt: Date;
  /** Human-readable venue, e.g. « Place Saint-Pierre, Toulouse ». */
  place: string;
  /** Structured venue for schema.org `Place`. */
  location: { name: string; postalCode: string; city: string };
  poster: StaticImageData;
  isFree: boolean;
  /** One or two sentences shown above the programme. `**mots**` are emphasised. */
  intro: string;
  /** « Au programme » bullet points, with `**mots clés**` in bold; the first one is the headline, shown in colour. */
  highlights: string[];
  /** Closing paragraph. `**mots**` are emphasised. */
  outro: string;
  /** Rallying line shown in bold under the closing paragraph. */
  slogan: string;
  /** The event's page on Facebook, without tracking parameters. */
  facebookUrl?: string;
};

export const marcheDeNoel: VeganEvent = {
  title: "Marché de Noël Éthique et Végane de Toulouse 2026",
  shortTitle: "Marché de Noël",
  href: "/marche-de-noel-ethique-et-vegane-de-toulouse-2026",
  startsAt: new Date("2026-12-12T10:00:00+01:00"),
  endsAt: new Date("2026-12-12T18:00:00+01:00"),
  place: "Place Saint-Pierre, Toulouse",
  location: { name: "Place Saint-Pierre", postalCode: "31000", city: "Toulouse" },
  poster: afficheNoel,
  isFree: true,
  intro:
    "Un moment festif, engagé, **100 % vegan**, placé sous le signe de la convivialité, pour préparer des fêtes plus respectueuses des animaux et de la planète.",
  highlights: [
    "Des cadeaux de Noël éthiques et responsables",
    "Des options de **restauration** 100 % véganes",
    "De l’**artisanat** et des créations",
    "Des **cosmétiques**, des **vêtements** et des **livres**",
    "Des **cours de cuisine**",
    "Des **stands associatifs** engagés pour la cause animale",
    "Des **animations** pour tous les âges",
  ],
  outro:
    "Venez découvrir **une sélection unique de produits véganes**, artisanaux et éthiques, et rencontrer les associations qui œuvrent pour les droits des animaux dans la région.",
  slogan: "Pour des fêtes respectueuses des animaux !",
  facebookUrl: "https://www.facebook.com/events/4076522995978302/",
};

/** Drops the `**` emphasis markers, for plain-text outputs (metadata, calendar…). */
export const plainText = (text: string) => text.replaceAll("**", "");

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
