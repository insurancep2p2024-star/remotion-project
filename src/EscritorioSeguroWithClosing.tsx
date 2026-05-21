import { AbsoluteFill, Sequence, Audio, staticFile, interpolate, useCurrentFrame, freeze } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { ClosingCard } from "./scenes/SceneClosing";

// 1 frame thumbnail + 1080 frames video = 1081 total
// The thumbnail frame shows Scene1Hook frozen at frame 60 (second 2)
const THUMBNAIL_FRAMES = 1;
const VIDEO_FRAMES = 1080;
const TOTAL_FRAMES = THUMBNAIL_FRAMES + VIDEO_FRAMES;
const FADE_START = TOTAL_FRAMES - 60;

// Frozen snapshot of Scene1Hook at frame 60 — used as thumbnail
const ThumbnailFrame = freeze(<Scene1Hook />, 60);

export const EscritorioSeguroWithClosing = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0A2540" }}>

      {/* 🖼️ Frame 0 only: frozen thumbnail (frame 60 of Scene1Hook) */}
      {frame === 0 && (
        <AbsoluteFill>
          {ThumbnailFrame}
        </AbsoluteFill>
      )}

      {/* 🎵 Audio starts from frame 1 (after thumbnail) */}
      {frame > 0 && (
        <Audio
          src={staticFile("music.mp3")}
          startFrom={0}
          endAt={VIDEO_FRAMES}
          volume={(f) =>
            interpolate(
              f,
              [0, 30, VIDEO_FRAMES - 60, VIDEO_FRAMES],
              [0, 0.35, 0.35, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          }
        />
      )}

      {/* 🎬 All scenes shifted by THUMBNAIL_FRAMES */}
      <Sequence from={THUMBNAIL_FRAMES + 0} durationInFrames={90}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={THUMBNAIL_FRAMES + 90} durationInFrames={150}>
        <Scene2Necessity />
      </Sequence>
      <Sequence from={THUMBNAIL_FRAMES + 240} durationInFrames={90}>
        <Scene3ProductIntro />
      </Sequence>
      <Sequence from={THUMBNAIL_FRAMES + 330} durationInFrames={240}>
        <Scene4Demo />
      </Sequence>
      <Sequence from={THUMBNAIL_FRAMES + 570} durationInFrames={120}>
        <Scene5Features />
      </Sequence>
      <Sequence from={THUMBNAIL_FRAMES + 690} durationInFrames={90}>
        <Scene6Benefits />
      </Sequence>
      <Sequence from={THUMBNAIL_FRAMES + 780} durationInFrames={150}>
        <Scene7CTA />
      </Sequence>
      <Sequence from={THUMBNAIL_FRAMES + 930} durationInFrames={150}>
        <ClosingCard />
      </Sequence>
    </AbsoluteFill>
  );
};
