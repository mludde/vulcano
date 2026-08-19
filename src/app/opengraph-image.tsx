import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#2b2723",
          color: "#f6f4f0",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e8703a",
            fontWeight: 700,
          }}
        >
          {siteConfig.shortName}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24, maxWidth: 960 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#b0a89e" }}>
          Agente Immobiliare ad Aosta
        </div>
      </div>
    ),
    { ...size },
  );
}
