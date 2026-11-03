import { Facebook, Instagram } from "@/components/brand-icons";
import type { Organization, Platform } from "@/lib/links";

const labels: Record<Platform, string> = {
  facebook: "Facebook",
  "facebook-group": "Groupe Facebook",
  instagram: "Instagram",
  web: "Site web",
};

export function ContactLinks({ organization }: { organization: Organization }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {organization.links.map(({ platform, href }) => {
        const Icon = platform === "instagram" ? Instagram : Facebook;
        return (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-bold text-accent-foreground transition-colors hover:bg-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-event-accent"
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {labels[platform]}
              <span className="sr-only">
                {" "}
                de {organization.name} (s’ouvre dans un nouvel onglet)
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
