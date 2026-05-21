import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "@remotion/core";

// Bezier easing helper
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const lerpPos = (from: [number, number], to: [number, number], t: number): [number, number] => {
  const e = easeInOut(Math.max(0, Math.min(1, t)));
  return [from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e];
};

const typingText = "agente@miempresa.com";

export const Scene4Demo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [225, 239], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = fadeIn * fadeOut;

  // Timeline (frames):
  // 0-20: UI appears
  // 20-40: cursor moves to input field
  // 40-45: click ripple
  // 45-100: typing text
  // 100-115: cursor moves to button
  // 115-120: button press
  // 120-135: loading spinner
  // 135-239: result appears (connected!)

  // Cursor positions (relative to demo card center, 960px wide)
  const inputPos: [number, number] = [0, -60];    // input field
  const buttonPos: [number, number] = [0, 40];    // connect button

  let cursorX = -300, cursorY = -200;
  if (frame < 20) {
    [cursorX, cursorY] = [-300, -200];
  } else if (frame < 40) {
    [cursorX, cursorY] = lerpPos([-300, -200], inputPos, (frame - 20) / 20);
  } else if (frame < 100) {
    [cursorX, cursorY] = inputPos;
  } else if (frame < 115) {
    [cursorX, cursorY] = lerpPos(inputPos, buttonPos, (frame - 100) / 15);
  } else {
    [cursorX, cursorY] = buttonPos;
  }

  // Click ripple at frame 40
  const ripple1 = interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const ripple1Op = interpolate(frame, [40, 55], [0.7, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Click ripple at frame 115
  const ripple2 = interpolate(frame, [115, 130], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const ripple2Op = interpolate(frame, [115, 130], [0.7, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Typing
  const charsTyped = frame < 45 ? 0 : Math.min(typingText.length, Math.floor((frame - 45) / 2.5));
  const typedText = typingText.slice(0, charsTyped);

  // Button press
  const btnScale = frame >= 115 && frame < 125
    ? spring({ frame: frame - 115, fps, config: { damping: 8, stiffness: 300, mass: 0.3 }, from: 1, to: 0.94 })
    : 1;

  // Loading
  const showLoading = frame >= 120 && frame < 135;
  const loadingRot = interpolate(frame, [120, 135], [0, 360]);

  // Result
  const showResult = frame >= 135;
  const resultScale = spring({ frame: Math.max(0, frame - 135), fps, config: { damping: 12, stiffness: 120 } });
  const resultOp = interpolate(frame, [135, 148], [0, 1], { extrapolateRight: "clamp" });

  // UI appearance
  const uiScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <AbsoluteFill style={{
      background: "#0A2540",
      justifyContent: "center",
      alignItems: "center",
      opacity: alpha,
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,102,255,0.12), transparent)",
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
        {/* Header label */}
        <div style={{
          transform: `scale(${uiScale})`,
          fontSize: 30,
          fontWeight: 700,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 28,
        }}>
          🖥️ Escritorio Remoto Seguro
        </div>

        {/* Demo card */}
        <div style={{
          transform: `scale(${uiScale})`,
          width: "100%",
          background: "#0F1F33",
          borderRadius: 24,
          border: "1px solid rgba(0,102,255,0.3)",
          padding: "36px 40px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          position: "relative",
        }}>
          {/* Window chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,59,48,0.8)" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,200,40,0.6)" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(52,199,89,0.6)" }} />
            <span style={{
              marginLeft: 12,
              fontSize: 24,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.1em",
            }}>MARKETPLACE LOGIN</span>
          </div>

          {/* Input label */}
          <div style={{
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: 10,
          }}>Correo electrónico</div>

          {/* Input field */}
          <div style={{
            height: 72,
            borderRadius: 14,
            background: "rgba(255,255,255,0.05)",
            border: `1.5px solid ${frame >= 40 && frame < 120 ? "rgba(0,102,255,0.7)" : "rgba(255,255,255,0.12)"}`,
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            marginBottom: 16,
            gap: 10,
            position: "relative",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span style={{
              fontSize: 36,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 400,
              flex: 1,
            }}>{typedText}
              {frame >= 40 && frame < 120 && (
                <span style={{
                  display: "inline-block",
                  width: 2,
                  height: 32,
                  background: "#0066FF",
                  marginLeft: 2,
                  verticalAlign: "middle",
                  opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
                }} />
              )}
            </span>
            {/* Click ripple on input */}
            {ripple1 < 1 && ripple1 > 0 && (
              <div style={{
                position: "absolute",
                right: 20,
                top: "50%",
                width: 60 * ripple1,
                height: 60 * ripple1,
                borderRadius: "50%",
                border: "2px solid rgba(0,102,255,0.8)",
                transform: "translateY(-50%)",
                opacity: ripple1Op,
              }} />
            )}
          </div>

          {/* Connect button */}
          <div style={{
            height: 72,
            borderRadius: 14,
            background: `linear-gradient(135deg, #0066FF, #0040CC)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transform: `scale(${btnScale})`,
            boxShadow: "0 8px 24px rgba(0,102,255,0.4)",
            position: "relative",
            overflow: "hidden",
          }}>
            {showLoading ? (
              <div style={{
                width: 36,
                height: 36,
                border: "3px solid rgba(255,255,255,0.3)",
                borderTopColor: "white",
                borderRadius: "50%",
                transform: `rotate(${loadingRot}deg)`,
              }} />
            ) : (
              <span style={{
                fontSize: 36,
                fontWeight: 800,
                color: "white",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "-0.01em",
              }}>
                {showResult ? "✓ Conectado" : "Conectar ahora"}
              </span>
            )}
            {/* Button ripple */}
            {ripple2 < 1 && ripple2 > 0 && (
              <div style={{
                position: "absolute",
                width: 200 * ripple2,
                height: 200 * ripple2,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                opacity: ripple2Op,
              }} />
            )}
          </div>

          {/* Result */}
          {showResult && (
            <div style={{
              marginTop: 20,
              transform: `scale(${resultScale})`,
              opacity: resultOp,
              background: "rgba(52,199,89,0.1)",
              border: "1.5px solid rgba(52,199,89,0.4)",
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}>
              <div style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#34C759",
                boxShadow: "0 0 12px #34C759",
              }} />
              <div>
                <div style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#34C759",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>🇺🇸 Conectado — Miami, FL</div>
                <div style={{
                  fontSize: 28,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginTop: 4,
                }}>IP: 104.28.11.xx · Dedicada · Segura</div>
              </div>
            </div>
          )}
        </div>

        {/* Cursor dot */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 0 3px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.4)",
          transform: `translate(calc(-50% + ${cursorX}px), calc(-50% + ${cursorY}px))`,
          zIndex: 100,
          pointerEvents: "none",
          opacity: showResult ? 0 : 1,
        }} />
      </div>
    </AbsoluteFill>
  );
};
