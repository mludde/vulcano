import { ImageResponse } from "next/og";
import { loadScriptFont } from "@/lib/og-font";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const scriptFont = await loadScriptFont();

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
          color: "#d9a2a7",
          fontSize: 26,
          fontFamily: "Allura",
        }}
      >
        V
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Allura", data: scriptFont, style: "normal", weight: 400 }],
    },
  );
}
