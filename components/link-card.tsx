import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { LinkItem } from "@/lib/links";

const cardClassName =
  "group flex min-h-14 items-center gap-4 rounded-lg border bg-card/85 px-5 py-3 backdrop-blur-sm transition-colors duration-200 hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function LinkCard({ label, platform, href, icon: Icon }: LinkItem) {
  const isInternal = href.startsWith("/");

  const content = (
    <>
      <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-semibold leading-snug">{label}</span>
        <span className="text-sm text-muted-foreground">{platform}</span>
      </span>
      {isInternal ? (
        <ChevronRight
          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      ) : (
        <>
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
          <span className="sr-only">(s’ouvre dans un nouvel onglet)</span>
        </>
      )}
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClassName}
    >
      {content}
    </a>
  );
}
