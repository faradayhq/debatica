import { ImageResponse } from "next/og";

export const alt = "Debatica — See where public opinion splits";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 82px", background: "#111315", color: "#f2f4f3", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, fontWeight: 700 }}>
        <div style={{ width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #347b55", borderRadius: 18, background: "#173d2b", color: "#f4f7f5" }}>D</div>
        debatica
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ maxWidth: 940, fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-3px" }}>See where public opinion splits.</div>
        <div style={{ fontSize: 28, color: "#aeb6bd" }}>Ask. Vote. Debate anonymously.</div>
      </div>
      <div style={{ width: 180, height: 8, display: "flex", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: "58%", background: "#46c37b" }} />
        <div style={{ width: "42%", background: "#9a86b8" }} />
      </div>
    </div>,
    size
  );
}
