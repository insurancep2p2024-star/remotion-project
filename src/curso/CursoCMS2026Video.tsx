import { AbsoluteFill, Sequence, Audio, staticFile, interpolate, useCurrentFrame } from "remotion";
import { CursoScene1Hook } from "./CursoScene1Hook";
import { CursoScene2List } from "./CursoScene2List";
import { CursoScene3QA }   from "./CursoScene3QA";
import { CursoScene4CTA }  from "./CursoScene4CTA";

// Timeline @ 30fps:
// 0    - 119  Scene 1 Hook       4s  (120f)
// 120  - 659  Scene 2 List      18s  (540f)
// 660  - 779  Scene 3 Q&A        4s  (120f)
// 780  - 899  Scene 4 CTA        4s  (120f)
// Total: 900 frames = 30s

const VIDEO_FRAMES = 900;

export const CursoCMS2026Video = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0A2540" }}>
      <Audio
        src={staticFile("music.mp3")}
        startFrom={0}
        endAt={VIDEO_FRAMES}
        volume={(f) =>
          interpolate(
            f,
            [0, 30, VIDEO_FRAMES - 60, VIDEO_FRAMES],
            [0, 0.32, 0.32, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />

      <Sequence from={0}   durationInFrames={120}><CursoScene1Hook /></Sequence>
      <Sequence from={120} durationInFrames={540}><CursoScene2List /></Sequence>
      <Sequence from={660} durationInFrames={120}><CursoScene3QA  /></Sequence>
      <Sequence from={780} durationInFrames={120}><CursoScene4CTA /></Sequence>
    </AbsoluteFill>
  );
};
