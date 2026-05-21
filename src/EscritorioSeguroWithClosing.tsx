import { AbsoluteFill, Sequence, Audio, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { ClosingCard } from "./scenes/SceneClosing";

// 1 thumbnail frame + 1080 video frames = 1081 total
const THUMBNAIL_FRAMES = 1;
const VIDEO_FRAMES = 1080;
const TOTAL_FRAMES = THUMBNAIL_FRAMES + VIDEO_FRAMES;
const FADE_START = TOTAL_FRAMES - 60;

export const EscritorioSeguroWithClosing = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0A2540" }}>

      {/* 🎵 Audio — only after thumbnail frame */}
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

      {/* 🖼️ Frame 0: Scene1Hook frozen at its internal frame 60
          We achieve this by rendering Scene1Hook inside a Sequence
          that starts at -60, so at global frame 0 the component
          sees its own frame as 60 — giving us the desired thumbnail. */}
      {frame === 0 && (
        <Sequence from={-60} durationInFrames={1}>
          <Scene1Hook />
        </Sequence>
      )}

      {/* 🎬 All scenes — shifted 1 frame to make room for thumbnail */}
      {frame > 0 && (
        <>
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
        </>
      )}
    </AbsoluteFill>
  );
};
