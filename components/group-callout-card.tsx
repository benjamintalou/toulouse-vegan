import { CalendarPlus } from "lucide-react";
import { Facebook, Instagram } from "@/components/brand-icons";
import { contactOrganization, type GroupCallout } from "@/lib/links";

const contactLinks = contactOrganization.links.flatMap(({ platform, href }) => {
  if (platform === "instagram") return [{ href, label: "Instagram", icon: Instagram }];
  if (platform === "facebook") return [{ href, label: "Facebook", icon: Facebook }];
  return [];
});

/** Invitation card closing a group's grid, pointing to the collective's social pages. */
export function GroupCalloutCard({ title, description }: GroupCallout) {
  return (
    <aside className="flex h-full flex-col gap-4 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-5">
      <div className="flex items-start gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
          <CalendarPlus className="size-5.5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-snug font-bold">{title}</h3>
          <p className="mt-0.5 text-muted-foreground">{description}</p>
        </div>
      </div>
      <ul className="mt-auto flex flex-wrap gap-2">
        {contactLinks.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {label}
              <span className="sr-only">
                {" "}
                de {contactOrganization.name} (s’ouvre dans un nouvel onglet)
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
