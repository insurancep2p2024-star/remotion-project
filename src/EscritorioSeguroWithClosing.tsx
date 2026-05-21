import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Necessity } from "./scenes/Scene2Necessity";
import { Scene3ProductIntro } from "./scenes/Scene3ProductIntro";
import { Scene4Demo } from "./scenes/Scene4Demo";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { ClosingCard } from "./scenes/SceneClosing";

// Total: 31s video + 5s closing = 36s = 1080 frames

export const EscritorioSeguroWithClosing = () => {
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
      {/* Closing card: starts at frame 930, 5s = 150 frames */}
      <Sequence from={930} durationInFrames={150}>
        <ClosingCard />
      </Sequence>
    </AbsoluteFill>
  );
};
