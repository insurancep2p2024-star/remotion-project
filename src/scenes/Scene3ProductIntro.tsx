import { FONT_SANS, FONT_MONO } from "../fonts";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const PARTICLE_COUNT = 22;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  angle: (i / PARTICLE_COUNT) * Math.PI * 2,
  speed: 3 + Math.random() * 5,
  size: 6 + Math.random() * 10,
  color: i % 3 === 0 ? "#60A5FA" : i % 3 === 1 ? "#0066FF" : "#ffffff",
  delay: Math.floor(Math.random() * 8),
}));

const benefits = [
  { icon: "✅", text: "Menos bloqueos, cero sustos", color: "#34C759" },
  { icon: "⚡", text: "Misma IP siempre, sin cambios", color: "#60A5FA" },
  { icon: "⭐", text: "Compliant HIPAA y CMS", color: "#FFD60A" },
];

// 8s = 240 frames
// 0–109:  Intro (logo + nombre + eslogan)
// 110–239: Benefits

export const Scene3ProductIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [225, 239], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = fadeIn * fadeOut;

  // Part 1 — Intro
  const logoScale = spring({ frame, fps, config: { damping: 10, stiffness: 150, mass: 0.5 } });
  const nameSlide = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 120 } });
  const sloganOp = interpolate(frame, [20, 38], [0, 1], { extrapolateRight: "clamp" });
  const sloganY = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });

  const introOp = interpolate(frame, [110, 128], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoShrink = interpolate(frame, [110, 128], [1, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoY = interpolate(frame, [110, 128], [0, -320], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Part 2 — Benefits
  const benefitsOp = interpolate(frame, [122, 138], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleScale = spring({ frame: Math.max(0, frame - 122), fps, config: { damping: 12, stiffness: 110 } });
  const lineDelays = [132, 150, 168];

  return (
    <AbsoluteFill style={{ background: "#0A2540", opacity: alpha }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(0,102,255,0.22), transparent)",
      }} />

      {particles.map((p, i) => {
        const pFrame = Math.max(0, frame - p.delay);
        const dist = p.speed * pFrame * 2.5;
        const x = Math.cos(p.angle) * dist;
        const y = Math.sin(p.angle) * dist;
        const op = interpolate(pFrame, [0, 10, 40, 60], [0, 1, 0.6, 0], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            position: "absolute", left: "50%", top: "50%",
            width: p.size, height: p.size, borderRadius: "50%",
            background: p.color,
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            opacity: op, boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }} />
        );
      })}

      {/* Safe zone */}
      <div style={{
        position: "absolute",
        top: 150, bottom: 170, left: 60, right: 60,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
      }}>

        {/* ── PART 1: Logo + name + slogan ── */}
        <div style={{
          opacity: introOp,
          transform: `translateY(${logoY}px) scale(${logoShrink})`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          position: "absolute", width: "100%",
          textAlign: "center",
        }}>
          <div style={{
            transform: `scale(${logoScale})`,
            width: 160, height: 160, borderRadius: 36,
            background: "linear-gradient(135deg, #0066FF, #0040CC)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 56px rgba(0,102,255,0.6)",
            marginBottom: 44,
            border: "1.5px solid rgba(96,165,250,0.4)",
          }}>
            <span style={{ fontSize: 64, fontWeight: 900, color: "white", fontFamily: FONT_SANS, letterSpacing: "-2px" }}>TP</span>
          </div>

          <div style={{
            transform: `translateY(${interpolate(nameSlide, [0, 1], [60, 0])}px)`,
            opacity: nameSlide,
            marginBottom: 28,
          }}>
            <div style={{ fontSize: 108, fontWeight: 900, color: "white", fontFamily: FONT_SANS, letterSpacing: "-0.04em", lineHeight: 1 }}>Escritorio</div>
            <div style={{
              fontSize: 108, fontWeight: 900, fontFamily: FONT_SANS, letterSpacing: "-0.04em", lineHeight: 1,
              background: "linear-gradient(90deg, #60A5FA, #0066FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Seguro</div>
          </div>

          <div style={{
            transform: `translateY(${interpolate(sloganY, [0, 1], [30, 0])}px)`,
            opacity: sloganOp,
            fontSize: 52, fontWeight: 600, color: "rgba(255,255,255,0.65)",
            fontFamily: FONT_SANS, letterSpacing: "-0.01em",
          }}>
            Tu acceso es tu negocio.
          </div>

          <div style={{
            marginTop: 24, opacity: sloganOp * 0.5,
            fontSize: 34, color: "rgba(255,255,255,0.3)",
            fontFamily: FONT_MONO, letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            Maint.less Desktop
          </div>
        </div>

        {/* ── PART 2: Benefits ── */}
        <div style={{
          opacity: benefitsOp,
          position: "absolute", width: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center",
        }}>
          <div style={{
            transform: `scale(${titleScale})`,
            fontSize: 72, fontWeight: 900, color: "white",
            fontFamily: FONT_SANS, letterSpacing: "-0.03em",
            marginBottom: 44, lineHeight: 1.1, textAlign: "center",
          }}>
            La seguridad<br/>
            <span style={{
              background: "linear-gradient(90deg, #60A5FA, #0066FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>ya no es opcional.</span>
          </div>

          {benefits.map((b, i) => {
            const slideX = spring({ frame: Math.max(0, frame - lineDelays[i]), fps, config: { damping: 13, stiffness: 110 } });
            const lineOp = interpolate(frame, [lineDelays[i], lineDelays[i] + 14], [0, 1], { extrapolateRight: "clamp" });
            const translateX = interpolate(slideX, [0, 1], [160, 0]);
            return (
              <div key={i} style={{
                transform: `translateX(${translateX}px)`,
                opacity: lineOp,
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 24,
                padding: "24px 0", width: "100%",
                borderBottom: i < benefits.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontSize: 56, lineHeight: 1, flexShrink: 0 }}>{b.icon}</div>
                <div style={{
                  fontSize: 52, fontWeight: 700, color: b.color,
                  fontFamily: FONT_SANS, letterSpacing: "-0.01em", lineHeight: 1.2,
                }}>{b.text}</div>
              </div>
            );
          })}
        </div>

      </div>
    </AbsoluteFill>
  );
};
