import { AbsoluteFill, Sequence, Audio, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { ClosingCard } from "./scenes/SceneClosing";
import { SceneThumbnail } from "./scenes/SceneThumbnail";

// Timeline (frames @ 30fps):
// 0        thumbnail (1f)
// 1-90     Scene1 Hook         3s
// 91-240   Scene2 Necessity    5s
// 241-390  Scene3 Intro+Benefits 5s  ← merged (was 3s intro + 3s benefits)
// 391-630  Scene4 Demo         8s
// 631-750  Scene5 Features     4s
// 751-900  Scene7 CTA          5s
// 901-1050 ClosingCard         5s
// Total: 1050 + 1 thumb = 1051 frames ≈ 35s

const THUMB = 1;
const VIDEO_FRAMES = 1050;
const TOTAL_FRAMES = THUMB + VIDEO_FRAMES;

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

      {/* Scene 2 — Necessity (5s) */}
      <Sequence from={THUMB + 90} durationInFrames={150}>
        <Scene2Necessity />
      </Sequence>

      {/* Scene 3 — Intro + Benefits merged (5s) */}
      <Sequence from={THUMB + 240} durationInFrames={150}>
        <Scene3ProductIntro />
      </Sequence>

      {/* Scene 4 — Demo (8s) */}
      <Sequence from={THUMB + 390} durationInFrames={240}>
        <Scene4Demo />
      </Sequence>

      {/* Scene 5 — Features (4s) */}
      <Sequence from={THUMB + 630} durationInFrames={120}>
        <Scene5Features />
      </Sequence>

      {/* Scene 7 — CTA (5s) */}
      <Sequence from={THUMB + 750} durationInFrames={150}>
        <Scene7CTA />
      </Sequence>

      {/* Closing card (5s) */}
      <Sequence from={THUMB + 900} durationInFrames={150}>
        <ClosingCard />
      </Sequence>

    </AbsoluteFill>
  );
};
