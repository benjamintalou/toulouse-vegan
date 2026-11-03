import type { ComponentType } from "react";
import { Globe, type LucideProps } from "lucide-react";
import { Facebook, Instagram } from "@/components/brand-icons";
import type { Organization, Platform } from "@/lib/links";

const platforms: Record<
  Platform,
  { label: string; icon: ComponentType<LucideProps> }
> = {
  facebook: { label: "Facebook", icon: Facebook },
  "facebook-group": { label: "Groupe Facebook", icon: Facebook },
  instagram: { label: "Instagram", icon: Instagram },
  web: { label: "Site web", icon: Globe },
};

type OrganizationCardProps = Organization & {
  icon: ComponentType<LucideProps>;
};

export function OrganizationCard({
  name,
  description,
  links,
  icon: Icon,
}: OrganizationCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl bg-card p-5 shadow-card">
      <div className="flex items-start gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5.5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-snug font-bold">{name}</h3>
          <p className="mt-0.5 text-muted-foreground">{description}</p>
        </div>
      </div>
      <ul className="mt-auto flex flex-wrap gap-2">
        {links.map(({ platform, href }) => {
          const { label, icon: PlatformIcon } = platforms[platform];
          return (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border-2 border-primary bg-card px-4 text-sm font-bold text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <PlatformIcon className="size-4 shrink-0" aria-hidden="true" />
                {label}
                <span className="sr-only">
                  {" "}
                  de {name} (s’ouvre dans un nouvel onglet)
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
