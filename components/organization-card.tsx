import type { ComponentType } from "react";
import { Globe, type LucideProps } from "lucide-react";
import { Facebook, Instagram } from "@/components/brand-icons";
import type { Organization, Platform } from "@/lib/links";

const platforms: Record<
  Platform,
  { label: string; icon: ComponentType<LucideProps>; iconClassName: string }
> = {
  facebook: { label: "Facebook", icon: Facebook, iconClassName: "text-facebook" },
  "facebook-group": {
    label: "Groupe Facebook",
    icon: Facebook,
    iconClassName: "text-facebook",
  },
  instagram: {
    label: "Instagram",
    icon: Instagram,
    iconClassName: "text-instagram",
  },
  web: { label: "Site web", icon: Globe, iconClassName: "text-primary" },
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
    <article className="flex flex-col gap-3 rounded-xl border bg-card/85 p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {links.map(({ platform, href }) => {
          const { label, icon: PlatformIcon, iconClassName } = platforms[platform];
          return (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border bg-card px-4 text-sm font-medium transition-colors duration-200 hover:border-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <PlatformIcon
                  className={`size-4 shrink-0 ${iconClassName}`}
                  aria-hidden="true"
                />
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
