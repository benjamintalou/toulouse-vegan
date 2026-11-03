import type { StaticImageData } from "next/image";
import afficheNoel from "@/public/affiche-noel.jpg";

export type VeganEvent = {
  title: string;
  href: string;
  startsAt: Date;
  endsAt: Date;
  /** Human-readable venue, e.g. « Place Saint-Pierre, Toulouse ». */
  place: string;
  /** Structured venue for schema.org `Place`. */
  location: { name: string; postalCode: string; city: string };
  poster: StaticImageData;
  isFree: boolean;
  /** One or two sentences shown above the programme. */
  intro: string;
  /** « Au programme » bullet points. */
  highlights: string[];
  /** Closing paragraph. */
  outro: string;
};

export const marcheDeNoel: VeganEvent = {
  title: "Marché de Noël Éthique et Végane de Toulouse 2026",
  href: "/marche-de-noel-ethique-et-vegane-de-toulouse-2026",
  startsAt: new Date("2026-12-12T10:00:00+01:00"),
  endsAt: new Date("2026-12-12T18:00:00+01:00"),
  place: "Place Saint-Pierre, Toulouse",
  location: { name: "Place Saint-Pierre", postalCode: "31000", city: "Toulouse" },
  poster: afficheNoel,
  isFree: true,
  intro:
    "Un moment festif et engagé, placé sous le signe de la convivialité, pour préparer des fêtes plus respectueuses des animaux et de la planète.",
  highlights: [
    "Des cadeaux de Noël éthiques et responsables",
    "Des options de restauration 100 % véganes",
    "De l’artisanat et des créations qui respectent la planète et les animaux",
    "Des stands associatifs engagés pour la cause animale",
    "Des animations pour tous les âges",
  ],
  outro:
    "Venez découvrir une sélection unique de produits véganes, artisanaux et éthiques, et rencontrer les associations qui œuvrent pour les droits des animaux dans la région. Ensemble, montrons qu’un Noël plus éthique est possible !",
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
