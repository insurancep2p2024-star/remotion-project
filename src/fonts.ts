import { loadFont as loadPlusJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

export const loadFonts = () => {
  loadPlusJakarta();
  loadJetBrainsMono();
};

export const FONT_SANS = "'Plus Jakarta Sans', sans-serif";
export const FONT_MONO = "'JetBrains Mono', monospace";
