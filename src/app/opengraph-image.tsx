import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { loadArimoBold, loadArimoRegular, loadScriptFont } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [scriptFont, arimoBold, arimoRegular] = await Promise.all([
    loadScriptFont(),
    loadArimoBold(),
    loadArimoRegular(),
  ]);

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
          backgroundColor: "#1e2b29",
          color: "#eaf5f3",
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontFamily: "Sacramento",
            color: "#efa390",
          }}
        >
          {siteConfig.logoName}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "Arimo",
            marginTop: 24,
            maxWidth: 960,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ fontSize: 30, fontFamily: "Arimo", marginTop: 28, color: "#9dbab5" }}>
          Agente Immobiliare ad Aosta
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sacramento", data: scriptFont, style: "normal", weight: 400 },
        { name: "Arimo", data: arimoBold, style: "normal", weight: 700 },
        { name: "Arimo", data: arimoRegular, style: "normal", weight: 400 },
      ],
    },
  );
}
