export const siteUrl = new URL("https://www.toulouse-vegan.fr");

export const siteName = "Toulouse vegan";

export const siteTitle =
  "Toulouse vegan – Guide des initiatives véganes à Toulouse";

export const siteDescription =
  "Événements, restaurants, groupes et associations véganes à Toulouse et ses alentours : le guide pour trouver la communauté végane toulousaine.";

/** Absolute URL for a site path, e.g. `absoluteUrl("/marche-de-noel")`. */
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

/**
 * Tags an outgoing URL so the destination can see the visit came from here,
 * e.g. `withUtmSource("https://321vegan.fr/")` → `https://321vegan.fr/?utm_source=toulouse-vegan.fr`.
 * Keeps any query string the URL already has.
 */
export const withUtmSource = (href: string) => {
  const url = new URL(href);
  url.searchParams.set("utm_source", siteUrl.hostname.replace(/^www\./, ""));
  return url.href;
};
