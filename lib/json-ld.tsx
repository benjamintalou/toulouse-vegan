import type { Thing, WithContext } from "./schema-types";

/**
 * Renders a schema.org JSON-LD block. The `<` escape prevents a value that
 * contains `</script>` from closing the tag.
 */
export function JsonLd({ data }: { data: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
