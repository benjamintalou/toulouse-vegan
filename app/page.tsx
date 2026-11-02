import { LinkCard } from "@/components/link-card";
import { groupedLinks } from "@/lib/links";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12 sm:py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Toulouse vegan
        </h1>
        <p className="mt-4 text-lg text-balance sm:text-xl">
          Trouver les initiatives, événements et lieux{" "}
          <strong className="text-primary">végans</strong> de{" "}
          <strong className="text-primary">Toulouse</strong> et ses alentours.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {groupedLinks.map((group) => (
          <section key={group.id} aria-labelledby={group.id}>
            <h2 id={group.id} className="mb-3 text-xl font-bold">
              {group.theme}
            </h2>
            <ul className="flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <LinkCard {...link} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
