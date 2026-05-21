import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "@remotion/core";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });

  const titleY = interpolate(frame, [0, 30], [40, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${titleY}px)`,
          textAlign: "center",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hello, Remotion!
        </h1>
        <p style={{ fontSize: 32, marginTop: 20, opacity: 0.8 }}>
          Frame {frame} / {durationInFrames}
        </p>
      </div>
    </AbsoluteFill>
  );
};
