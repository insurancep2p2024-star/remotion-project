import { AbsoluteFill, Sequence, Audio, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { ClosingCard } from "./scenes/SceneClosing";
import { SceneThumbnail } from "./scenes/SceneThumbnail";

// Frame 0: static thumbnail
// Frames 1-1080: full video (36s)
const THUMB = 1;
const VIDEO_FRAMES = 1080;
const TOTAL_FRAMES = THUMB + VIDEO_FRAMES;

export const EscritorioSeguroWithClosing = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0A2540" }}>

      {/* 🎵 Audio — silent on thumbnail frame */}
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

      {/* 🖼️ Frame 0: static thumbnail (looks like Scene1Hook at frame 60) */}
      {frame === 0 && <SceneThumbnail />}

      {/* 🎬 Full video starting at frame 1 */}
      <Sequence from={THUMB + 0} durationInFrames={90}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={THUMB + 90} durationInFrames={150}>
        <Scene2Necessity />
      </Sequence>
      <Sequence from={THUMB + 240} durationInFrames={90}>
        <Scene3ProductIntro />
      </Sequence>
      <Sequence from={THUMB + 330} durationInFrames={240}>
        <Scene4Demo />
      </Sequence>
      <Sequence from={THUMB + 570} durationInFrames={120}>
        <Scene5Features />
      </Sequence>
      <Sequence from={THUMB + 690} durationInFrames={90}>
        <Scene6Benefits />
      </Sequence>
      <Sequence from={THUMB + 780} durationInFrames={150}>
        <Scene7CTA />
      </Sequence>
      <Sequence from={THUMB + 930} durationInFrames={150}>
        <ClosingCard />
      </Sequence>
    </AbsoluteFill>
  );
};
