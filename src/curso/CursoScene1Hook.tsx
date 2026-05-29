import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { FONT_SANS, FONT_MONO } from "../fonts";

export const CursoScene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [165, 179], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const badgeScale = spring({ frame, fps, config: { damping: 11, stiffness: 130, mass: 0.6 } });
  const titleScale = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 12, stiffness: 110, mass: 0.7 } });
  const yearScale  = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 12, stiffness: 110 } });
  const subOp      = interpolate(frame, [28, 45], [0, 1], { extrapolateRight: "clamp" });
  const subY       = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 14, stiffness: 100 } });
  const freeOp     = interpolate(frame, [42, 58], [0, 1], { extrapolateRight: "clamp" });
  const freeScale  = spring({ frame: Math.max(0, frame - 42), fps, config: { damping: 10, stiffness: 150, mass: 0.5 } });

  const glow = interpolate(Math.sin((frame / 30) * Math.PI), [-1, 1], [0.14, 0.26]);

  return (
    <AbsoluteFill style={{ background: "#0A2540", opacity: fadeIn * fadeOut }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(41,171,226,${glow}), transparent)` }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        position: "absolute", top: 150, bottom: 170, left: 60, right: 60,
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      }}>
        {/* GRATUITO badge */}
        <div style={{
          transform: `scale(${badgeScale})`,
          background: "rgba(52,199,89,0.18)",
          border: "2px solid rgba(52,199,89,0.6)",
          borderRadius: 100, padding: "14px 44px",
          fontSize: 42, fontWeight: 800, color: "#34C759",
          fontFamily: FONT_SANS, letterSpacing: "0.1em",
          marginBottom: 36,
        }}>🎓 100% GRATUITO</div>

        {/* CURSO */}
        <div style={{
          transform: `scale(${titleScale})`,
          fontSize: 90, fontWeight: 900, color: "white",
          fontFamily: FONT_SANS, letterSpacing: "-0.03em",
          lineHeight: 1, marginBottom: 4, textAlign: "center",
        }}>CURSO</div>

        {/* Normativas de Conexión para los portales del Mercado de Salud 2026 */}
        <div style={{
          transform: `scale(${yearScale})`,
          fontSize: 52, fontWeight: 700,
          color: "rgba(255,255,255,0.88)",
          fontFamily: FONT_SANS, letterSpacing: "-0.02em",
          lineHeight: 1.25, marginBottom: 48, textAlign: "center",
        }}>Normativas de Conexión<br/>para los portales del<br/>Mercado de Salud 2026</div>

        {/* Subtitle */}
        <div style={{
          transform: `translateY(${interpolate(subY, [0, 1], [30, 0])}px)`,
          opacity: subOp,
          fontSize: 46, fontWeight: 600, color: "rgba(255,255,255,0.75)",
          fontFamily: FONT_SANS, textAlign: "center", lineHeight: 1.3,
          marginBottom: 44,
        }}>
          Cumplimiento para agentes<br/>del Marketplace de Salud
        </div>

        {/* Free tag */}
        <div style={{
          transform: `scale(${freeScale})`,
          opacity: freeOp,
          display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center",
        }}>
          {["Sin costo", "Para agentes", "Actualizado 2026"].map((t, i) => (
            <div key={i} style={{
              background: "rgba(41,171,226,0.15)",
              border: "1px solid rgba(41,171,226,0.4)",
              borderRadius: 10, padding: "12px 24px",
              fontSize: 36, fontWeight: 600, color: "#29ABE2",
              fontFamily: FONT_SANS,
            }}>{t}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
