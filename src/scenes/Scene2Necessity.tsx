import { FONT_SANS, FONT_MONO } from "../fonts";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "@remotion/core";

const fines = [
  { level: "Nivel 1", type: "Falta de conocimiento", min: "$145", max: "$29,211" },
  { level: "Nivel 2", type: "Causa razonable", min: "$1,461", max: "$58,423" },
  { level: "Nivel 3", type: "Negligencia corregida", min: "$14,602", max: "$58,423" },
  { level: "Nivel 4", type: "Negligencia intencional", min: "$58,423", max: "$1,919,173" },
];

export const Scene2Necessity = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [130, 149], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = fadeIn * fadeOut;

  // Question appears first
  const questionScale = spring({ frame, fps, config: { damping: 12, stiffness: 100, mass: 0.7 } });

  // "Sí" slams in at frame 25
  const answerScale = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 8, stiffness: 200, mass: 0.4 } });
  const answerOpacity = interpolate(frame, [25, 35], [0, 1], { extrapolateRight: "clamp" });

  // Table rows stagger in after frame 40
  const rowDelays = [40, 55, 70, 85];

  return (
    <AbsoluteFill style={{
      background: "#0D0A0A",
      opacity: alpha,
    }}>
      {/* Red glow background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,59,48,0.18), transparent)",
      }} />

      {/* Safe zone */}
      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 60,
        right: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 20,
      }}>
        {/* Badge */}
        <div style={{
          transform: `scale(${questionScale})`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}>
          <div style={{
            background: "rgba(255,59,48,0.2)",
            border: "1px solid rgba(255,59,48,0.5)",
            borderRadius: 8,
            padding: "6px 16px",
            fontSize: 28,
            fontWeight: 700,
            color: "#FF3B30",
            fontFamily: FONT_SANS,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>⚖️ Alerta Legal HIPAA</div>
        </div>

        {/* Question */}
        <div style={{
          transform: `scale(${questionScale})`,
          fontSize: 52,
          fontWeight: 800,
          color: "white",
          fontFamily: FONT_SANS,
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          ¿Usar una VPN para<br/>simular estar en EE.UU.<br/>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>viola la ley federal?</span>
        </div>

        {/* Big YES answer */}
        <div style={{
          transform: `scale(${answerScale})`,
          opacity: answerOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#FF3B30",
            fontFamily: FONT_SANS,
            lineHeight: 1,
          }}>SÍ.</div>
          <div style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.7)",
            fontFamily: FONT_SANS,
            fontWeight: 600,
            lineHeight: 1.3,
          }}>
            Viola directamente<br/>
            <span style={{ color: "#FF6B6B" }}>HIPAA + regulaciones CMS</span>
          </div>
        </div>

        {/* Fines table */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {fines.map((fine, i) => {
            const rowScale = spring({ frame: Math.max(0, frame - rowDelays[i]), fps, config: { damping: 14, stiffness: 120 } });
            const rowOpacity = interpolate(frame, [rowDelays[i], rowDelays[i] + 12], [0, 1], { extrapolateRight: "clamp" });
            const isMax = i === 3;

            return (
              <div key={i} style={{
                transform: `scale(${rowScale})`,
                opacity: rowOpacity,
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: isMax ? "rgba(255,59,48,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isMax ? "rgba(255,59,48,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 12,
                padding: "14px 20px",
              }}>
                <div style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: isMax ? "#FF3B30" : "rgba(255,255,255,0.4)",
                  fontFamily: FONT_MONO,
                  minWidth: 80,
                }}>{fine.level}</div>
                <div style={{
                  flex: 1,
                  fontSize: 28,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: FONT_SANS,
                  fontWeight: 500,
                }}>{fine.type}</div>
                <div style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: isMax ? "#FF3B30" : "#FF8C7A",
                  fontFamily: FONT_MONO,
                }}>{fine.max}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
