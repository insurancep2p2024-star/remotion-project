import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { FONT_SANS, FONT_MONO } from "../fonts";

const questions = [
  "¿Cuáles son las 3 reglas CMS 2026?",
  "¿Qué actividades son de mayor riesgo?",
  "¿Cómo proteger tu negocio legalmente?",
];

export const CursoScene3QA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [105, 119], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const iconScale  = spring({ frame, fps, config: { damping: 10, stiffness: 140, mass: 0.5 } });
  const titleScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 110 } });
  const subOp      = interpolate(frame, [22, 36], [0, 1], { extrapolateRight: "clamp" });

  const pulse = interpolate(Math.sin((frame / 20) * Math.PI), [-1, 1], [0.96, 1.04]);
  const glow  = interpolate(Math.sin((frame / 35) * Math.PI), [-1, 1], [0.12, 0.28]);

  return (
    <AbsoluteFill style={{ background: "#050E1A", opacity: fadeIn * fadeOut }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,200,0,${glow}), transparent)` }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
      }} />

      <div style={{
        position: "absolute", top: 150, bottom: 170, left: 60, right: 60,
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      }}>
        {/* Big ? icon */}
        <div style={{
          transform: `scale(${iconScale}) scale(${pulse})`,
          fontSize: 120, lineHeight: 1, marginBottom: 32,
        }}>❓</div>

        <div style={{
          transform: `scale(${titleScale})`,
          fontSize: 76, fontWeight: 900, color: "white",
          fontFamily: FONT_SANS, letterSpacing: "-0.03em",
          lineHeight: 1.1, textAlign: "center", marginBottom: 12,
        }}>Sesión de<br/>Preguntas</div>

        <div style={{
          opacity: subOp,
          fontSize: 42, fontWeight: 600, color: "#FFD60A",
          fontFamily: FONT_SANS, marginBottom: 48, textAlign: "center",
        }}>¡Repasemos lo aprendido!</div>

        {/* Sample questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", opacity: subOp }}>
          {questions.map((q, i) => {
            const qOp = interpolate(frame, [35 + i * 14, 50 + i * 14], [0, 1], { extrapolateRight: "clamp" });
            const qX  = spring({ frame: Math.max(0, frame - (35 + i * 14)), fps, config: { damping: 14, stiffness: 110 } });
            return (
              <div key={i} style={{
                transform: `translateX(${interpolate(qX, [0, 1], [80, 0])}px)`,
                opacity: qOp,
                display: "flex", alignItems: "center", gap: 16,
                background: "rgba(255,214,0,0.08)",
                border: "1px solid rgba(255,214,0,0.25)",
                borderLeft: "4px solid #FFD60A",
                borderRadius: 14, padding: "18px 22px",
              }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>💬</div>
                <div style={{
                  fontSize: 36, fontWeight: 600, color: "rgba(255,255,255,0.85)",
                  fontFamily: FONT_SANS, lineHeight: 1.3,
                }}>{q}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
