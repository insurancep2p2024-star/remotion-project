import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence } from "@remotion/core";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7CTA } from "./scenes/Scene7CTA";

// Scene timing (frames at 30fps)
// Scene 1 - Hook:           0   - 89   (3s)
// Scene 2 - Necessity:      90  - 239  (5s)
// Scene 3 - Product Intro:  240 - 329  (3s)
// Scene 4 - Demo:           330 - 569  (8s)
// Scene 5 - Features:       570 - 689  (4s)
// Scene 6 - Benefits:       690 - 779  (3s)
// Scene 7 - CTA:            780 - 929  (5s)
// Total: 31s = 930 frames

export const EscritorioSeguroVideo = () => {
  return (
    <AbsoluteFill style={{ background: "#0A2540" }}>
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
    </AbsoluteFill>
  );
};
