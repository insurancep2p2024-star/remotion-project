import { FONT_SANS, FONT_MONO } from "../fonts";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "@remotion/core";

const PARTICLE_COUNT = 22;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  angle: (i / PARTICLE_COUNT) * Math.PI * 2,
  speed: 3 + Math.random() * 5,
  size: 6 + Math.random() * 10,
  color: i % 3 === 0 ? "#60A5FA" : i % 3 === 1 ? "#0066FF" : "#ffffff",
  delay: Math.floor(Math.random() * 8),
}));

export const Scene3ProductIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [75, 89], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = fadeIn * fadeOut;

  const logoScale = spring({ frame, fps, config: { damping: 10, stiffness: 150, mass: 0.5 } });
  const nameSlide = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 120 } });
  const sloganSlide = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });
  const sloganOp = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: "#0A2540",
      justifyContent: "center",
      alignItems: "center",
      opacity: alpha,
    }}>
      {/* Radial blue glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,102,255,0.28), transparent)",
      }} />

      {/* Particles */}
      {particles.map((p, i) => {
        const pFrame = Math.max(0, frame - p.delay);
        const progress = Math.min(1, pFrame / 45);
        const dist = p.speed * pFrame * 2.5;
        const x = Math.cos(p.angle) * dist;
        const y = Math.sin(p.angle) * dist;
        const op = interpolate(pFrame, [0, 10, 40, 55], [0, 1, 0.6, 0], { extrapolateRight: "clamp" });

        return (
          <div key={i} style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            opacity: op,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }} />
        );
      })}

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
        alignItems: "center",
      }}>
        {/* Logo */}
        <div style={{
          transform: `scale(${logoScale})`,
          width: 120,
          height: 120,
          borderRadius: 28,
          background: "linear-gradient(135deg, #0066FF, #0040CC)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 40px rgba(0,102,255,0.5)",
          marginBottom: 36,
          border: "1.5px solid rgba(96,165,250,0.4)",
        }}>
          <span style={{
            fontSize: 48,
            fontWeight: 900,
            color: "white",
            fontFamily: FONT_SANS,
            letterSpacing: "-2px",
          }}>TP</span>
        </div>

        {/* Product name */}
        <div style={{
          transform: `translateY(${interpolate(nameSlide, [0, 1], [60, 0])}px) scale(${nameSlide})`,
          opacity: nameSlide,
          textAlign: "center",
          marginBottom: 20,
        }}>
          <div style={{
            fontSize: 80,
            fontWeight: 900,
            color: "white",
            fontFamily: FONT_SANS,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}>Escritorio</div>
          <div style={{
            fontSize: 80,
            fontWeight: 900,
            background: "linear-gradient(90deg, #60A5FA, #0066FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: FONT_SANS,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}>Seguro</div>
        </div>

        {/* Slogan */}
        <div style={{
          transform: `translateY(${interpolate(sloganSlide, [0, 1], [30, 0])}px)`,
          opacity: sloganOp,
          fontSize: 38,
          fontWeight: 600,
          color: "rgba(255,255,255,0.65)",
          fontFamily: FONT_SANS,
          textAlign: "center",
          letterSpacing: "-0.01em",
        }}>
          Tu acceso es tu negocio.
        </div>

        {/* Brand tag */}
        <div style={{
          marginTop: 32,
          opacity: sloganOp * 0.6,
          fontSize: 28,
          color: "rgba(255,255,255,0.3)",
          fontFamily: FONT_MONO,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          Maint.less Desktop
        </div>
      </div>
    </AbsoluteFill>
  );
};
