import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const alt = `${siteName} – initiatives, événements et lieux végans à Toulouse`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [bold, regular, pig] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")),
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "public/pig.png")),
  ]);
  const pigSrc = `data:image/png;base64,${pig.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 80,
          background: "linear-gradient(135deg, #fbf6ea 0%, #f1ead6 100%)",
          color: "#2d3b32",
          fontFamily: "Geist",
        }}
      >
        <img
          src={pigSrc}
          width={300}
          height={300}
          alt=""
          style={{ borderRadius: 48, flexShrink: 0 }}
        />
        <div style={{ display: "flex", flex: 1, minWidth: 0, flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 80, fontWeight: 700, color: "#236b35", letterSpacing: -2 }}>
            {siteName}
          </div>
          <div style={{ fontSize: 38, lineHeight: 1.3, display: "flex", flexWrap: "wrap" }}>
            Initiatives, événements et lieux végans de Toulouse et ses alentours.
          </div>
          <div style={{ marginTop: 16, fontSize: 28, color: "#236b35", fontWeight: 700 }}>
            toulouse-vegan.fr
          </div>
        </div>
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
