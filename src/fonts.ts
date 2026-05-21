/**
 * fonts.ts
 * Loads Plus Jakarta Sans and JetBrains Mono via @remotion/google-fonts.
 * @remotion/google-fonts downloads and bundles the font files at render time
 * so no internet connection is needed during the actual video render.
 *
 * Usage: import and call loadFonts() inside Root.tsx (outside any component)
 * so it runs once when Remotion initialises the bundle.
 */

import { loadFont as loadPlusJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

export const loadFonts = () => {
  // Plus Jakarta Sans — all weights used in the video
  loadPlusJakarta({
    weights: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
  });

  // JetBrains Mono — used for code/mono elements
  loadJetBrainsMono({
    weights: ["400", "500"],
    subsets: ["latin"],
  });
};

// CSS font-family strings to use in style props
export const FONT_SANS = "'Plus Jakarta Sans', sans-serif";
export const FONT_MONO = "'JetBrains Mono', monospace";
