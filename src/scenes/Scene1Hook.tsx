import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "@remotion/core";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 120, mass: 0.6 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [70, 89], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowPulse = interpolate(frame, [0, 45, 89], [0.18, 0.32, 0.18]);

  const line1Scale = spring({ frame, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const line2Scale = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const line3Scale = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });

  return (
    <AbsoluteFill style={{
      background: "#0A2540",
      justifyContent: "center",
      alignItems: "center",
      opacity: opacity * fadeOut,
    }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 75% 50% at 50% 50%, rgba(0,102,255,${glowPulse}), transparent)`,
      }} />

      {/* Grid texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Safe zone content */}
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
        {/* Warning icon */}
        <div style={{
          transform: `scale(${scale})`,
          marginBottom: 40,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255,59,48,0.15)",
          border: "2px solid rgba(255,59,48,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2.5">
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>

        <div style={{ textAlign: "center", lineHeight: 1.1 }}>
          <div style={{
            transform: `scale(${line1Scale})`,
            fontSize: 72,
            fontWeight: 900,
            color: "white",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.03em",
            marginBottom: 8,
          }}>¿Qué pasaría</div>

          <div style={{
            transform: `scale(${line2Scale})`,
            fontSize: 72,
            fontWeight: 900,
            color: "#60A5FA",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.03em",
            marginBottom: 8,
          }}>si mañana</div>

          <div style={{
            transform: `scale(${line3Scale})`,
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}>no puedes entrar<br/>al Marketplace?</div>
        </div>

        {/* Subtext */}
        <div style={{
          marginTop: 48,
          transform: `scale(${spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } })})`,
          fontSize: 36,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500,
          textAlign: "center",
        }}>
          Tu acceso es tu negocio.
        </div>
      </div>
    </AbsoluteFill>
  );
};
