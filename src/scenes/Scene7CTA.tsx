import { FONT_SANS, FONT_MONO } from "../fonts";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Scene7CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const priceScale = spring({ frame, fps, config: { damping: 10, stiffness: 130, mass: 0.6 } });
  const line1Scale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 13, stiffness: 110 } });
  const line2Scale = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 13, stiffness: 110 } });
  const line3Scale = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 13, stiffness: 110 } });
  const line4Scale = spring({ frame: Math.max(0, frame - 68), fps, config: { damping: 13, stiffness: 110 } });

  const line1Op = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  const line2Op = interpolate(frame, [32, 48], [0, 1], { extrapolateRight: "clamp" });
  const line3Op = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });
  const line4Op = interpolate(frame, [68, 82], [0, 1], { extrapolateRight: "clamp" });

  const badgePulse = interpolate(Math.sin((frame / 18) * Math.PI), [-1, 1], [0.97, 1.03]);
  const glowIntensity = interpolate(Math.sin((frame / 25) * Math.PI), [-1, 1], [0.2, 0.38]);

  const tags = ["IP USA Dedicada", "Windows Seguro", "Pay-as-you-go (Pago por uso)"];

  return (
    <AbsoluteFill style={{ background: "#050E1A", opacity: fadeIn }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 85% 70% at 50% 50%, rgba(0,102,255,${glowIntensity}), transparent)`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Safe zone — fully centered */}
      <div style={{
        position: "absolute",
        top: 150, bottom: 170, left: 60, right: 60,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
      }}>

        {/* Badge */}
        <div style={{
          transform: `scale(${badgePulse})`,
          background: "rgba(255,59,48,0.15)",
          border: "1.5px solid rgba(255,59,48,0.5)",
          borderRadius: 100,
          padding: "16px 40px",
          fontSize: 40,
          fontWeight: 700,
          color: "#FF3B30",
          fontFamily: FONT_SANS,
          letterSpacing: "0.04em",
          marginBottom: 32,
          textAlign: "center",
        }}>
          2026 — Cero tolerancia
        </div>

        {/* Price */}
        <div style={{
          transform: `scale(${priceScale})`,
          textAlign: "center",
          marginBottom: 20,
        }}>
          <div style={{
            fontSize: 46,
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
            fontFamily: FONT_SANS,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}>Individual · 1 usuario</div>
          <div style={{
            display: "flex", alignItems: "flex-start",
            justifyContent: "center", gap: 8, lineHeight: 1,
          }}>
            <span style={{ fontSize: 60, fontWeight: 700, color: "rgba(255,255,255,0.65)", fontFamily: FONT_SANS, marginTop: 22 }}>$</span>
            <span style={{ fontSize: 172, fontWeight: 900, color: "white", fontFamily: FONT_SANS, letterSpacing: "-0.05em", lineHeight: 1 }}>50</span>
            <span style={{ fontSize: 56, fontWeight: 600, color: "rgba(255,255,255,0.55)", fontFamily: FONT_SANS, alignSelf: "flex-end", paddingBottom: 14 }}>/mes</span>
          </div>
        </div>

        {/* Tags */}
        <div style={{
          transform: `scale(${line1Scale})`,
          opacity: line1Op,
          display: "flex", gap: 14, flexWrap: "wrap",
          justifyContent: "center", marginBottom: 32,
        }}>
          {tags.map((tag, i) => (
            <div key={i} style={{
              background: "rgba(0,102,255,0.15)",
              border: "1px solid rgba(0,102,255,0.4)",
              borderRadius: 12, padding: "14px 26px",
              fontSize: 36, fontWeight: 600,
              color: "#60A5FA", fontFamily: FONT_SANS,
              textAlign: "center",
            }}>{tag}</div>
          ))}
        </div>

        {/* CTA button */}
        <div style={{
          transform: `scale(${line2Scale})`,
          opacity: line2Op,
          width: "100%", height: 104,
          borderRadius: 22,
          background: "linear-gradient(135deg, #0066FF, #0040CC)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 16px 48px rgba(0,102,255,0.5)",
          marginBottom: 32,
        }}>
          <span style={{ fontSize: 54, fontWeight: 800, color: "white", fontFamily: FONT_SANS, letterSpacing: "-0.01em" }}>
            Empezar hoy →
          </span>
        </div>

        {/* "Pregunta por otros planes" — replaces URL */}
        <div style={{
          transform: `scale(${line3Scale})`,
          opacity: line3Op,
          fontSize: 46,
          fontWeight: 700,
          color: "#60A5FA",
          fontFamily: FONT_SANS,
          letterSpacing: "-0.01em",
          textAlign: "center",
          marginBottom: 20,
        }}>
          Pregunta por otros planes
        </div>

        {/* Tagline — white, bigger */}
        <div style={{
          transform: `scale(${line4Scale})`,
          opacity: line4Op,
          fontSize: 44,
          fontWeight: 700,
          color: "white",
          fontFamily: FONT_SANS,
          textAlign: "center",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}>
          No es un gasto.<br/>Es el seguro de tu negocio.
        </div>

      </div>
    </AbsoluteFill>
  );
};
