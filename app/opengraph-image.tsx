import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Websight — Webdesign & SEO aus Balingen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#000000",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 32,
          }}
        >
          Websight
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#fbfbf4",
            maxWidth: 900,
          }}
        >
          Webdesign & SEO aus Balingen.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "rgba(251,251,244,0.55)",
            marginTop: 28,
            maxWidth: 800,
          }}
        >
          Websites, die für dich arbeiten.
        </div>
      </div>
    ),
    { ...size }
  );
}
