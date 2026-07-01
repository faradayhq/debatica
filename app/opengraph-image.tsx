import { ImageResponse } from "next/og";

export const alt = "Debatica — See where public opinion splits";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f3d2e",
        color: "#f5f1e7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 840,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: "translateY(-2px)",
        }}
      >
        <div
          style={{
            width: 104,
            height: 104,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 52,
            background: "#164a39",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          D
        </div>
        <div
          style={{
            marginTop: 38,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-4px",
          }}
        >
          Debatica
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 34,
            fontWeight: 400,
            lineHeight: 1.2,
            color: "#dce4df",
            letterSpacing: "-0.5px",
          }}
        >
          See where public opinion splits.
        </div>
      </div>
    </div>,
    size
  );
}
