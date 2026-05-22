import { FONT_SANS, FONT_MONO } from "../fonts";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Scene7CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const priceScale = spring({ frame, fps, config: { damping: 10, stiffness: 130, mass: 0.6 } });
  const line1Scale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 13, stiffness: 110 } });
  const line2Scale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 13, stiffness: 110 } });
  const line3Scale = spring({ frame: Math.max(0, frame - 48), fps, config: { damping: 13, stiffness: 110 } });
  const line1Op = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  const line2Op = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" });
  const line3Op = interpolate(frame, [48, 62], [0, 1], { extrapolateRight: "clamp" });

  const urlPulse = interpolate(Math.sin((frame / 20) * Math.PI), [-1, 1], [1.0, 1.03]);
  const badgePulse = interpolate(Math.sin((frame / 18) * Math.PI), [-1, 1], [0.97, 1.03]);
  const glowIntensity = interpolate(Math.sin((frame / 25) * Math.PI), [-1, 1], [0.2, 0.38]);

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
        gap: 0,
      }}>

        {/* Badge */}
        <div style={{
          transform: `scale(${badgePulse})`,
          background: "rgba(255,59,48,0.15)",
          border: "1.5px solid rgba(255,59,48,0.5)",
          borderRadius: 100,
          padding: "14px 36px",
          fontSize: 36,
          fontWeight: 700,
          color: "#FF3B30",
          fontFamily: FONT_SANS,
          letterSpacing: "0.04em",
          marginBottom: 36,
          textAlign: "center",
        }}>
          2026 — Cero tolerancia
        </div>

        {/* Price */}
        <div style={{
          transform: `scale(${priceScale})`,
          textAlign: "center",
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 44,
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            fontFamily: FONT_SANS,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>Individual · 1 usuario</div>
          <div style={{
            display: "flex", alignItems: "flex-start",
            justifyContent: "center", gap: 8, lineHeight: 1,
          }}>
            <span style={{ fontSize: 56, fontWeight: 700, color: "rgba(255,255,255,0.6)", fontFamily: FONT_SANS, marginTop: 20 }}>$</span>
            <span style={{ fontSize: 160, fontWeight: 900, color: "white", fontFamily: FONT_SANS, letterSpacing: "-0.05em", lineHeight: 1 }}>50</span>
            <span style={{ fontSize: 52, fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: FONT_SANS, marginTop: 28, alignSelf: "flex-end", paddingBottom: 10 }}>/mes</span>
          </div>
        </div>

        {/* Tags */}
        <div style={{
          transform: `scale(${line1Scale})`,
          opacity: line1Op,
          display: "flex", gap: 16, flexWrap: "wrap",
          justifyContent: "center", marginBottom: 32,
        }}>
          {["IP USA Dedicada", "Windows Seguro", "Soporte 24/7", "Sin contrato"].map((tag, i) => (
            <div key={i} style={{
              background: "rgba(0,102,255,0.15)",
              border: "1px solid rgba(0,102,255,0.4)",
              borderRadius: 10, padding: "12px 24px",
              fontSize: 34, fontWeight: 600,
              color: "#60A5FA", fontFamily: FONT_SANS,
            }}>{tag}</div>
          ))}
        </div>

        {/* CTA button */}
        <div style={{
          transform: `scale(${line2Scale})`,
          opacity: line2Op,
          width: "100%", height: 96,
          borderRadius: 20,
          background: "linear-gradient(135deg, #0066FF, #0040CC)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 16px 48px rgba(0,102,255,0.5)",
          marginBottom: 32,
        }}>
          <span style={{ fontSize: 50, fontWeight: 800, color: "white", fontFamily: FONT_SANS, letterSpacing: "-0.01em" }}>
            Empezar hoy →
          </span>
        </div>

        {/* URL */}
        <div style={{
          transform: `scale(${urlPulse}) scale(${line3Scale})`,
          opacity: line3Op,
          fontSize: 48, fontWeight: 700,
          color: "#60A5FA", fontFamily: FONT_MONO,
          letterSpacing: "0.04em", textAlign: "center",
          marginBottom: 16,
        }}>
          maintless.com
        </div>

        {/* Tagline */}
        <div style={{
          opacity: line3Op * 0.6,
          fontSize: 36, color: "rgba(255,255,255,0.4)",
          fontFamily: FONT_SANS, textAlign: "center",
        }}>
          No es un gasto. Es el seguro de tu negocio.
        </div>

      </div>
    </AbsoluteFill>
  );
};
