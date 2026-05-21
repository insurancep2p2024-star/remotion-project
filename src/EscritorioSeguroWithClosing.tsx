import { AbsoluteFill, Sequence, Audio, staticFile, interpolate } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { ClosingCard } from "./scenes/SceneClosing";

// Total: 930 frames video + 150 frames closing = 1080 frames = 36s @ 30fps
const TOTAL_FRAMES = 1080;
// Fade out audio in last 60 frames (2s)
const FADE_START = TOTAL_FRAMES - 60;

export const EscritorioSeguroWithClosing = () => {
  return (
    <AbsoluteFill style={{ background: "#0A2540" }}>

      {/* 🎵 Background music — trimmed to video length with fade out */}
      <Audio
        src={staticFile("music.mp3")}
        startFrom={0}
        endAt={TOTAL_FRAMES}
        volume={(frame) =>
          interpolate(
            frame,
            [0, 30, FADE_START, TOTAL_FRAMES],
            [0, 0.35, 0.35, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />

      <Sequence from={0} durationInFrames={90}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <Scene2Necessity />
      </Sequence>
      <Sequence from={240} durationInFrames={90}>
        <Scene3ProductIntro />
      </Sequence>
      <Sequence from={330} durationInFrames={240}>
        <Scene4Demo />
      </Sequence>
      <Sequence from={570} durationInFrames={120}>
        <Scene5Features />
      </Sequence>
      <Sequence from={690} durationInFrames={90}>
        <Scene6Benefits />
      </Sequence>
      <Sequence from={780} durationInFrames={150}>
        <Scene7CTA />
      </Sequence>
      <Sequence from={930} durationInFrames={150}>
        <ClosingCard />
      </Sequence>
    </AbsoluteFill>
  );
};
