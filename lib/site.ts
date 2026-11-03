export const siteUrl = new URL("https://www.toulouse-vegan.fr");

export const siteName = "Toulouse vegan";

export const siteTitle =
  "Toulouse vegan – Guide des initiatives véganes à Toulouse";

export const siteDescription =
  "Événements, restaurants, groupes et associations véganes à Toulouse et ses alentours : le guide pour trouver la communauté végane toulousaine.";

/** Absolute URL for a site path, e.g. `absoluteUrl("/marche-de-noel")`. */
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
