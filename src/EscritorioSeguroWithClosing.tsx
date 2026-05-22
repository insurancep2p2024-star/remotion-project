import { AbsoluteFill, Sequence, Audio, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { ClosingCard } from "./scenes/SceneClosing";
import { SceneThumbnail } from "./scenes/SceneThumbnail";

// Timeline (frames @ 30fps):
// 0          thumbnail (1f)
// 1   - 90   Scene1 Hook              3s  (90f)
// 91  - 300  Scene2 Necessity         7s  (210f)  ← +2s
// 301 - 540  Scene3 Intro+Benefits    8s  (240f)  ← +3s
// 541 - 780  Scene4 Demo              8s  (240f)
// 781 - 930  Scene7 CTA               5s  (150f)
// 931 - 1080 ClosingCard              5s  (150f)
// Total: 1080 + 1 thumb = 1081 frames ≈ 36s

const THUMB = 1;
const VIDEO_FRAMES = 1080;

export const EscritorioSeguroWithClosing = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0A2540" }}>

      <Audio
        src={staticFile("music.mp3")}
        startFrom={0}
        endAt={VIDEO_FRAMES}
        volume={(f) =>
          frame === 0
            ? 0
            : interpolate(
                f,
                [0, 30, VIDEO_FRAMES - 60, VIDEO_FRAMES],
                [0, 0.35, 0.35, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
        }
      />

      {frame === 0 && <SceneThumbnail />}

      {/* Scene 1 — Hook (3s) */}
      <Sequence from={THUMB} durationInFrames={90}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2 — Necessity (7s) */}
      <Sequence from={THUMB + 90} durationInFrames={210}>
        <Scene2Necessity />
      </Sequence>

      {/* Scene 3 — Intro + Benefits (8s) */}
      <Sequence from={THUMB + 300} durationInFrames={240}>
        <Scene3ProductIntro />
      </Sequence>

      {/* Scene 4 — Demo (8s) */}
      <Sequence from={THUMB + 540} durationInFrames={240}>
        <Scene4Demo />
      </Sequence>

      {/* Scene 7 — CTA (5s) */}
      <Sequence from={THUMB + 780} durationInFrames={150}>
        <Scene7CTA />
      </Sequence>

      {/* Closing card (5s) */}
      <Sequence from={THUMB + 930} durationInFrames={150}>
        <ClosingCard />
      </Sequence>

    </AbsoluteFill>
  );
};
