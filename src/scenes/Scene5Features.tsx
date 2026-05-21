import { FONT_SANS, FONT_MONO } from "../fonts";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const features = [
  {
    icon: "🌐",
    title: "IP USA Real Fija",
    desc: "Miami / Dallas — siempre la misma",
    color: "#0066FF",
    bg: "rgba(0,102,255,0.12)",
    border: "rgba(0,102,255,0.35)",
  },
  {
    icon: "🖥️",
    title: "Windows Seguro Dedicado",
    desc: "Entorno limpio + antivirus empresarial",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.3)",
  },
  {
    icon: "🔒",
    title: "Sin VPN — 100% Legal",
    desc: "Compliant HIPAA · Cumple CMS",
    color: "#34C759",
    bg: "rgba(52,199,89,0.1)",
    border: "rgba(52,199,89,0.3)",
  },
];

export const Scene5Features = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [105, 119], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = fadeIn * fadeOut;

  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 110 } });

  const cardDelays = [15, 30, 45];

  return (
    <AbsoluteFill style={{
      background: "#0A2540",
      opacity: alpha,
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,102,255,0.14), transparent)",
      }} />

      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 60,
        right: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
      }}>
        {/* Title */}
        <div style={{
          transform: `scale(${titleScale})`,
          textAlign: "center",
          marginBottom: 8,
        }}>
          <div style={{
            fontSize: 56,
            fontWeight: 900,
            color: "white",
            fontFamily: FONT_SANS,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}>
            Trabaja tranquilo.<br/>
            <span style={{
              background: "linear-gradient(90deg, #60A5FA, #0066FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Protege tu operación.</span>
          </div>
        </div>

        {/* Feature cards */}
        {features.map((f, i) => {
          const cardScale = spring({ frame: Math.max(0, frame - cardDelays[i]), fps, config: { damping: 13, stiffness: 120 } });
          const cardOp = interpolate(frame, [cardDelays[i], cardDelays[i] + 15], [0, 1], { extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              transform: `scale(${cardScale})`,
              opacity: cardOp,
              background: f.bg,
              border: `1.5px solid ${f.border}`,
              borderRadius: 20,
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
            }}>
              <div style={{
                fontSize: 52,
                lineHeight: 1,
                flexShrink: 0,
              }}>{f.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: f.color,
                  fontFamily: FONT_SANS,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}>{f.title}</div>
                <div style={{
                  fontSize: 32,
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: FONT_SANS,
                  fontWeight: 500,
                  marginTop: 4,
                }}>{f.desc}</div>
              </div>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: f.color,
                boxShadow: `0 0 14px ${f.color}`,
                flexShrink: 0,
              }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
