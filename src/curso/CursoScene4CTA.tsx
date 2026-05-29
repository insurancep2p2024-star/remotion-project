import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { FONT_SANS, FONT_MONO } from "../fonts";

export const CursoScene4CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const logoScale  = spring({ frame, fps, config: { damping: 12, stiffness: 120, mass: 0.6 } });
  const freeScale  = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 10, stiffness: 150, mass: 0.5 } });
  const line1Scale = spring({ frame: Math.max(0, frame - 26), fps, config: { damping: 13, stiffness: 110 } });
  const line2Scale = spring({ frame: Math.max(0, frame - 42), fps, config: { damping: 13, stiffness: 110 } });
  const line3Scale = spring({ frame: Math.max(0, frame - 58), fps, config: { damping: 13, stiffness: 110 } });
  const line4Scale = spring({ frame: Math.max(0, frame - 72), fps, config: { damping: 13, stiffness: 110 } });

  const line1Op = interpolate(frame, [26, 40], [0, 1], { extrapolateRight: "clamp" });
  const line2Op = interpolate(frame, [42, 56], [0, 1], { extrapolateRight: "clamp" });
  const line3Op = interpolate(frame, [58, 72], [0, 1], { extrapolateRight: "clamp" });
  const line4Op = interpolate(frame, [72, 86], [0, 1], { extrapolateRight: "clamp" });

  const pulse = interpolate(Math.sin((frame / 22) * Math.PI), [-1, 1], [1.0, 1.03]);
  const glow  = interpolate(Math.sin((frame / 30) * Math.PI), [-1, 1], [0.14, 0.28]);

  return (
    <AbsoluteFill style={{ background: "#0A2540", opacity: fadeIn }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 65% at 50% 50%, rgba(41,171,226,${glow}), transparent)` }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        position: "absolute", top: 150, bottom: 170, left: 60, right: 60,
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      }}>
        {/* Logo */}
        <div style={{
          transform: `scale(${logoScale})`,
          background: "white", borderRadius: 24,
          padding: "20px 36px", marginBottom: 32,
          boxShadow: "0 8px 40px rgba(41,171,226,0.25)",
          border: "1.5px solid rgba(41,171,226,0.2)",
        }}>
          <Img
            src={staticFile("logo.png")}
            style={{ width: 420, height: "auto", objectFit: "contain" }}
          />
        </div>

        {/* GRATIS badge */}
        <div style={{
          transform: `scale(${freeScale})`,
          background: "rgba(52,199,89,0.18)",
          border: "2px solid rgba(52,199,89,0.6)",
          borderRadius: 100, padding: "16px 48px",
          fontSize: 48, fontWeight: 900, color: "#34C759",
          fontFamily: FONT_SANS, letterSpacing: "0.06em",
          marginBottom: 32,
        }}>¡GRATIS!</div>

        {/* Main CTA text */}
        <div style={{
          transform: `scale(${line1Scale})`,
          opacity: line1Op,
          fontSize: 60, fontWeight: 900, color: "white",
          fontFamily: FONT_SANS, letterSpacing: "-0.03em",
          textAlign: "center", lineHeight: 1.15, marginBottom: 32,
        }}>
          Inscríbete al<br/>
          <span style={{
            background: "linear-gradient(90deg, #29ABE2, #0066FF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Curso Normativas de Conexión para los portales del Mercado de Salud 2026</span>
        </div>

        {/* WhatsApp button */}
        <div style={{
          transform: `scale(${line2Scale}) scale(${pulse})`,
          opacity: line2Op,
          width: "100%", height: 100, borderRadius: 20,
          background: "linear-gradient(135deg, #25D366, #1DA851)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 18,
          boxShadow: "0 12px 40px rgba(37,211,102,0.4)",
          marginBottom: 24,
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span style={{ fontSize: 50, fontWeight: 800, color: "white", fontFamily: FONT_SANS }}>+58 412 241 9413</span>
        </div>

        {/* Website */}
        <div style={{
          transform: `scale(${line3Scale})`,
          opacity: line3Op,
          fontSize: 44, fontWeight: 700, color: "#29ABE2",
          fontFamily: FONT_MONO, letterSpacing: "0.03em",
          textAlign: "center", marginBottom: 20,
        }}>
          tecpersonal.com
        </div>

        {/* Tagline */}
        <div style={{
          transform: `scale(${line4Scale})`,
          opacity: line4Op,
          fontSize: 38, fontWeight: 600, color: "rgba(255,255,255,0.6)",
          fontFamily: FONT_SANS, textAlign: "center", lineHeight: 1.3,
        }}>
          Tu cumplimiento, nuestra prioridad.
        </div>
      </div>
    </AbsoluteFill>
  );
};
