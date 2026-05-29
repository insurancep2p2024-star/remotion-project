import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { FONT_SANS, FONT_MONO } from "../fonts";

const items = [
  { num: "01", text: "Contexto Crítico 2026",                     color: "#29ABE2" },
  { num: "02", text: "Las 3 Reglas CMS 2026",                     color: "#29ABE2" },
  { num: "03", text: "Riesgo por Actividad 2026",                 color: "#FF9500" },
  { num: "04", text: "Las VPNs NO Funcionan en 2026",             color: "#FF3B30" },
  { num: "05", text: "Soluciones Legales",                        color: "#34C759" },
  { num: "06", text: "HealthSherpa Controles 2026",               color: "#29ABE2" },
  { num: "07", text: "Consecuencias 2026",                        color: "#FF3B30" },
  { num: "08", text: "Plan de Acción Inmediato",                  color: "#34C759" },
  { num: "09", text: "Contratación Directa = 100% Tu Responsabilidad", color: "#FF9500" },
  { num: "10", text: "Contrato Requerido 2026",                   color: "#29ABE2" },
  { num: "11", text: "Recomendaciones",                           color: "#34C759" },
  { num: "12", text: "Mapa Riesgo por Estado 2026",               color: "#FF9500" },
];

// 18s = 540 frames. Each item appears every 45 frames (1.5s)
const ITEM_INTERVAL = 45;
// Show max 7 items at once, scroll up as new ones appear
const MAX_VISIBLE = 7;

export const CursoScene2List = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [520, 539], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titleOp    = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 13, stiffness: 120 } });

  // How many items have appeared
  const visibleCount = Math.min(items.length, Math.floor(frame / ITEM_INTERVAL) + 1);

  // Scroll offset: once we exceed MAX_VISIBLE, push items up
  const scrollOffset = Math.max(0, visibleCount - MAX_VISIBLE) * 94;
  const scrollY = spring({
    frame: Math.max(0, frame - MAX_VISIBLE * ITEM_INTERVAL),
    fps,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });
  const currentScroll = scrollOffset > 0
    ? interpolate(scrollY, [0, 1], [0, scrollOffset])
    : 0;

  const glow = interpolate(Math.sin((frame / 40) * Math.PI), [-1, 1], [0.08, 0.18]);

  return (
    <AbsoluteFill style={{ background: "#0A2540", opacity: fadeIn * fadeOut }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 40%, rgba(41,171,226,${glow}), transparent)` }} />

      <div style={{
        position: "absolute", top: 150, bottom: 170, left: 60, right: 60,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          transform: `scale(${titleScale})`,
          opacity: titleOp,
          marginBottom: 28, flexShrink: 0,
        }}>
          <div style={{
            fontSize: 36, fontWeight: 700, color: "#29ABE2",
            fontFamily: FONT_MONO, letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: 4,
          }}>📋 Contenido del Curso</div>
          <div style={{
            fontSize: 56, fontWeight: 900, color: "white",
            fontFamily: FONT_SANS, letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>CMS 2026</div>
          {/* Divider */}
          <div style={{
            height: 2, marginTop: 16,
            background: "linear-gradient(90deg, #29ABE2, transparent)",
            opacity: 0.5,
          }} />
        </div>

        {/* List — scrolls up */}
        <div style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}>
          <div style={{
            display: "flex", flexDirection: "column", gap: 10,
            transform: `translateY(-${currentScroll}px)`,
          }}>
            {items.map((item, i) => {
              const appearFrame = i * ITEM_INTERVAL;
              const itemOp = interpolate(frame, [appearFrame, appearFrame + 12], [0, 1], { extrapolateRight: "clamp" });
              const itemX  = spring({ frame: Math.max(0, frame - appearFrame), fps, config: { damping: 14, stiffness: 120 } });
              const translateX = interpolate(itemX, [0, 1], [120, 0]);
              const isNew = frame >= appearFrame && frame < appearFrame + 20;

              return (
                <div key={i} style={{
                  transform: `translateX(${translateX}px)`,
                  opacity: itemOp,
                  display: "flex", alignItems: "center", gap: 18,
                  background: isNew ? `rgba(41,171,226,0.1)` : "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${isNew ? item.color + "66" : "rgba(255,255,255,0.08)"}`,
                  borderLeft: `4px solid ${item.color}`,
                  borderRadius: 14, padding: "18px 22px",
                  transition: "background 0.3s",
                }}>
                  <div style={{
                    fontSize: 30, fontWeight: 800, color: item.color,
                    fontFamily: FONT_MONO, minWidth: 44, flexShrink: 0,
                  }}>{item.num}</div>
                  <div style={{
                    fontSize: 38, fontWeight: 700, color: "white",
                    fontFamily: FONT_SANS, letterSpacing: "-0.01em",
                    lineHeight: 1.2, flex: 1,
                  }}>{item.text}</div>
                  {isNew && (
                    <div style={{
                      fontSize: 26, fontWeight: 700, color: item.color,
                      fontFamily: FONT_SANS, flexShrink: 0,
                    }}>✓</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
