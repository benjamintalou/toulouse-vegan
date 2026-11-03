/** Minimal schema.org typings — just enough to keep the JSON-LD objects honest. */
export type Thing = Record<string, unknown> & { "@type": string };

export type WithContext<T extends Thing> = T & {
  "@context": "https://schema.org";
};
