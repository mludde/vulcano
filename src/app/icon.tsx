import { ImageResponse } from "next/og";
import { loadKaushanScript } from "@/lib/og-font";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const kaushanScript = await loadKaushanScript();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1e2b29",
          color: "#2dd4c7",
          fontSize: 26,
          fontFamily: "Kaushan Script",
        }}
      >
        V
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Kaushan Script", data: kaushanScript, style: "normal", weight: 400 }],
    },
  );
}
