import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { formatDay, formatHours, marcheDeNoel as event } from "@/lib/events";

export const alt = `${event.title} – ${formatDay(event)}, ${event.place}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Landscape share card. The poster alone is portrait, so social networks and
 * messaging apps would crop the date and place out of it.
 */
export default async function Image() {
  const [bold, regular, poster] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")),
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "public/affiche-noel.jpg")),
  ]);
  const posterSrc = `data:image/jpeg;base64,${poster.toString("base64")}`;
  const day = formatDay(event);
  const posterHeight = 550;
  const posterWidth = Math.round((posterHeight * event.poster.width) / event.poster.height);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "40px 56px",
          background: "#244532",
          color: "#f6f6ea",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", flex: 1, minWidth: 0, flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#ecd28a", letterSpacing: 3 }}>
            ÉVÉNEMENT · TOULOUSE
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, display: "flex", flexWrap: "wrap" }}>
            {event.title}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, display: "flex", flexDirection: "column" }}>
            <div>{`${day[0].toUpperCase()}${day.slice(1)} · ${formatHours(event)}`}</div>
            <div>{event.place}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 8 }}>
            {event.isFree ? (
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#244532",
                  background: "#ecd28a",
                  borderRadius: 12,
                  padding: "8px 20px",
                }}
              >
                Entrée gratuite
              </div>
            ) : null}
            <div style={{ fontSize: 26, opacity: 0.85 }}>toulouse-vegan.fr</div>
          </div>
        </div>
        <img
          src={posterSrc}
          width={posterWidth}
          height={posterHeight}
          alt=""
          style={{ borderRadius: 16, flexShrink: 0 }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
