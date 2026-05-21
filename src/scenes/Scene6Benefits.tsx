import { FONT_SANS, FONT_MONO } from "../fonts";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const benefits = [
  { icon: "✅", text: "Menos bloqueos, cero sustos", color: "#34C759" },
  { icon: "⚡", text: "Misma IP siempre, sin cambios", color: "#60A5FA" },
  { icon: "⭐", text: "Compliant HIPAA y CMS", color: "#FFD60A" },
];

export const Scene6Benefits = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [75, 89], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = fadeIn * fadeOut;

  // Mini product card at top
  const cardScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const lineDelays = [18, 33, 48];

  return (
    <AbsoluteFill style={{
      background: "#0A2540",
      opacity: alpha,
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(0,102,255,0.16), transparent)",
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
        justifyContent: "center",
        gap: 0,
      }}>
        {/* Mini product card */}
        <div style={{
          transform: `scale(${cardScale})`,
          background: "linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,64,204,0.08))",
          border: "1.5px solid rgba(0,102,255,0.35)",
          borderRadius: 20,
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 36,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #0066FF, #0040CC)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 20px rgba(0,102,255,0.4)",
          }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "white", fontFamily: FONT_SANS }}>TP</span>
          </div>
          <div>
            <div style={{
              fontSize: 38,
              fontWeight: 800,
              color: "white",
              fontFamily: FONT_SANS,
              letterSpacing: "-0.02em",
            }}>Escritorio Seguro</div>
            <div style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.45)",
              fontFamily: FONT_MONO,
            }}>Maint.less Desktop</div>
          </div>
          <div style={{
            marginLeft: "auto",
            background: "rgba(52,199,89,0.15)",
            border: "1px solid rgba(52,199,89,0.4)",
            borderRadius: 10,
            padding: "8px 18px",
            fontSize: 28,
            fontWeight: 700,
            color: "#34C759",
            fontFamily: FONT_SANS,
          }}>ACTIVO 🇺🇸</div>
        </div>

        {/* Section title */}
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: "white",
          fontFamily: FONT_SANS,
          letterSpacing: "-0.03em",
          marginBottom: 28,
          transform: `scale(${cardScale})`,
        }}>
          La seguridad<br/>
          <span style={{
            background: "linear-gradient(90deg, #60A5FA, #0066FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>ya no es opcional.</span>
        </div>

        {/* Benefit lines */}
        {benefits.map((b, i) => {
          const slideX = spring({ frame: Math.max(0, frame - lineDelays[i]), fps, config: { damping: 13, stiffness: 110 } });
          const lineOp = interpolate(frame, [lineDelays[i], lineDelays[i] + 12], [0, 1], { extrapolateRight: "clamp" });
          const translateX = interpolate(slideX, [0, 1], [120, 0]);

          return (
            <div key={i} style={{
              transform: `translateX(${translateX}px)`,
              opacity: lineOp,
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "18px 0",
              borderBottom: i < benefits.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{
                fontSize: 44,
                lineHeight: 1,
                flexShrink: 0,
              }}>{b.icon}</div>
              <div style={{
                fontSize: 38,
                fontWeight: 700,
                color: b.color,
                fontFamily: FONT_SANS,
                letterSpacing: "-0.01em",
              }}>{b.text}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
