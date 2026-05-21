import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "@remotion/core";

export const Scene7CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const priceScale = spring({ frame, fps, config: { damping: 10, stiffness: 130, mass: 0.6 } });

  const line1Scale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 13, stiffness: 110 } });
  const line2Scale = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 13, stiffness: 110 } });
  const line3Scale = spring({ frame: Math.max(0, frame - 42), fps, config: { damping: 13, stiffness: 110 } });

  const line1Op = interpolate(frame, [15, 28], [0, 1], { extrapolateRight: "clamp" });
  const line2Op = interpolate(frame, [28, 40], [0, 1], { extrapolateRight: "clamp" });
  const line3Op = interpolate(frame, [42, 55], [0, 1], { extrapolateRight: "clamp" });

  // URL pulse
  const urlPulse = interpolate(
    Math.sin((frame / 20) * Math.PI),
    [-1, 1],
    [1.0, 1.03]
  );

  // Urgency badge pulse
  const badgePulse = interpolate(
    Math.sin((frame / 18) * Math.PI),
    [-1, 1],
    [0.95, 1.05]
  );

  // Glow pulse
  const glowIntensity = interpolate(
    Math.sin((frame / 25) * Math.PI),
    [-1, 1],
    [0.2, 0.35]
  );

  return (
    <AbsoluteFill style={{
      background: "#050E1A",
      opacity: fadeIn,
    }}>
      {/* Animated glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 50% 60%, rgba(0,102,255,${glowIntensity}), transparent)`,
      }} />

      {/* Grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
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
        alignItems: "center",
        gap: 0,
      }}>
        {/* 2025 urgency badge */}
        <div style={{
          transform: `scale(${badgePulse})`,
          background: "rgba(255,59,48,0.15)",
          border: "1.5px solid rgba(255,59,48,0.5)",
          borderRadius: 100,
          padding: "10px 28px",
          fontSize: 30,
          fontWeight: 700,
          color: "#FF3B30",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "0.05em",
          marginBottom: 32,
        }}>
          2025 — Cero tolerancia
        </div>

        {/* Price */}
        <div style={{
          transform: `scale(${priceScale})`,
          textAlign: "center",
          marginBottom: 8,
        }}>
          <div style={{
            fontSize: 40,
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>Individual · 1 usuario</div>
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 8,
            lineHeight: 1,
          }}>
            <span style={{
              fontSize: 48,
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginTop: 16,
            }}>$</span>
            <span style={{
              fontSize: 140,
              fontWeight: 900,
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}>50</span>
            <span style={{
              fontSize: 44,
              fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginTop: 24,
              alignSelf: "flex-end",
              paddingBottom: 8,
            }}>/mes</span>
          </div>
        </div>

        {/* What's included */}
        <div style={{
          transform: `scale(${line1Scale})`,
          opacity: line1Op,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 28,
        }}>
          {["IP USA Dedicada", "Windows Seguro", "Soporte 24/7", "Sin contrato"].map((tag, i) => (
            <div key={i} style={{
              background: "rgba(0,102,255,0.15)",
              border: "1px solid rgba(0,102,255,0.35)",
              borderRadius: 8,
              padding: "8px 20px",
              fontSize: 28,
              fontWeight: 600,
              color: "#60A5FA",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>{tag}</div>
          ))}
        </div>

        {/* CTA button */}
        <div style={{
          transform: `scale(${line2Scale})`,
          opacity: line2Op,
          width: "100%",
          height: 80,
          borderRadius: 16,
          background: "linear-gradient(135deg, #0066FF, #0040CC)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 40px rgba(0,102,255,0.45)",
          marginBottom: 28,
        }}>
          <span style={{
            fontSize: 40,
            fontWeight: 800,
            color: "white",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.01em",
          }}>Empezar hoy →</span>
        </div>

        {/* URL */}
        <div style={{
          transform: `scale(${urlPulse}) scale(${line3Scale})`,
          opacity: line3Op,
          fontSize: 38,
          fontWeight: 700,
          color: "#60A5FA",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}>
          maintless.com
        </div>

        {/* Tagline */}
        <div style={{
          opacity: line3Op * 0.6,
          fontSize: 28,
          color: "rgba(255,255,255,0.35)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          marginTop: 12,
          textAlign: "center",
        }}>
          No es un gasto. Es el seguro de tu negocio.
        </div>
      </div>
    </AbsoluteFill>
  );
};
