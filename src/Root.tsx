import { Composition } from "remotion";
import { EscritorioSeguroVideo } from "./EscritorioSeguroVideo";
import { loadFonts } from "./fonts";

// Load fonts once when Remotion initialises the bundle.
// @remotion/google-fonts downloads the woff2 files and serves them
// as static assets — no internet required at render time.
loadFonts();

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
