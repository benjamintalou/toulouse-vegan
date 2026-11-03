import { events, formatDay, formatHours } from "@/lib/events";
import { contactOrganization, groups } from "@/lib/links";
import { absoluteUrl, siteDescription, siteName } from "@/lib/site";

// Regenerate daily so the events section follows the home page.
export const revalidate = 86400;

/**
 * `/llms.txt` — a Markdown summary of the site for AI assistants, following
 * https://llmstxt.org. Built from the same data as the pages so it never drifts.
 */
export function GET() {
  const eventLines = events.flatMap((event) => [
    `- [${event.title}](${absoluteUrl(event.href)}) : ${formatDay(event)}, ${formatHours(event)}, ${event.place}.${event.isFree ? " Entrée gratuite." : ""}`,
    `  ${event.intro} Au programme : ${event.highlights.map((h) => h[0].toLowerCase() + h.slice(1)).join(" ; ")}.`,
  ]);

  const groupSections = groups.map((group) => {
    const lines = group.organizations.map((organization) => {
      const links = organization.links
        .map(({ href }) => `[${new URL(href).hostname.replace(/^www\./, "")}](${href})`)
        .join(", ");
      return `- ${organization.name} : ${organization.description}. ${links}`;
    });
    return `## ${group.theme}\n\n${lines.join("\n")}`;
  });

  const body = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    `Site : ${absoluteUrl("/")}`,
    "Langue : français. Zone couverte : Toulouse (Haute-Garonne, Occitanie, France) et ses alentours.",
    `${siteName} est un annuaire indépendant. Il ne vend rien : il renvoie vers les restaurants, marchés, groupes et associations véganes de la région.`,
    "",
    "## Événements à venir",
    "",
    ...(eventLines.length ? eventLines : ["- Aucun événement annoncé pour le moment."]),
    "",
    ...groupSections.flatMap((section) => [section, ""]),
    "## Contact",
    "",
    `Pour une question, un lien à ajouter ou un événement à annoncer, écrire à ${contactOrganization.name} : ${contactOrganization.links.map(({ href }) => href).join(", ")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
