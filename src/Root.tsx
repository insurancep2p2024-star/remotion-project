import { Composition } from "@remotion/core";
import { EscritorioSeguroVideo } from "./EscritorioSeguroVideo";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="EscritorioSeguro"
        component={EscritorioSeguroVideo}
        durationInFrames={930}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
