import { FONT_SANS, FONT_MONO } from "../fonts";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const fines = [
  { level: "Nivel 1", type: "Falta de conocimiento", max: "$29,211" },
  { level: "Nivel 2", type: "Causa razonable", max: "$58,423" },
  { level: "Nivel 3", type: "Negligencia corregida", max: "$58,423" },
  { level: "Nivel 4", type: "Negligencia intencional", max: "$1,919,173" },
];

export const Scene2Necessity = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [130, 149], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = fadeIn * fadeOut;

  const questionScale = spring({ frame, fps, config: { damping: 12, stiffness: 100, mass: 0.7 } });
  const answerScale = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 8, stiffness: 200, mass: 0.4 } });
  const answerOpacity = interpolate(frame, [25, 38], [0, 1], { extrapolateRight: "clamp" });

  const rowDelays = [42, 58, 74, 90];

  return (
    <AbsoluteFill style={{ background: "#0D0A0A", opacity: alpha }}>

      {/* Red glow — centered */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(255,59,48,0.16), transparent)",
      }} />

      {/* Safe zone — fully centered vertically */}
      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 60,
        right: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 0,
      }}>

        {/* Badge */}
        <div style={{
          transform: `scale(${questionScale})`,
          marginBottom: 28,
        }}>
          <div style={{
            background: "rgba(255,59,48,0.2)",
            border: "1px solid rgba(255,59,48,0.5)",
            borderRadius: 10,
            padding: "10px 24px",
            fontSize: 32,
            fontWeight: 700,
            color: "#FF3B30",
            fontFamily: FONT_SANS,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textAlign: "center",
          }}>⚖️ Alerta Legal HIPAA</div>
        </div>

        {/* Question */}
        <div style={{
          transform: `scale(${questionScale})`,
          fontSize: 60,
          fontWeight: 800,
          color: "white",
          fontFamily: FONT_SANS,
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
          marginBottom: 28,
          textAlign: "center",
        }}>
          ¿Usar una VPN para<br/>simular estar en EE.UU.<br/>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>viola la ley federal?</span>
        </div>

        {/* Big YES */}
        <div style={{
          transform: `scale(${answerScale})`,
          opacity: answerOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginBottom: 36,
          width: "100%",
        }}>
          <div style={{
            fontSize: 100,
            fontWeight: 900,
            color: "#FF3B30",
            fontFamily: FONT_SANS,
            lineHeight: 1,
          }}>SÍ.</div>
          <div style={{
            fontSize: 38,
            color: "rgba(255,255,255,0.75)",
            fontFamily: FONT_SANS,
            fontWeight: 600,
            lineHeight: 1.3,
          }}>
            Viola directamente<br/>
            <span style={{ color: "#FF6B6B" }}>HIPAA + regulaciones CMS</span>
          </div>
        </div>

        {/* Fines table */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
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
                gap: 16,
                background: isMax ? "rgba(255,59,48,0.15)" : "rgba(255,255,255,0.05)",
                border: `1.5px solid ${isMax ? "rgba(255,59,48,0.45)" : "rgba(255,255,255,0.09)"}`,
                borderRadius: 14,
                padding: "18px 24px",
              }}>
                <div style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: isMax ? "#FF3B30" : "rgba(255,255,255,0.4)",
                  fontFamily: FONT_MONO,
                  minWidth: 90,
                }}>{fine.level}</div>
                <div style={{
                  flex: 1,
                  fontSize: 34,
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: FONT_SANS,
                  fontWeight: 500,
                }}>{fine.type}</div>
                <div style={{
                  fontSize: 38,
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
