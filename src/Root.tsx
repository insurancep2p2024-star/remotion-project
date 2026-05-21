import { Composition } from "remotion";
import { EscritorioSeguroVideo } from "./EscritorioSeguroVideo";
import { ClosingCard } from "./scenes/SceneClosing";
import { EscritorioSeguroWithClosing } from "./EscritorioSeguroWithClosing";
import { loadFonts } from "./fonts";

loadFonts();

export const RemotionRoot = () => {
  return (
    <>
      {/* Video completo con cierre */}
      <Composition
        id="EscritorioSeguroFull"
        component={EscritorioSeguroWithClosing}
        durationInFrames={1081}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Solo el video (sin cierre) */}
      <Composition
        id="EscritorioSeguro"
        component={EscritorioSeguroVideo}
        durationInFrames={930}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Cierre reutilizable independiente */}
      <Composition
        id="ClosingCard"
        component={ClosingCard}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
