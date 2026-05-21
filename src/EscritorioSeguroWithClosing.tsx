import { AbsoluteFill, Sequence, Audio, staticFile, interpolate, useCurrentFrame, TimelineContext } from "remotion";
import React from "react";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { ClosingCard } from "./scenes/SceneClosing";

const THUMBNAIL_FRAMES = 1;
const VIDEO_FRAMES = 1080;
const TOTAL_FRAMES = THUMBNAIL_FRAMES + VIDEO_FRAMES;

// Overrides the Remotion time context so Scene1Hook always
// sees frame=60, regardless of what the global frame is.
const FrozenAt60: React.FC = () => {
  const ctx = React.useContext(TimelineContext);
  const frozen = React.useMemo(
    () => ({ ...ctx, frame: 60, fps: 30 }),
    [ctx]
  );
  return (
    <TimelineContext.Provider value={frozen}>
      <Scene1Hook />
    </TimelineContext.Provider>
  );
};

export const EscritorioSeguroWithClosing = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0A2540" }}>

      {/* 🎵 Audio */}
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

      {/* 🖼️ Frame 0 only: Scene1Hook frozen at frame 60 */}
      {frame === 0 && <FrozenAt60 />}

      {/* 🎬 Video from frame 1 onwards */}
      {frame > 0 && (
        <>
          <Sequence from={THUMBNAIL_FRAMES} durationInFrames={90}>
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
