import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { FONT_SANS, FONT_MONO } from "../fonts";

const BRAND_BLUE = "#29ABE2";

export const ClosingCard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [130, 149], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = fadeIn * fadeOut;

  // Logo springs in
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 110, mass: 0.7 } });
  const logoScaleVal = interpolate(logoScale, [0, 1], [0.75, 1]);

  // Divider line grows
  const lineWidth = interpolate(frame, [22, 58], [0, 1], { extrapolateRight: "clamp" });

  // Contact info slides up
  const webSlide = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 13, stiffness: 110 } });
  const phoneSlide = spring({ frame: Math.max(0, frame - 46), fps, config: { damping: 13, stiffness: 110 } });
  const webOp = interpolate(frame, [32, 48], [0, 1], { extrapolateRight: "clamp" });
  const phoneOp = interpolate(frame, [46, 62], [0, 1], { extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [62, 78], [0, 1], { extrapolateRight: "clamp" });

  // Subtle glow pulse on logo card
  const glowOp = interpolate(Math.sin((frame / 35) * Math.PI), [-1, 1], [0.08, 0.18]);

  return (
    <AbsoluteFill style={{ background: "#F0F4F8", opacity: alpha }}>

      {/* Subtle blue tint glow top */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 80% 45% at 50% 10%, rgba(41,171,226,${glowOp}), transparent)`,
      }} />

      {/* Light grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(41,171,226,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(41,171,226,.06) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
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
      }}>

        {/* Logo card — white background so PNG looks perfect */}
        <div style={{
          transform: `scale(${logoScaleVal})`,
          background: "white",
          borderRadius: 28,
          padding: "36px 48px",
          marginBottom: 44,
          boxShadow: "0 12px 48px rgba(41,171,226,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: "1.5px solid rgba(41,171,226,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
          <Img
            src={staticFile("logo.png")}
            style={{
              width: "100%",
              maxWidth: 760,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Divider */}
        <div style={{
          width: "100%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${BRAND_BLUE}, transparent)`,
          transform: `scaleX(${lineWidth})`,
          marginBottom: 40,
          opacity: 0.5,
        }} />

        {/* Website */}
        <div style={{
          transform: `translateY(${interpolate(webSlide, [0, 1], [28, 0])}px)`,
          opacity: webOp,
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 22,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={BRAND_BLUE} strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/>
          </svg>
          <span style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#0A2540",
            fontFamily: FONT_SANS,
            letterSpacing: "-0.01em",
          }}>www.tecpersonal.com</span>
        </div>

        {/* WhatsApp */}
        <div style={{
          transform: `translateY(${interpolate(phoneSlide, [0, 1], [28, 0])}px)`,
          opacity: phoneOp,
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 36,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill={BRAND_BLUE}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#0A2540",
            fontFamily: FONT_SANS,
            letterSpacing: "-0.01em",
          }}>+1 407 456 7056</span>
        </div>

        {/* Tagline */}
        <div style={{
          opacity: tagOp * 0.55,
          fontSize: 30,
          color: "#0A2540",
          fontFamily: FONT_MONO,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Tu tecnología. Tu negocio. Siempre.
        </div>

      </div>
    </AbsoluteFill>
  );
};
