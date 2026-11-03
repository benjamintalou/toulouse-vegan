import type { MetadataRoute } from "next";
import { events } from "@/lib/events";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...events.map((event) => ({
      url: absoluteUrl(event.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(event.poster.src)],
    })),
  ];
}
