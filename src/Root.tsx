import { Composition } from "remotion";
import { EscritorioSeguroVideo } from "./EscritorioSeguroVideo";
import { ClosingCard } from "./scenes/SceneClosing";
import { EscritorioSeguroWithClosing } from "./EscritorioSeguroWithClosing";
import { CursoCMS2026Video } from "./curso/CursoCMS2026Video";
import { loadFonts } from "./fonts";

loadFonts();

export const RemotionRoot = () => {
  return (
    <>
      {/* Escritorio Seguro — video completo con cierre */}
      <Composition
        id="EscritorioSeguroFull"
        component={EscritorioSeguroWithClosing}
        durationInFrames={1081}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Escritorio Seguro — solo el video */}
      <Composition
        id="EscritorioSeguro"
        component={EscritorioSeguroVideo}
        durationInFrames={930}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Cierre reutilizable */}
      <Composition
        id="ClosingCard"
        component={ClosingCard}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Curso CMS 2026 — 30s promo */}
      <Composition
        id="CursoCMS2026"
        component={CursoCMS2026Video}
        durationInFrames={960}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
