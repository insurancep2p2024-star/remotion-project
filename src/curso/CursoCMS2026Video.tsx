import { AbsoluteFill, Sequence, Audio, staticFile, interpolate } from "remotion";
import { CursoScene1Hook } from "./CursoScene1Hook";
import { CursoScene2List } from "./CursoScene2List";
import { CursoScene3QA }   from "./CursoScene3QA";
import { CursoScene4CTA }  from "./CursoScene4CTA";

// Timeline @ 30fps:
// 0    - 179  Scene 1 Hook       6s  (180f)  ← +2s
// 180  - 719  Scene 2 List      18s  (540f)
// 720  - 839  Scene 3 Q&A        4s  (120f)
// 840  - 959  Scene 4 CTA        4s  (120f)
// Total: 960 frames = 32s

const VIDEO_FRAMES = 960;

export const CursoCMS2026Video = () => {
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
      <Sequence from={0}   durationInFrames={180}><CursoScene1Hook /></Sequence>
      <Sequence from={180} durationInFrames={540}><CursoScene2List /></Sequence>
      <Sequence from={720} durationInFrames={120}><CursoScene3QA  /></Sequence>
      <Sequence from={840} durationInFrames={120}><CursoScene4CTA /></Sequence>
    </AbsoluteFill>
  );
};
