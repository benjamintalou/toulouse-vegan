import Image from "next/image";
import { EventBand } from "@/components/event-band";
import { OrganizationCard } from "@/components/organization-card";
import { getUpcomingEvents } from "@/lib/events";
import { groups } from "@/lib/links";
import background from "@/public/background.png";

// Re-render daily so past events drop off the home page on their own.
export const revalidate = 86400;

export default function HomePage() {
  const upcomingEvents = getUpcomingEvents();

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-12 md:grid-cols-[1.1fr_0.9fr] md:pt-14">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-5xl leading-none text-primary sm:text-6xl lg:text-7xl">
            Toulouse <span className="text-foreground">vegan</span>
          </h1>
          <p className="max-w-lg text-xl leading-relaxed text-balance sm:text-2xl">
            Trouver les <strong>initiatives</strong>, <strong>événements</strong> et{" "}
            <strong>lieux végans</strong> de Toulouse et ses alentours.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="#restaurants"
              className="inline-flex min-h-12 items-center rounded-lg bg-primary px-6 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Où manger végan
            </a>
            <a
              href="#associations"
              className="inline-flex min-h-12 items-center rounded-lg border-2 border-primary bg-card px-6 text-lg font-bold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Agir localement
            </a>
          </div>
        </div>
        <Image
          src={background}
          alt="Illustration : une vache, un cochon et un lapin dans des collines vertes"
          placeholder="blur"
          sizes="(min-width: 768px) 520px, 100vw"
          className="hidden aspect-4/3 w-full rounded-2xl object-cover object-[50%_78%] shadow-xl sm:block"
        />
      </section>

      {upcomingEvents.length > 0 ? (
        <section
          id="evenements"
          aria-label="Événements à venir"
          className="border-t-6 border-accent bg-event text-event-foreground"
        >
          {upcomingEvents.map((event) => (
            <EventBand key={event.href} event={event} />
          ))}
        </section>
      ) : null}

      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-14">
        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
                {group.label}
              </p>
              <h2 id={`${group.id}-title`} className="font-display mt-1.5 text-3xl sm:text-4xl">
                {group.theme}
              </h2>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.organizations.map((organization) => (
                <li key={organization.name}>
                  <OrganizationCard {...organization} icon={group.icon} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
