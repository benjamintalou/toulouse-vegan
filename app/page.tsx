import { FeaturedEventCard } from "@/components/featured-event-card";
import { OrganizationCard } from "@/components/organization-card";
import { getUpcomingEvents } from "@/lib/events";
import { groups } from "@/lib/links";

// Re-render daily so past events drop off the home page on their own.
export const revalidate = 86400;

export default function HomePage() {
  const upcomingEvents = getUpcomingEvents();

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12 sm:py-16 lg:max-w-5xl">
      <header className="mx-auto mb-12 max-w-xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Toulouse vegan
        </h1>
        <p className="mt-4 text-lg text-balance sm:text-xl">
          Trouver les initiatives, événements et lieux{" "}
          <strong className="text-primary">végans</strong> de{" "}
          <strong className="text-primary">Toulouse</strong> et ses alentours.
        </p>
      </header>

      {upcomingEvents.length > 0 ? (
        <section aria-label="Événements à venir" className="mb-12">
          <ul className="grid gap-4 lg:grid-cols-2">
            {upcomingEvents.map((event) => (
              <li key={event.href}>
                <FeaturedEventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="gap-x-8 lg:columns-2">
        {groups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={group.id}
            className="mb-10 break-inside-avoid"
          >
            <h2 id={group.id} className="mb-3 text-xl font-bold">
              {group.theme}
            </h2>
            <ul className="flex flex-col gap-3">
              {group.organizations.map((organization) => (
                <li key={organization.name}>
                  <OrganizationCard {...organization} icon={group.icon} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
